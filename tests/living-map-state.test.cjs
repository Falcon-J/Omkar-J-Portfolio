const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const vm=require('node:vm');
const file='components/living-map/map-state.ts';
function load(){const out={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:out.exports});return out.exports;}
test('legacy destination hashes map to the living map places',()=>{const {placeFromHash,hashForPlace}=load();assert.equal(placeFromHash('#about'),'home');assert.equal(placeFromHash('#projects'),'workshop');for(const p of ['home','journey','workshop','now','contact'])assert.equal(placeFromHash(hashForPlace(p)),p);assert.equal(placeFromHash('#skills'),'workshop');assert.equal(placeFromHash('#unknown'),null);assert.equal(placeFromHash('#home'),null);assert.equal(placeFromHash(''),null);});
test('clock light is continuous at phase boundaries and midnight',()=>{const {lightingAt,formatTime,localMinutes}=load();for(const edge of [0,300,480,960,1200,1440]){assert.ok(Math.abs(lightingAt(edge-.001).night-lightingAt(edge+.001).night)<.001);}assert.equal(lightingAt(720).night,0);assert.equal(lightingAt(0).phase,'Night');assert.equal(formatTime(1440),'00:00');assert.equal(formatTime(-1),'23:59');assert.equal(localMinutes(new Date(2026,9,27,12,30,30)),750.5);assert.throws(()=>lightingAt(NaN));});

test('nested destination hashes preserve only supported detail identifiers',()=>{const {mapLocationFromHash,hashForPlace}=load();assert.equal(mapLocationFromHash('#about/music').place,'home');assert.equal(mapLocationFromHash('#about/music').detail,'music');assert.equal(mapLocationFromHash('#projects/atlaspay').detail,'atlaspay');assert.equal(mapLocationFromHash('#about/unknown').detail,null);assert.equal(mapLocationFromHash('#now/music').detail,null);assert.equal(mapLocationFromHash('#skills').skills,true);assert.equal(hashForPlace('workshop','saathi'),'#projects/saathi');});

test('scene cycle blends adjacent authored views continuously and names every celestial preview',()=>{
 const {sceneAt,scenePresets}=load();
 assert.deepEqual(Array.from(scenePresets,p=>p.id),['sunrise','day','sunset','moonrise','night','moonset']);
 for(const minute of [0,240,300,360,720,1020,1140,1320,1440]){
  const before=sceneAt(minute-.001).weights,after=sceneAt(minute+.001).weights;
  for(const key of ['sunset','sunrise','moonrise','night']) assert.ok(Math.abs(before[key]-after[key])<.001,`${key} discontinuity at ${minute}`);
 }
 for(let minute=0;minute<1440;minute+=7){const s=sceneAt(minute);assert.ok(s.mix>=0&&s.mix<=1);assert.ok(Math.abs(Object.values(s.weights).reduce((a,b)=>a+b,0)-1)<1e-9)}
 assert.equal(sceneAt(360).weights.sunrise,1);assert.equal(sceneAt(1140).weights.moonrise,1);assert.equal(sceneAt(0).weights.night,1);
 assert.equal(sceneAt(1440).weights.night,sceneAt(0).weights.night);assert.throws(()=>sceneAt(Infinity));
});



test('each scene detail has a valid deep link and rejects details owned by another scene',()=>{
 const {mapLocationFromHash,hashForPlace}=load();
 const choices={home:['personal','music','cars','sports','stories'],journey:['journal'],workshop:['saathi','atlaspay','toolkit'],now:['notebook'],contact:['letter']};
 for(const [place,details] of Object.entries(choices)){
  for(const detail of details){
   const location=mapLocationFromHash(hashForPlace(place,detail));
   assert.equal(location.place,place);assert.equal(location.detail,detail);
   for(const other of Object.keys(choices).filter(key=>key!==place)){
    assert.equal(mapLocationFromHash(hashForPlace(other)+'/'+detail).detail,null);
    assert.equal(hashForPlace(other,detail),hashForPlace(other));
   }
  }
 }
 const skills=mapLocationFromHash('#skills');assert.equal(skills.place,'workshop');assert.equal(skills.detail,'toolkit');
});
