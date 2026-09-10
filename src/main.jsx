import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const PROFILE = {
  name: 'AsmiT Mishra',
  email: 'yourasmit108@gmail.com',
  github: 'https://github.com/yourasmit15-web',
  linkedin: 'https://www.linkedin.com/in/asmitxmishra',
  instagram: 'https://www.instagram.com/asmitx.dev',
  image: '/profile.svg',
}

const navItems = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Contact']

const projects = [
  { title: 'RAGHUVIR', type: 'AI', number: '01', description: 'An AI assistant focused on productivity, research, multi-device control, browser automation, and permission-aware workflows.', stack: ['Python', 'FastAPI', 'Docker'], href: PROFILE.github },
  { title: 'DHUN', type: 'Web', number: '02', description: 'A Spotify-inspired music experience for discovering, listening to, and sharing favorite tracks with a clean modern interface.', stack: ['React', 'Node.js', 'MongoDB'], href: PROFILE.github },
  { title: 'TROVE', type: 'Web', number: '03', description: 'A modern digital resource and content management experience built around a focused, responsive product interface.', stack: ['Next.js', 'TypeScript', 'Tailwind'], href: 'https://github.com/yourasmit15-web/TROVE' },
  { title: 'REALSENSE', type: 'Web', number: '04', description: 'A browser interaction experiment exploring user behavior, useful signals, and actionable insights.', stack: ['JavaScript', 'Extension', 'UX'], href: PROFILE.github },
  { title: 'YOUTUBE TRIMMER', type: 'Web', number: '05', description: 'A focused utility experiment for simple, precise video trimming workflows directly in the browser.', stack: ['React', 'Media', 'Web'], href: PROFILE.github },
  { title: 'MEDINFOAI', type: 'AI', number: '06', description: 'An AI/ML experiment exploring image-based information workflows and practical computer-vision ideas.', stack: ['Python', 'AI/ML', 'Vision'], href: PROFILE.github },
]

const skills = [
  ['React', 'RE'], ['Next.js', 'NX'], ['TypeScript', 'TS'], ['JavaScript', 'JS'],
  ['Node.js', 'ND'], ['Python', 'PY'], ['MongoDB', 'MG'], ['PostgreSQL', 'PG'],
  ['Tailwind CSS', 'TW'], ['Git & GitHub', 'GH'], ['Docker', 'DK'], ['AI / ML', 'AI'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }
function Mark({ children }) { return <span className="mark" aria-hidden="true">{children}</span> }

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('asmit-theme') === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState('Home')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('asmit-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.toLowerCase())).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id.charAt(0).toUpperCase() + visible.target.id.slice(1))
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.2, 0.5] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element))
    return () => reveal.disconnect()
  }, [])

  const filteredProjects = projects.filter((project) => filter === 'All' || project.type === filter)

  const goTo = (item) => {
    setMenuOpen(false)
    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <div className="blob blob-one" aria-hidden="true" />
      <div className="blob blob-two" aria-hidden="true" />

      <header className="topbar">
        <div className="nav-wrap">
          <button className="brand" onClick={() => goTo('Home')} aria-label="Go to home">
            <span className="brand-box">AM</span><span>AsmiT<span className="accent">.</span></span>
          </button>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <button key={item} className={active === item ? 'nav-item active' : 'nav-item'} onClick={() => goTo(item)}>{item}</button>)}
          </nav>
          <div className="nav-actions">
            <button className="icon-button" onClick={() => setDark((value) => !value)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? '☀' : '☾'}</button>
            <button className="talk-button" onClick={() => goTo('Contact')}>Let’s talk <Arrow /></button>
            <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
          </div>
        </div>
        {menuOpen && <div className="mobile-menu">{navItems.map((item) => <button key={item} onClick={() => goTo(item)}>{item}<Arrow /></button>)}</div>}
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="hero-copy reveal is-visible">
            <div className="status"><span className="status-dot" /> Open to opportunities & interesting builds</div>
            <p className="kicker">HELLO, I’M</p>
            <h1>AsmiT<br /><span>Mishra<span className="accent">.</span></span></h1>
            <p className="hero-lead">Full-Stack Developer & AI Enthusiast building useful products, expressive interfaces, and intelligent experiences.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => goTo('Projects')}>Explore my work <Arrow /></button>
              <a className="button button-ghost" href="./cv.html">View CV <span aria-hidden="true">↓</span></a>
            </div>
            <div className="social-row">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
              <a href={PROFILE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email">@</a>
            </div>
          </div>

          <div className="hero-art reveal is-visible" aria-label="Profile illustration">
            <div className="sun-ring ring-a" /><div className="sun-ring ring-b" />
            <div className="portrait-frame"><img src={PROFILE.image} alt="AsmiT Mishra" /></div>
            <div className="sticker sticker-react"><Mark>✦</Mark> React</div>
            <div className="sticker sticker-ai"><Mark>AI</Mark> AI / ML</div>
            <div className="sticker sticker-node"><Mark>ND</Mark> Node.js</div>
            <div className="build-sticker">BUILD<br /><b>SHIP</b><br />REPEAT</div>
            <div className="spark spark-one">✦</div><div className="spark spark-two">+</div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div>BUILD • LEARN • SHIP • REPEAT • BUILD • LEARN • SHIP • REPEAT • </div></div>

        <section id="about" className="section-pad section-grid reveal">
          <div className="section-index">01 / ABOUT</div>
          <div className="section-content two-col">
            <div><p className="eyebrow">A little about me</p><h2>Curious mind.<br /><span>Builder energy.</span></h2><p className="body-copy">I enjoy getting hands-on with software, AI, interfaces, and ideas that solve real problems. Most of what I know comes from building, breaking, fixing, experimenting, and shipping.</p><p className="body-copy">I’m still learning, still building, and always looking for the next interesting thing to make.</p></div>
            <div className="code-window"><div className="window-top"><span /><span /><span /><small>asmit.config.js</small></div><pre><code><i>const</i> asmit = {'{'}{`\n`}  name: <b>"AsmiT Mishra"</b>,{`\n`}  role: <b>"Full-Stack Developer"</b>,{`\n`}  focus: <b>"AI + Web"</b>,{`\n`}  location: <b>"India"</b>,{`\n`}  mindset: <b>"Build. Learn. Repeat."</b>{`\n`}{'}'}</code></pre></div>
          </div>
        </section>

        <section id="education" className="section-pad section-grid reveal">
          <div className="section-index">02 / EDUCATION</div>
          <div className="section-content"><p className="eyebrow">Learning by doing</p><h2>Always <span>curious.</span></h2><div className="education-grid">
            <article><span>2024 — 2027</span><h3>BCA</h3><p>Meena Shah Institute of Technology and Management</p></article>
            <article><span>2022 — 2024</span><h3>12th — PCM</h3><p>Senior secondary education</p></article>
          </div></div>
        </section>

        <section id="skills" className="section-pad section-grid reveal">
          <div className="section-index">03 / SKILLS</div>
          <div className="section-content"><div className="section-heading-row"><div><p className="eyebrow">My toolkit</p><h2>Things I use to<br /><span>make ideas real.</span></h2></div><p className="body-copy narrow">A practical stack for modern web applications, product interfaces, and AI-powered experiments.</p></div><div className="skills-grid">{skills.map(([name, code], index) => <div className="skill-card" key={name} style={{ '--delay': `${index * 35}ms` }}><Mark>{code}</Mark><span>{name}</span><b>↗</b></div>)}</div></div>
        </section>

        <section id="projects" className="section-pad section-grid reveal">
          <div className="section-index">04 / PROJECTS</div>
          <div className="section-content"><div className="section-heading-row"><div><p className="eyebrow">Selected builds</p><h2>Made with<br /><span>purpose.</span></h2></div><div className="filters">{['All', 'Web', 'AI'].map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'filter active' : 'filter'}>{item}</button>)}</div></div><div className="project-grid">{filteredProjects.map((project) => <article className="project-card" key={project.title}><div className="project-art"><span>{project.number}</span><b>{project.title.slice(0, 1)}</b><small>{project.type} PROJECT</small><i>✦</i></div><div className="project-info"><div className="project-title"><h3>{project.title}</h3><span>{project.type}</span></div><p>{project.description}</p><div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer">View project <Arrow /></a></div></article>)}</div></div>
        </section>

        <section id="contact" className="section-pad section-grid reveal contact-section">
          <div className="section-index">05 / CONTACT</div>
          <div className="section-content"><div className="contact-box"><div className="contact-copy"><p className="eyebrow">Have a project in mind?</p><h2>Let’s make<br /><span>something good.</span></h2><p className="body-copy">Whether it’s a product, an experiment, or an opportunity to collaborate — I’d love to hear about it.</p><div className="contact-links"><a href={`mailto:${PROFILE.email}`}>✉ {PROFILE.email}</a><a href={PROFILE.github} target="_blank" rel="noreferrer">⌘ github.com/yourasmit15-web</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">in linkedin.com/in/asmitxmishra</a></div></div><form className="contact-form" action="https://formsubmit.co/yourasmit108@gmail.com" method="POST"><input type="hidden" name="_subject" value="New portfolio message — AsmiT Mishra" /><input type="hidden" name="_captcha" value="false" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_next" value="https://asmit-portfolio-asmitmishra.vercel.app/#contact" /><label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label><label>Email<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label><label>Message<textarea name="message" required rows="5" placeholder="Tell me about your idea..." /></label><button className="button button-primary" type="submit">Send message <Arrow /></button></form></div></div>
        </section>
      </main>

      <footer className="footer"><div><strong>AsmiT<span className="accent">.</span></strong><span>Full-Stack Developer × AI Enthusiast</span></div><p>© 2026 AsmiT Mishra · Built with React, Vite & Tailwind CSS.</p></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
