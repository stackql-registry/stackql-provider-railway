# StackQL railway (Railway public GraphQL API) provider build pipeline.
#
# Every step is deterministic and re-runnable; manual mapping decisions live
# in provider-dev/config (operation rules, selection policy, service split)
# and provider-dev/scripts (the mechanics), never in hand-edited artifacts.
# `make all` runs the full chain: verify the schema pin -> inventory ->
# generate (with the mapping stability gate against the committed
# all_services.csv) -> offline + integration + meta-route tests -> docs ->
# website build. It needs no credentials and never touches an account:
# introspection is served unauthenticated. `make smoke` and
# `make validate-live` (live, need a token) are separate.
#
# Requirements: Node >= 20, GNU make, a stackql binary ($STACKQL, ./stackql
# or on PATH), Python 3 (a venv with pystackql is created on demand for the
# smoke suite), yarn for the website. Runs under Linux / WSL / macOS.
#
# Live credentials (never committed - .env is gitignored; the live targets
# source it if present), see .env.example:
#   RAILWAY_TOKEN   account or workspace token, sent as a bearer token
#                   (the variable the Terraform provider reads)

SHELL := bash
.DEFAULT_GOAL := help

PROVIDER := railway
SOURCE_PROJECT ?= https://github.com/stackql-registry/stackql-provider-$(PROVIDER)
SERVICES_DIR := provider-dev/openapi/src/$(PROVIDER)
VENV := .venv
PY := $(VENV)/bin/python
ENV_FILE := .env

.PHONY: help deps fetch-schema refresh-schema inventory generate generate-accept check-mappings build validate-live \
        test-offline test-integration test-meta test venv smoke smoke-live smoke-read-only smoke-cleanup \
        docs website website-start publish-registry clean all

help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

deps: ## install node dependencies (latest @stackql/provider-utils + @stackql/pgwire-lite per package.json ranges)
	npm install

# ---------------------------------------------------------------- pipeline

fetch-schema: ## run the introspection query and verify the schema against the pin (fails on drift)
	npm run fetch-schema

refresh-schema: ## run the introspection query and ACCEPT the upstream change (rewrites the pin - review the generated diff)
	npm run fetch-schema -- --update

inventory: ## walk the pinned schema into provider-dev/config/operation_inventory.csv
	npm run build-inventory

generate: ## generate the provider from the pinned schema (fails if a committed operation mapping changed - see generate-accept)
	npm run generate-provider

generate-accept: ## generate and ACCEPT operation mapping changes (review the all_services.csv diff - these break existing queries)
	npm run generate-provider -- --accept-mapping-changes

check-mappings: ## compare all_services.csv with the committed one (ALLOW_BREAKING_MAPPING_CHANGES=1 accepts)
	npm run check-mappings

build: fetch-schema inventory generate ## full schema -> provider pipeline

# smoke and validation targets source .env when present so a developer
# checkout works without exporting anything; CI sets variables from secrets.
with_env = set -a; [ -f $(ENV_FILE) ] && source <(tr -d '\r' < $(ENV_FILE)); set +a;

# Live evidence for selection_policy.json: a field the caller cannot read
# fails every statement that selects it. --with-fixture creates an empty
# stackql-validate-<stamp> project for the project scoped reads and deletes
# it afterwards (free: nothing is deployed).
validate-live: ## run every generated SELECT query against the live API and report failing fields (needs RAILWAY_TOKEN)
	@$(with_env) node provider-dev/scripts/validate_live.mjs --with-fixture

# ------------------------------------------------------------------- tests

test-offline: ## offline validation of the generated documents and SHOW / DESCRIBE, plus the mapping stability check's own tests
	node tests/offline_validation.mjs
	node tests/mapping_stability_test.mjs

test-integration: ## row-level integration tests against the mock Railway GraphQL server, every documentation example, and the reserved word sweep
	node tests/integration/run_integration_tests.mjs
	node tests/integration/run_docs_examples.mjs
	node tests/integration/run_reserved_names.mjs

test-meta: ## meta-route suite against a local stackql server (walks every service/resource/method)
	npm run start-server
	npm run test-meta-routes -- $(PROVIDER) || (npm run stop-server; exit 1)
	npm run stop-server

test: test-offline test-integration test-meta ## all non-live test layers

$(VENV)/bin/activate:
	python3 -m venv $(VENV)
	$(VENV)/bin/pip install --quiet --upgrade pip pystackql

venv: $(VENV)/bin/activate ## create the python venv with pystackql for the smoke suite

smoke: venv ## live smoke suite with the locally generated provider - reads + the free project lifecycle (needs RAILWAY_TOKEN)
	@$(with_env) $(PY) tests/smoke_test.py

smoke-live: venv ## live smoke suite against the PUBLISHED provider in the stackql registry (post-publish verification)
	@$(with_env) $(PY) tests/smoke_test.py --live

smoke-read-only: venv ## live read smokes only, no writes
	@$(with_env) $(PY) tests/smoke_test.py --read-only

smoke-cleanup: venv ## sweep stackql-smoke-* projects and exit
	@$(with_env) $(PY) tests/smoke_test.py --cleanup-only

# -------------------------------------------------------------------- docs

# No --snake-case-aliases: the generated queries alias every field to
# snake_case, so the docs render the columns exactly as the engine does.
docs: ## generate the website docs, then sanitize for MDX v3
	npm run generate-docs -- \
	  --provider-name $(PROVIDER) \
	  --provider-dir ./$(SERVICES_DIR)/v00.00.00000 \
	  --output-dir ./website \
	  --provider-data-dir ./provider-dev/docgen/provider-data \
	  --source-project $(SOURCE_PROJECT)
	node website/scripts/sanitize-docs.mjs

website: ## build the docusaurus microsite (vendors shared config first)
	cd website && yarn install && yarn build

website-start: ## run the docusaurus dev server
	cd website && yarn install && yarn start

# Stage the generated provider into a local checkout of stackql-provider-registry
# (providers/src/railway). Commit and raise the PR against `dev` by hand after
# `make smoke` passes; nothing here touches a remote.
REGISTRY_DIR ?= ../../../../stackql/core/stackql-provider-registry
publish-registry: ## copy the generated provider into $(REGISTRY_DIR)/providers/src/railway (local checkout; no git operations)
	@test -d "$(REGISTRY_DIR)/providers/src" || { echo "REGISTRY_DIR=$(REGISTRY_DIR) is not a stackql-provider-registry checkout"; exit 1; }
	rm -rf "$(REGISTRY_DIR)/providers/src/$(PROVIDER)"
	cp -r $(SERVICES_DIR) "$(REGISTRY_DIR)/providers/src/$(PROVIDER)"
	@echo "staged $(SERVICES_DIR) -> $(REGISTRY_DIR)/providers/src/$(PROVIDER); review with 'git -C $(REGISTRY_DIR) status'"

clean: ## remove regenerable artifacts (provider output, generated docs, website build)
	rm -rf provider-dev/openapi/* website/build website/.docusaurus website/docs/services

all: deps build test docs website ## everything that needs no token: deps, pipeline, tests, docs, site build
