const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Interaction ownership only; layout, touch and focus trapping are browser checks.
function harness() {
  const frames = new Map(), modules = new Map(), focused = [], navigations = [];
  let frame, tree, nextDetail = null, effects = [], mounted = new Map(), formMounts = 0;
  const text = value => value == null || typeof value === 'boolean' ? '' : Array.isArray(value) ? value.map(text).join('') : typeof value === 'object' ? text(value.props?.children) : String(value);
  const nodes = (value, includeHidden = false) => !value ? [] : Array.isArray(value) ? value.flatMap(item => nodes(item, includeHidden)) : typeof value === 'object' && (includeHidden || !value.props?.hidden) ? [value, ...nodes(value.props?.children, includeHidden)] : [];
  const react = {
    useState(initial) { const current = frame, i = current.stateIndex++; if (!(i in current.states)) current.states[i] = initial; return [current.states[i], value => { current.states[i] = typeof value === 'function' ? value(current.states[i]) : value; }]; },
    useRef(initial) { const i = frame.refIndex++; if (!(i in frame.refs)) frame.refs[i] = { current: initial }; return frame.refs[i]; },
    useEffect(callback, deps) { const current = frame, i = current.effectIndex++, previous = current.dependencies[i]; if (!previous || deps.some((value, index) => !Object.is(value, previous[index]))) effects.push(callback); current.dependencies[i] = deps; },
  };
  const create = (type, attributes, key) => ({ type, props: attributes || {}, key });
  const load = relative => {
    if (modules.has(relative)) return modules.get(relative).exports;
    const module = { exports: {} }; modules.set(relative, module);
    const source = readFileSync(path.join(__dirname, '..', relative), 'utf8');
    const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
    new Function('module', 'exports', 'require', code)(module, module.exports, name => {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx: create, jsxs: create };
      if (name === 'next/image') return { default: 'image' };
      if (name === 'embla-carousel-react') return { default: () => [() => {}, undefined] };
      if (name === 'lucide-react') return new Proxy({}, { get: (_, key) => key });
      if (name === '@/lib/portfolio-projects') return load('lib/portfolio-projects.ts');
      if (name === './destination-data') return load('components/living-map/destination-data.ts');
      if (name === '@/components/portfolio/contact-form') return { ContactForm: 'contact-form' };
      if (name.endsWith('.module.css')) return { default: new Proxy({}, { get: (_, key) => key }) };
      throw new Error(`Unexpected import ${name}`);
    });
    return module.exports;
  };
  const { DestinationContent } = load('components/living-map/destinations.tsx');
  function expand(value, key = 'root') {
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map((child, index) => expand(child, `${key}/${child?.key ?? index}`));
    if (typeof value.type === 'function') {
      const id = `${key}/${value.type.name}/${value.key ?? ''}`;
      if (!frames.has(id)) frames.set(id, { states: [], refs: [], dependencies: [] });
      const previous = frame; frame = frames.get(id); frame.stateIndex = frame.refIndex = frame.effectIndex = 0;
      const result = value.type(value.props); frame = previous;
      return expand(result, id);
    }
    return { ...value, props: { ...value.props, children: expand(value.props.children, `${key}/children`) }, path: key };
  }
  function render(place, detail = null, active = true) {
    effects = [];
    tree = expand(create(DestinationContent, { place, detail, active, onDetailChange: value => { nextDetail = value; }, onNavigate: value => navigations.push(value) }));
    const nextMounted = new Map();
    for (const element of nodes(tree, true)) {
      const identity = `${element.path}/${element.type}`;
      const node = mounted.get(identity) ?? { focus: () => focused.push(element.props['aria-label'] || text(element)), scrollTop: 0 };
      if (element.type === 'contact-form' && !mounted.has(identity)) formMounts++;
      node.querySelector = selector => {
        const child = nodes(element, true).find(item => selector === '[data-detail-heading]' && 'data-detail-heading' in item.props);
        return child ? { focus: () => focused.push(text(child)) } : null;
      };
      nextMounted.set(identity, node);
      const ref = element.props.ref;
      if (typeof ref === 'function') ref(node); else if (ref) ref.current = node;
    }
    mounted = nextMounted;
    effects.forEach(effect => effect());
  }
  return {
    focused, navigations, render,
    get nextDetail() { return nextDetail; },
    get formMounts() { return formMounts; },
    click(label) { const button = nodes(tree).find(node => node.type === 'button' && (node.props['aria-label'] === label || text(node).includes(label))); assert.ok(button, `Missing button ${label}`); button.props.onClick(); },
    text: () => text(nodes(tree).filter(node => node.type === 'h3' || node.type === 'h4' || node.type === 'article' || node.type === 'ol' || node.type === 'p')),
    has: predicate => nodes(tree, true).some(predicate),
  };
}

test('crystal ball opens the personal view and Back restores its scene action', () => {
  const h = harness(); h.render('home'); h.click('Discover more'); assert.equal(h.nextDetail, 'personal');
  h.render('home', 'personal'); assert.equal(h.focused.at(-1), 'Beyond the work');
  assert.match(h.text(), /How I think|How things work/);
  h.click('Back to scene'); assert.equal(h.nextDetail, null);
  h.render('home'); assert.match(h.focused.at(-1), /Discover more/);
});

test('project folders open stories and Back restores the selected folder', () => {
  const h = harness(); h.render('workshop'); h.click('AtlasPay'); assert.equal(h.nextDetail, 'atlaspay');
  h.render('workshop', 'atlaspay'); assert.equal(h.focused.at(-1), 'AtlasPay');
  h.click('Decisions'); h.render('workshop', 'atlaspay'); assert.match(h.text(), /Engineering decisions/);
  h.click('Evidence'); h.render('workshop', 'atlaspay'); assert.match(h.text(), /Evidence and limits/);
  h.render('workshop'); assert.match(h.focused.at(-1), /AtlasPay/);
});

test('toolbox detail returns focus to its single registered scene action', () => {
  const h = harness(); h.render('workshop'); h.click('Toolbox'); assert.equal(h.nextDetail, 'toolkit');
  h.render('workshop', 'toolkit'); assert.equal(h.focused.at(-1), 'Technical toolkit');
  h.click('Back to scene'); assert.equal(h.nextDetail, null);
  h.render('workshop'); assert.match(h.focused.at(-1), /Toolbox/);
});

test('journal, notebook and letter scene actions delegate detail navigation', () => {
  const h = harness();
  for (const [place, label, detail] of [['journey', 'Open the journal', 'journal'], ['now', 'Open notebook', 'notebook'], ['contact', 'Write a message', 'letter']]) {
    h.render(place); h.click(label); assert.equal(h.nextDetail, detail);
    h.render(place, detail); assert.ok(h.focused.at(-1));
  }
});

test('Journey defaults to Today and milestone selection reveals one account at a time', () => {
  const h = harness(); h.render('journey', 'journal'); assert.match(h.text(), /Building at Anarock/);
  h.click('2004'); h.render('journey', 'journal'); assert.match(h.text(), /The beginning/); assert.doesNotMatch(h.text(), /Building at Anarock/);
  h.click('Next'); h.render('journey', 'journal'); assert.match(h.text(), /Aspiration/); assert.match(h.text(), /Still becoming/);
});

test('legacy interests remain readable and changing scenes does not focus stale details', () => {
  const h = harness(); h.render('home', 'music'); assert.match(h.text(), /Martin Garrix/);
  h.click('Start a conversation'); assert.deepEqual(h.navigations, ['contact']);
  h.focused.length = 0; h.render('contact'); assert.equal(h.focused.length, 0);
  h.render('workshop', 'saathi'); assert.equal(h.focused.at(-1), 'Saathi');
  h.focused.length = 0; h.render('journey'); assert.equal(h.focused.length, 0);
});

test('contact form stays mounted across detail, scene and map navigation', () => {
  const h = harness(); h.render('home'); assert.equal(h.formMounts, 1);
  h.render('contact', 'letter'); h.render('contact'); h.render('workshop', 'saathi'); h.render('workshop', null, false); h.render('contact', 'letter');
  assert.equal(h.formMounts, 1, 'draft-owning form must not be unmounted by scene navigation');
  assert.equal(h.has(node => node.type === 'audio'), false);
});
