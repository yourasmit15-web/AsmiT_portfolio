document.addEventListener('DOMContentLoaded',()=>{
 const reveals=document.querySelectorAll('.reveal');
 const revealAll=()=>reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*55,300)}ms`;el.classList.add('visible')});
 if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});reveals.forEach(e=>io.observe(e))}else revealAll();
 const menu=document.querySelector('.menu-btn'),panel=document.querySelector('.mobile-menu'),close=document.querySelector('.close-menu');
 const setMenu=open=>{panel.classList.toggle('open',open);panel.setAttribute('aria-hidden',String(!open));menu?.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)};
 menu?.addEventListener('click',()=>setMenu(true));close?.addEventListener('click',()=>setMenu(false));panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
 const links=[...document.querySelectorAll('.desktop-nav a')];const sections=[...document.querySelectorAll('main section[id]')];
 const active=()=>{let current='home';sections.forEach(s=>{if(scrollY+180>=s.offsetTop)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`))};addEventListener('scroll',active,{passive:true});active();
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}}));
 document.querySelectorAll('.project-filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.project-filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.project-card').forEach(card=>{card.style.display=f==='all'||card.dataset.type===f?'block':'none'})}));
 const play=document.querySelector('#play'),prev=document.querySelector('#prev'),next=document.querySelector('#next'),name=document.querySelector('#trackName');
 const tracks=['DHUN • BAR PAR (KALAAKAAR)','DHUN • BUILD • LEARN • SHIP','ASMIT • CODING MODE'];let idx=0,playing=false;
 const render=()=>{name.textContent=tracks[idx];play.textContent=playing?'Ⅱ':'▶'};play?.addEventListener('click',()=>{playing=!playing;render()});next?.addEventListener('click',()=>{idx=(idx+1)%tracks.length;playing=true;render()});prev?.addEventListener('click',()=>{idx=(idx-1+tracks.length)%tracks.length;playing=true;render()});document.querySelector('#info')?.addEventListener('click',()=>alert('Music player UI — connect your own audio files to enable playback.'));render();
});