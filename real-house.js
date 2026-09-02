import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const root=document.querySelector('.house-app');
const canvas=document.createElement('canvas'); root.prepend(canvas);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setSize(innerWidth,innerHeight); renderer.shadowMap.enabled=true; renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x07111a); scene.fog=new THREE.Fog(0x07111a,18,55);
const camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.05,100); camera.position.set(0,1.65,12);
const clock=new THREE.Clock(); const keys={}; let started=false,locked=false,yaw=0,pitch=0,roomOpen=false;
const colliders=[]; const doors=[]; const rooms={home:{name:'HOME',pos:new THREE.Vector3(0,1.65,12)},about:{name:'ABOUT',pos:new THREE.Vector3(-5,1.65,3)},skills:{name:'SKILLS',pos:new THREE.Vector3(5,1.65,3)},projects:{name:'PROJECTS',pos:new THREE.Vector3(-5,1.65,-5)},education:{name:'EDUCATION',pos:new THREE.Vector3(5,1.65,-5)},experience:{name:'EXPERIENCE',pos:new THREE.Vector3(0,1.65,-9)},contact:{name:'CONTACT',pos:new THREE.Vector3(0,1.65,12)}};

function mat(c,rough=.75,metal=0){return new THREE.MeshStandardMaterial({color:c,roughness:rough,metalness:metal})}
function box(name,x,y,z,w,h,d,m,cast=true){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.name=name;o.position.set(x,y,z);o.castShadow=cast;o.receiveShadow=true;scene.add(o);return o}
function addText(text,pos,size=.28,color='#dfe9f4'){const c=document.createElement('canvas');c.width=1024;c.height=256;const x=c.getContext('2d');x.fillStyle=color;x.font='700 82px Inter,Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,512,128);const t=new THREE.CanvasTexture(c);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true}));s.position.copy(pos);s.scale.set(size*4,size,1);scene.add(s);return s}
function roomBox(label,x,z,w=9,d=7){box(label+' floor',x,.05,z,w,.1,d,mat(0x222b34));box(label+' back',x,2.5,z-d/2,w,5,.18,mat(0x303944));box(label+' left',x-w/2,2.5,z,.18,5,d,mat(0x2a333d));box(label+' right',x+w/2,2.5,z,.18,5,d,mat(0x2a333d));addText(label,new THREE.Vector3(x,4.1,z-d/2+.15),.34)}

// World: a real walkable house, not a flat website
scene.add(new THREE.HemisphereLight(0x9dbbff,0x11130f,1.5));
const sun=new THREE.DirectionalLight(0xffe5c0,3);sun.position.set(-8,14,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);scene.add(sun);
const moon=new THREE.DirectionalLight(0x789dff,1.1);moon.position.set(10,10,-15);scene.add(moon);
box('ground',0,-.2,0,42,.4,42,mat(0x111713),false);
// House shell
roomBox('LIVING ROOM',0,4,10,7); roomBox('ABOUT',-5,4,7,7); roomBox('SKILLS',5,4,7,7); roomBox('PROJECTS',-5,-5,7,7); roomBox('EDUCATION',5,-5,7,7); roomBox('EXPERIENCE',0,-9,10,4); roomBox('CONTACT',0,12,10,4);
// corridor and roof mass
box('roof',0,5.35,-1,20,.35,20,mat(0x161b22));
// front entrance facade
box('front-left',-7,2.5,8,6,5,.2,mat(0x3a424c)); box('front-right',7,2.5,8,6,5,.2,mat(0x3a424c));
const door=box('FRONT DOOR',0,1.5,7.82,2.4,3.3,.18,mat(0x6b3e24));doors.push({mesh:door,baseX:0});
const knob=box('door knob',.75,1.5,7.65,.12,.12,.12,mat(0xe4c27a,0.3,0.7));
// windows
for(const x of [-5.2,5.2]){box('window',x,2.5,7.65,2.3,1.7,.08,mat(0x77a9c9,.15,.35));box('frame',x,2.5,7.58,.08,1.8,.12,mat(0xd6d1c5));}
// furniture and room landmarks
box('sofa',0,1,4,3.5,1.1,1,mat(0x3f5965));box('table',0,.7,1.5,2.3,.2,1.4,mat(0x70513a));
for(const [x,z,label] of [[-5,4,'ABOUT'],[5,4,'SKILLS'],[-5,-5,'PROJECTS'],[5,-5,'EDUCATION'],[0,-9,'EXPERIENCE']]){box(label+' desk',x,1,z,2.5,.9,1.1,mat(0x4b3a2d));box(label+' monitor',x,1.8,z-.2,1.5,.9,.1,mat(0x101820,.2,.5));addText(label,new THREE.Vector3(x,2.7,z-.8),.24)}
// project shelves
for(let i=0;i<4;i++)box('shelf',-7.5,1.1+i*.8,-5,1.4,.12,2.4,mat(0x5c4633));
// framed profile photo texture
const loader=new THREE.TextureLoader(); loader.load('assets/asmit-about.svg',tex=>{tex.colorSpace=THREE.SRGBColorSpace;const frame=box('PROFILE PHOTO',4.96,2.7,5.35,2.4,2.7,.12,mat(0x171b20));const pic=new THREE.Mesh(new THREE.PlaneGeometry(2.05,2.3),new THREE.MeshStandardMaterial({map:tex}));pic.position.set(4.96,2.7,5.26);pic.rotation.y=Math.PI;scene.add(pic);});
// lights in each room
for(const [x,z] of [[0,4],[-5,4],[5,4],[-5,-5],[5,-5],[0,-9]]){const l=new THREE.PointLight(0xffc777,2.2,8);l.position.set(x,3.6,z);scene.add(l);box('lamp',x,4,z,.15,.15,.15,mat(0xffcf83,.2,.4),false)}
// doorways as triggers; crossing into them changes room panel
const triggers=[['about',-5,7],['skills',5,7],['projects',-5,-1],['education',5,-1],['experience',0,-7],['contact',0,10]];
function dist2(a,b){return Math.hypot(a.x-b[0],a.z-b[1])}
function openPanel(key){roomOpen=true;document.querySelector('.panel')?.classList.add('show');document.querySelector('.panel h2').textContent=rooms[key].name;document.querySelector('.panel p').textContent=content[key];document.querySelector('.room-name').textContent=rooms[key].name+' ROOM';}
const content={about:'Full-Stack Developer & AI Enthusiast. I build practical web products, experiment with AI and learn by shipping.',skills:'JavaScript · TypeScript · Python · React · Next.js · Node.js · MongoDB · PostgreSQL · Firebase · Git · GitHub · GenAI',projects:'JARVIS AI Assistant · TROVE · RealSense · YouTube Trimmer · MedInfoAI',education:'BCA 2024–2027 · Meena Shah Institute of Technology and Management. 12th PCM 2022–2024. 10th Science 84.5%.',experience:'Full-Stack Developer Intern at Hivens (Just Inc.), 2026. Web applications, UI/UX, features, fixes and GCP deployment.',contact:'Email: yourasmit108@gmail.com · GitHub: yourasmit15-web · LinkedIn: asmitxmishra · Instagram: @asmitx.dev'};

function start(){started=true;document.querySelector('.intro').classList.add('hidden');document.querySelector('.hud').classList.add('active');camera.position.set(0,1.65,12);}
document.querySelector('.enter').onclick=()=>{start();canvas.requestPointerLock?.()};document.querySelector('.close').onclick=()=>{roomOpen=false;document.querySelector('.panel').classList.remove('show')};
canvas.addEventListener('click',()=>{if(started&&!roomOpen)canvas.requestPointerLock?.()});document.addEventListener('pointerlockchange',()=>locked=document.pointerLockElement===canvas);
document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*.002;pitch-=e.movementY*.002;pitch=Math.max(-1.25,Math.min(1.25,pitch));});
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key==='Escape'&&roomOpen){roomOpen=false;document.querySelector('.panel').classList.remove('show')}});addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
const move={x:0,z:0};document.querySelectorAll('.mobile-controls button').forEach(b=>{const v=b.dataset.move;b.addEventListener('touchstart',e=>{e.preventDefault();move[v]=1},{passive:false});b.addEventListener('touchend',e=>{e.preventDefault();move[v]=0},{passive:false})});
let touchX=0;canvas.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX},{passive:true});canvas.addEventListener('touchmove',e=>{if(!started)return;const dx=e.touches[0].clientX-touchX;touchX=e.touches[0].clientX;yaw-=dx*.006},{passive:true});
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);if(started&&!roomOpen){const f=(keys.w||keys.arrowup?1:0)-(keys.s||keys.arrowdown?1:0);const r=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0);const fx=r? r:move.right-move.left;const fz=f?f:move.down-move.up;const dir=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));const side=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));const speed=3.8*dt;camera.position.addScaledVector(dir,-fz*speed);camera.position.addScaledVector(side,fx*speed);camera.position.x=THREE.MathUtils.clamp(camera.position.x,-9.2,9.2);camera.position.z=THREE.MathUtils.clamp(camera.position.z,-11.5,14);camera.position.y=1.65;camera.rotation.set(pitch,yaw,0,'YXZ');for(const [k,x,z] of triggers)if(dist2(camera.position,[x,z])<1.8)openPanel(k)}doors[0].mesh.rotation.y=THREE.MathUtils.lerp(doors[0].mesh.rotation.y,started?-.9:0,dt*3);renderer.render(scene,camera)}animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2))});
