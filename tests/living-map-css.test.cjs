const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const postcss=require('postcss');
const localByDefault=require('next/dist/compiled/postcss-modules-local-by-default');

test('living map selectors compile through the Next.js CSS module plugin',async()=>{
 const compile=source=>postcss([localByDefault({mode:'pure'})]).process(source,{from:undefined});
 await assert.rejects(compile('@supports not (backdrop-filter:blur(1px)){.header .control,.placesMenu,}'));
 await assert.doesNotReject(compile(readFileSync('components/living-map/map-shell.module.css','utf8')));
 await assert.doesNotReject(compile(readFileSync('components/living-map/destinations.module.css','utf8')));
 await assert.doesNotReject(compile(readFileSync('components/living-map/map-arrival.module.css','utf8')));
});

test('continuous decorative motion is opt-in and map arrival has a reduced-motion escape',()=>{
 for(const file of ['map-shell.module.css','destinations.module.css','map-arrival.module.css']){
  const root=postcss.parse(readFileSync(`components/living-map/${file}`,'utf8'));
  root.walkDecls(/^animation(?:-name)?$/,declaration=>{
   if(!/infinite/.test(declaration.value))return;
   let parent=declaration.parent;
   while(parent&&!(parent.type==='atrule'&&parent.name==='media'&&/prefers-reduced-motion\s*:\s*no-preference/.test(parent.params)))parent=parent.parent;
   assert.ok(parent,`${file}: continuous animation must respect reduced motion`);
  });
  const reduced=[];root.walkAtRules('media',rule=>{if(/prefers-reduced-motion\s*:\s*reduce(?:\)|\s)/.test(rule.params))reduced.push(rule)});
  assert.ok(reduced.length,`${file}: reduced-motion fallback exists`);
 }
});
