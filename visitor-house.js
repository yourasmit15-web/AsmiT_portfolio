(()=>{
'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
const sections=[...document.querySelectorAll('main section.room')];
if(!sections.length)return;
const overlay=document.createElement('div');
overlay.className='visitor-house-overlay';
overlay.innerHTML='<div class="visitor-hud"><strong>VISITOR MODE</strong><span>WASD / ARROWS · MOUSE LOOK · CLICK DOORS</span></div><button class="visitor-exit" type="button">EXIT WALKTHROUGH</button><div class="visitor-crosshair">+</div></div>';
document.body.appendChild(overlay);
const style=document.createElement('style');
style.textContent=`
.visitor-house-overlay{position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0;transition:opacity .5s;background:radial-gradient(circle at 50% 48%,transparent 0 42%,rgba(0,0,0,.48) 100%)}
.visitor-house-overlay.active{opacity:1}
.visitor-hud{position:absolute;top:18px;left:50%;transform:translateX(-50%);display:flex;gap:16px;align-items:center;padding:9px 14px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(3,5,11,.7);backdrop-filter:blur(12px);font:700 9px Inter,sans-serif;letter-spacing:1.5px;color:#9aa8bc;white-space:nowrap}
.visitor-hud strong{color:#67e8f9}.visitor-exit{position:absolute;right:18px;top:18px;pointer-events:auto;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(3,5,11,.7);color:#fff;padding:9px 13px;font:700 9px Inter,sans-serif;letter-spacing:1px;cursor:pointer}.visitor-crosshair{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font:300 24px/1 Inter;color:rgba(255,255,255,.65)}
body.visitor-mode{overflow:hidden}.visitor-mode main{height:100svh;overflow:hidden}.visitor-mode main section.room{position:absolute;inset:0;margin:0;min-height:100svh;opacity:0;visibility:hidden;pointer-events:none;transform:translate3d(0,0,-180px) scale(.92);transition:opacity .55s,transform .8s,visibility .55s}.visitor-mode main section.room.visitor-current{opacity:1;visibility:visible;pointer-events:auto;transform:translate3d(0,0,0) scale(1)}
.visitor-mode .topbar,.visitor-mode .room-nav,.visitor-mode .scroll-progress,.visitor-mode .camera-readout{z-index:10000}.visitor-mode .house-hero{display:block}
@media(max-width:760px){.visitor-hud{top:12px;max-width:calc(100% - 120px);overflow:hidden}.visitor-hud span{display:none}.visitor-exit{top:12px;right:12px}.visitor-mode main section.room{overflow:auto}}
`;
document.head.appendChild(style);
let index=0,active=false,x=0,y=0,z=0,yaw=0,pitch=0,keys=new Set(),last=performance.now();
const setRoom=i=>{index=(i+sections.length)%sections.length;sections.forEach((s,n)=>s.classList.toggle('visitor-current',n===index));document.querySelector('.room-nav-label')?.replaceChildren(document.createTextNode(`${String(index+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`));document.querySelectorAll('.room-dots a').forEach((d,n)=>d.classList.toggle('active',n===index));document.querySelector('.camera-readout span')?.replaceChildren(document.createTextNode(`VISITOR CAMERA · ${String(index+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`));};
const enter=()=>{if(active)return;active=true;document.body.classList.add('visitor-mode');overlay.classList.add('active');setRoom(0);x=0;y=0;z=0;yaw=0;pitch=0;};
const exit=()=>{active=false;document.body.classList.remove('visitor-mode');overlay.classList.remove('active');sections.forEach(s=>s.classList.remove('visitor-current'));window.scrollTo({top:0,behavior:'instant'});};
document.querySelector('.house-enter')?.addEventListener('click',e=>{e.preventDefault();enter()});
overlay.querySelector('.visitor-exit')?.addEventListener('click',exit);
addEventListener('keydown',e=>{if(e.key==='Escape'&&active){exit();return}if(!active)return;keys.add(e.key.toLowerCase());if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();});
addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
if(fine){addEventListener('mousemove',e=>{if(!active)return;yaw+=(e.movementX||0)*.08;pitch-=(e.movementY||0)*.045;pitch=Math.max(-18,Math.min(18,pitch));});}
sections.forEach((s,i)=>{s.addEventListener('dblclick',()=>{if(active)setRoom(i)});s.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{if(!active)return;const t=document.querySelector(a.getAttribute('href'));const n=sections.indexOf(t);if(n>=0){e.preventDefault();setRoom(n)}}));});
const tick=now=>{const dt=Math.min(.04,(now-last)/1000);last=now;if(active){const speed=reduce?.0:Math.min(5,3*dt*60);if(keys.has('w')||keys.has('arrowup'))z+=speed;if(keys.has('s')||keys.has('arrowdown'))z-=speed;if(keys.has('a')||keys.has('arrowleft'))x-=speed;if(keys.has('d')||keys.has('arrowright'))x+=speed;if(keys.has('q'))yaw-=1;if(keys.has('e'))yaw+=1;const current=sections[index];current.style.setProperty('--visitor-x',`${x}px`);current.style.setProperty('--visitor-y',`${y}px`);current.style.setProperty('--visitor-z',`${z}px`);current.style.setProperty('--visitor-yaw',`${yaw}deg`);current.style.setProperty('--visitor-pitch',`${pitch}deg`);}requestAnimationFrame(tick)};requestAnimationFrame(tick);
})();
