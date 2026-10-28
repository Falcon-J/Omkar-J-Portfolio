if(new URLSearchParams(location.search).has('frame'))document.documentElement.classList.add('framed-preview');
if(new URLSearchParams(location.search).has('board'))document.documentElement.classList.add('design-board');
// Local design state only. No storage, API requests, tracking, or message sending.
const projectData = [
  {id:'saathi',title:'Saathi',stack:'Next.js · TypeScript · PostgreSQL · Redis Streams · SSE',problem:'Shared work becomes unreliable when clients disconnect or people edit stale data.',contribution:'Task, membership, and invitation workflows, including permissions and live updates.',decision:'Replay missed events with Redis Streams and SSE; reject stale edits using version checks.',evidence:'',source:'https://github.com/Falcon-J/saathi',boundary:'Personal project'},
  {id:'atlaspay',title:'AtlasPay',stack:'Go · Kafka · PostgreSQL · Redis · Docker',problem:'A restart or duplicate message can leave orders, payments, and inventory out of sync.',contribution:'A checkout workflow with persisted saga state, idempotency, retries, and compensation.',decision:'Persist progress across service boundaries so a failed step can recover or compensate.',evidence:'Service contract smoke tests · Docker Compose.',source:'https://github.com/Falcon-J/AtlasPay',boundary:'Local reliability lab'},
  {id:'agentarena',title:'AgentArena',stack:'Python · FastAPI · React · PostgreSQL · WebSockets',problem:'An answer from several agents is hard to trust without seeing the inputs and contributions.',contribution:'An analysis orchestrator with recorded snapshots, agent outputs, and execution progress.',decision:'Coordinate shared execution state with LangGraph and expose progress over WebSockets.',evidence:'',source:'https://github.com/Falcon-J/deepagentarena',boundary:'Experimental analysis project'}
];
const milestones = [
 ['EDUCATION · VIT','A foundation in computer science.','At VIT, the Entrepreneurship Cell and technology events let me explore how ideas become things people use.'],
 ['JUNE–SEPTEMBER 2025 · FORGEAHEAD','Working with messy inputs.','As an AI/ML intern, I worked on job-data parsing, semantic matching, and OCR pipelines. The work introduced me to the practical gap between an interesting model and useful data.'],
 ['DECEMBER 2025–JUNE 2026 · ANAROCK','Learning the product behind the API.','My software engineering internship involved FastAPI services, conversational facility workflows, typed contracts, and Redis-backed context. It connected backend decisions to the people using the product.'],
 ['JULY 2026 → PRESENT','From features to the whole system.','Moving from internship to SDE I has meant looking beyond a single feature: tracing its dependencies, handling failure, and following the change through the product.'],
 ['ASPIRATION · NOT COMPLETED EXPERIENCE','More depth. More ownership.','Take responsibility for the whole lifecycle: clarify the problem, build it, observe it, and improve it.']
];
const tabs=[...document.querySelectorAll('[data-project]')];
function selectProject(index,focus=false){
 const p=projectData[index];
 tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});
 document.querySelector('#project-detail').setAttribute('aria-labelledby',`tab-${p.id}`);
 for(const key of ['title','stack','problem','contribution','decision','evidence','boundary'])document.getElementById(`case-${key}`).textContent=p[key];
 document.getElementById('case-source').href=p.source;
 if(focus)tabs[index].focus();
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectProject(index));tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();selectProject(next,true)})});
document.querySelectorAll('[data-milestone]').forEach(button=>button.addEventListener('click',()=>{
 const index=Number(button.dataset.milestone);document.querySelectorAll('[data-milestone]').forEach(node=>node.setAttribute('aria-pressed',String(node===button)));
 ['date','title','copy'].forEach((key,i)=>document.getElementById(`story-${key}`).textContent=milestones[index][i]);
}));
document.getElementById('theme').addEventListener('click',event=>{const dark=document.documentElement.classList.toggle('dark');event.currentTarget.setAttribute('aria-label',dark?'Use light theme':'Use dark theme')});
for(const id of ['guide','mobile-guide'])document.getElementById(id).addEventListener('click',()=>{const hidden=document.body.classList.toggle('guides-hidden');for(const control of ['guide','mobile-guide']){document.getElementById(control).textContent=hidden?'Show guide':'Hide guide';document.getElementById(control).setAttribute('aria-pressed',String(hidden))}});
const menu=document.getElementById('mobile-nav'),menuToggle=document.getElementById('menu-toggle');
menuToggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;menuToggle.setAttribute('aria-expanded',String(!menu.hidden))});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.focus()}});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');const section=document.querySelector(link.getAttribute('href'));if(section){section.tabIndex=-1;section.focus({preventScroll:true})}}));
let scheduled=false;function updateNav(){scheduled=false;const sections=[...document.querySelectorAll('main>section')];let id='home';for(const section of sections)if(section.getBoundingClientRect().top<=innerHeight*.3)id=section.id;if(scrollY+innerHeight>=document.documentElement.scrollHeight-2)id='contact';document.querySelectorAll('.desktop-nav a').forEach(link=>{if(link.hash===`#${id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}
function scheduleNav(){if(!scheduled){scheduled=true;requestAnimationFrame(updateNav)}}addEventListener('scroll',scheduleNav,{passive:true});addEventListener('resize',()=>{if(innerWidth>720){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false')}scheduleNav()});updateNav();
const found=new Set(),reward=document.getElementById('reward'),dialog=document.getElementById('surprise'),reveal=document.getElementById('reveal');let revealed=false;
document.querySelectorAll('[data-treat]').forEach(button=>button.addEventListener('click',()=>{found.add(button.dataset.treat);button.disabled=true;button.querySelector('span').textContent='Treat collected';document.getElementById('progress').textContent=found.size===4?'Stella’s surprise · ready':`Stella’s surprise · ${found.size} / 4`;reward.setAttribute('aria-label',`Stella’s surprise: ${found.size} of 4 treats${found.size===4?'. Ready to open.':''}`)}));
reward.addEventListener('click',()=>{const ready=found.size===4;document.getElementById('surprise-description').textContent=ready?'You found all four. Meet the real Stella.':'Four optional treats, one in Work, Journey, About, and Contact. Everything on the page is already open to you.';reveal.hidden=!ready||revealed;document.getElementById('scratch-note').hidden=!ready||revealed;dialog.showModal()});
reveal.addEventListener('click',()=>{revealed=true;reveal.hidden=true;document.getElementById('scratch-note').hidden=true;document.getElementById('reward-image').hidden=false;document.getElementById('reward-image').focus()});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>reward.focus());
