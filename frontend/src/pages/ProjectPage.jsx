import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScatteredSymbolsFixed } from '../components/ScatteredSymbols.jsx'

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A PROJECT
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. Add a new entry to the PROJECTS object below (copy an existing one).
//
// 2. Give it a unique `slug` — this must match the slug in Home.jsx's PROJECTS
//    array (the `slug` field you add there).
//
// 3. Fill in all the fields:
//    - title, subtitle, year, category, tags[]
//    - role, team, duration, tools[]
//    - overview     → 1–2 paragraph project summary
//    - problem      → what challenge you were solving
//    - process[]    → array of { heading, body, image? } steps
//    - outcomes[]   → array of { stat, label } result metrics
//    - reflection   → what you learned / what you'd do differently
//    - heroImage    → path to a wide banner image  e.g. '/images/projects/myproject-hero.jpg'
//    - images[]     → additional image paths shown inline in the process section
//
// 4. Drop your images into:  frontend/public/images/projects/
//
// 5. That's it — the route /project/<slug> will render automatically.
//
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = {

  // ── EDEN PORTFOLIO ────────────────────────────────────────────────────────
  'eden-portfolio': {
    title:    'Eden Portfolio',
    subtitle: 'Designing a portfolio that actually feels like me.',
    year:     '2026',
    category: 'Design & Development',
    tags:     ['React', 'Framer Motion', 'SVG', 'CSS', 'Design Systems', 'Vite'],
    role:     'Designer & Developer',
    team:     'Solo',
    duration: 'Ongoing',
    tools:    ['React', 'Vite', 'Framer Motion', 'Figma', 'Claude Code'],
    heroImage: '',
    images:    [],
    overview: `Eden is my personal portfolio — the site you're looking at right now. Rather than reaching for a template, I designed and built the whole thing from scratch, treating it as a live design challenge: how do you communicate personality, craft, and range all in one scrolling page?

The aesthetic direction is "whimsical botanical garden" — cream backgrounds, forest greens, teal accents, scattered doodle symbols in the margins, and an organic blob-shaped portal cycling through my work. The name Eden reflects both the garden theme and a sense of a curated, personal creative space.`,

    problem: `Most portfolio templates feel interchangeable — the same dark-background grid with hover effects and a hero title. I wanted something that felt unmistakably mine: warm, a little handmade, with personality baked into every interaction. The challenge was doing this without sacrificing legibility, hierarchy, or load speed — and without it feeling "themed" in a heavy-handed way.`,

    process: [
      {
        heading: 'Direction & Aesthetic',
        body: `I started with a mood board combining three references: Alex Rivera's scrolling single-page format with numbered discipline sections, mimzywhimsy.com's casual personal warmth, and my own Figma colour palette of forest greens, teal, and cream. From that collision came the Eden direction — structured enough to read as professional, loose enough to feel like a person made it.`,
      },
      {
        heading: 'Design System',
        body: `I settled on five font families with strict rules: Berkshire Swash for decorative display headings, Stoke for named content titles, Cormorant Garamond for all body text, La Belle Aurore for the Eden brand mark, and Caveat for handwriting touches. The colour palette has nine named tokens. Having these constraints up-front meant every component decision was fast.`,
      },
      {
        heading: 'Building the Whimsy Layer',
        body: `The hardest design problem was the decorative layer — scattered unicode symbols (✦ ◇ ☆ ✿) floating in the margins, an animated morphing blob for the portal, and a loading screen where a botanical vine draws itself around a circle. Each element went through multiple iterations to feel light rather than noisy. The final symbols use only the outer 12% of the page width so they never compete with content.`,
      },
      {
        heading: 'Component Architecture',
        body: `The site is a React + Vite SPA with React Router and Framer Motion for page transitions. The homepage manages its own scroll context (height: 100vh, overflow-y: auto) to allow sticky nav, scroll-triggered reveal animations, and the symbol layer all at once. Each discipline page uses a shared DisciplineLayout component and a fixed-position symbol overlay that doesn't affect scroll height.`,
      },
      {
        heading: 'Project Case Studies',
        body: `Each project card on the homepage and discipline pages links to a case study route (/project/:slug). The ProjectPage component reads from a PROJECTS object in the same file — adding a new project means copying one data block and dropping images into /public/images/projects/. No database, no CMS, no fuss.`,
      },
    ],

    outcomes: [
      { stat: '5', label: 'Custom font families with strict usage rules' },
      { stat: '9', label: 'Named colour tokens from the Figma palette' },
      { stat: '100%', label: 'Custom-built — no templates or UI libraries' },
    ],

    reflection: `The project that taught me the most was the decorative system. I went through a lot of iterations — stipple-filled ellipses, winding vines, botanical SVGs — before landing on the right level of whimsy. "Enough to feel alive, not so much it distracts" is harder to calibrate than it sounds. I also learned that a strong design token system (fonts, colours, spacing) pays for itself immediately — every new component I added slotted in cleanly because the rules were already decided.`,
  },

  // ── EXAMPLE — copy this block and change every value ──────────────────────
  'my-first-project': {
    title:     'My First Project',
    subtitle:  'A one-line hook that makes someone want to read on.',
    year:      '2025',
    category:  'UX/UI',
    tags:      ['Figma', 'User Research', 'Prototyping'],
    role:      'Lead Designer',
    team:      'Solo',
    duration:  '8 weeks',
    tools:     ['Figma', 'Maze', 'Notion'],
    overview:  `Write 1–2 sentences here. What is this project and why does it matter? Keep it tight — this is the first thing people read.`,
    problem:   `What was broken, unclear, or painful? Who was affected and how did you discover the problem? Frame it as a story, not a list.`,
    process: [
      {
        heading: 'Discovery & Research',
        body: `Describe what you did here — user interviews, competitive analysis, desk research, etc. What did you find out?`,
        image: '/images/projects/my-first-project-research.jpg', // optional — delete line if no image
      },
      {
        heading: 'Ideation & Wireframes',
        body: `How did you move from insight to ideas? Sketches, affinity mapping, crazy-8s? What directions did you explore?`,
        image: '/images/projects/my-first-project-wireframes.jpg',
      },
      {
        heading: 'Prototyping & Testing',
        body: `What did you build and test? Who did you test with, how many sessions, what did you learn?`,
      },
      {
        heading: 'Final Design',
        body: `What did the solution look like? Highlight your key design decisions and the reasoning behind them.`,
        image: '/images/projects/my-first-project-final.jpg',
      },
    ],
    outcomes: [
      { stat: '↑ 38%', label: 'Task completion rate' },
      { stat: '↓ 4 min', label: 'Average time on task' },
      { stat: '92%', label: 'Usability test satisfaction' },
    ],
    reflection: `What would you do differently? What were the constraints? What surprised you? This section shows self-awareness and growth.`,
    heroImage: '/images/projects/my-first-project-hero.jpg',
    images: [],
  },
  // ─────────────────────────────────────────────────────────────────────────

}

/* ─── colour tokens ──────────────────────────────────────────────────────── */
const C = {
  bg:      '#E5EAD8',
  dark:    '#0A3020',
  teal:    '#186878',
  text:    '#071A12',
  muted:   'rgba(7,26,18,0.52)',
  subtle:  'rgba(7,26,18,0.12)',
}

export default function ProjectPage() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const project   = PROJECTS[slug]

  if (!project) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: C.muted, letterSpacing: 2 }}>
          Project not found.
        </p>
        <button onClick={() => navigate('/')}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: 2,
            textTransform: 'uppercase', color: C.teal, background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Back home
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ background: C.bg, height: '100vh', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
    >
      <style>{`
        .pp-body  { max-width: 780px; margin: 0 auto; padding: 0 6vw 100px; }
        .pp-hero  { width: 100%; aspect-ratio: 16/7; object-fit: cover; display: block; }
        .pp-meta  { display: flex; flex-wrap: wrap; gap: 32px; margin: 44px 0 52px; }
        .pp-meta-item label { display: block; font-family: 'Cormorant Garamond', serif; font-size: 10px;
          letter-spacing: 3px; text-transform: uppercase; color: ${C.muted}; margin-bottom: 5px; }
        .pp-meta-item span  { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: ${C.text}; }
        .pp-h2  { font-family: 'Berkshire Swash', serif; font-size: clamp(22px,3vw,32px);
          color: ${C.dark}; margin: 52px 0 14px; }
        .pp-body-text { font-family: 'Cormorant Garamond', serif; font-size: 18px; line-height: 1.8;
          color: ${C.text}; }
        .pp-step  { margin: 40px 0; }
        .pp-step h3 { font-family: 'Stoke', serif; font-size: clamp(18px,2vw,24px);
          color: ${C.teal}; margin-bottom: 12px; }
        .pp-step img { width: 100%; border-radius: 4px; margin-top: 18px; }
        .pp-outcomes { display: flex; flex-wrap: wrap; gap: 20px; margin: 28px 0; }
        .pp-outcome { flex: 1; min-width: 140px; border: 1px solid ${C.subtle};
          padding: 22px 18px; text-align: center; }
        .pp-outcome .stat  { font-family: 'Stoke', serif; font-size: 28px; color: ${C.teal}; }
        .pp-outcome .label { font-family: 'Cormorant Garamond', serif; font-size: 13px;
          color: ${C.muted}; letter-spacing: 1px; margin-top: 4px; }
        .pp-tags  { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
        .pp-tag   { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 600;
          padding: 4px 12px; border: 1px solid ${C.subtle}; color: ${C.muted}; letter-spacing: 0.5px; }
        .pp-divider { height: 1px; background: ${C.subtle}; margin: 48px 0; }
        .pp-back  { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; color: ${C.muted}; background: none;
          border: none; cursor: pointer; padding: 20px 6vw; display: block;
          transition: color 0.2s; }
        .pp-back:hover { color: ${C.teal}; }
      `}</style>

      {/* Back button */}
      <ScatteredSymbolsFixed />
      <button className="pp-back" onClick={() => navigate('/')}>← Back to work</button>

      {/* Hero image */}
      {project.heroImage && (
        <img className="pp-hero" src={project.heroImage} alt={project.title} />
      )}

      <div className="pp-body">
        {/* Title block */}
        <div style={{ paddingTop: project.heroImage ? 44 : 20 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: 3,
            textTransform: 'uppercase', color: C.teal, marginBottom: 10 }}>
            {project.category} · {project.year}
          </div>
          <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(36px,6vw,68px)',
            color: C.dark, lineHeight: 1, margin: 0 }}>
            {project.title}
          </h1>
          <p style={{ fontFamily: "'Stoke', serif", fontSize: 'clamp(16px,2vw,22px)',
            color: C.teal, marginTop: 12, marginBottom: 0 }}>
            {project.subtitle}
          </p>
          <div className="pp-tags">
            {project.tags.map(t => <span key={t} className="pp-tag">{t}</span>)}
          </div>
        </div>

        {/* Meta row */}
        <div className="pp-meta">
          {[
            { label: 'Role',     value: project.role     },
            { label: 'Team',     value: project.team     },
            { label: 'Duration', value: project.duration  },
            { label: 'Tools',    value: project.tools.join(', ') },
          ].map(m => (
            <div key={m.label} className="pp-meta-item">
              <label>{m.label}</label>
              <span>{m.value}</span>
            </div>
          ))}
        </div>

        <div className="pp-divider" />

        {/* Overview */}
        <h2 className="pp-h2">Overview</h2>
        <p className="pp-body-text">{project.overview}</p>

        {/* Problem */}
        <h2 className="pp-h2">The Problem</h2>
        <p className="pp-body-text">{project.problem}</p>

        <div className="pp-divider" />

        {/* Process */}
        <h2 className="pp-h2">Process</h2>
        {project.process.map((step, i) => (
          <div key={i} className="pp-step">
            <h3>{step.heading}</h3>
            <p className="pp-body-text">{step.body}</p>
            {step.image && <img src={step.image} alt={step.heading} />}
          </div>
        ))}

        <div className="pp-divider" />

        {/* Outcomes */}
        {project.outcomes?.length > 0 && (
          <>
            <h2 className="pp-h2">Outcomes</h2>
            <div className="pp-outcomes">
              {project.outcomes.map((o, i) => (
                <div key={i} className="pp-outcome">
                  <div className="stat">{o.stat}</div>
                  <div className="label">{o.label}</div>
                </div>
              ))}
            </div>
            <div className="pp-divider" />
          </>
        )}

        {/* Reflection */}
        <h2 className="pp-h2">Reflection</h2>
        <p className="pp-body-text">{project.reflection}</p>

        {/* Next project nav */}
        <div style={{ marginTop: 72, textAlign: 'center' }}>
          <button onClick={() => navigate('/')}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontWeight: 600,
              letterSpacing: 3, textTransform: 'uppercase', color: C.teal, background: 'none',
              border: '1px solid rgba(24,104,120,0.25)', padding: '12px 28px', cursor: 'pointer',
              transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background = C.teal; e.target.style.color = '#F0EDE6' }}
            onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = C.teal }}>
            ← All Projects
          </button>
        </div>
      </div>
    </motion.div>
  )
}
