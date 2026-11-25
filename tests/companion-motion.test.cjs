const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function motionHarness() {
  const source = readFileSync(
    path.join(__dirname, "../components/portfolio/companion.tsx"),
    "utf8",
  );
  const code = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const states = [],
    refs = [],
    events = new Map(),
    timers = new Map();
  const visit = { state: { guideHidden: false, guidePaused: false } };
  let reduced = false,
    inView = true,
    stateIndex = 0,
    refIndex = 0,
    effects = [],
    cleanups = [];
  const react = {
    useState(initial) {
      const index = stateIndex++;
      if (!(index in states)) states[index] = initial;
      return [
        states[index],
        (value) => {
          states[index] = value;
        },
      ];
    },
    useRef(initial) {
      const index = refIndex++;
      if (!(index in refs))
        refs[index] = {
          current:
            initial === null
              ? { getBoundingClientRect: () => ({ top: 100, bottom: 200 }) }
              : initial,
        };
      return refs[index];
    },
    useEffect(callback) {
      effects.push(callback);
    },
  };
  const target = {
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: (name) => events.delete(name),
  };
  const doc = { ...target, hidden: false };
  const requireMock = (name) => {
    if (name === "react") return react;
    if (name === "react/jsx-runtime")
      return { jsx: () => null, jsxs: () => null };
    if (name === "framer-motion")
      return {
        motion: { div: "div" },
        useReducedMotion: () => reduced,
        useInView: () => inView,
      };
    if (name === "./visit-provider") return { useVisit: () => visit };
    if (name === "next/image" || name === "lucide-react") return {};
    throw new Error(`Unexpected import: ${name}`);
  };
  const module = { exports: {} };
  new Function(
    "module",
    "exports",
    "require",
    "window",
    "document",
    "innerHeight",
    "scrollY",
    "setTimeout",
    "clearTimeout",
    code,
  )(
    module,
    module.exports,
    requireMock,
    target,
    doc,
    800,
    400,
    (fn, delay) => {
      timers.set(fn, delay);
      return fn;
    },
    (fn) => timers.delete(fn),
  );
  return {
    visit,
    states,
    events,
    timers,
    doc,
    set reduced(value) {
      reduced = value;
    },
    set inView(value) {
      inView = value;
    },
    render(props = { arrival: false }) {
      stateIndex = 0;
      refIndex = 0;
      effects = [];
      module.exports.Companion(props);
      cleanups.forEach((fn) => fn?.());
      cleanups = effects.map((fn) => fn());
    },
    finish(delay) {
      for (const [fn, time] of [...timers])
        if (time === delay) {
          timers.delete(fn);
          fn();
        }
    },
    cleanup() {
      cleanups.forEach((fn) => fn?.());
    },
  };
}

test("hide, reduced motion, header play and leaving viewport stop walking without restarting on resume", () => {
  for (const condition of ["hide", "reduced", "play", "offscreen"]) {
    const h = motionHarness();
    h.render();
    h.events.get("scroll")();
    assert.equal(h.states[0], "walk");
    if (condition === "hide") h.visit.state.guideHidden = true;
    if (condition === "reduced") h.reduced = true;
    if (condition === "play") h.visit.state.guidePaused = true;
    if (condition === "offscreen") h.inView = false;
    h.render();
    assert.equal(h.states[0], "idle", condition);
    assert.equal(h.timers.size, 0);
    h.visit.state.guideHidden = false;
    h.visit.state.guidePaused = false;
    h.reduced = false;
    h.inView = true;
    h.render();
    assert.equal(h.states[0], "idle", `${condition}: resume stays still`);
    h.cleanup();
  }
});

test("arrival waves once, selection points once, and scroll returns to the resting pose", () => {
  const h = motionHarness();
  h.render({ arrival: true });
  assert.equal(h.states[0], "wave");
  h.finish(1300);
  assert.equal(h.states[0], "idle");
  h.render({ arrival: true });
  assert.equal(h.states[0], "idle");
  h.render({ arrival: true, selection: 0 });
  assert.equal(h.states[0], "walk");
  h.finish(380);
  assert.equal(h.states[0], "point");
  h.finish(1400);
  assert.equal(h.states[0], "idle");
  h.render({ arrival: false, rest: "sit" });
  h.events.get("scroll")();
  assert.equal(h.states[0], "walk");
  h.finish(260);
  assert.equal(h.states[0], "sit");
  h.cleanup();
});

test("hidden documents do not start another walk", () => {
  const h = motionHarness();
  h.render();
  h.doc.hidden = true;
  h.events.get("visibilitychange")();
  h.render();
  assert.equal(h.states[0], "idle");
  assert.equal(h.events.has("scroll"), false);
  h.cleanup();
});

test("workshop keeps its tools during initial selection, repeated actions and scrolling", () => {
  const h = motionHarness();
  h.render({ rest: "workshop", arrival: false, selection: 0 });
  assert.equal(h.states[0], "workshop");
  h.finish(380);
  assert.equal(h.states[0], "workshop");
  h.finish(1400);
  h.render({ rest: "workshop", arrival: false, selection: 1 });
  assert.equal(h.states[0], "workshop");
  h.finish(380);
  assert.equal(h.states[0], "workshop");
  h.events.get("scroll")();
  assert.equal(h.states[0], "workshop");
  h.finish(260);
  assert.equal(h.states[0], "workshop");
  h.cleanup();
});
