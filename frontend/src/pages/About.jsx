import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScatteredSymbolsFixed } from '../components/ScatteredSymbols.jsx'

const FOCUS = [
  { label: 'Design & Development', desc: 'Human-centred interfaces, bridging user needs and creative vision.' },
  { label: 'UX/UI & Research',     desc: 'Deep user insight through qualitative and quantitative methods.' },
  { label: 'AI/ML & Data Science', desc: 'Turning raw numbers into stories — models, visualisations, questions.' },
]

export default function About() {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: '#E5EAD8', position: 'relative' }}
    >
      <ScatteredSymbolsFixed />
      <style>{`
        .ab-nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 5vw;
          background: rgba(180,185,168,0.96); backdrop-filter: blur(10px);
          border-bottom: 2px solid #186878;
        }
        .ab-logo { font-family: 'La Belle Aurore', cursive; font-size: 24px; color: #071A12; background: rgba(7,26,18,0.13); border-radius: 8px; padding: 6px 18px; cursor: pointer; border: none; transition: background 0.2s; }
        .ab-logo:hover { background: rgba(7,26,18,0.2); }
        .ab-back { font-family: 'Cormorant Garamond', serif; font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(7,26,18,0.5); background: rgba(7,26,18,0.08); border-radius: 8px; border: none; cursor: pointer; padding: 6px 18px; transition: all 0.2s; }
        .ab-back:hover { color: #071A12; background: rgba(7,26,18,0.16); }

        .ab-bar { background: #0A3020; display: flex; align-items: center; justify-content: space-between; padding: 15px 6vw; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: rgba(240,237,230,0.5); }
        .ab-bar-num { color: rgba(141,196,192,0.8); }

        .ab-hero { background: #0A3020; padding: 64px 6vw; }
        .ab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; }
        @media (max-width: 760px) { .ab-grid { grid-template-columns: 1fr; } }

        .ab-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(240,237,230,0.35); margin-bottom: 11px; }
        .ab-heading { line-height: 0.95; letter-spacing: -1px; margin-bottom: 22px; }
        .ab-heading .al { display: block; font-family: 'Berkshire Swash', serif; font-weight: 400; font-size: clamp(34px,5vw,60px); color: #F0EDE6; }
        .ab-heading .ab { display: block; font-family: 'Stoke', serif; font-weight: 400; font-size: clamp(34px,5vw,60px); color: #8DC4C0; }
        .ab-bio { font-family: 'Cormorant Garamond', serif; font-size: 17px; color: rgba(240,237,230,0.62); line-height: 1.78; margin-bottom: 26px; }
        .ab-links { display: flex; gap: 9px; flex-wrap: wrap; }
        .ab-link { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(240,237,230,0.5); text-decoration: none; border: 1px solid rgba(240,237,230,0.18); padding: 8px 16px; transition: all 0.2s; }
        .ab-link:hover { color: #F0EDE6; border-color: rgba(240,237,230,0.45); }

        .ab-photo { aspect-ratio: 4/5; position: relative; }
        .ab-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center top; clip-path: path('M 42,24 Q 120,8 200,18 Q 280,28 362,12 Q 390,16 388,50 Q 396,150 388,252 Q 380,354 390,438 Q 392,470 358,482 Q 276,498 196,486 Q 116,474 44,492 Q 16,486 12,454 Q 4,354 14,252 Q 24,150 8,50 Q 8,18 42,24 Z'); }
        .ab-photo svg { position: absolute; inset: 0; width: 100%; height: 100%; }

        .ab-focus { padding: 64px 6vw 80px; }
        .ab-focus-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(7,26,18,0.38); margin-bottom: 10px; }
        .ab-focus-heading { font-family: 'Berkshire Swash', serif; font-size: clamp(28px,4vw,48px); color: #071A12; margin-bottom: 42px; line-height: 1; }
        .ab-focus-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media (max-width: 720px) { .ab-focus-grid { grid-template-columns: 1fr; } }
        .ab-focus-card { border-top: 2px solid #186878; padding: 22px 0 0; }
        .ab-focus-label { font-family: 'Stoke', serif; font-size: 18px; color: #071A12; margin-bottom: 10px; }
        .ab-focus-desc { font-family: 'Cormorant Garamond', serif; font-size: 15px; color: rgba(7,26,18,0.52); line-height: 1.65; }

        .ab-footer { background: #071A12; padding: 30px 6vw; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .ab-footer-logo { font-family: 'La Belle Aurore', cursive; font-size: 26px; color: rgba(240,237,230,0.55); }
        .ab-footer-logo em { color: #8DC4C0; font-style: normal; }
        .ab-footer-copy { font-family: 'Cormorant Garamond', serif; font-size: 11px; color: rgba(240,237,230,0.14); }
      `}</style>

      <nav className="ab-nav">
        <button className="ab-logo" onClick={() => navigate('/')}>Eden</button>
        <button className="ab-back" onClick={() => navigate('/')}>← Back</button>
      </nav>

      <div className="ab-bar">
        <span className="ab-bar-num">05</span>
        <span>About</span>
        <span style={{ color: 'rgba(240,237,230,0.25)', fontSize: 14 }}>✦</span>
      </div>

      {/* Bio section — dark green bg matching homepage about */}
      <section className="ab-hero">
        <div className="ab-grid">
          <div>
            <p className="ab-eyebrow">About Me</p>
            <div className="ab-heading">
              <span className="al">Curious by</span>
              <span className="ab">design.</span>
            </div>
            <p className="ab-bio">
              I'm Kate — a multi-disciplinary designer and developer. I've always been
              drawn to the edges where disciplines overlap: the moment a game mechanic
              becomes a UX pattern, or a data visualisation becomes a piece of art.<br /><br />
              {/* ── Add your bio here ── */}
              Add your story here. What drives you, what you care about, and why you
              work across design, research, and data.
            </p>
            <div className="ab-links">
              <a href="mailto:kate.mezger22@gmail.com" className="ab-link">Email</a>
              <a href="https://www.linkedin.com/in/kate-mezger-437397263/" target="_blank" rel="noopener noreferrer" className="ab-link">LinkedIn</a>
              <a href="https://github.com/katemezger" target="_blank" rel="noopener noreferrer" className="ab-link">GitHub</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="ab-link">Resume</a>
            </div>
          </div>

          <div className="ab-photo">
            <img src="/images/kate.jpg" alt="Kate Mezger" />
            <svg viewBox="0 0 400 510" aria-hidden="true">
              <path d="M 42,24 Q 120,8 200,18 Q 280,28 362,12 Q 390,16 388,50 Q 396,150 388,252 Q 380,354 390,438 Q 392,470 358,482 Q 276,498 196,486 Q 116,474 44,492 Q 16,486 12,454 Q 4,354 14,252 Q 24,150 8,50 Q 8,18 42,24 Z"
                fill="none" stroke="rgba(240,237,230,0.18)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="ab-focus">
        <p className="ab-focus-eyebrow">What I Do</p>
        <div className="ab-focus-heading">Areas of Focus</div>
        <div className="ab-focus-grid">
          {FOCUS.map(f => (
            <div key={f.label} className="ab-focus-card">
              <div className="ab-focus-label">{f.label}</div>
              <div className="ab-focus-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="ab-footer">
        <span className="ab-footer-logo">Eden<em>.</em></span>
        <span className="ab-footer-copy">© 2026 Kate Mezger</span>
      </footer>
    </motion.div>
  )
}
