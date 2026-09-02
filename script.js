document.addEventListener('DOMContentLoaded',()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fine=matchMedia('(pointer:fine)').matches;
 const body=document.body;
 const main=document.querySelector('main');
 const reveals=document.querySelectorAll('.reveal');
 const sections=[...document.querySelectorAll('main section[id]')];
 const links=[...document.querySelectorAll('.desktop-nav a')];
 const dots=[...document.querySelectorAll('.room-dots a')];
 const label=document.querySelector('.room-nav-label');
 const readout=document.querySelector('.camera-readout span');

 if('IntersectionObserver' in window&&!reduce){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -30px'});reveals.forEach(e=>io.observe(e));}else reveals.forEach(e=>e.classList.add('visible'));

 const menu=document.querySelector('.menu-btn'),panel=document.querySelector('.mobile-menu'),close=document.querySelector('.close-menu');
 const setMenu=open=>{panel?.classList.toggle('open',open);panel?.setAttribute('aria-hidden',String(!open));menu?.setAttribute('aria-expanded',String(open));body.style.overflow=open?'hidden':''};
 menu?.addEventListener('click',()=>setMenu(true));close?.addEventListener('click',()=>setMenu(false));panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});

 let activeIndex=0;
 const setActive=i=>{activeIndex=Math.max(0,Math.min(sections.length-1,i));const id=sections[activeIndex]?.id||'home';links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));dots.forEach((a,j)=>a.classList.toggle('active',j===activeIndex));if(label)label.textContent=`${String(activeIndex+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`;if(readout)readout.textContent=`VISITOR · ROOM ${String(activeIndex+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`;sections.forEach((s,j)=>s.classList.toggle('room-current',j===activeIndex));};
 const detect=()=>{let best=0,bestD=Infinity;sections.forEach((s,i)=>{const r=s.getBoundingClientRect(),d=Math.abs(r.top-innerHeight*.08);if(d<bestD){bestD=d;best=i}});setActive(best)};
 addEventListener('scroll',detect,{passive:true});addEventListener('resize',detect);detect();

 let travelling=false;
 const roomTravel=(target,index)=>{
   if(!target||travelling)return;
   travelling=true;setMenu(false);
   const current=sections[activeIndex];
   if(current&&current!==target)current.classList.add('room-leaving');
   target.classList.add('room-approach');
   body.classList.add('room-travel');
   if(readout)readout.textContent=`VISITOR · ENTERING ROOM ${String(index+1).padStart(2,'0')}`;
   const finish=()=>{current?.classList.remove('room-leaving');target.classList.remove('room-approach');body.classList.remove('room-travel');setActive(index);travelling=false};
   if(reduce){target.scrollIntoView({behavior:'auto',block:'start'});finish();return;}
   setTimeout(()=>target.scrollIntoView({behavior:'auto',block:'start'}),220);
   setTimeout(finish,820);
 };

 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href'),target=h&&document.querySelector(h);if(!target)return;e.preventDefault();const index=sections.indexOf(target);if(index<0)return;roomTravel(target,index)}));

 /* Home: the visitor physically approaches and opens the front door. */
 const enter=document.querySelector('.house-enter'),hero=document.querySelector('.house-hero'),door=document.querySelector('.door');
 enter?.addEventListener('click',e=>{e.preventDefault();if(travelling||hero.classList.contains('entering'))return;const target=document.querySelector('#about'),index=sections.indexOf(target);if(!target)return;hero.classList.add('entering');hero.setAttribute('aria-busy','true');door?.setAttribute('aria-label','Door opening');const text=enter.querySelector('span');if(text)text.textContent='ENTERING…';if(reduce){target.scrollIntoView();hero.classList.remove('entering');if(text)text.textContent='ENTER THE HOUSE';return;}setTimeout(()=>roomTravel(target,index),760);setTimeout(()=>{hero.classList.remove('entering');hero.removeAttribute('aria-busy');if(text)text.textContent='ENTER THE HOUSE'},1600)});

 /* Camera movement: subtle head movement follows the visitor's pointer. */
 const scene=document.querySelector('.house-scene');
 if(scene&&fine&&!reduce){let raf=0,tx=0,ty=0,x=0,y=0;scene.addEventListener('pointermove',e=>{const r=scene.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*5;ty=((e.clientY-r.top)/r.height-.5)*3.5},{passive:true});scene.addEventListener('pointerleave',()=>{tx=0;ty=0},{passive:true});const loop=()=>{x+=(tx-x)*.06;y+=(ty-y)*.06;scene.style.transform=`rotateX(${-y.toFixed(2)}deg) rotateY(${x.toFixed(2)}deg)`;requestAnimationFrame(loop)};loop()}

 /* Scroll behaves like walking: each room gains depth as it approaches the camera. */
 if(!reduce){let raf=0;const camera=()=>{raf=0;sections.forEach((s,i)=>{const r=s.getBoundingClientRect(),d=(r.top-innerHeight*.12)/innerHeight,c=Math.max(-1.25,Math.min(1.25,d));s.style.setProperty('--rx',`${(-c*1.6).toFixed(2)}deg`);s.style.setProperty('--ry',`${((i%2?-1:1)*c*.9).toFixed(2)}deg`);s.style.setProperty('--pz',`${(-Math.abs(c)*26).toFixed(1)}px`);s.style.setProperty('--py',`${(-c*5).toFixed(1)}px`)});};addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(camera)},{passive:true});camera()}

 const progress=document.querySelector('.scroll-progress');const update=()=>{if(progress){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?scrollY/max*100:0}%`}};addEventListener('scroll',update,{passive:true});update();
 const glow=document.querySelector('.cursor-glow');if(glow&&fine&&!reduce){let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const loop=()=>{x+=(tx-x)*.12;y+=(ty-y)*.12;glow.style.left=x+'px';glow.style.top=y+'px';requestAnimationFrame(loop)};loop()}
 if(fine&&!reduce)document.querySelectorAll('.project-card,.skill-card,.facts div,.experience-card,.contact-links a').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-7px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg) translateZ(16px)`},{passive:true});card.addEventListener('pointerleave',()=>card.style.removeProperty('transform'))});
 document.querySelectorAll('a[target="_blank"]').forEach(a=>a.setAttribute('rel','noopener noreferrer'));
});