document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu'), mobile=document.querySelector('.mobile-nav'), close=document.querySelector('.close');
  const setMenu=open=>{mobile.classList.toggle('open',open);mobile.setAttribute('aria-hidden',String(!open));menu.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''};
  menu?.addEventListener('click',()=>setMenu(true)); close?.addEventListener('click',()=>setMenu(false)); mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false))); document.addEventListener('keydown',e=>e.key==='Escape'&&setMenu(false));
  const items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.12});items.forEach(item=>io.observe(item))}else items.forEach(item=>item.classList.add('visible'));
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));
  const sections=[...document.querySelectorAll('main section[id]')], navLinks=[...document.querySelectorAll('.nav nav a')];
  const updateActive=()=>{let current='home';sections.forEach(s=>{if(scrollY+140>=s.offsetTop)current=s.id});navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))}; addEventListener('scroll',updateActive,{passive:true});updateActive();
  const buttons=[...document.querySelectorAll('.filters button')], cards=[...document.querySelectorAll('.project')];
  buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;cards.forEach(card=>{const show=filter==='all'||card.dataset.type===filter;card.hidden=!show})}));
});