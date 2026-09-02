import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const root=document.querySelector('#scene');
const canvas=document.createElement('canvas'); canvas.className='game-canvas'; root.appendChild(canvas);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setSize(innerWidth,innerHeight); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x06090d); scene.fog=new THREE.Fog(0x06090d,24,68);
const camera=new THREE.PerspectiveCamera(72,innerWidth/innerHeight,.05,100); camera.position.set(0,1.72,18.2);
const clock=new THREE.Clock(); const keys={}; const touch={up:0,down:0,left:0,right:0}; const walls=[]; const doors=[]; const triggers=[];
let started=false,locked=false,autoTour=false,tourIndex=0,tourClock=0,yaw=0,pitch=0,openRoom=null;

const material=(color,rough=.72,metal=0)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
const M={ground:material(0x17211d),road:material(0x292d2d),wall:material(0x77746b),wall2:material(0x4d514d),floor:material(0x242825),wood:material(0x604633),dark:material(0x11161a),glass:material(0x5e94a7,.12,.4),gold:material(0xd2b46d,.28,.55),green:material(0x294736),blue:material(0x304b5c),cream:material(0xd9d0bb),roof:material(0x1a2021),brick:material(0x75443a)};

function box(name,x,y,z,w,h,d,mat,collide=false){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.name=name;o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);if(collide)walls.push({x,z,w,d});return o;}
function sphere(name,x,y,z,r,mat){const o=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),mat);o.name=name;o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o;}
function label(text,x,y,z,size=.2){const c=document.createElement('canvas');c.width=900;c.height=220;const g=c.getContext('2d');g.clearRect(0,0,900,220);g.fillStyle='#f1eee4';g.font='800 68px Manrope,Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(text,450,110);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false}));s.position.set(x,y,z);s.scale.set(size*4.4,size,1);scene.add(s);return s;}
function light(x,z,power=2.2,color=0xffc778){const l=new THREE.PointLight(color,power,9);l.position.set(x,2.85,z);l.castShadow=true;scene.add(l);box('lamp',x,3.03,z,.18,.12,.18,M.gold);}
function wall(x,z,w,d,mat=M.wall,collide=true){return box('wall',x,1.55,z,w,3.1,d,mat,collide);}
function door(x,z,name){const group=new THREE.Group();group.position.set(x,1.5,z);scene.add(group);const slab=new THREE.Mesh(new THREE.BoxGeometry(2.05,3,.18),M.wood);slab.position.x=-1.025;slab.castShadow=true;group.add(slab);doors.push({group,name,open:0});return group;}
function windowUnit(x,z){box('window',x,1.95,z,2.2,1.35,.09,M.glass);box('frame',x-1.1,1.95,z-.06,.07,1.5,.12,M.wood);box('frame',x+1.1,1.95,z-.06,.07,1.5,.12,M.wood);box('frame',x,1.95,z-.06,2.2,.07,.12,M.wood);box('frame',x,1.95,z-.06,.07,1.35,.12,M.wood);}

function room(info){
 const {name,cx,cz,w,d,side,type,index}=info;
 box(name+' floor',cx,.04,cz,w,.1,d,M.floor);
 wall(cx,cz+d/2,w,.18); wall(side==='L'?cx-w/2:cx+w/2,cz,.18,d);
 const ix=side==='L'?cx+w/2:cx-w/2, gap=2.3;
 wall(ix,cz-d/2+(d-gap)/4,.18,(d-gap)/2); wall(ix,cz+d/2-(d-gap)/4,.18,(d-gap)/2);
 door(ix,cz,name);
 light(cx,cz,2.5);
 label(name,cx,2.65,cz,.18);
 triggers.push({name,x:ix+(side==='L'?.9:-.9),z:cz,index});
 if(type==='about'){
   box('desk',cx,.7,cz+1,3,.18,1.05,M.wood);box('screen',cx,1.45,cz+.63,1.65,.85,.1,M.dark);box('chair',cx,.65,cz+2.05,.85,.9,.85,M.blue);
   box('portrait-frame',cx,2.05,cz-1.72,2.1,2.5,.12,M.gold); const p=box('portrait',cx,2.05,cz-1.79,1.75,2.15,.04,M.dark); label('AM',cx,2.05,cz-1.83,.42);
 }
 if(type==='skills'){
   for(let i=0;i<6;i++){box('skill-rack',cx-2.2+i*.88,1.1,cz+1.6,.62,2.05,.5,i%2?M.blue:M.green);}
   box('terminal',cx,.75,cz-1.15,3.4,.18,1.1,M.wood);for(let i=-1;i<=1;i++)box('monitor',cx+i*1.05,1.55,cz-1.58,.75,.58,.08,M.dark);
 }
 if(type==='projects'){
   box('project-table',cx,.7,cz-1.15,3.7,.2,1.2,M.wood);for(let i=0;i<5;i++){box('project-display',cx-2.1+i*1.05,1.15,cz+1.45,.75,1.9,.38,i%2?M.blue:M.green);label(String(i+1).padStart(2,'0'),cx-2.1+i*1.05,1.2,cz+1.22,.12);}
 }
 if(type==='education'){
   for(let i=0;i<3;i++)box('bookcase',cx-1.55+i*1.55,1.35,cz+1.45,1.05,2.4,.5,M.wood);box('study',cx,.7,cz-1.05,3,.18,1,M.wood);label('LEARN',cx,2.5,cz-1.5,.15);
 }
 if(type==='experience'){
   box('dev-bench',cx,.7,cz,4,.2,1.1,M.wood);for(let i=-1;i<=1;i++){box('screen',cx+i*1.3,1.55,cz-.5,1.05,.7,.08,M.dark);light(cx+i*1.3,cz-.55,1.1,0xa8c9ff);}label('SHIP',cx,2.55,cz-1.55,.16);
 }
 if(type==='contact'){
   box('meeting-table',cx,.62,cz,3.7,.18,1.55,M.wood);for(const dx of [-1.9,1.9])box('chair',cx+dx,.65,cz,.8,.9,.8,M.blue);label('LET’S BUILD',cx,2.5,cz-1.35,.16);
 }
}

const rooms=[
 {name:'ABOUT',cx:-5.5,cz:6,w:6.6,d:6,side:'L',type:'about',index:'01'},
 {name:'SKILLS',cx:5.5,cz:6,w:6.6,d:6,side:'R',type:'skills',index:'02'},
 {name:'PROJECTS',cx:-5.5,cz:-1,w:6.6,d:7,side:'L',type:'projects',index:'03'},
 {name:'EDUCATION',cx:5.5,cz:-1,w:6.6,d:7,side:'R',type:'education',index:'04'},
 {name:'EXPERIENCE',cx:-5.5,cz:-8.4,w:6.6,d:6,side:'L',type:'experience',index:'05'},
 {name:'CONTACT',cx:5.5,cz:-8.4,w:6.6,d:6,side:'R',type:'contact',index:'06'}
];
rooms.forEach(room);

box('ground',0,-.3,0,54,.5,54,M.ground);box('driveway',0,-.06,16,9,.12,12,M.road);box('hall-floor',0,.02,-.1,4.2,.1,23,M.floor);box('lobby-floor',0,.03,10.2,4.2,.1,4.2,M.floor);
wall(-3.2,11.2,2.1,.18,M.wall2);wall(3.2,11.2,2.1,.18,M.wall2);door(0,11,'ENTRANCE');box('porch',0,.05,13,9,.18,4,M.wood);
for(let z=15;z>=12;z--)box('front-step',0,(15-z)*.14,z,9,.2,.62,M.cream);windowUnit(-2.25,10.95);windowUnit(2.25,10.95);label('ASMIT HOUSE',0,3.35,10.8,.22);
box('roof',0,3.45,0,20,.35,24,M.roof);box('ridge',0,3.88,0,20,.28,1,M.brick);box('chimney',7,4.15,-4,1.2,2.1,1.2,M.wall2);

for(let i=0;i<26;i++){const x=-23+Math.random()*46,z=-19+Math.random()*37;if(Math.abs(x)<12&&Math.abs(z)<16)continue;const trunk=sphere('tree-trunk',x,1,z,.25,M.wood);trunk.scale.y=4; sphere('tree-crown',x,2.65,z,1.25+Math.random()*.65,M.green);}
for(const x of [-3.5,0,3.5])light(x,12.25,1.2);
scene.add(new THREE.HemisphereLight(0xb7cad8,0x10150f,1.3));
const moon=new THREE.DirectionalLight(0xd8e6ff,2.4);moon.position.set(-14,18,10);moon.castShadow=true;moon.shadow.mapSize.set(2048,2048);moon.shadow.camera.left=-26;moon.shadow.camera.right=26;moon.shadow.camera.top=26;moon.shadow.camera.bottom=-26;scene.add(moon);
const stars=new THREE.Group();for(let i=0;i<120;i++){const s=sphere('star',-35+Math.random()*70,8+Math.random()*18,-28+Math.random()*20,.025,M.cream);stars.add(s);}scene.add(stars);

const data={
 ABOUT:{kicker:'THE BUILDER',text:'I am AsmiT Mishra — a Full-Stack Developer and AI enthusiast. I learn by building useful products, shipping them, and iterating until the experience feels right.',stats:[['FOCUS','FULL-STACK × AI'],['MINDSET','BUILD · SHIP · LEARN'],['STYLE','PRODUCT ENGINEERING']],actions:[]},
 SKILLS:{kicker:'LOADOUT',text:'A practical stack for taking an idea from interface to backend and AI-powered behavior.',stats:[['LANGUAGES','JavaScript · TypeScript · Python'],['FRONTEND','React · Next.js'],['BACKEND','Node.js · APIs'],['DATA','MongoDB · PostgreSQL · Firebase'],['AI','Generative AI · Automation'],['TOOLING','Git · GitHub']],actions:[]},
 PROJECTS:{kicker:'WORKSHOP',text:'Selected builds that show how I think: real interfaces, useful utilities, AI experiments and products designed to be explored.',stats:[['01','JARVIS AI ASSISTANT'],['02','TROVE · MUSIC DISCOVERY'],['03','REALSENSE · WEB EXPERIENCE'],['04','YOUTUBE TRIMMER'],['05','MEDINFOAI · AI PRODUCT']],actions:[['GitHub','https://github.com/yourasmit15-web'],['TROVE REPO','https://github.com/yourasmit15-web/TROVE']]},
 EDUCATION:{kicker:'FOUNDATION',text:'Formal study is the base layer. The real learning loop is turning concepts into software and then improving what ships.',stats:[['DEGREE','BCA · 2024–2027'],['INSTITUTE','Meena Shah Institute of Technology and Management'],['12TH','PCM · 2022–2024'],['10TH','Science · 84.5%']],actions:[]},
 EXPERIENCE:{kicker:'SHIP LOG',text:'Full-Stack Developer Intern at Hivens (Just Inc.) in 2026 — working across web interfaces, features, debugging, UX and deployment.',stats:[['ROLE','FULL-STACK DEVELOPER INTERN'],['COMPANY','HIVENS (JUST INC.)'],['YEAR','2026'],['APPROACH','RELIABLE EXPERIENCES']],actions:[]},
 CONTACT:{kicker:'OPEN CHANNEL',text:'Have an idea, collaboration or opportunity? Open a channel and let’s build something worth opening.',stats:[['EMAIL','yourasmit108@gmail.com'],['GITHUB','yourasmit15-web'],['LINKEDIN','asmitxmishra'],['INSTAGRAM','@asmitx.dev']],actions:[['EMAIL','mailto:yourasmit108@gmail.com'],['GITHUB','https://github.com/yourasmit15-web'],['LINKEDIN','https://www.linkedin.com/in/asmitxmishra'],['INSTAGRAM','https://www.instagram.com/asmitx.dev/']]}
};

function openRoom(name){const d=data[name];if(!d)return;openRoom=name;const panel=document.querySelector('#panel');panel.classList.add('show');panel.setAttribute('aria-hidden','false');document.querySelector('#panelIndex').textContent='ROOM '+(rooms.find(r=>r.name===name)?.index||'01');document.querySelector('#panelKicker').textContent=d.kicker;document.querySelector('#panelTitle').textContent=name;document.querySelector('#panelText').textContent=d.text;const grid=document.querySelector('#panelGrid');grid.innerHTML='';(d.stats||[]).forEach(([a,b])=>{const el=document.createElement('div');el.className='stat';el.innerHTML='<b>'+a+'</b><small>'+b+'</small>';grid.appendChild(el)});const actions=document.querySelector('#panelActions');actions.innerHTML='';(d.actions||[]).forEach(([a,u])=>{const link=document.createElement('a');link.href=u;link.target=u.startsWith('mailto:')?'_self':'_blank';link.rel='noreferrer';link.textContent=a+' ↗';actions.appendChild(link)});document.querySelector('#area').textContent=name+' ROOM';document.querySelector('#toast').classList.remove('show');if(document.pointerLockElement===canvas)document.exitPointerLock();}
function closeRoom(){openRoom=null;document.querySelector('#panel').classList.remove('show');document.querySelector('#panel').setAttribute('aria-hidden','true');document.querySelector('#area').textContent='HOUSE';if(started&&!autoTour)canvas.requestPointerLock?.();}
function start(){started=true;autoTour=false;document.querySelector('#boot').classList.add('hidden');document.querySelector('.hud').classList.add('live');document.querySelector('#toast').classList.add('show');setTimeout(()=>document.querySelector('#toast').classList.remove('show'),4200);canvas.requestPointerLock?.();}
function tour(){started=true;autoTour=true;document.querySelector('#boot').classList.add('hidden');document.querySelector('.hud').classList.add('live');tourIndex=0;tourClock=0;camera.position.set(0,1.72,18.2);if(document.pointerLockElement===canvas)document.exitPointerLock();}

document.querySelector('#enter').onclick=start;document.querySelector('#tour').onclick=tour;document.querySelector('#close').onclick=closeRoom;canvas.onclick=()=>{if(started&&!openRoom&&!autoTour)canvas.requestPointerLock?.()};
document.addEventListener('pointerlockchange',()=>locked=document.pointerLockElement===canvas);
document.addEventListener('mousemove',e=>{if(!locked||openRoom)return;yaw-=e.movementX*.0023;pitch=THREE.MathUtils.clamp(pitch-e.movementY*.0018,-1.18,1.18);});
document.addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key==='Escape'&&openRoom)closeRoom();});document.addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);

document.querySelectorAll('.mobile-pad button').forEach(b=>{const v=b.dataset.m;b.addEventListener('touchstart',e=>{e.preventDefault();touch[v]=1},{passive:false});b.addEventListener('touchend',e=>{e.preventDefault();touch[v]=0},{passive:false});b.addEventListener('touchcancel',()=>touch[v]=0);});

document.querySelectorAll('.map button').forEach(b=>b.addEventListener('click',()=>{const r=rooms.find(x=>x.name===b.dataset.room);if(!r)return;camera.position.set(r.cx+(r.side==='L'?3.0:-3.0),1.72,r.cz);yaw=r.side==='L'?-Math.PI/2:Math.PI/2;pitch=0;openRoom(r.name);}));

function blocked(x,z){for(const w of walls){if(x>w.x-w.w/2-.28&&x<w.x+w.w/2+.28&&z>w.z-w.d/2-.28&&z<w.z+w.d/2+.28)return true;}return false;}
function move(dt){const f=((keys.w||keys.arrowup)?1:0)-((keys.s||keys.arrowdown)?1:0)||touch.up-touch.down;const r=((keys.d||keys.arrowright)?1:0)-((keys.a||keys.arrowleft)?1:0)||touch.right-touch.left;if(!f&&!r)return;const dir=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));const side=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));const speed=4.6*dt;const nx=camera.position.x+(-dir.x*f+side.x*r)*speed;const nz=camera.position.z+(-dir.z*f+side.z*r)*speed;if(!blocked(nx,camera.position.z))camera.position.x=THREE.MathUtils.clamp(nx,-10.2,10.2);if(!blocked(camera.position.x,nz))camera.position.z=THREE.MathUtils.clamp(nz,-12.5,18.5);}
const tourPoints=[{x:0,z:17.8},{x:0,z:11.5},{x:-4.6,z:6},{x:4.6,z:6},{x:-4.6,z:-1},{x:4.6,z:-1},{x:-4.6,z:-8.4},{x:4.6,z:-8.4},{x:0,z:11.5}];
function runTour(dt){const t=tourPoints[tourIndex];camera.position.x=THREE.MathUtils.lerp(camera.position.x,t.x,dt*.75);camera.position.z=THREE.MathUtils.lerp(camera.position.z,t.z,dt*.75);const targetYaw=Math.atan2(t.x-camera.position.x,-(t.z-camera.position.z));yaw=THREE.MathUtils.lerp(yaw,targetYaw,dt*1.4);tourClock+=dt;if(tourClock>2.8){tourClock=0;tourIndex=(tourIndex+1)%tourPoints.length;}}

function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);if(started&&!openRoom){if(autoTour)runTour(dt);else if(locked)move(dt);camera.position.y=1.72;camera.rotation.set(pitch,yaw,0,'YXZ');
  for(const t of triggers){if(Math.hypot(camera.position.x-t.x,camera.position.z-t.z)<1.45){openRoom(t.name);break;}}
  for(const d of doors){const near=Math.hypot(camera.position.x-d.group.position.x,camera.position.z-d.group.position.z)<2.8;const target=near?1:0;d.open=THREE.MathUtils.lerp(d.open,target,dt*5);d.group.rotation.y=-d.open*1.25;}
}
const s=clock.elapsedTime;stars.rotation.y=s*.003;renderer.render(scene,camera);}
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));});