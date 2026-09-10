import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const profileImage = '/profile.svg'

const projects = [
  { title: 'Raghuvir', type: 'AI / Web', text: 'An AI-powered assistant concept for productivity, research, and automation.', tags: ['Next.js', 'OpenAI', 'PostgreSQL'], href: 'https://github.com/yourasmit15-web?tab=repositories' },
  { title: 'Dhun', type: 'Web App', text: 'A music platform for discovering, listening to, and sharing favorite tracks.', tags: ['React', 'Node.js', 'MongoDB'], href: 'https://github.com/yourasmit15-web?tab=repositories' },
  { title: 'Trove', type: 'Web App', text: 'A modern digital resource and content management experience.', tags: ['Next.js', 'TypeScript', 'Tailwind'], href: 'https://github.com/yourasmit15-web/TROVE' },
  { title: 'RealSense', type: 'Extension', text: 'A browser interaction experiment turning user behavior into actionable insights.', tags: ['JavaScript', 'Extension', 'UX'], href: 'https://github.com/yourasmit15-web?tab=repositories' },
  { title: 'YouTube Trimmer', type: 'Web App', text: 'A focused utility experiment for precise video trimming workflows.', tags: ['React', 'Media', 'Web'], href: 'https://github.com/yourasmit15-web?tab=repositories' },
  { title: 'MedInfoAI', type: 'AI / ML', text: 'An AI/ML experiment exploring image-based information workflows.', tags: ['Python', 'AI/ML', 'Vision'], href: 'https://github.com/yourasmit15-web?tab=repositories' },
]

const skills = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Git', 'Docker', 'AI / ML']

function Icon({ children }) { return <span className="icon" aria-hidden="true">{children}</span> }

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('asmit-theme') !== 'light')
  const [menu, setMenu] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('asmit-theme', dark ? 'dark' : 'light')
  }, [dark])

  const filtered = projects.filter(p => activeFilter === 'All' || p.type.includes(activeFilter))

  return (
    <div className="min-h-screen bg-surface text-ink transition-colors duration-500">
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-line bg-panel/85 px-4 py-3 shadow-glass backdrop-blur-xl sm:px-6">
          <a href="#home" className="flex items-center gap-3 font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet text-white shadow-glow">AM</span><span className="hidden sm:block">AsmiT<span className="text-violet">.</span></span></a>
          <nav className="hidden items-center gap-7 text-sm text-muted md:flex">{['Home','About','Experience','Education','Skills','Projects','Contact'].map(x => <a key={x} className="nav-link" href={'#'+x.toLowerCase()}>{x}</a>)}</nav>
          <div className="flex items-center gap-2"><a href="#contact" className="hidden rounded-full bg-violet px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-glow sm:inline-flex">Let’s Talk →</a><button onClick={() => setDark(v=>!v)} className="theme-btn" aria-label="Toggle theme">{dark ? '☀' : '☾'}</button><button onClick={()=>setMenu(v=>!v)} className="theme-btn md:hidden" aria-label="Toggle menu">{menu ? '×' : '☰'}</button></div>
        </div>
        {menu && <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-panel p-3 shadow-glass md:hidden">{['Home','About','Experience','Education','Skills','Projects','Contact'].map(x => <a onClick={()=>setMenu(false)} key={x} href={'#'+x.toLowerCase()} className="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-soft">{x}</a>)}</div>}
      </header>

      <main>
        <section id="home" className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.05fr_.95fr] lg:pt-28">
          <div className="reveal">
            <span className="eyebrow"><span className="pulse-dot" /> Available for opportunities</span>
            <p className="mt-7 text-sm font-semibold text-muted">Hi, I’m</p>
            <h1 className="hero-title">AsmiT<br/><span className="gradient-text">Mishra.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted sm:text-xl">Full-Stack Developer & AI Enthusiast. I build intelligent, scalable and impactful digital solutions that turn real problems into useful products.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="btn-primary" href="#projects">Explore My Work →</a><a className="btn-secondary" href="./cv.html">Download CV ↓</a></div>
            <div className="mt-7 flex gap-3"><a className="social" href="https://github.com/yourasmit15-web" aria-label="GitHub">GH</a><a className="social" href="https://www.linkedin.com/in/asmitxmishra" aria-label="LinkedIn">in</a><a className="social" href="https://www.instagram.com/asmitx.dev" aria-label="Instagram">◎</a><a className="social" href="mailto:yourasmit108@gmail.com" aria-label="Email">@</a></div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px] reveal delay-1">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="hero-photo"><img src={profileImage} alt="AsmiT Mishra" /></div>
            <div className="float-badge badge-react">⚛ React</div><div className="float-badge badge-ai">✦ AI / ML</div><div className="float-badge badge-node">⬡ Node.js</div><div className="float-badge badge-build">BUILD<br/><b>SHIP</b><br/>REPEAT</div>
          </div>
        </section>

        <div className="ticker"><div>BUILD • LEARN • SHIP • REPEAT • BUILD • LEARN • SHIP • REPEAT • </div></div>

        <section id="about" className="section-shell"><div className="section-label">01 / ABOUT ME</div><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div><h2 className="section-title">Hey, glad you<br/><span>made it here 👋</span></h2><div className="space-y-5 text-muted leading-7"><p>I’m a developer who enjoys getting hands-on with software, AI, interfaces, and ideas that solve real problems.</p><p>Most of what I know comes from building, breaking, fixing, experimenting, and shipping. I’m still learning, still building, and always looking for the next interesting thing to make.</p></div></div><div className="code-card"><div className="code-dots"><i/><i/><i/></div><pre><span>const</span> asmit = {'{'}
  name: <b>"AsmiT Mishra"</b>,
  role: <b>"Full-Stack Developer"</b>,
  focus: <b>"AI + Web"</b>,
  location: <b>"India"</b>,
  mindset: <b>"Build. Learn. Repeat."</b>
{'}'}</pre></div></div></section>

        <section id="experience" className="section-shell"><div className="section-label">02 / EXPERIENCE</div><div className="grid gap-5 md:grid-cols-2"><article className="timeline-card"><span className="date">JAN — APR 2026</span><h3>Full-Stack Developer Intern</h3><p className="text-violet font-semibold">Hivdes (Just Inc.)</p><p className="text-muted">Built and maintained web experiences, enhanced existing features, fixed issues, and worked across the product stack.</p></article><article className="timeline-card"><span className="date">ONGOING</span><h3>Independent Builder</h3><p className="text-violet font-semibold">AI • Web • Creative Tech</p><p className="text-muted">Building projects, experimenting with AI workflows, and turning ideas into responsive digital products.</p></article></div></section>

        <section id="education" className="section-shell"><div className="section-label">03 / EDUCATION</div><div className="grid gap-4 md:grid-cols-2">{[['B.Tech / CSE','Nitte Meenakshi Institute of Technology','2025 — Present'],['Diploma — Programming & Data Science','IIT Madras','2023 — 2025'],['Pre-University','St. Aloysius College','2020 — 2022'],['Secondary School','Aditya Birla Public School','2010 — 2020']].map(([degree,school,year])=><article key={school} className="edu-card"><span>{year}</span><h3>{degree}</h3><p>{school}</p></article>)}</div></section>

        <section id="skills" className="section-shell"><div className="section-label">04 / SKILL STACK</div><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="section-title">Tools I use to<br/><span>build things.</span></h2><p className="max-w-md text-muted">A practical stack for modern, scalable web applications and AI-powered experiments.</p></div><div className="mt-8 flex flex-wrap gap-3">{skills.map((skill,i)=><span className="skill-pill" key={skill} style={{'--i':i}}><span>{['⚛','N','TS','JS','⬡','🐍','◉','PG','≈','◆','◫','✦'][i]}</span>{skill}</span>)}</div></section>

        <section id="projects" className="section-shell"><div className="section-label">05 / PROJECTS</div><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><h2 className="section-title">Things I’ve<br/><span>built.</span></h2></div><div className="filter-row">{['All','Web','AI / ML'].map(f=><button key={f} onClick={()=>setActiveFilter(f)} className={activeFilter===f?'filter active':'filter'}>{f}</button>)}</div></div><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((p,i)=><article className="project-card" key={p.title}><div className="project-visual"><span>0{i+1}</span><strong>{p.title.slice(0,1)}</strong><small>{p.type}</small></div><div className="p-6"><div className="mb-3 flex items-center justify-between"><h3 className="text-lg font-black">{p.title}</h3><span className="project-type">{p.type}</span></div><p className="min-h-14 text-sm leading-6 text-muted">{p.text}</p><div className="mt-5 flex flex-wrap gap-2">{p.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div><a className="project-link" href={p.href} target="_blank" rel="noreferrer">View Project →</a></div></article>)}</div></section>

        <section id="contact" className="section-shell pb-24"><div className="contact-panel"><div><div className="section-label">06 / CONTACT</div><h2 className="section-title">Let’s build something<br/><span>amazing together.</span></h2><p className="mt-5 max-w-lg text-muted leading-7">Have an idea, a role, or a project worth exploring? Send me a message and let’s talk.</p><div className="mt-8 space-y-3 text-sm"><a className="contact-link" href="mailto:yourasmit108@gmail.com">✉ yourasmit108@gmail.com</a><a className="contact-link" href="https://github.com/yourasmit15-web">⌘ github.com/yourasmit15-web</a><a className="contact-link" href="https://www.linkedin.com/in/asmitxmishra">in linkedin.com/in/asmitxmishra</a></div></div><form className="form-card" action="https://formsubmit.co/yourasmit108@gmail.com" method="POST"><input type="hidden" name="_subject" value="New portfolio message — AsmiT Mishra"/><input type="hidden" name="_captcha" value="false"/><input type="hidden" name="_template" value="table"/><input type="hidden" name="_next" value="https://yourasmit15-web.github.io/AsmiT_portfolio/#contact"/><div className="grid gap-3 sm:grid-cols-2"><input required name="name" placeholder="Your name"/><input required type="email" name="email" placeholder="Your email"/></div><textarea required name="message" rows="6" placeholder="Tell me about your idea..."/><button className="btn-primary w-full" type="submit">Send Message ↗</button></form></div></section>
      </main>
      <footer className="border-t border-line px-5 py-8"><div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"><span>© 2026 AsmiT Mishra. All rights reserved.</span><span>Designed & built with ♥ and lots of ☕</span></div></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
