# AsmiT Mishra — Personal Portfolio

> A modern, responsive portfolio for a full-stack developer and AI enthusiast.

<p align="center">
  <strong>Build · Learn · Ship · Repeat</strong>
</p>

<p align="center">
  React · Vite · Tailwind CSS · FormSubmit
</p>

---

## ✦ About

This repository contains my personal portfolio website — a lightweight single-page experience designed to present my work, skills, education, experience, and contact details without unnecessary complexity.

The visual direction is intentionally minimal with a little personality: oversized typography, violet accents, glassy navigation, floating tech badges, subtle motion, project cards, and a full light/dark theme.

### Highlights

- **Responsive by default** — desktop, tablet, and mobile layouts
- **Light / dark theme** — preference persisted in `localStorage`
- **Animated UI** — reveal-on-scroll, hover states, floating badges, orbit details, and marquee motion
- **Accessible navigation** — keyboard-friendly buttons, labels, focus states, and reduced-motion support
- **Project filtering** — All / Web / AI
- **FormSubmit contact form** — messages are delivered to the configured email address
- **Static deployment friendly** — no database or server required
- **Easy to customize** — portfolio content is centralized near the top of `src/main.jsx`

---

## 🧰 Tech Stack

| Technology | Purpose |
| --- | --- |
| [React](https://react.dev/) | UI and component structure |
| [Vite](https://vite.dev/) | Development server and production build |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS foundation |
| CSS | Custom visual system, animations, responsive behavior |
| FormSubmit | Contact form delivery |

---

## 📁 Project Structure

```text
AsmiT_portfolio/
├── public/
│   └── profile.svg          # Profile artwork / image frame
├── src/
│   ├── main.jsx             # Portfolio content + React UI
│   └── index.css            # Design system + responsive styling
├── cv.html                  # Printable CV page
├── index.html               # HTML shell + metadata
├── package.json             # Scripts and dependencies
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

---

## 🚀 Run Locally

### 1. Clone

```bash
git clone https://github.com/yourasmit15-web/AsmiT_portfolio.git
cd AsmiT_portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

### 4. Production build

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## ✏️ Updating My Content

Most personal content lives at the top of `src/main.jsx`.

Update:

- `PROFILE` for social links and email
- `projects` for project names, descriptions, technologies, and URLs
- `skills` for the current toolkit
- Experience and education cards in the JSX sections
- `public/profile.svg` when replacing the profile artwork
- `cv.html` when updating the printable CV

The CSS design tokens are defined near the top of `src/index.css`, making it straightforward to change the accent, background, borders, and typography treatment.

---

## ✉️ Contact Form

The contact form uses FormSubmit, so the site does not need a custom backend.

The form is configured for:

```text
yourasmit108@gmail.com
```

Before production use, verify the destination email with FormSubmit if required by their current activation flow.

---

## 🎨 Design System

The interface follows a small set of reusable ideas:

- **Violet accent** for actions and important information
- **Neutral surfaces** so projects and typography remain the focus
- **Large editorial type** for a strong personal identity
- **Rounded cards** with restrained borders and shadows
- **Motion with restraint** so animation supports hierarchy instead of distracting from it
- **Reduced-motion support** through `prefers-reduced-motion`

---

## 📱 Responsive Behavior

The layout adapts at mobile and tablet breakpoints:

- Desktop navigation collapses into a mobile menu
- Hero artwork scales without overflowing the viewport
- Two-column content becomes a single column
- Project and education grids collapse cleanly
- Contact form stacks below the intro
- Footer content wraps for narrow screens

---

## 🔗 Links

- GitHub: https://github.com/yourasmit15-web
- LinkedIn: https://www.linkedin.com/in/asmitxmishra
- Instagram: https://www.instagram.com/asmitx.dev
- Email: yourasmit108@gmail.com

---

## 📄 License

This is a personal portfolio project. The source is public for reference and learning; please do not reuse my personal content, identity, photographs, or branding as your own.

---

<p align="center">
  <sub>Designed & built by AsmiT Mishra with React, Vite, Tailwind CSS, and lots of ☕</sub>
</p>
