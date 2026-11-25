const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const path=require('node:path');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const ts=require('typescript');
function load(relative){
 const code=ts.transpileModule(readFileSync(path.join(__dirname,'..',relative),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const module={exports:{}};
 const imports=name=>{
  if(name==='react'||name==='react/jsx-runtime')return require(name);
  if(name==='next/image')return {default:({fetchPriority,priority,...props})=>React.createElement('img',props)};
  if(name==='next-themes')return {useTheme:()=>({resolvedTheme:'light',setTheme(){}})};
  if(name==='next/navigation')return {redirect:destination=>{throw new Error(destination)}};
  if(name==='@/components/living-map/map-shell')return load('components/living-map/map-shell.tsx');
  if(name==='./map-state')return load('components/living-map/map-state.ts');
  if(name==='./destinations')return {DestinationContent:()=>React.createElement('div',null,'Destination content')};
  if(name==='./map-arrival')return {MapArrival:()=>null};
  if(name.endsWith('.module.css'))return {default:new Proxy({},{get:(_,key)=>String(key)})};
  if(name==='next/link')return {default:props=>React.createElement('a',props)};
  if(name.startsWith('@/components/portfolio/'))return new Proxy({},{get:()=>()=>null});
  throw new Error(`Unexpected import: ${name}`);
 };
 new Function('module','exports','require',code)(module,module.exports,imports);
 return module.exports;
}
test('homepage presents an image-first map with five accessible landmark targets and a readable fallback',()=>{
 const html=renderToStaticMarkup(React.createElement(load('app/page.tsx').default));
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.match(html,/id="main-content"/);
 assert.match(html,/alt="A little illustrated world/);
 assert.equal((html.match(/aria-haspopup="dialog"/g)||[]).length,5,'each landmark has one accessible target');
 for(const label of ['Home','Journey','Workshop','Reading corner','Mailbox'])assert.ok(html.includes(`aria-label="${label}:`),`${label} has an accessible landmark name`);
 assert.match(html,/id="places-control"/);
 assert.doesNotMatch(html,/Choose a place|Take your own route|Come in\./);
 assert.match(html,/class="hotspotLabel" aria-hidden="true"/);
 assert.match(html,/<noscript>[\s\S]*Get to know Omkar[\s\S]*mailto:omkarjawalikar04@gmail.com[\s\S]*<\/noscript>/);
 assert.match(html,/href="\/Omkar-Jawalikar-Resume.pdf"/);
 assert.doesNotMatch(html,/data-chapter=/);
});
test('legacy chapter routes still resolve to useful map hashes and workshop returns to Projects',()=>{
 const state=load('components/living-map/map-state.ts');
 for(const [route,hash]of Object.entries({about:'about',experience:'journey',projects:'projects',now:'now',contact:'contact',blog:'now',skills:'skills'})){
  assert.throws(()=>load(`app/${route}/page.tsx`).default(),{message:`/#${hash}`});
  assert.ok(state.placeFromHash(`#${hash}`),`${route} redirect must resolve to a map place`);
 }
 const workshop=renderToStaticMarkup(React.createElement(load('app/projects/workshop/page.tsx').default));
 assert.match(workshop,/href="\/#projects"/);
});
