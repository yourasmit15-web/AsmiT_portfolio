/* ASMIT ICON SYSTEM — lightweight inline SVG icons, no icon-library dependency. */
const icon=(d,cls='')=>`<svg class="ui-icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS={
 home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
 about:'<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>',
 skills:'<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 4-4 16"/>',
 projects:'<path d="M4 7h16v13H4z"/><path d="M8 7V4h8v3"/><path d="M4 12h16"/>',
 experience:'<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
 certificates:'<path d="M6 3h12v18l-6-3-6 3z"/><path d="m9 10 2 2 4-4"/>',
 github:'<path d="M15 22v-4c0-1.4-.5-2.3-1.4-3 4.5-.5 5.1-3.7 5.1-6.1 0-1.2-.4-2.2-1.2-3.1.1-.3.5-1.6-.1-3.3 0 0-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C7.2 2.2 6.2 2.5 6.2 2.5c-.6 1.7-.2 3-.1 3.3C5.3 6.7 5 7.7 5 8.9c0 2.4.6 5.6 5.1 6.1-.9.7-1.4 1.6-1.4 3v4"/>' ,
 contact:'<path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/>',
 code:'<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/>',
 brain:'<path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5 3 3 0 0 0 3 5h2"/><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 5 3 3 0 0 1-3 5h-2"/><path d="M9 4v16M15 4v16M6 9h3M15 9h3M6 15h3M15 15h3"/>',
 html:'<path d="m4 5 8 14L20 5"/><path d="M7 13h10"/>',
 css:'<path d="M5 3h14l-1.5 17L12 22l-5.5-2z"/><path d="M8 8h8l-.4 4H9l-.4 4h6.2"/>',
 js:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17v-5m0 5c0 1-1 2-2 2s-2-1-2-2m7-6v6c0 1 1 2 2 2s2-1 2-2v-2"/>',
 react:'<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>',
 node:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m8 9 4 2 4-2M12 11v5"/>',
 python:'<path d="M12 3c-4 0-5 1.8-5 4v3h5v2H5c-2 0-3 1.5-3 4s1 5 5 5h3v-3c0-2 1.5-4 4-4h3c2 0 3-1.5 3-4V7c0-2-1.5-4-5-4z"/><circle cx="9" cy="6.5" r=".7" fill="currentColor" stroke="none"/><circle cx="15" cy="17.5" r=".7" fill="currentColor" stroke="none"/>',
 sql:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
 git:'<path d="M12 2 22 12 12 22 2 12z"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><path d="m10 10 4 4"/>',
 linux:'<path d="M12 3c-3 0-5 3-5 7 0 3-2 5-3 7 3 2 5 1 7 0 2 1 4 2 7 0-1-2-3-4-3-7 0-4-2-7-3-7z"/><path d="M9 10h.01M15 10h.01"/><path d="M10 14c1 .7 3 .7 4 0"/>',
 api:'<path d="M4 7h16M4 12h10M4 17h16"/><circle cx="18" cy="12" r="2"/>',
 uiux:'<path d="M4 4h16v16H4z"/><path d="M4 9h16M9 4v16"/><circle cx="14" cy="14" r="2"/>',
 ai:'<path d="M7 7h10v10H7z"/><path d="M9 2v3m6-3v3m0 14v3m-6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/><path d="m9 12 2 2 4-4"/>'
};
const skillIconMap={HTML:'html',CSS:'css','JAVASCRIPT':'js','REACT':'react','NODE.JS':'node','PYTHON':'python','MACHINE LEARNING':'brain','SQL':'sql','APIs':'api','GIT':'git','GITHUB':'github','LINUX':'linux','UI / UX':'uiux','GENERATIVE AI':'ai','FIREBASE':'code'};
function injectIcons(){
 document.querySelectorAll('.section-head').forEach(h=>{if(h.querySelector('.section-icon'))return;const label=h.querySelector('b');if(!label)return;const key=({ABOUT:'about',SKILLS:'skills',PROJECTS:'projects','AI LAB':'ai',EXPERIENCE:'experience',CERTIFICATES:'certificates',GITHUB:'github',CONTACT:'contact'})[label.textContent.trim()]||'code';label.insertAdjacentHTML('afterbegin',`<span class="section-icon">${icon(ICONS[key])}</span> `)});
 document.querySelectorAll('.nav nav a,.mobile-menu a').forEach(a=>{const key=(a.textContent||'').trim().toLowerCase();const svg=key==='home'?ICONS.home:key==='about'?ICONS.about:key==='skills'?ICONS.skills:key==='projects'?ICONS.projects:key==='experience'?ICONS.experience:key==='certificates'?ICONS.certificates:key==='contact'?ICONS.contact:null;if(svg&&!a.querySelector('svg'))a.insertAdjacentHTML('afterbegin',icon(svg))});
 document.querySelectorAll('.skill').forEach(s=>{if(s.querySelector('.skill-icon'))return;const name=s.querySelector('b')?.textContent?.trim();const key=skillIconMap[name]||'code';s.insertAdjacentHTML('afterbegin',`<span class="skill-icon">${icon(ICONS[key])}</span>`)});
 document.querySelectorAll('.project').forEach(p=>{if(p.querySelector('.project-icon'))return;p.insertAdjacentHTML('afterbegin',`<span class="project-icon">${icon(ICONS.projects)}</span>`)});
 document.querySelectorAll('.repo').forEach(p=>{if(p.querySelector('.repo-icon'))return;p.insertAdjacentHTML('afterbegin',`<span class="repo-icon">${icon(ICONS.github)}</span>`)});
 document.querySelectorAll('.contact-links a').forEach(a=>{if(a.querySelector('svg'))return;const k=a.firstChild?.textContent?.trim().toLowerCase();a.insertAdjacentHTML('afterbegin',icon(ICONS[k==='email'?'contact':k==='github'?'github':k==='linkedin'?'code':'code']))});
}
injectIcons();
new MutationObserver(injectIcons).observe(document.body,{childList:true,subtree:true});
