const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const postcss = require("postcss");
const localByDefault = require("next/dist/compiled/postcss-modules-local-by-default");

const design = path.join(__dirname, "../app/design");
const css = postcss.parse(readFileSync(path.join(design, "journal.module.css"), "utf8"));

test("journal selectors compile as a pure Next.js CSS module", async () => {
  const compile = (source) => postcss([localByDefault({ mode: "pure" })])
    .process(source, { from: undefined });
  await assert.rejects(
    compile(":global(html:has(.journal)) { background: white; }"),
    /not pure/,
  );
  await assert.doesNotReject(compile(css.toString()));
});

test("journal motion only runs when the visitor allows it", () => {
  let motionDeclarations = 0;
  css.walkDecls(/^(animation|transition)(-|$)/, (declaration) => {
    if (/^(none|0s?)$/.test(declaration.value.trim())) return;
    motionDeclarations++;
    let parent = declaration.parent;
    while (parent && !(parent.type === "atrule" && parent.name === "media" &&
      /prefers-reduced-motion\s*:\s*no-preference/.test(parent.params))) {
      parent = parent.parent;
    }
    assert.ok(parent, `${declaration.prop} must respect reduced motion`);
  });
  assert.ok(motionDeclarations > 0, "the design includes its intended motion");
});

test("portfolio keeps natural scrolling and server rendered content", () => {
  css.walkDecls(/^scroll-snap/, (declaration) => {
    assert.equal(declaration.value, "none", "chapters must not capture scrolling");
  });
  const template = readFileSync(path.join(design, "template.tsx"), "utf8");
  assert.match(template, /styles\.pageTransition/);
  assert.match(template, /\{children\}/);
  assert.doesNotMatch(template, /use client|useEffect|useState|aria-hidden|visibility:\s*hidden/);
});

test("compact portfolio uses natural flow without sticky scroll runway", () => {
  css.walkDecls("position", declaration => assert.notEqual(declaration.value, "sticky"));
  css.walkDecls(/^(min-)?height$/, declaration => {
    for (const match of declaration.value.matchAll(/([\d.]+)(?:s|d|l)?vh/g)) {
      assert.ok(Number(match[1]) <= 100, "no extra viewport runway in the compact design");
    }
  });
});

test("Stella loader follows real loading and cleans up its listener", () => {
  const ts = require("typescript");
  const source = readFileSync(path.join(design, "journal-loader.tsx"), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
  }}).outputText;
  for (const readyState of ["loading", "complete"]) {
    const states = [];
    const events = new EventTarget();
    let cleanup;
    const module = { exports: {} };
    const react = { useRef: () => ({ current: null }), useState: () => [false, value => states.push(value)],
      useEffect: effect => { cleanup = effect(); } };
    const imports = name => name === "react" ? react : {};
    new Function("require", "exports", "module", "document", "window", code)(
      imports, module.exports, module, { readyState }, events);
    module.exports.JournalLoader();
    if (readyState === "complete") { assert.deepEqual(states, []); continue; }
    assert.deepEqual(states, [true]);
    events.dispatchEvent(new Event("load"));
    assert.deepEqual(states, [true, false]);
    cleanup();
    events.dispatchEvent(new Event("load"));
    assert.deepEqual(states, [true, false]);
  }
});

test("card arrows scroll their own row in either direction", () => {
  const ts = require("typescript");
  const code = ts.transpileModule(readFileSync(path.join(design, "scroll-row.tsx"), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const moves = [];
  const ref = { current: { clientWidth: 200, scrollBy: options => moves.push(options) } };
  const jsx = (type, props) => ({ type, props });
  const imports = name => name === "react" ? { useRef: () => ref } :
    name === "react/jsx-runtime" ? { jsx, jsxs: jsx, Fragment: "fragment" } : { default: {} };
  const module = { exports: {} };
  new Function("require", "exports", "module", code)(imports, module.exports, module);
  const output = module.exports.ScrollRow({ children: "cards", className: "row", label: "Projects" });
  const buttons = output.props.children[1].props.children;
  buttons[0].props.onClick();
  buttons[2].props.onClick();
  assert.deepEqual(moves, [{ left: -170, behavior: "auto" }, { left: 170, behavior: "auto" }]);
  ref.current = null;
  assert.doesNotThrow(() => buttons[2].props.onClick());
});
