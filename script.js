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
 const filterButtons=[...document.querySelectorAll('.filters button')];
 filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.project-card').forEach(card=>{const show=f==='all'||card.dataset.type===f;card.style.display=show?'block':'none';if(show)card.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'ease-out'})})}));
 document.querySelectorAll('.project-card,.skill-card,.timeline-item,.contact-links a').forEach(card=>card.addEventListener('pointerenter',()=>card.style.setProperty('--lift','1')));
});