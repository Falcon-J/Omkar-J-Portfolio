const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const path=require('node:path');
const ts=require('typescript');

function harness(initialHash=''){
 let clockMinutes=720;
 const hooks=[],effects=[],windowListeners=new Map(),documentListeners=new Map(),timers=new Map();
 let cursor=0,effectCursor=0,dirty=false,tree,focused=null,nextTimer=0;
 const dialog={open:false,isConnected:true,scrollTop:0,showModal(){this.open=true},close(){this.open=false},querySelector(){return{focus(){focused='detail-heading'}}}};
 const elements=new Map();
 const location={pathname:'/',search:'',hash:initialHash};
 const history=[initialHash],historyStates=[null];let position=0;
 const setUrl=url=>{location.hash=url.includes('#')?url.slice(url.indexOf('#')):''};
 const win={location,history:{get state(){return historyStates[position]},pushState:(state,_,url)=>{history.splice(position+1);historyStates.splice(position+1);history.push(url);historyStates.push(state);position++;setUrl(url)},replaceState:(state,_,url)=>{history[position]=url;historyStates[position]=state;setUrl(url)},back:()=>{assert.ok(position>0);position--;setUrl(history[position]);windowListeners.get('popstate')?.()}},setInterval:callback=>{timers.set(++nextTimer,callback);return nextTimer},clearInterval:id=>timers.delete(id),addEventListener:(name,callback)=>windowListeners.set(name,callback),removeEventListener:(name,callback)=>{if(windowListeners.get(name)===callback)windowListeners.delete(name)}};
 const doc={hidden:false,body:{style:{overflow:''}},addEventListener:(name,callback)=>documentListeners.set(name,callback),removeEventListener:(name,callback)=>{if(documentListeners.get(name)===callback)documentListeners.delete(name)}};
 const react={useState(initial){const index=cursor++;if(!(index in hooks))hooks[index]=initial;return[hooks[index],value=>{const next=typeof value==='function'?value(hooks[index]):value;if(!Object.is(hooks[index],next)){hooks[index]=next;dirty=true}}]},useRef(initial){const index=cursor++;if(!(index in hooks))hooks[index]={current:initial};return hooks[index]},useEffect(callback,deps){const index=effectCursor++;const previous=effects[index];if(!previous||deps.some((value,i)=>!Object.is(value,previous.deps[i])))effects[index]={callback,deps,pending:true,cleanup:previous?.cleanup}}};
 const jsx={jsx:(type,props)=>({type,props:props||{}}),jsxs:(type,props)=>({type,props:props||{}})};
 function load(relative){const source=readFileSync(path.join(__dirname,'..',relative),'utf8');const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;const module={exports:{}};new Function('module','exports','require','window','document','Date',code)(module,module.exports,name=>{
  if(name==='react')return react;
  if(name==='react/jsx-runtime')return jsx;
  if(name==='next/image')return {default:'optimized-image'};
  if(name==='next-themes')return{useTheme:()=>({resolvedTheme:'light',setTheme(){}})};
  if(name==='./destinations')return{DestinationContent:'destination-content'};
  if(name==='./map-arrival')return{MapArrival:'map-arrival'};
  if(name==='./map-state')return load('components/living-map/map-state.ts');
  if(name.endsWith('.module.css'))return{default:new Proxy({},{get:(_,key)=>String(key)})};
  throw new Error(`Unexpected import: ${name}`);
 },win,doc,class extends Date{constructor(...args){super(...(args.length?args:[2026,9,27,Math.floor(clockMinutes/60),clockMinutes%60,0]))}});return module.exports;}
 const {LivingMap}=load('components/living-map/map-shell.tsx');
 function walk(node,fn){if(!node||typeof node!=='object')return;if(Array.isArray(node)){node.forEach(x=>walk(x,fn));return}fn(node);walk(node.props?.children,fn)}
 function text(node){if(node==null||typeof node==='boolean')return '';if(typeof node!=='object')return String(node);if(Array.isArray(node))return node.map(text).join('');return text(node.props?.children)}
 function render(){let guard=0;do{dirty=false;cursor=0;effectCursor=0;tree=LivingMap();walk(tree,node=>{const ref=node.props?.ref;if(ref&&typeof ref==='object'){if(node.type==='dialog')ref.current=dialog;else{const key=node.type+text(node);if(!elements.has(key))elements.set(key,{isConnected:true,focus(){focused=key},scrollIntoView(){}});ref.current=elements.get(key)}}});for(const effect of effects){if(effect.pending){effect.cleanup?.();effect.pending=false;effect.cleanup=effect.callback()}}if(++guard>10)throw new Error('render did not settle');}while(dirty)}
 function find(predicate){let result;walk(tree,node=>{if(!result&&predicate(node))result=node});assert.ok(result,'control was rendered');return result}
 function clickButton(label){const button=find(node=>node.type==='button'&&text(node)===label);const currentTarget={isConnected:true,focus(){focused=label}};button.props.onClick({currentTarget,preventDefault(){}});render();return currentTarget}
 render();return{setTime(minutes){clockMinutes=minutes;for(const callback of timers.values())callback();render()},has(predicate){let found=false;walk(tree,node=>{if(predicate(node))found=true});return found},dialog,doc,location,history,timers,windowListeners,documentListeners,render,find,text,clickButton,get focused(){return focused},emit(name){windowListeners.get(name)?.();render()},back(){win.history.back();render()},cleanup(){effects.forEach(effect=>effect.cleanup?.())}};
}

test('map selection, browser Back and Close synchronize modal, URL and focus without clock history',()=>{
 const h=harness();assert.equal(h.dialog.open,false);assert.equal(h.doc.body.style.overflow,'');
 const workshop=h.find(node=>node.type==='button'&&node.props['aria-haspopup']==='dialog'&&h.text(node).includes('Workshop'));
 const opener={isConnected:true,focus(){opener.focused=true}};
 workshop.props.onClick({currentTarget:opener});h.render();
 assert.equal(h.location.hash,'#projects');assert.equal(h.dialog.open,true);assert.equal(h.doc.body.style.overflow,'hidden');
 const entries=h.history.length;for(const callback of h.timers.values())callback();h.render();assert.equal(h.history.length,entries,'clock updates must not add browser history');
 h.back();assert.equal(h.dialog.open,false);assert.equal(h.doc.body.style.overflow,'');assert.equal(opener.focused,true);
 h.clickButton('HomeMeet the person');assert.equal(h.location.hash,'#about');assert.equal(h.dialog.open,true);
 h.clickButton('← Back to map');assert.equal(h.dialog.open,false);assert.equal(h.location.hash,'');assert.equal(h.doc.body.style.overflow,'');
 h.cleanup();assert.equal(h.windowListeners.size,0);assert.equal(h.documentListeners.size,0);assert.equal(h.timers.size,0);
});

test('skills deep link expands useful content and unknown hashes keep direct navigation available',()=>{
 const h=harness('#skills');assert.equal(h.dialog.open,true);
 const content=h.find(node=>node.type==='destination-content');assert.equal(content.props.place,'workshop');assert.equal(content.props.detail,'toolkit');assert.equal(content.props.active,true);assert.equal(typeof content.props.onClose,'function');
 assert.equal(h.focused,'detail-heading');h.cleanup();
 const unknown=harness('#not-a-place');assert.equal(unknown.dialog.open,false);assert.ok(unknown.find(node=>node.props.id==='places-control'));unknown.cleanup();
});


test('nested details use history and Escape returns to parent before closing the panel',()=>{
 const h=harness();h.clickButton('HomeMeet the person');
 const content=()=>h.find(node=>node.type==='destination-content');
 content().props.onDetailChange('music');h.render();assert.equal(h.location.hash,'#about/music');assert.equal(content().props.detail,'music');
 const count=h.history.length;content().props.onDetailChange('music');h.render();assert.equal(h.history.length,count,'same detail must not add another entry');
 h.back();assert.equal(h.location.hash,'#about');assert.equal(content().props.detail,null);assert.equal(h.dialog.open,true);
 content().props.onDetailChange('cars');h.render();h.find(node=>node.type==='dialog').props.onCancel({preventDefault(){}});h.render();assert.equal(h.location.hash,'#about');assert.equal(h.dialog.open,true);assert.equal(content().props.detail,null);
 h.find(node=>node.type==='dialog').props.onCancel({preventDefault(){}});h.render();assert.equal(h.dialog.open,false);h.cleanup();
 const deep=harness('#projects/atlaspay');assert.equal(deep.dialog.open,true);assert.equal(deep.focused,'detail-heading');deep.find(node=>node.type==='dialog').props.onCancel({preventDefault(){}});deep.render();assert.equal(deep.location.hash,'#projects');assert.equal(deep.history.length,1,'direct detail Back replaces rather than adding a duplicate parent');assert.equal(deep.dialog.open,true);deep.cleanup();
});
test('cross-place navigation resets scroll and focus while the automatic clock resynchronizes safely',()=>{
 const h=harness('#about/music');h.dialog.scrollTop=700;h.find(node=>node.type==='destination-content').props.onNavigate('contact');h.render();assert.equal(h.location.hash,'#contact');assert.equal(h.dialog.scrollTop,0);assert.equal(h.focused,'h2Mailbox');
 h.clickButton('← Back to map');h.setTime(0);
 let world=h.find(node=>node.props.style&&'--night'in node.props.style);assert.equal(world.props.style['--lighting-duration'],'30s');assert.equal(world.props.style['--night'],.62);
 h.emit('focus');world=h.find(node=>node.props.style&&'--night'in node.props.style);assert.equal(world.props.style['--lighting-duration'],'180ms','returning from window focus settles quickly');
 h.doc.hidden=true;h.documentListeners.get('visibilitychange')();h.render();h.setTime(720);world=h.find(node=>node.props.style&&'--night'in node.props.style);assert.equal(world.props.style['--night'],.62,'hidden tabs wait for resume');
 h.doc.hidden=false;h.documentListeners.get('visibilitychange')();h.render();world=h.find(node=>node.props.style&&'--night'in node.props.style);assert.equal(world.props.style['--night'],0);assert.equal(world.props.style['--lighting-duration'],'180ms');h.cleanup();
});

test('night artwork loads only when needed and failed artwork keeps the tint fallback',()=>{
 const h=harness();assert.equal(h.has(node=>node.props?.src==='/living-map-night.png'),false,'day does not request optional night art');
 h.setTime(0);
 const night=h.find(node=>node.props?.src==='/living-map-night.png');let world=h.find(node=>node.props.style&&'--night-art'in node.props.style);assert.equal(world.props.style['--night-art'],0);assert.equal(world.props.style['--tint'],.62,'tint covers loading night asset');
 night.props.onLoad();h.render();world=h.find(node=>node.props.style&&'--night-art'in node.props.style);assert.equal(world.props.style['--night-art'],1);assert.equal(world.props.style['--tint'],0);
 night.props.onError();h.render();world=h.find(node=>node.props.style&&'--night-art'in node.props.style);assert.equal(world.props.style['--night-art'],0);assert.equal(world.props.style['--tint'],.62);assert.equal(h.has(node=>node.props?.src==='/living-map-night.png'),false);
 h.doc.hidden=true;h.documentListeners.get('visibilitychange')();h.render();world=h.find(node=>node.props.style&&'--night-art'in node.props.style);assert.equal(world.props['data-active'],false,'optional lantern motion pauses when page is hidden');h.cleanup();
});

test('illustrated arrival follows primary map readiness and never gates navigation',()=>{
 const h=harness();
 const arrival=()=>h.find(node=>node.type==='map-arrival');
 assert.equal(arrival().props.ready,false);
 h.find(node=>node.type==='button'&&node.props['aria-label']==='Home: Meet the person').props.onClick({currentTarget:{isConnected:true,focus(){}}});h.render();
 assert.equal(h.dialog.open,true,'destinations remain usable before map imagery is ready');
 assert.equal(arrival().props.ready,false);
 const before=h.history.length;
 h.find(node=>node.props?.src==='/living-map-concept.png').props.onLoad();h.render();
 assert.equal(arrival().props.ready,true);
 assert.equal(h.history.length,before,'arrival completion never changes navigation');h.cleanup();
 const failed=harness();
 failed.find(node=>node.props?.src==='/living-map-concept.png').props.onError();failed.render();
 assert.equal(failed.find(node=>node.type==='map-arrival').props.ready,true,'failed imagery also dismisses arrival');
 assert.ok(failed.find(node=>node.type==='button'&&failed.text(node)==='Open Explore'),'image failure retains a route to all content');failed.cleanup();
});

test('Places menu exposes a direct resume link independently of the desktop header',()=>{
 const h=harness('#projects/saathi');h.clickButton('← Back to map');
 h.find(node=>node.type==='button'&&node.props['aria-controls']==='map-places-menu').props.onClick();h.render();
 const menu=h.find(node=>node.type==='nav'&&node.props.id==='map-places-menu');
 const resume=menu.props.children.flat(Infinity).find(node=>node&&node.type==='a'&&node.props.href==='/Omkar-Jawalikar-Resume.pdf');
 assert.ok(resume,'mobile Places menu must offer resume without opening a destination');assert.equal(resume.props.target,'_blank');assert.equal(resume.props.rel,'noopener noreferrer');h.cleanup();
});


test('landmark hit areas remain distinct and the mobile pan hint dismisses after exploration',()=>{
 const h=harness();
 const targets=[];
 for(const name of ['Home','Journey','Workshop','Reading corner','Mailbox'])targets.push(h.find(node=>node.type==='button'&&node.props['aria-label']?.startsWith(name+':')));
 const boxes=targets.map(node=>{const s=node.props.style;const x=parseFloat(s.left),y=parseFloat(s.top),w=parseFloat(s.width),height=parseFloat(s.height);return{left:x-w/2,right:x+w/2,top:y-height/2,bottom:y+height/2}});
 for(const [i,a]of boxes.entries()){
  assert.ok(a.left>=0&&a.right<=100&&a.top>=0&&a.bottom<=100,'target stays inside artwork');
  for(const b of boxes.slice(i+1))assert.ok(a.right<=b.left||b.right<=a.left||a.bottom<=b.top||b.bottom<=a.top,'invisible target areas must not overlap');
 }
 assert.equal(h.has(node=>node.props.className==='panHint'),true);
 h.find(node=>node.props.className==='world').props.onScroll({currentTarget:{scrollLeft:30}});h.render();
 assert.equal(h.has(node=>node.props.className==='panHint'),false);
 h.cleanup();
});


test('map interface follows the local clock automatically and exposes only Explore controls',()=>{
 const h=harness();assert.equal(h.find(node=>node.type==='main').props['data-map-theme'],'day');
 assert.equal(h.text(h.find(node=>node.type==='button'&&node.props['aria-controls']==='map-places-menu')).includes('Explore'),true);
 assert.equal(h.has(node=>node.type==='audio'),false);assert.equal(h.has(node=>node.props?.className==='welcomeStrip'),false);
 assert.equal(h.has(node=>node.props?.id==='world-clock'||node.props?.id==='world-time'),false);
 assert.equal(h.has(node=>node.props?.['aria-label']==='Shuffle scene preview'),false);
 const before=h.history.length;h.setTime(0);assert.equal(h.find(node=>node.type==='main').props['data-map-theme'],'night');assert.equal(h.history.length,before);
 h.setTime(720);assert.equal(h.find(node=>node.type==='main').props['data-map-theme'],'day');h.cleanup();
});

test('landmark discovery cue clears after exploration without a music panel',()=>{
 const h=harness();assert.equal(h.has(node=>node.props.className==='discoveryHint'),true);
 h.find(node=>node.type==='button'&&node.props['aria-label']==='Home: Meet the person').props.onFocus();h.render();assert.equal(h.has(node=>node.props.className==='discoveryHint'),false);
 h.clickButton('HomeMeet the person');assert.equal(h.has(node=>node.props.className==='panHint'),false);h.cleanup();
});

test('automatic scene changes request optional artwork without changing navigation',()=>{
 const h=harness();const before=h.history.length;h.setTime(360);
 assert.equal(h.location.hash,'');assert.equal(h.history.length,before);
 const image=h.find(node=>node.props.src==='/living-map-sunrise.png');assert.equal(image.props.style.opacity,0);image.props.onLoad();h.render();assert.equal(h.find(node=>node.props.src==='/living-map-sunrise.png').props.style.opacity,1);
 h.setTime(1140);const moon=h.find(node=>node.props.src==='/living-map-moonrise.png');moon.props.onError();h.render();assert.equal(h.has(node=>node.props.src==='/living-map-moonrise.png'),false);h.cleanup();
});


test('Explore remains inside the active modal and Escape dismisses the menu before the detail',()=>{
 const h=harness('#projects/saathi');
 const dialog=h.find(node=>node.type==='dialog');
 const content=h.find(node=>node.type==='destination-content');
 assert.equal(content.props.active,true);
 h.find(node=>node.type==='button'&&node.props['aria-controls']==='map-places-menu'&&!node.props.id).props.onClick();h.render();
 assert.equal(h.has(node=>node.type==='nav'&&node.props.id==='map-places-menu'),true);
 const descendants=node=>!node||typeof node!=='object'?[]:Array.isArray(node)?node.flatMap(descendants):[node,...descendants(node.props?.children)];
 assert.ok(descendants(h.find(node=>node.type==='dialog')).some(node=>node.type==='nav'&&node.props.id==='map-places-menu'),'active menu belongs to modal focus boundary');
 h.find(node=>node.type==='dialog').props.onCancel({preventDefault(){}});h.render();
 assert.equal(h.has(node=>node.type==='nav'&&node.props.id==='map-places-menu'),false);
 assert.equal(h.location.hash,'#projects/saathi');assert.equal(h.dialog.open,true);
 h.find(node=>node.type==='dialog').props.onCancel({preventDefault(){}});h.render();
 assert.equal(h.location.hash,'#projects');assert.equal(h.dialog.open,true);
 content.props.onClose();h.render();
 assert.equal(h.find(node=>node.type==='destination-content').props.active,false);
 assert.equal(h.dialog.open,false);h.cleanup();
});

test('sibling detail history distinguishes browser Back from Back to scene',()=>{
 const h=harness('#projects');
 const content=()=>h.find(node=>node.type==='destination-content');
 content().props.onDetailChange('toolkit');h.render();assert.equal(h.location.hash,'#projects/toolkit');
 content().props.onDetailChange('saathi');h.render();assert.equal(h.location.hash,'#projects/saathi');
 h.back();assert.equal(h.location.hash,'#projects/toolkit');assert.equal(content().props.detail,'toolkit');
 content().props.onDetailChange('saathi');h.render();
 content().props.onDetailChange(null);h.render();
 assert.equal(h.location.hash,'#projects','Back to scene must skip the sibling detail');
 assert.equal(content().props.detail,null);assert.equal(h.dialog.open,true);h.cleanup();
});

test('Escape keydown prevents native dialog dismissal and ignores repeated key events',()=>{
 const h=harness('#contact/letter');
 const key=(key,repeat=false)=>{const event={key,repeat,prevented:false,stopped:false,preventDefault(){this.prevented=true},stopPropagation(){this.stopped=true}};h.find(node=>node.type==='dialog').props.onKeyDown(event);h.render();return event};
 const unrelated=key('ArrowRight');assert.equal(unrelated.prevented,false);assert.equal(unrelated.stopped,false);
 const first=key('Escape');assert.equal(first.prevented,true);assert.equal(first.stopped,true);
 assert.equal(h.location.hash,'#contact');assert.equal(h.dialog.open,true,'first Escape keeps the scene modal open');
 const count=h.history.length;
 const repeated=key('Escape',true);assert.equal(repeated.prevented,true);assert.equal(repeated.stopped,true);
 assert.equal(h.location.hash,'#contact');assert.equal(h.dialog.open,true);assert.equal(h.history.length,count,'held Escape must not dismiss another layer');
 const second=key('Escape');assert.equal(second.prevented,true);assert.equal(second.stopped,true);
 assert.equal(h.location.hash,'');assert.equal(h.dialog.open,false);assert.equal(h.doc.body.style.overflow,'');h.cleanup();
});

test('unexpected native dialog close synchronizes URL, active content and body scrolling',()=>{
 const h=harness('#about/personal');assert.equal(h.dialog.open,true);
 h.dialog.open=false;h.find(node=>node.type==='dialog').props.onClose();h.render();
 assert.equal(h.location.hash,'');assert.equal(h.dialog.open,false);
 const content=h.find(node=>node.type==='destination-content');assert.equal(content.props.active,false);assert.equal(content.props.detail,null);
 assert.equal(h.doc.body.style.overflow,'');
 const count=h.history.length;h.find(node=>node.type==='dialog').props.onClose();h.render();
 assert.equal(h.history.length,count,'a close event after state settled must not add history');h.cleanup();
});

test('Escape from the map Explore trigger dismisses only the menu and restores focus',()=>{
 const h=harness();
 h.find(node=>node.props.id==='places-control').props.onClick();h.render();
 const before=h.history.length;
 const event={key:'Escape',repeat:false,prevented:false,stopped:false,preventDefault(){this.prevented=true},stopPropagation(){this.stopped=true}};
 h.find(node=>node.type==='main').props.onKeyDown(event);h.render();
 assert.equal(event.prevented,true);assert.equal(event.stopped,true);
 assert.equal(h.has(node=>node.props.id==='map-places-menu'),false);
 assert.equal(h.location.hash,'');assert.equal(h.history.length,before);
 assert.equal(h.focused,'buttonExplore ⌄');h.cleanup();
});

test('Explore ignores inside pointer interactions and dismisses outside without changing location',()=>{
 const h=harness('#projects/saathi');
 h.find(node=>node.type==='button'&&node.props['aria-controls']==='map-places-menu'&&!node.props.id).props.onClick();h.render();
 const menu=h.find(node=>node.props.id==='map-places-menu').props.ref.current;
 const trigger=h.find(node=>node.type==='button'&&node.props['aria-controls']==='map-places-menu'&&!node.props.id).props.ref.current;
 const inside={};menu.contains=target=>target===inside;trigger.contains=target=>target===trigger;
 h.documentListeners.get('pointerdown')({target:inside});h.render();
 assert.equal(h.has(node=>node.props.id==='map-places-menu'),true);
 h.documentListeners.get('pointerdown')({target:trigger});h.render();
 assert.equal(h.has(node=>node.props.id==='map-places-menu'),true);
 const before=h.history.length;
 h.documentListeners.get('pointerdown')({target:{}});h.render();
 assert.equal(h.has(node=>node.props.id==='map-places-menu'),false);
 assert.equal(h.documentListeners.has('pointerdown'),false);
 assert.equal(h.location.hash,'#projects/saathi');assert.equal(h.history.length,before);assert.equal(h.dialog.open,true);h.cleanup();
});

test('detail selection and location changes clear stale Explore menus',()=>{
 const h=harness('#projects');
 const openMenu=()=>{h.find(node=>node.type==='button'&&node.props['aria-controls']==='map-places-menu'&&!node.props.id).props.onClick();h.render()};
 openMenu();h.find(node=>node.type==='destination-content').props.onDetailChange('saathi');h.render();
 assert.equal(h.location.hash,'#projects/saathi');assert.equal(h.has(node=>node.props.id==='map-places-menu'),false);
 openMenu();h.back();assert.equal(h.location.hash,'#projects');assert.equal(h.has(node=>node.props.id==='map-places-menu'),false);
 openMenu();h.location.hash='#journey';h.emit('hashchange');
 assert.equal(h.has(node=>node.props.id==='map-places-menu'),false);assert.equal(h.find(node=>node.type==='destination-content').props.place,'journey');
 h.cleanup();assert.equal(h.documentListeners.size,0);
});
