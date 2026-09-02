document.addEventListener('DOMContentLoaded',()=>{
 const reveals=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});reveals.forEach(e=>io.observe(e))}else reveals.forEach(e=>e.classList.add('visible'));
 const menu=document.querySelector('.menu-btn'),panel=document.querySelector('.mobile-menu'),close=document.querySelector('.close-menu');
 const setMenu=open=>{panel?.classList.toggle('open',open);panel?.setAttribute('aria-hidden',String(!open));menu?.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''};
 menu?.addEventListener('click',()=>setMenu(true));close?.addEventListener('click',()=>setMenu(false));panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
 const links=[...document.querySelectorAll('.desktop-nav a')],sections=[...document.querySelectorAll('main section[id]')];
 const active=()=>{let current='home';sections.forEach(s=>{if(scrollY+180>=s.offsetTop)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`))};addEventListener('scroll',active,{passive:true});active();
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}}));
 const progress=document.querySelector('.scroll-progress');
 addEventListener('scroll',()=>{if(progress){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max)*100:0}%`;}},{passive:true});
 const glow=document.querySelector('.cursor-glow');
 if(glow&&matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'})}
 // Desktop 3D room parallax: the room subtly tilts toward the pointer, while content stays readable.
 if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const rooms=[document.querySelector('.hero'),...document.querySelectorAll('.section')].filter(Boolean);
  let px=0,py=0,raf=0;
  addEventListener('pointermove',e=>{px=(e.clientX/innerWidth-.5);py=(e.clientY/innerHeight-.5);if(!raf)raf=requestAnimationFrame(()=>{rooms.forEach((room,i)=>{const strength=i===0?2.8:1.35;room.style.transform=`rotateX(${(-py*strength).toFixed(2)}deg) rotateY(${(px*strength).toFixed(2)}deg)`});raf=0})},{passive:true});
  addEventListener('pointerleave',()=>rooms.forEach(room=>room.style.transform=''),{passive:true});
 }
 // Give interactive cards a small magnetic lift.
 document.querySelectorAll('.project-card,.skill-card,.contact-links a').forEach(card=>{
  card.addEventListener('pointermove',e=>{if(!matchMedia('(pointer:fine)').matches)return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-8px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateZ(12px)`},{passive:true});
  card.addEventListener('pointerleave',()=>card.style.removeProperty('transform'));
 });
});