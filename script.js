document.addEventListener('DOMContentLoaded',()=>{
 const reveals=document.querySelectorAll('.reveal');
 const show=e=>e.classList.add('visible');
 if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){show(e.target);io.unobserve(e.target)}}),{threshold:.08});reveals.forEach(e=>io.observe(e));}else reveals.forEach(show);
 const menu=document.querySelector('.menu-btn'),panel=document.querySelector('.mobile-menu'),close=document.querySelector('.close-menu');
 const setMenu=open=>{panel?.classList.toggle('open',open);panel?.setAttribute('aria-hidden',String(!open));menu?.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''};
 menu?.addEventListener('click',()=>setMenu(true));close?.addEventListener('click',()=>setMenu(false));panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
 // Reference-style top corners: hamburger/menu stays at top-left, music stays at top-right, and the name is removed from the menu area.
 if(menu){Object.assign(menu.style,{display:'grid',position:'fixed',left:'10px',right:'auto',top:'10px',zIndex:'700'});menu.setAttribute('aria-label','Open menu');}
 const brand=document.querySelector('.brand');if(brand)brand.style.display='none';
 const music=document.querySelector('.music-player');if(music)Object.assign(music.style,{position:'fixed',right:'10px',left:'auto',top:'10px',bottom:'auto',zIndex:'690'});
 const links=[...document.querySelectorAll('.desktop-nav a')],sections=[...document.querySelectorAll('main section[id]')];
 const active=()=>{let current='home';sections.forEach(s=>{if(scrollY+180>=s.offsetTop)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`))};addEventListener('scroll',active,{passive:true});active();
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}}));
 const filterButtons=document.querySelectorAll('.filters button');
 filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.project-card').forEach(card=>{card.style.display=f==='all'||card.dataset.type===f?'block':'none'})}));
 const play=document.querySelector('#play'),prev=document.querySelector('#prev'),next=document.querySelector('#next'),name=document.querySelector('#trackName');
 const tracks=['DHUN • BAR PAR (KALAAKAAR)','DHUN • BUILD • LEARN • SHIP','ASMIT • CODING MODE'];let idx=0,playing=false,audioCtx=null,master=null,timer=null,step=0;
 const melody=[[261.63,329.63,392],[293.66,349.23,440],[329.63,392,493.88],[392,493.88,587],[349.23,440,523.25],[329.63,392,493.88],[293.66,349.23,440],[261.63,329.63,392]];
 const startAudio=()=>{if(!audioCtx){audioCtx=new(window.AudioContext||window.webkitAudioContext)();master=audioCtx.createGain();master.gain.value=.045;master.connect(audioCtx.destination)}if(audioCtx.state==='suspended')audioCtx.resume();if(timer)return;step=0;const tick=()=>{if(!playing)return;const now=audioCtx.currentTime,chord=melody[step%melody.length];chord.forEach((freq,j)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=j===0?'triangle':'sine';o.frequency.value=freq*(idx===1?1.002:1);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(j===0?.055:.025,now+.025);g.gain.exponentialRampToValueAtTime(.0001,now+.48);o.connect(g).connect(master);o.start(now);o.stop(now+.5)});step++;timer=setTimeout(()=>{timer=null;tick()},500)};tick()};
 const stopAudio=()=>{if(timer){clearTimeout(timer);timer=null}playing=false};const render=()=>{if(name)name.textContent=tracks[idx];if(play)play.textContent=playing?'Ⅱ':'▶'};
 play?.addEventListener('click',()=>{playing=!playing;if(playing)startAudio();else stopAudio();render()});next?.addEventListener('click',()=>{idx=(idx+1)%tracks.length;playing=true;startAudio();render()});prev?.addEventListener('click',()=>{idx=(idx-1+tracks.length)%tracks.length;playing=true;startAudio();render()});document.querySelector('#info')?.addEventListener('click',()=>alert('Original AsmiT portfolio soundtrack. Tap ▶ to play or Ⅱ to pause.'));document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){stopAudio();render()}});render();

 // Hard layout overrides so the controls match the requested reference placement on every breakpoint.
 const style=document.createElement('style');style.textContent=`
 .menu-btn{display:grid!important;place-items:center!important;position:fixed!important;left:10px!important;right:auto!important;top:10px!important;z-index:700!important}
 .music-player{position:fixed!important;right:10px!important;left:auto!important;top:10px!important;bottom:auto!important;z-index:690!important}
 .brand{display:none!important}
 @media(max-width:900px){.topbar{height:0!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important}.menu-btn,.music-player{pointer-events:auto!important}.desktop-nav,.header-cta{display:none!important}.music-player{max-width:calc(100vw - 62px)!important}}
 @media(max-width:480px){.menu-btn{left:8px!important;top:8px!important;width:40px!important;height:40px!important}.music-player{right:8px!important;top:8px!important;max-width:calc(100vw - 58px)!important}.music-player .track b{font-size:8px!important}}
 `;document.head.appendChild(style);
});