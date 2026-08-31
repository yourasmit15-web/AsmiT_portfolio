const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});
reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*45,220)}ms`;observer.observe(el)});

const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>20);
  const sections=[...document.querySelectorAll('main section[id]')];
  const current=sections.reverse().find(s=>window.scrollY+140>=s.offsetTop)?.id||'home';
  document.querySelectorAll('.site-header nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
},{passive:true});

const themeButton=document.querySelector('.theme-dot');
themeButton?.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  themeButton.textContent=document.body.classList.contains('light')?'☀':'☾';
});

document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(!target)return;e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});
}));

document.querySelectorAll('.filters button').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('selected'));button.classList.add('selected');
}));
