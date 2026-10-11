# Verifying a prototype's own behavior in a stubbed DOM

The point: run the prototype's **own** `<script>` (not a copy) under Node with a fake
DOM, expose its state + pure functions, and assert on the real logic. This catches
bugs the browser hides and turns "looks right" into a passing run you can show.

## How it works

1. Extract the `<script>` block from the HTML file.
2. Append one line that hangs the bindings you want to test on `globalThis` (in a
   `vm` context, top-level `const`s do **not** become sandbox properties, so you must
   export them explicitly).
3. Run it in a `vm` context with a minimal fake `document`.
4. Assert. Re-run after every change as a regression.

## Step 1 — extract the script and export its bindings

```bash
node -e '
const fs=require("fs");
const h=fs.readFileSync("prototypes/MY-PROTOTYPE.html","utf8");
const m=h.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);   // the last script block
if(!m){console.error("no script block found");process.exit(1);}
// export the state object + the pure functions / actions you want to drive in tests:
let s=m[1]+"\nglobalThis.__x={ S, renderAll, /* e.g. */ filterPredicate, buildDerived, doAction };\n";
fs.writeFileSync("/tmp/proto.js", s);
'
node --check /tmp/proto.js && echo "SYNTAX OK"
```

## Step 2 — the fake DOM + runner (the reusable harness)

Save as `/tmp/proto_test.js`. The `el()` stub implements only what render code
touches; extend it if the prototype calls something it doesn't have. `querySelector('.body')`
returns a persistent child so per-row sub-element writes don't crash.

```javascript
const fs=require("fs"), vm=require("vm");
const src=fs.readFileSync("/tmp/proto.js","utf8");

function el(){
  const e={_body:null,
    classList:{_s:new Set(),add(x){this._s.add(x)},remove(...x){x.forEach(v=>this._s.delete(v))},
      toggle(x,f){const on=f===undefined?!this._s.has(x):f; on?this._s.add(x):this._s.delete(x); return on},
      contains(x){return this._s.has(x)}},
    style:{cssText:'',setProperty(){},removeProperty(){}}, dataset:{}, hidden:false, onclick:null,
    appendChild(){}, remove(){}, setAttribute(){}, getAttribute(){return null}, scrollIntoView(){}, focus(){},
    set innerHTML(v){this._html=v}, get innerHTML(){return this._html||''},
    set textContent(v){this._text=v}, get textContent(){return this._text||''},
    querySelector(sel){ if(sel==='.body'){ return this._body||(this._body=el()); } return null; },
    querySelectorAll(){return []}};
  return e;
}
const cache={};
const document={ getElementById(id){return cache[id]||(cache[id]=el())}, createElement(){return el()},
  querySelectorAll(){return []}, addEventListener(){}, head:el() };
const ctx={document, window:{}, navigator:{}, console, Math};
vm.createContext(ctx);
vm.runInContext(src, ctx);
const x=ctx.__x;

let fails=0;
function check(label, got, want){
  const ok=JSON.stringify(got)===JSON.stringify(want);
  console.log((ok?'PASS':'FAIL')+' · '+label+' → '+JSON.stringify(got)+(ok?'':'  EXPECTED '+JSON.stringify(want)));
  if(!ok) fails++;
}

/* ---- assertions: assert on MEMBERSHIP and STATE, not just counts ---- */
// example shapes — replace with the prototype's real surface:
// x.doAction('foo'); check('filter to foo keeps the right items', somethingFrom(x), [...]);
// check('stale filter is inert, not destructive', x.filterPredicate(staleArg), true);
// x.enterMode('bar'); check('mode wiring lands in right state', x.S.level, 'bar');

console.log(fails ? '\n=== '+fails+' FAIL ===' : '\n=== ALL CHECKS PASS ===');
process.exitCode = fails ? 1 : 0;
```

```bash
node /tmp/proto_test.js
```

## What to assert (the bugs worth catching)

- **Membership, not just counts** — `["A","C","E"]`, not `length===3`. Counts pass
  while the wrong items survive.
- **Inert-not-destructive** — a filter/lookup that doesn't resolve must *narrow
  nothing*, never empty the set. (This is a classic real bug: `if(!resolved) return
  false` drops everything.)
- **Derived data** — generated ranges/labels are contiguous, exclusions are excluded,
  alternate units (pages vs. folios) are right.
- **Mode transitions** — entering/leaving a focused mode lands in the right state and
  restores cleanly; switching context re-derives dependent state.
- **Regression** — keep the first cases and re-run the whole file after each edit.

## HTML-comment hygiene check (Phase 7)

Before/after embedding the header brief, confirm the comment is well-formed — it must
contain no internal doubled hyphen and close exactly once.

```bash
node -e '
const fs=require("fs");
const h=fs.readFileSync("prototypes/MY-PROTOTYPE.html","utf8");
const start=h.indexOf("<!--"), end=h.indexOf("-->");
const inner=h.slice(start+4,end);
console.log("internal double-hyphens (must be 0):", (inner.match(/--/g)||[]).length);
console.log("script still extracts:", /<script>[\s\S]*?<\/script>\s*<\/body>/.test(h));
'
```
