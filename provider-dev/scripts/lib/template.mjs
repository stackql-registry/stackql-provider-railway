// Minimal renderer for the Go text/template subset the generator emits in
// GraphQL query templates: {{ .name }}, {{ if .name }}, {{ if or .a .b }}
// and {{ end }}, nested. Used to validate generated queries against the
// pinned schema (generate_provider.mjs) and to run them against the live
// API (validate_live.mjs). The engine renders the same templates with Go's
// text/template; an empty string and a missing key are both falsy there.

export function renderTemplate(tpl, values) {
  const tokens = tpl.split(/(\{\{.*?\}\})/g);
  const stack = [true];
  let out = '';
  for (const tok of tokens) {
    const m = tok.match(/^\{\{\s*(.*?)\s*\}\}$/);
    if (!m) {
      if (stack.every(Boolean)) out += tok;
      continue;
    }
    const action = m[1];
    if (action === 'end') {
      if (stack.length === 1) throw new Error(`unbalanced {{ end }} in template: ${tpl}`);
      stack.pop();
    } else if (action.startsWith('if ')) {
      const names = action.replace(/^if\s+(or\s+)?/, '').split(/\s+/).map((n) => n.replace(/^\./, ''));
      stack.push(names.some((n) => values[n] !== undefined && values[n] !== ''));
    } else if (action.startsWith('.')) {
      const name = action.slice(1);
      if (stack.every(Boolean)) {
        if (values[name] === undefined) throw new Error(`template references '${name}' unconditionally but no value was supplied: ${tpl}`);
        out += values[name];
      }
    } else {
      throw new Error(`unsupported template action '${action}'`);
    }
  }
  if (stack.length !== 1) throw new Error(`unbalanced {{ if }} in template: ${tpl}`);
  return out;
}
