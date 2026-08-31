document.addEventListener('DOMContentLoaded',()=>{
  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
    reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*35,180)}ms`;observer.observe(el)});
  }else reveals.forEach(el=>el.classList.add('visible'));

  const header=document.querySelector('.site-header');
  const menu=document.querySelector('.menu-toggle');
  menu?.addEventListener('click',()=>{
    const open=header.classList.toggle('nav-open');
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close menu':'Open menu');
    menu.textContent=open?'×':'☰';
  });

  document.querySelectorAll('.site-header nav a').forEach(link=>link.addEventListener('click',()=>{
    header.classList.remove('nav-open');
    menu?.setAttribute('aria-expanded','false');
    if(menu)menu.textContent='☰';
  }));

  const sections=[...document.querySelectorAll('main section[id]')];
  const updateActive=()=>{
    header?.classList.toggle('scrolled',window.scrollY>20);
    let current='home';
    for(const section of sections){if(window.scrollY+160>=section.offsetTop)current=section.id}
    document.querySelectorAll('.site-header nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
  };
  window.addEventListener('scroll',updateActive,{passive:true});
  updateActive();

  const themeButton=document.querySelector('.theme-dot');
  themeButton?.addEventListener('click',()=>{
    document.body.classList.toggle('light');
    themeButton.textContent=document.body.classList.contains('light')?'☀':'☾';
  });

  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(!target)return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  const cards=[...document.querySelectorAll('.project-card')];
  document.querySelectorAll('.filters button').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('selected'));
    button.classList.add('selected');
    const filter=button.textContent.trim().toLowerCase();
    cards.forEach(card=>{
      const category=card.querySelector('em')?.textContent.toLowerCase()||'';
      const show=filter==='all'||(filter==='web apps'&&category.includes('web'))||(filter==='ai/ml'&&category.includes('ai'))||(filter==='others'&&!category.includes('web')&&!category.includes('ai'));
      card.style.display=show?'flex':'none';
    });
  }));
});