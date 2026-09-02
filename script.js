document.addEventListener('DOMContentLoaded',()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fine=matchMedia('(pointer:fine)').matches;
 const reveals=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window&&!reduce){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -30px'});reveals.forEach(e=>io.observe(e))}else reveals.forEach(e=>e.classList.add('visible'));
 const menu=document.querySelector('.menu-btn'),panel=document.querySelector('.mobile-menu'),close=document.querySelector('.close-menu');
 const setMenu=open=>{panel?.classList.toggle('open',open);panel?.setAttribute('aria-hidden',String(!open));menu?.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''};
 menu?.addEventListener('click',()=>setMenu(true));close?.addEventListener('click',()=>setMenu(false));panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
 const links=[...document.querySelectorAll('.desktop-nav a')],dots=[...document.querySelectorAll('.room-dots a')],sections=[...document.querySelectorAll('main section[id]')],roomLabel=document.querySelector('.room-nav-label');
 const active=()=>{let current='home',index=0;sections.forEach((s,i)=>{if(scrollY+innerHeight*.38>=s.offsetTop){current=s.id;index=i}});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));dots.forEach((a,i)=>a.classList.toggle('active',i===index));if(roomLabel)roomLabel.textContent=`${String(index+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`};
 addEventListener('scroll',active,{passive:true});addEventListener('resize',active);active();
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(!href||href==='#')return;const t=document.querySelector(href);if(t){e.preventDefault();t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})}}));
 const progress=document.querySelector('.scroll-progress');
 const updateProgress=()=>{if(progress){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max)*100:0}%`}};addEventListener('scroll',updateProgress,{passive:true});updateProgress();
 const glow=document.querySelector('.cursor-glow');
 if(glow&&fine&&!reduce){let gx=innerWidth/2,gy=innerHeight/2,tx=gx,ty=gy;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const move=()=>{gx+=(tx-gx)*.14;gy+=(ty-gy)*.14;glow.style.left=gx+'px';glow.style.top=gy+'px';requestAnimationFrame(move)};move()}
 // Project room filters.
 const filters=document.querySelectorAll('.filter'),cards=document.querySelectorAll('.project-card');
 filters.forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.filter;filters.forEach(b=>b.classList.toggle('active',b===button));cards.forEach(card=>{const show=value==='all'||card.dataset.category===value;card.classList.toggle('is-hidden',!show);if(show&&!reduce){card.animate([{opacity:.15,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'})}})}));
 // Desktop 3D card tilt; the room itself stays stable for better usability.
 if(fine&&!reduce){document.querySelectorAll('.project-card,.skill-card,.facts div,.experience-card,.contact-links a').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-7px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateZ(12px)`},{passive:true});card.addEventListener('pointerleave',()=>card.style.removeProperty('transform'))})}
 // Hero visual follows the pointer with a restrained depth shift.
 if(fine&&!reduce){const visual=document.querySelector('.hero-visual');if(visual){visual.addEventListener('pointermove',e=>{const r=visual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;visual.style.transform=`translateZ(55px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg)`},{passive:true});visual.addEventListener('pointerleave',()=>visual.style.removeProperty('transform'))}}
 // Keep external links safe and consistent.
 document.querySelectorAll('a[target="_blank"]').forEach(a=>a.setAttribute('rel','noopener noreferrer'));
});