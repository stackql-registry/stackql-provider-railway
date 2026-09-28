#!/usr/bin/env python3
"""pystackql smoke test for the railway (Railway public GraphQL API) stackql provider.

Exercises the salient resources against a real account: read smokes over the
account, workspace, billing, platform and template surfaces, and a free,
self-cleaning write lifecycle modelled on the resources the Terraform
provider documents (railway_project, railway_environment, railway_service,
railway_variable, railway_variable_collection, railway_shared_variable,
railway_service_domain, railway_custom_domain, railway_tcp_proxy) plus
volumes and project tokens:

  - project        INSERT ... RETURNING / SELECT / UPDATE / EXEC / DELETE
  - environment    SELECT / INSERT ... RETURNING / UPDATE (rename) / DELETE
  - service        INSERT ... RETURNING (no source) / SELECT / UPDATE / DELETE
  - service instance  SELECT / UPDATE (start command, typed coercion)
  - variables      INSERT (upsert) / INSERT (collection) / shared / SELECT / DELETE
  - service domain INSERT ... RETURNING / SELECT / DELETE
  - volume         INSERT ... RETURNING / SELECT / UPDATE / DELETE
  - project token  INSERT ... RETURNING / SELECT / DELETE

Cost: nothing billable in practice. Railway bills CPU, memory, egress and
volume storage by usage. No step here deploys anything: the service is
created without a source, no deploy / redeploy method is called, and
variables are written with skip_deploys. Projects, environments, services,
variables, domains and tokens are free objects. The one metered object is
the volume, which exists empty for about a minute (well under $0.01).

Everything is created inside one project named `stackql-smoke-<stamp>`;
before and after a run the script sweeps projects with that prefix, so each
run starts clean and a failed run leaves nothing behind. Deleting the project
removes everything in it. Nothing the script did not create is read for
deletion or modified - the sweep matches the name prefix and nothing else.

Credentials come from the environment, exactly as the provider reads them
(the Terraform provider's variable name):

    export RAILWAY_TOKEN=...      # an account or workspace token

Rate limiting: the API allows 1000 requests per hour on the Hobby plan (100
on Free, 10000 on Pro; `X-RateLimit-Remaining` on every response, 429 with
`Retry-After` once exhausted). A full run makes about 80 calls, a read-only
run about 20. Before anything else the harness asks the API how much of the
window is left and refuses to start a run it could not finish - a run that
dies half way leaves a project behind until the next sweep.

Lost answers: now and then a request gets no answer within stackql's 45
second API timeout (observed on reads and writes alike, a few per thousand
statements). Nothing is known about the outcome, so the harness repeats the
statement only when that is safe: reads, UPDATE, DELETE and upserts as they
are; a create after first removing what the lost request may have created
(found by its name or parent), so that RETURNING is still verified on a
clean create. Project creation is limited to one per 30 seconds per
workspace, so a repeated project create waits that long.

Engine note: a GraphQL error arrives with HTTP 200, and the engine does not
read the response of a DELETE or of an EXEC without SHOWRESULTS, so those
report success regardless (NOTES.md finding 4). Every DELETE here is
therefore followed by a read that proves the object is gone.

pystackql provides and upgrades the stackql binary; the statements run
through that binary directly so that stderr is inspected on every statement.

Never run this against a production workspace.

Usage:
    pip install pystackql
    python tests/smoke_test.py                 # local provider-dev/openapi registry (default)
    python tests/smoke_test.py --live          # the published provider in the stackql registry
    python tests/smoke_test.py --read-only     # read smokes only, no writes
    python tests/smoke_test.py --cleanup-only  # just sweep stackql-smoke-* projects
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
SMOKE_PREFIX = "stackql-smoke-"
INTER_REQUEST_DELAY_S = 0.3
API_URL = "https://backboard.railway.com/graphql/v2"
# API calls a run needs, with margin (Hobby allows 1000 per hour)
CALLS_FULL_RUN = 130
CALLS_READ_ONLY = 40
CALLS_CLEANUP = 15
# the version the provider was built and proven against (GraphQL page_info
# cursors, LIMIT pushdown, request and response transforms on the REST path)
MIN_STACKQL_VERSION = (0, 12, 718)

ERROR_RE = re.compile(
    r"http response status code: [45]|over HTTP error|error assembling|"
    r"cannot find matching operation|FindRoute|no matching operation|"
    r"cannot find any viable servers|parser error|panic|error processing response|"
    r"graphql error|failed to transform|response is not a valid response|"
    r"no request body for operation|schema unsuitable|Not Authorized|"
    r"sql packet preparation error|SQL logic error|no such column|syntax error|"
    r"cannot resolve|not found in|disallowed|credentials error",
    re.I,
)
# The request never produced an answer (stackql's API timeout is 45 seconds).
# Nothing is known about the outcome: a read is simply repeated, a write may
# or may not have happened.
TRANSPORT_RE = re.compile(
    r"context deadline exceeded|Client\.Timeout|request canceled|connection refused|"
    r"connection reset|no such host|TLS handshake timeout|unexpected EOF|i/o timeout",
    re.I,
)
RATE_LIMIT_RE = re.compile(r"status code: 429|Too Many Requests|rate limit", re.I)
TRANSPORT_RETRIES = 2
TRANSPORT_BACKOFF_S = (3, 10)
# the API allows one project creation per 30 seconds per workspace
PROJECT_CREATE_INTERVAL_S = 31
# repeating these cannot create a second object
IDEMPOTENT_RE = re.compile(r"^\s*(SELECT|SHOW|DESCRIBE|UPDATE|DELETE)\b", re.I)


class RateLimited(Exception):
    """The API answered 429: the run stops, nothing further is attempted."""


class Smoke:
    def __init__(self, args: argparse.Namespace) -> None:
        self.args = args
        self.stamp = str(int(time.time()))[-6:]
        self.name = f"{SMOKE_PREFIX}{self.stamp}"
        self.results: list[tuple[str, str, str]] = []
        self.requests = 0
        self.transport_retries = 0
        self.last_output = ""
        self.workspace_id = os.environ.get("RAILWAY_SMOKE_WORKSPACE_ID", "")

        if not os.environ.get("RAILWAY_TOKEN"):
            sys.exit("RAILWAY_TOKEN is not set - see the module docstring")

        from pystackql import StackQL

        self.sq = StackQL(output="dict")
        self.ensure_stackql_version()
        self.registry_args: list[str] = []
        if not args.live:
            reg_path = (BASE_DIR / "provider-dev" / "openapi").resolve()
            registry = {"url": "file://" + reg_path.as_posix(), "localDocRoot": reg_path.as_posix(), "verifyConfig": {"nopVerify": True}}
            self.registry_args = ["--registry", json.dumps(registry, separators=(",", ":"))]
        else:
            print("pulling the published railway provider from the stackql registry")
            out, err = self.run("REGISTRY PULL railway")
            print(f"  {(out or err).splitlines()[-1] if (out or err) else 'pulled'}")
            out, err = self.run("SHOW SERVICES IN railway")
            if not out.startswith("["):
                sys.exit("the railway provider could not be pulled from the public registry - "
                         f"--live verifies a published provider ({(err or out)[:200]})")

    def ensure_stackql_version(self) -> None:
        def parse(v: str) -> tuple[int, ...]:
            return tuple(int(x) for x in re.findall(r"\d+", str(v))[:3])

        current = parse(getattr(self.sq, "version", "") or "")
        if current and current >= MIN_STACKQL_VERSION:
            return
        print(f"stackql {self.sq.version} at {self.sq.bin_path} is older than "
              f"v{'.'.join(map(str, MIN_STACKQL_VERSION))} - upgrading pystackql's binary")
        self.sq.upgrade(showprogress=False)
        if parse(self.sq.version) < MIN_STACKQL_VERSION:
            sys.exit(f"stackql {self.sq.version} is still too old after upgrade")

    # ------------------------------------------------------------ API budget
    def api_budget(self) -> tuple[int | None, str]:
        """Requests left in the hourly window, from one direct request."""
        body = json.dumps({"query": "query { __typename }"}).encode()
        req = urllib.request.Request(API_URL, data=body, method="POST", headers={
            "Authorization": f"Bearer {os.environ['RAILWAY_TOKEN']}",
            "Content-Type": "application/json",
            "User-Agent": "stackql-provider-railway-smoke",
        })
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                remaining = resp.headers.get("x-ratelimit-remaining")
                return (int(remaining) if remaining is not None else None), ""
        except urllib.error.HTTPError as exc:
            if exc.code == 429:
                return 0, f"retry-after {exc.headers.get('retry-after', '?')}s"
            return None, f"HTTP {exc.code}"
        except (urllib.error.URLError, TimeoutError, ValueError) as exc:
            return None, str(exc)

    def require_budget(self, needed: int) -> None:
        remaining, detail = self.api_budget()
        if remaining is None:
            print(f"API budget: could not be read ({detail}) - continuing")
            return
        print(f"API budget: {remaining} requests left in the hour, this run needs up to {needed}")
        if remaining < needed:
            sys.exit(f"not enough API budget to finish the run ({remaining} < {needed}{', ' + detail if detail else ''}) - "
                     "nothing was started; retry when the window has moved on")

    # ------------------------------------------------------------------ core
    def run(self, sql: str) -> tuple[str, str]:
        cmd = [self.sq.bin_path, "exec", sql, "--output", "json", *self.registry_args]
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=600, cwd=BASE_DIR, check=False)
        return proc.stdout.strip(), proc.stderr.strip()

    def attempt(self, sql: str):
        """One execution. Returns (rows, error, transport_failure)."""
        if self.requests:
            time.sleep(INTER_REQUEST_DELAY_S)
        self.requests += 1
        started = time.time()
        try:
            stdout, stderr = self.run(sql)
        except Exception as exc:  # noqa: BLE001
            return [], str(exc), False
        text = f"{stderr}\n{stdout}"
        self.last_output = text.strip()
        if self.args.verbose:
            print(f"        {time.time() - started:5.1f}s  {' '.join(sql.split())[:110]}")
        if RATE_LIMIT_RE.search(text):
            raise RateLimited(text.strip()[:300])
        if TRANSPORT_RE.search(text):
            return [], text.strip()[:300], True
        rows: list = []
        if stdout.startswith(("[", "{")) or stdout == "null":
            try:
                parsed = json.loads(stdout)
                rows = [] if parsed is None else parsed if isinstance(parsed, list) else [parsed]
            except ValueError:
                return [], f"unparseable output: {stdout[:200]}", False
        elif ERROR_RE.search(stdout):
            return [], stdout, False
        # stderr also carries the status line of a successful statement
        # ("The operation was despatched successfully"), so only error
        # patterns fail it
        if ERROR_RE.search(stderr):
            return rows, stderr, False
        if rows and isinstance(rows[0], dict) and "error" in rows[0]:
            return rows, json.dumps(rows, default=str), False
        return rows, None, False

    def q(self, sql: str, idempotent: bool | None = None, orphans=None, retry_wait: int = 0):
        """Runs one statement. Returns (rows, error); error is None on success.

        A request that never produced an answer is repeated when that is
        safe: reads, UPDATE and DELETE always; an INSERT or EXEC only when the
        caller says it is idempotent (an upsert) or supplies `orphans`, which
        returns the DELETE statements for anything the lost request may have
        created - those run first, so the repeat starts from a clean state.
        """
        if idempotent is None:
            idempotent = bool(IDEMPOTENT_RE.match(sql))
        rows, err, transport = self.attempt(sql)
        tries = 0
        while transport and tries < TRANSPORT_RETRIES and (idempotent or orphans):
            self.transport_retries += 1
            print(f"  RETRY the request got no answer ({err[:100]})")
            time.sleep(TRANSPORT_BACKOFF_S[tries])
            if orphans and not idempotent:
                for delete_sql in orphans():
                    print(f"  RETRY removing what the lost request created: {' '.join(delete_sql.split())[:100]}")
                    self.q(delete_sql)
                if retry_wait:
                    time.sleep(retry_wait)
            tries += 1
            rows, err, transport = self.attempt(sql)
        return rows, err

    def step(self, name: str, sql: str, expect_rows: bool = False, contains: str | None = None,
             idempotent: bool | None = None, orphans=None, retry_wait: int = 0):
        rows, err = self.q(sql, idempotent=idempotent, orphans=orphans, retry_wait=retry_wait)
        if err:
            self.results.append((name, "FAIL", err[:300]))
            print(f"  FAIL  {name}  [{err[:240]}]")
            return None
        blob = json.dumps(rows, default=str)
        if expect_rows and not rows:
            self.results.append((name, "FAIL", "expected rows, got none"))
            print(f"  FAIL  {name}  [no rows]{'  raw: ' + self.last_output[:600] if self.args.verbose else ''}")
            return None
        if contains and contains not in blob:
            self.results.append((name, "FAIL", f"'{contains}' not in result"))
            print(f"  FAIL  {name}  ['{contains}' not in {blob[:160]}]")
            return None
        self.results.append((name, "PASS", ""))
        print(f"  PASS  {name}")
        return rows

    def note(self, name: str, ok: bool, detail: str = "") -> None:
        self.results.append((name, "PASS" if ok else "FAIL", detail))
        print(f"  {'PASS' if ok else 'FAIL'}  {name}{('  [' + detail[:200] + ']') if detail and not ok else ''}")

    def returning(self, name: str, sql: str, key: str = "id", contains: str | None = None, orphans=None, retry_wait: int = 0) -> str:
        rows = self.step(name, sql, expect_rows=True, contains=contains, orphans=orphans, retry_wait=retry_wait)
        return str(rows[0].get(key) or "") if rows else ""

    def orphans_of(self, list_sql: str, delete_sql, match=None):
        """Builds an `orphans` callable: rows of list_sql (that satisfy match) -> DELETE statements."""
        def find() -> list[str]:
            rows, err = self.q(list_sql)
            if err:
                return []
            return [delete_sql(r) for r in rows or [] if match is None or match(r)]
        return find

    def gone(self, name: str, sql: str, needle: str) -> None:
        """A DELETE reports success whatever the API answered: prove it."""
        rows, err = self.q(sql)
        blob = json.dumps(rows, default=str)
        self.note(name, not err and needle not in blob, err or f"{needle} still listed")

    # ------------------------------------------------------- breadcrumb sweep
    def discover_workspace(self) -> None:
        if self.workspace_id:
            return
        rows, err = self.q("SELECT id, name FROM railway.account.api_token_workspaces")
        if err or not rows:
            sys.exit(f"cannot discover the workspace of the token: {err or 'no workspaces'}")
        self.workspace_id = str(rows[0]["id"])
        print(f"workspace: {rows[0].get('name')} ({self.workspace_id})")

    def cleanup_breadcrumbs(self) -> None:
        print("== breadcrumb sweep ==")
        rows, err = self.q(f"SELECT id, name FROM railway.projects.projects WHERE workspace_id = '{self.workspace_id}'")
        if err:
            print(f"  WARN project sweep list failed: {err[:160]}")
            return
        for p in rows or []:
            # the name prefix is the only thing that marks a project as ours
            if not str(p.get("name", "")).startswith(SMOKE_PREFIX):
                continue
            print(f"  sweeping project {p['name']} ({p['id']})")
            _, derr = self.q(f"DELETE FROM railway.projects.projects WHERE id = '{p['id']}'")
            if derr:
                print(f"  WARN project sweep delete failed: {derr[:160]}")

    # -------------------------------------------------------------- read path
    def read_smokes(self) -> None:
        print("== read smokes ==")
        ws = self.workspace_id
        self.step("show services", "SHOW SERVICES IN railway", expect_rows=True, contains="deployments")
        self.step("current user", "SELECT id, name, email, username, is_verified, created_at FROM railway.account.current_user", expect_rows=True)
        self.step("token workspaces (wrapper unwrapped)", "SELECT id, name FROM railway.account.api_token_workspaces", expect_rows=True, contains=ws)
        self.step("api tokens (connection)", "SELECT id, name, display_token, workspace_id FROM railway.account.api_tokens")
        self.step("workspaces (nested list under the current user)", "SELECT id, name, plan, created_at FROM railway.workspaces.workspaces", expect_rows=True, contains=ws)
        self.step("workspace get (WHERE workspace_id)", f"SELECT id, name, plan, has_saml, json_extract(customer, '$.state') AS billing_state FROM railway.workspaces.workspaces WHERE workspace_id = '{ws}'", expect_rows=True, contains=ws)
        self.step("workspace members", f"SELECT id, name, email, role FROM railway.workspaces.workspace_members WHERE workspace_id = '{ws}'", expect_rows=True)
        self.step("projects (connection, workspace_id pushed down)", f"SELECT id, name, created_at, is_public FROM railway.projects.projects WHERE workspace_id = '{ws}'")
        self.step("billing customer (nested object)", f"SELECT id, state, credit_balance, current_usage, is_trialing FROM railway.billing.customers WHERE workspace_id = '{ws}'", expect_rows=True)
        self.step("usage by measurement (enum list literal)", f"SELECT measurement, value, json_extract(tags, '$.project_id') AS project_id FROM railway.billing.usage WHERE measurements = '[CPU_USAGE, MEMORY_USAGE_GB]' AND workspace_id = '{ws}'")
        self.step("estimated usage", f"SELECT measurement, estimated_value, project_id FROM railway.billing.estimated_usage WHERE measurements = '[CPU_USAGE, MEMORY_USAGE_GB]' AND workspace_id = '{ws}'")
        self.step("regions (plain list)", "SELECT name, country, location FROM railway.platform.regions", expect_rows=True)
        self.step("platform status (single object)", "SELECT is_stable, incident, maintenance FROM railway.platform.platform_status", expect_rows=True)
        self.step("template count (scalar as the result column)", "SELECT result FROM railway.templates.template_counts", expect_rows=True)
        self.step("template get (WHERE code)", "SELECT id, code, name, category, is_verified FROM railway.templates.templates WHERE code = 'postgres'", expect_rows=True, contains="postgres")
        self.step("notification rules", f"SELECT id, event_types, project_id FROM railway.observability.notification_rules WHERE workspace_id = '{ws}'")
        self.step("custom domain availability", f"SELECT available, message FROM railway.networking.custom_domain_availability WHERE domain = '{self.name}.example.org'", expect_rows=True)
        _, err = self.q("SELECT id, name FROM railway.projects.projects WHERE id = '00000000-0000-4000-8000-000000000000'")
        self.note("a GraphQL error on a read fails the statement with the API message", bool(err) and "graphql error" in err, err or "no error")

    # ------------------------------------------------------------- write path
    def project_lifecycle(self) -> None:
        name = self.name
        ws = self.workspace_id
        print(f"== project lifecycle ({name}) ==")
        pid = self.returning(
            "project INSERT ... RETURNING",
            f"INSERT INTO railway.projects.projects (name, description, workspace_id, default_environment_name) "
            f"SELECT '{name}', 'stackql provider smoke test - safe to delete', '{ws}', 'production' RETURNING id, name, created_at",
            contains=name,
            # the name carries this run's stamp, so a match is this run's project
            orphans=self.orphans_of(
                f"SELECT id, name FROM railway.projects.projects WHERE workspace_id = '{ws}'",
                lambda r: f"DELETE FROM railway.projects.projects WHERE id = '{r['id']}'",
                match=lambda r: r.get("name") == name),
            retry_wait=PROJECT_CREATE_INTERVAL_S)
        if not pid:
            return
        try:
            self.step("project get (WHERE id)", f"SELECT id, name, description, is_public, pr_deploys, workspace_id FROM railway.projects.projects WHERE id = '{pid}'", expect_rows=True, contains=name)
            self.step("project listed in the workspace", f"SELECT id, name FROM railway.projects.projects WHERE workspace_id = '{ws}'", expect_rows=True, contains=pid)
            self.step("projects by ids (list literal)", f"SELECT id, name FROM railway.projects.projects WHERE ids = '[\"{pid}\"]'", expect_rows=True, contains=pid)
            self.step("project UPDATE ... RETURNING (description, boolean from a SQL string)", f"UPDATE railway.projects.projects SET description = 'updated by stackql', pr_deploys = 'false' WHERE id = '{pid}' RETURNING id, description, pr_deploys", expect_rows=True, contains="updated by stackql")
            # empty for a workspace owned project: access comes through the workspace
            self.step("project members", f"SELECT id, email, role FROM railway.projects.project_members WHERE project_id = '{pid}'")
            self.step("project EXEC (favorite set)", f"EXEC /*+ SHOWRESULTS */ railway.projects.project_favorites.set @project_id = '{pid}', @favorite = 'true'", expect_rows=True, contains="true", idempotent=True)
            self.step("project favorites (scalar list as result rows)", f"SELECT result FROM railway.projects.project_favorites WHERE workspace_id = '{ws}'", expect_rows=True, contains=pid)

            eid = self.environment_lifecycle(pid)
            if eid:
                sid = self.service_lifecycle(pid, eid)
                if sid:
                    self.variable_lifecycle(pid, eid, sid)
                    self.domain_lifecycle(pid, eid, sid)
                    self.volume_lifecycle(pid, eid, sid)
                    self.step("deployments (input object flattened; none - nothing was deployed)", f"SELECT id, status, created_at FROM railway.deployments.deployments WHERE project_id = '{pid}' AND environment_id = '{eid}'")
                    self.step("tcp proxies", f"SELECT id, domain, proxy_port, application_port FROM railway.networking.tcp_proxies WHERE environment_id = '{eid}' AND service_id = '{sid}'")
                    self.step("service DELETE", f"DELETE FROM railway.services.services WHERE id = '{sid}'")
                    self.gone("service gone after DELETE", f"SELECT id FROM railway.services.services WHERE project_id = '{pid}'", sid)
                self.token_lifecycle(pid, eid)
            _, err = self.q("INSERT INTO railway.services.services (project_id, name) SELECT '00000000-0000-4000-8000-000000000000', 'nope' RETURNING id")
            self.note("a GraphQL error on a write fails the statement with the API message", bool(err) and "graphql error" in err, err or "no error")
        finally:
            self.step("project DELETE", f"DELETE FROM railway.projects.projects WHERE id = '{pid}'")
            self.gone("project gone after DELETE", f"SELECT id, name FROM railway.projects.projects WHERE workspace_id = '{ws}'", pid)

    def environment_lifecycle(self, pid: str) -> str:
        print("== environments ==")
        rows = self.step("environments (WHERE project_id)", f"SELECT id, name, is_ephemeral, project_id FROM railway.environments.environments WHERE project_id = '{pid}'", expect_rows=True, contains="production")
        eid = str(rows[0]["id"]) if rows else ""
        if not eid:
            return ""
        self.step("environment get (WHERE id)", f"SELECT id, name, project_id, created_at FROM railway.environments.environments WHERE id = '{eid}'", expect_rows=True, contains=eid)
        eid2 = self.returning(
            "environment INSERT ... RETURNING",
            f"INSERT INTO railway.environments.environments (project_id, name) SELECT '{pid}', 'staging' RETURNING id, name",
            contains="staging",
            orphans=self.orphans_of(
                f"SELECT id, name FROM railway.environments.environments WHERE project_id = '{pid}'",
                lambda r: f"DELETE FROM railway.environments.environments WHERE id = '{r['id']}'",
                match=lambda r: r.get("name") == "staging"))
        if eid2:
            self.step("environment UPDATE ... RETURNING (rename)", f"UPDATE railway.environments.environments SET name = 'staging-b' WHERE id = '{eid2}' RETURNING id, name", expect_rows=True, contains="staging-b")
            self.step("environment staged changes", f"SELECT id, status, environment_id FROM railway.environments.environment_staged_changes WHERE environment_id = '{eid2}'", expect_rows=True)
            self.step("environment DELETE", f"DELETE FROM railway.environments.environments WHERE id = '{eid2}'")
            self.gone("environment gone after DELETE", f"SELECT id FROM railway.environments.environments WHERE project_id = '{pid}'", eid2)
        return eid

    def service_lifecycle(self, pid: str, eid: str) -> str:
        print("== services ==")
        # no source: an empty service cannot deploy, so nothing is billed
        sid = self.returning(
            "service INSERT ... RETURNING (no source)",
            f"INSERT INTO railway.services.services (project_id, name) SELECT '{pid}', 'smoke-svc' RETURNING id, name, project_id",
            contains="smoke-svc",
            orphans=self.orphans_of(
                f"SELECT id, name FROM railway.services.services WHERE project_id = '{pid}'",
                lambda r: f"DELETE FROM railway.services.services WHERE id = '{r['id']}'"))
        if not sid:
            return ""
        self.step("services (nested list, WHERE project_id)", f"SELECT id, name, project_id, created_at FROM railway.services.services WHERE project_id = '{pid}'", expect_rows=True, contains=sid)
        self.step("service get (WHERE id)", f"SELECT id, name, project_id FROM railway.services.services WHERE id = '{sid}'", expect_rows=True, contains=sid)
        self.step("service UPDATE ... RETURNING (name)", f"UPDATE railway.services.services SET name = 'smoke-svc-b' WHERE id = '{sid}' RETURNING id, name", expect_rows=True, contains="smoke-svc-b")
        self.step("service instances (nested list, WHERE environment_id)", f"SELECT id, service_id, service_name, region, num_replicas, restart_policy_type FROM railway.services.service_instances WHERE environment_id = '{eid}'", expect_rows=True, contains=sid)
        self.step("service instance UPDATE (strings and an integer from SQL strings)", f"UPDATE railway.services.service_instances SET start_command = 'echo stackql', restart_policy_max_retries = '3' WHERE service_id = '{sid}' AND environment_id = '{eid}'")
        rows = self.step("service instance get (two keys)", f"SELECT id, start_command, restart_policy_max_retries, json_extract(latest_deployment, '$.status') AS latest_status FROM railway.services.service_instances WHERE service_id = '{sid}' AND environment_id = '{eid}'", expect_rows=True)
        if rows:
            self.note("service instance UPDATE applied", rows[0].get("start_command") == "echo stackql" and str(rows[0].get("restart_policy_max_retries")) == "3", json.dumps(rows, default=str))
            self.note("nothing was deployed", rows[0].get("latest_status") in (None, "", "null"), json.dumps(rows, default=str))
        self.step("service instance limits (scalar JSON as the result column)", f"SELECT result FROM railway.services.service_instance_limits WHERE service_id = '{sid}' AND environment_id = '{eid}'", expect_rows=True)
        return sid

    def variable_lifecycle(self, pid: str, eid: str, sid: str) -> None:
        print("== variables ==")
        where = f"project_id = '{pid}' AND environment_id = '{eid}' AND service_id = '{sid}'"
        # upserts: repeating one after a lost answer cannot create a second variable
        self.step("variable INSERT (upsert, deploys skipped)", f"INSERT INTO railway.variables.variables (project_id, environment_id, service_id, name, value, skip_deploys) SELECT '{pid}', '{eid}', '{sid}', 'STACKQL_SMOKE', 'one', true", idempotent=True)
        self.step("variable INSERT again (upsert semantics)", f"INSERT INTO railway.variables.variables (project_id, environment_id, service_id, name, value, skip_deploys) SELECT '{pid}', '{eid}', '{sid}', 'STACKQL_SMOKE', 'two', true", idempotent=True)
        self.step("variable collection INSERT (map as a JSON object)", f"INSERT INTO railway.variables.variables (project_id, environment_id, service_id, variables, skip_deploys) SELECT '{pid}', '{eid}', '{sid}', '{{\"SMOKE_A\": \"1\", \"SMOKE_B\": \"b\"}}', true", idempotent=True)
        rows = self.step("variables (map unpacked into rows)", f"SELECT name, value FROM railway.variables.variables WHERE {where}", expect_rows=True, contains="SMOKE_B")
        if rows:
            values = {r["name"]: r["value"] for r in rows}
            self.note("upsert replaced the value, collection added two", values.get("STACKQL_SMOKE") == "two" and values.get("SMOKE_A") == "1" and values.get("SMOKE_B") == "b", json.dumps(values)[:200])
        self.step("shared variable INSERT (no service_id)", f"INSERT INTO railway.variables.variables (project_id, environment_id, name, value, skip_deploys) SELECT '{pid}', '{eid}', 'STACKQL_SHARED', 'shared', true", idempotent=True)
        self.step("shared variables", f"SELECT name, value FROM railway.variables.variables WHERE project_id = '{pid}' AND environment_id = '{eid}'", expect_rows=True, contains="STACKQL_SHARED")
        self.step("variable metadata (connection under the environment)", f"SELECT id, name, service_id, is_sealed, created_at FROM railway.variables.environment_variables WHERE environment_id = '{eid}'", expect_rows=True, contains="STACKQL_SMOKE")
        self.step("variable DELETE (composite key)", f"DELETE FROM railway.variables.variables WHERE {where} AND name = 'SMOKE_A'")
        self.gone("variable gone after DELETE", f"SELECT name FROM railway.variables.variables WHERE {where}", "SMOKE_A")

    def domain_lifecycle(self, pid: str, eid: str, sid: str) -> None:
        print("== domains ==")
        where = f"project_id = '{pid}' AND environment_id = '{eid}' AND service_id = '{sid}'"
        did = self.returning(
            "service domain INSERT ... RETURNING",
            f"INSERT INTO railway.networking.service_domains (environment_id, service_id) SELECT '{eid}', '{sid}' RETURNING id, domain, suffix",
            contains="railway.app",
            orphans=self.orphans_of(
                f"SELECT id, domain FROM railway.networking.service_domains WHERE {where}",
                lambda r: f"DELETE FROM railway.networking.service_domains WHERE id = '{r['id']}'"))
        if did:
            self.step("service domains (list inside a wrapper object)", f"SELECT id, domain, target_port FROM railway.networking.service_domains WHERE {where}", expect_rows=True, contains=did)
            self.step("all domains (single object, lists as JSON columns)", f"SELECT json_array_length(service_domains) AS service_domain_count, json_array_length(custom_domains) AS custom_domain_count FROM railway.networking.domains WHERE {where}", expect_rows=True)
            self.step("service domain DELETE", f"DELETE FROM railway.networking.service_domains WHERE id = '{did}'")
            self.gone("service domain gone after DELETE", f"SELECT id FROM railway.networking.service_domains WHERE {where}", did)
        self.step("custom domains (none created)", f"SELECT id, domain FROM railway.networking.custom_domains WHERE {where}")

    def volume_lifecycle(self, pid: str, eid: str, sid: str) -> None:
        print("== volumes ==")
        vid = self.returning(
            "volume INSERT ... RETURNING (attached, never mounted by a deployment)",
            f"INSERT INTO railway.storage.volumes (project_id, environment_id, service_id, mount_path) SELECT '{pid}', '{eid}', '{sid}', '/data' RETURNING id, name, project_id",
            orphans=self.orphans_of(
                f"SELECT id, name FROM railway.storage.volumes WHERE project_id = '{pid}'",
                lambda r: f"DELETE FROM railway.storage.volumes WHERE volume_id = '{r['id']}'"))
        if not vid:
            return
        try:
            self.step("volumes (nested list, WHERE project_id)", f"SELECT id, name, project_id, created_at FROM railway.storage.volumes WHERE project_id = '{pid}'", expect_rows=True, contains=vid)
            self.step("volume UPDATE ... RETURNING (name)", f"UPDATE railway.storage.volumes SET name = 'smoke-volume' WHERE volume_id = '{vid}' RETURNING id, name", expect_rows=True, contains="smoke-volume")
            # the instance is provisioned asynchronously, a few seconds after the volume
            sql = f"SELECT id, volume_id, mount_path, size_mb, state, service_id FROM railway.storage.volume_instances WHERE environment_id = '{eid}'"
            for _ in range(5):
                probe, err = self.q(sql)
                if err or probe:
                    break
                time.sleep(3)
            rows = self.step("volume instances (nested list, WHERE environment_id)", sql, expect_rows=True, contains=vid)
            if rows:
                viid = rows[0]["id"]
                self.step("volume instance get (WHERE id)", f"SELECT id, mount_path, current_size_mb, json_extract(volume, '$.name') AS volume_name FROM railway.storage.volume_instances WHERE id = '{viid}'", expect_rows=True, contains="/data")
                self.step("volume instance backups (none)", f"SELECT id, name, created_at FROM railway.storage.volume_instance_backups WHERE volume_instance_id = '{viid}'")
        finally:
            self.step("volume DELETE", f"DELETE FROM railway.storage.volumes WHERE volume_id = '{vid}'")
            # a volume delete is queued (hard delete within 48 hours): the
            # volume itself stays listed, and its instance either leaves the
            # environment or is marked pending deletion
            active: list = []
            err = None
            for _ in range(5):
                rows, err = self.q(f"SELECT id, volume_id, is_pending_deletion, deleted_at FROM railway.storage.volume_instances WHERE environment_id = '{eid}'")
                active = [r for r in rows or [] if r.get("volume_id") == vid and str(r.get("is_pending_deletion")).lower() != "true"]
                if err or not active:
                    break
                time.sleep(3)
            self.note("no active volume instance after DELETE", not err and not active, err or json.dumps(active, default=str))

    def token_lifecycle(self, pid: str, eid: str) -> None:
        print("== project tokens ==")
        token = self.returning(
            "project token INSERT ... RETURNING result (the token, shown once)",
            f"INSERT INTO railway.projects.project_tokens (project_id, environment_id, name) SELECT '{pid}', '{eid}', '{self.name}' RETURNING result",
            key="result",
            orphans=self.orphans_of(
                f"SELECT id, name FROM railway.projects.project_tokens WHERE project_id = '{pid}'",
                lambda r: f"DELETE FROM railway.projects.project_tokens WHERE id = '{r['id']}'",
                match=lambda r: r.get("name") == self.name))
        rows = self.step("project tokens (connection)", f"SELECT id, name, display_token, environment_id FROM railway.projects.project_tokens WHERE project_id = '{pid}'", expect_rows=True, contains=self.name)
        if token:
            self.note("the token is returned by the create only", bool(rows) and token not in json.dumps(rows, default=str), "token listed in clear")
        for r in rows or []:
            if r.get("name") == self.name:
                self.step("project token DELETE", f"DELETE FROM railway.projects.project_tokens WHERE id = '{r['id']}'")
                self.gone("project token gone after DELETE", f"SELECT id FROM railway.projects.project_tokens WHERE project_id = '{pid}'", str(r["id"]))

    # ---------------------------------------------------------------- summary
    def summary(self) -> int:
        print("\n== summary ==")
        counts = {"PASS": 0, "FAIL": 0}
        for name, status, note in self.results:
            counts[status] = counts.get(status, 0) + 1
            if status != "PASS":
                print(f"  {status:5s} {name}  [{note[:240]}]")
        remaining, _ = self.api_budget()
        if self.transport_retries:
            print(f"  {self.transport_retries} statement(s) were repeated after a request that got no answer")
        print(f"  {counts['PASS']} passed, {counts['FAIL']} failed; {self.requests} statements, paced at {INTER_REQUEST_DELAY_S}s "
              f"(registry: {'public' if self.args.live else 'local'}); API requests left this hour: {remaining}; "
              + ("cost: nothing (reads only)" if self.args.read_only
                 else "cost: nothing deployed, one empty volume for about a minute (under $0.01)"))
        return 1 if counts["FAIL"] else 0


def main() -> int:
    ap = argparse.ArgumentParser(description="railway provider smoke test")
    ap.add_argument("--live", action="store_true", help="run against the published provider in the stackql registry (default: the local provider-dev/openapi file registry)")
    ap.add_argument("--cleanup-only", action="store_true", help="sweep stackql-smoke-* projects and exit")
    ap.add_argument("--read-only", action="store_true", help="read smokes only")
    ap.add_argument("--verbose", action="store_true", help="print the raw stackql output of a statement that returned no rows")
    args = ap.parse_args()

    smoke = Smoke(args)
    print(f"railway smoke test  registry={'public' if args.live else 'local'}  name={smoke.name}  stackql={smoke.sq.version}")
    smoke.require_budget(CALLS_CLEANUP if args.cleanup_only else CALLS_READ_ONLY if args.read_only else CALLS_FULL_RUN)
    try:
        smoke.discover_workspace()
        if not args.read_only:
            smoke.cleanup_breadcrumbs()
        if args.cleanup_only:
            return 0
        smoke.read_smokes()
        if not args.read_only:
            smoke.project_lifecycle()
            smoke.cleanup_breadcrumbs()
    except RateLimited as exc:
        print(f"\nRATE LIMITED - run stopped after {smoke.requests} statements: {exc}")
        print("a project created by this run may still exist; run `make smoke-cleanup` once the window has moved on")
        smoke.summary()
        return 2
    return smoke.summary()


if __name__ == "__main__":
    sys.exit(main())
