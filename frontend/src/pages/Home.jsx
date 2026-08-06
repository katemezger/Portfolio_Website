import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScatteredSymbols from '../components/ScatteredSymbols.jsx'
import MotifIcon, { PROJECT_MOTIFS } from '../components/MotifIcon.jsx'
import TiltCard from '../components/TiltCard.jsx'
import RevealText from '../components/RevealText.jsx'
import useDocumentTitle from '../components/useDocumentTitle.js'

/* ─── data ────────────────────────────────────── */
const DISCIPLINES = [
  { num: '01', title: 'Design & Development', page: 'design-dev',        desc: 'Human-centred design. From wireframes to polished interfaces, bridging user needs and creative vision.',  tools: ['Figma', 'React', 'CSS', 'Prototyping'],               bg: '#0A3020', fg: '#F0EDE6', iconDim: 'rgba(240,237,230,0.35)' },
  { num: '02', title: 'UX/UI',                page: 'research-ux',       desc: 'Deep user insight through qualitative and quantitative methods. Research that actually drives decisions.',   tools: ['User Research', 'Usability Testing', 'Wireframing'],  bg: '#186878', fg: '#F0EDE6', iconDim: 'rgba(240,237,230,0.35)' },
  { num: '03', title: 'AI/ML & Data Science', page: 'analytics-science', desc: 'Turning raw numbers into stories. ML models, visualisations, and asking the right questions.',             tools: ['Python', 'Pandas', 'Sklearn', 'D3.js'],               bg: '#8DC4C0', fg: '#071A12', iconDim: 'rgba(7,26,18,0.3)'   },
  { num: '04', title: 'Other',                page: 'other',             desc: 'Experiments, side projects, and things that defy easy categories. Creative explorations.',                  tools: ['Various', 'Experimental'],                            bg: '#071A12', fg: '#F0EDE6', iconDim: 'rgba(240,237,230,0.35)' },
]

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A PROJECT (Home page card)
// ─────────────────────────────────────────────────────────────────────────────
// 1. Copy one of the objects below and fill in your details.
// 2. Set `slug` to a short kebab-case name — e.g. 'my-ux-study'.
//    This MUST match the key you add in src/pages/ProjectPage.jsx.
// 3. Set `type` to one of: 'design' | 'ux' | 'ai' | 'other'
//    (controls which filter tab shows it).
// 4. Set `img` to a path in /public/images/projects/, or leave '' for the
//    placeholder colour block.
// 5. Run the dev server — the card appears instantly.
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    slug:  'tracksense-ai',
    title: 'TrackSense AI',
    cat:   'Design & Development',
    type:  'design',
    catBg: '#0A3020',
    year:  '2026',
    desc:  'Frontend design and development for an AI-powered Formula 1 race analytics platform, presented at AIM S26.',
    tags:  ['React', 'UI Design', 'Formula 1', 'Data Visualisation'],
    img:   '/images/projects/tracksense-ai-hero.png',
  },
  {
    id: 2,
    slug:  'eden-portfolio',
    title: 'Eden Portfolio',
    cat:   'Design & Development',
    type:  'design',
    catBg: '#0A3020',
    year:  '2026',
    desc:  'A whimsical personal portfolio with a garden aesthetic, animated blob shapes, and a custom botanical design system built in React.',
    tags:  ['React', 'Framer Motion', 'SVG', 'CSS'],
    img:   '/images/projects/eden-portfolio-hero.png',
  },
  {
    id: 3,
    slug:  'cgs-usability-study',
    title: 'MonkeyType vs KeyHero',
    cat:   'UX Quantitative Research',
    type:  'ux',
    catBg: '#186878',
    year:  '2025',
    desc:  'A comparative usability study measuring WPM, accuracy, and test duration across two popular typing platforms.',
    tags:  ['Usability Testing', 'HCI', 'Think-Aloud', 'Data Analysis'],
    img:   '/images/projects/cgs-usability-study-hero.png',
  },
  {
    id: 4,
    slug:  'time2invest',
    title: 'Time2Invest',
    cat:   'Design & Development',
    type:  'design',
    catBg: '#0A3020',
    year:  '2026',
    desc:  'A 24-hour WEHack hackathon build: a financial literacy tool that teaches investing through real historical headlines and market data.',
    tags:  ['Hackathon', 'WEHack', 'FinTech', 'React'],
    img:   '/images/projects/time2invest-hero.png',
  },
  {
    id: 5,
    slug:  'netflix-prediction',
    title: 'Predicting Netflix Success',
    cat:   'AI/ML & Data Science',
    type:  'ai',
    catBg: '#071A12',
    year:  '2026',
    desc:  'A data science study testing whether genre, country, and release metadata can predict Netflix title success.',
    tags:  ['R', 'Machine Learning', 'tidyverse', 'Data Analysis'],
    img:   '/images/projects/netflix-prediction-hero.png',
  },
  {
    id: 6,
    slug:  'divinity-sales-prediction',
    title: 'Divinity: First-Year Sales Prediction',
    cat:   'AI/ML & Data Science',
    type:  'ai',
    catBg: '#071A12',
    year:  'Dec 2025',
    desc:  'A machine learning model forecasting first-year sales for an upcoming Larian Studios game using comparable RPG performance data.',
    tags:  ['Python', 'Machine Learning', 'Jupyter', 'Data Cleaning'],
    img:   '/images/projects/divinity-sales-prediction-hero.svg',
  },
  {
    id: 7,
    slug:  'steam-customer-segmentation',
    title: 'Customer Segmentation for Steam',
    cat:   'AI/ML & Data Science',
    type:  'ai',
    catBg: '#071A12',
    year:  'Jun 2026',
    desc:  'Unsupervised clustering on 200K Steam interaction logs to surface four distinct player personas, deployed as a FastAPI microservice.',
    tags:  ['Python', 'Scikit-learn', 'K-Means', 'PCA', 'FastAPI'],
    img:   '/images/projects/steam-customer-segmentation-hero.svg',
  },
  {
    id: 8,
    slug:  'ais-portal',
    title: 'AIS Membership Portal',
    cat:   'Design & Development',
    type:  'design',
    catBg: '#0A3020',
    year:  'Jun 2026',
    desc:  'Designed and integrated the mobile pages for AI Society\'s membership platform, aligned to current AIS brand guidelines under a one-month deadline.',
    tags:  ['Figma', 'Next.js', 'TypeScript', 'Mobile Design'],
    img:   '/images/ais_logo_black.png',
  },
]

// `img` left unset on purpose: the portal is meant for small, legible crops
// (a code snippet, a page screenshot) rather than the full project hero
// banners, which look muddy squeezed into a small circle. Drop a path here
// once you have those crops.
const PORTAL_ITEMS = [
  { id: 1, cat: 'Design & Development', bg: '#0A3020' },
  { id: 2, cat: 'UX/UI',               bg: '#186878' },
  { id: 3, cat: 'AI/ML & Data Science',bg: '#071A12' },
  { id: 4, cat: 'Other',               bg: '#0A3020' },
  { id: 5, cat: 'Design & Development',bg: '#186878' },
  { id: 6, cat: 'AI/ML & Data Science',bg: '#071A12' },
]

const MARQUEE = ['DESIGN', 'UX/UI', 'AI & ML', 'DATA SCIENCE', 'DEVELOPMENT', 'RESEARCH', 'BRAND']

const TOOLS = {
  DESIGN:        ['Figma', 'After Effects', 'Illustrator', 'Photoshop', 'Framer'],
  DEVELOPMENT:   ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
  'DATA & ML':   ['Python', 'Pandas', 'Scikit-learn', 'D3.js', 'Jupyter', 'Model Interpretability'],
  'UX RESEARCH': ['User Research', 'Usability Testing', 'Journey Mapping', 'Prototyping', 'Human-AI Interaction'],
}

const SKILLS = ['Systems Thinking', 'Prototyping', 'Visual Storytelling', 'Data Modelling', 'Human-AI Interaction', 'Game Mechanics', 'Typography', 'Motion Design', 'User Research']

const FILTERS = [
  { label: 'ALL',           fn: () => true },
  { label: 'DESIGN & DEV', fn: p => p.type === 'design' },
  { label: 'UX/UI',        fn: p => p.type === 'ux'     },
  { label: 'AI/ML & DATA', fn: p => p.type === 'ai'     },
  { label: 'OTHER',        fn: p => p.type === 'other'  },
]

const SOCIALS = [
  // ── LINKS: replace the href values below with your real URLs ────────────────
  // LinkedIn → 'https://www.linkedin.com/in/kate-mezger-437397263/YOUR-HANDLE'
  // Resume   → drop your PDF into frontend/public/ and set href to '/resume.pdf'
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kate-mezger-437397263/', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'GitHub',   href: 'https://github.com/katemezger',  icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { label: 'Email',    href: 'mailto:kate.mezger22@gmail.com', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg> },
  { label: 'Resume',   href: '/resume.pdf',                    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
]



/* ─── organic blob photo frame ────────────────── */
// Raw path in a 400x510 reference box (used for the visible border overlay,
// which scales correctly via the SVG viewBox).
const ABOUT_BLOB = "M 42,24 Q 120,8 200,18 Q 280,28 362,12 Q 390,16 388,50 Q 396,150 388,252 Q 380,354 390,438 Q 392,470 358,482 Q 276,498 196,486 Q 116,474 44,492 Q 16,486 12,454 Q 4,354 14,252 Q 24,150 8,50 Q 8,18 42,24 Z"

// Same shape normalised to 0-1 (objectBoundingBox units) for the actual clip.
// CSS `clip-path: path()` uses raw pixel coordinates with no viewBox concept,
// so applying ABOUT_BLOB directly only lines up when the box happens to
// render at exactly 400x510px; at any other size (i.e. almost always, since
// the frame is `width: 100%` in a responsive grid) the clip region overshoots
// or undershoots the box, which is what made the photo appear cropped into
// the top-left corner. An SVG clipPath with clipPathUnits="objectBoundingBox"
// scales with the element instead.
const ABOUT_BLOB_NORM = "M 0.105,0.0471 Q 0.3,0.0157 0.5,0.0353 Q 0.7,0.0549 0.905,0.0235 Q 0.975,0.0314 0.97,0.098 Q 0.99,0.2941 0.97,0.4941 Q 0.95,0.6941 0.975,0.8588 Q 0.98,0.9216 0.895,0.9451 Q 0.69,0.9765 0.49,0.9529 Q 0.29,0.9294 0.11,0.9647 Q 0.04,0.9529 0.03,0.8902 Q 0.01,0.6941 0.035,0.4941 Q 0.06,0.2941 0.02,0.098 Q 0.02,0.0353 0.105,0.0471 Z"

// ── PHOTO: save your headshot to  frontend/public/images/kate.jpg  ──────────

function BlobPhotoFrame() {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5' }}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="about-blob-clip" clipPathUnits="objectBoundingBox">
            <path d={ABOUT_BLOB_NORM} />
          </clipPath>
        </defs>
      </svg>
      {/* Photo clipped to the blob shape via an SVG clipPath (scales with the box).
          Rendered as a background image (zoomed via background-size) rather
          than an <img> with a CSS transform: a transform scales the whole
          rendered element — including its already-clipped shape — past its
          own box, which overflowed the frame and made the border underneath
          look "inset" relative to the oversized photo. Background-size zooms
          the image content without changing the element's box, so the clip
          and the border stay in sync. */}
      <div
        role="img" aria-label="Kate Mezger"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/kate.jpg)',
          backgroundSize: '145%',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
          clipPath: 'url(#about-blob-clip)',
        }}
      />
      {/* Blob border overlay. preserveAspectRatio="none" so it stretches to
          match the box exactly, same as the clip-path (objectBoundingBox
          scales non-uniformly too) — otherwise the default "meet" behavior
          shrinks the outline to fit inside the box, leaving it visibly
          inset instead of tracing the photo's actual edge. */}
      <svg viewBox="0 0 400 510" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d={ABOUT_BLOB} fill="none" stroke="rgba(240,237,230,0.22)" strokeWidth="2" />
      </svg>
    </div>
  )
}

/* ─── portal ──────────────────────────────────── */
function Portal({ items, onExplore, size = 300 }) {
  const [idx, setIdx] = useState(0)
  const advance = () => setIdx(i => (i + 1) % items.length)
  useEffect(() => { const t = setInterval(advance, 3200); return () => clearInterval(t) }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '28px 0 0' }}>
      <div style={{ position: 'relative', width: size + 24, height: size + 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: size + 24, height: size + 24, borderRadius: '55% 45% 62% 38% / 48% 62% 38% 52%', border: '1px solid rgba(24,104,120,0.14)', animation: 'blobMorph 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: size + 12, height: size + 12, borderRadius: '52% 48% 58% 42% / 50% 58% 42% 50%', border: '1px solid rgba(10,48,32,0.17)', animation: 'blobMorph 12s ease-in-out infinite reverse' }} />
        <div
          onClick={advance}
          style={{
            width: size, height: size,
            borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
            animation: 'blobMorph 10s ease-in-out infinite',
            overflow: 'hidden',
            border: '2.5px solid #0A3020',
            boxShadow: '0 0 0 3px rgba(24,104,120,0.22), inset 0 4px 28px rgba(0,0,0,0.2)',
            position: 'relative', cursor: 'pointer', flexShrink: 0,
          }}
        >
          {items.map((item, i) => (
            <div key={item.id} style={{
              position: 'absolute', inset: 0, background: item.bg,
              opacity: i === idx ? 1 : 0, transition: 'opacity 1.1s ease',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              {item.img
                ? <img src={item.img} alt={item.cat} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                : (
                  <div style={{
                    fontFamily: "'Fraunces', serif", fontWeight: 400,
                    fontSize: item.cat.length > 10 ? size * 0.115 : size * 0.22,
                    lineHeight: 1.15, textAlign: 'center', padding: '0 22px',
                    color: 'rgba(240,237,230,0.92)', textShadow: '0 2px 14px rgba(0,0,0,0.15)',
                  }}>
                    {item.cat}
                  </div>
                )
              }
            </div>
          ))}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, transparent 38%, rgba(0,0,0,0.15) 100%)', pointerEvents: 'none' }} />
        </div>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', color: '#186878', fontSize: 12, opacity: 0.65 }}>✦</div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 14, alignItems: 'center' }}>
        {items.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 20 : 6, height: 6, borderRadius: 3,
            background: i === idx ? '#186878' : 'rgba(7,26,18,0.14)',
            cursor: 'pointer', transition: 'all 0.35s ease',
          }} />
        ))}
      </div>

      <button onClick={onExplore} style={{
        marginTop: 14, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
        fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
        color: '#186878', background: 'none', border: 'none', cursor: 'pointer',
      }}>
        Explore All Work &nbsp;→
      </button>
    </div>
  )
}

/* ─── card icon ───────────────────────────────── */
function CardIcon({ type, color }) {
  if (type === 0) return <svg width="24" height="24" viewBox="0 0 26 26" fill="none"><rect x="2" y="13" width="15.56" height="15.56" transform="rotate(-45 2 13)" stroke={color} strokeWidth="1.4"/></svg>
  if (type === 1) return <svg width="24" height="24" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="9" stroke={color} strokeWidth="1.4"/><circle cx="13" cy="13" r="4" fill={color} opacity="0.5"/></svg>
  if (type === 2) return <svg width="24" height="24" viewBox="0 0 26 26" fill="none"><rect x="3" y="7" width="20" height="13" rx="1" stroke={color} strokeWidth="1.4"/><rect x="7" y="11" width="7" height="4" rx="0.5" fill={color} opacity="0.4"/></svg>
  return <svg width="24" height="24" viewBox="0 0 26 26" fill="none"><circle cx="7" cy="13" r="2.5" stroke={color} strokeWidth="1.4"/><circle cx="13" cy="13" r="2.5" stroke={color} strokeWidth="1.4"/><circle cx="19" cy="13" r="2.5" stroke={color} strokeWidth="1.4"/></svg>
}

/* ─── reveal hook ─────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, on]
}

/* ─── main ────────────────────────────────────── */
export default function Home() {
  useDocumentTitle('Kate Mezger: Eden Portfolio')
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [ready, setReady]   = useState(false)
  const [filter, setFilter] = useState('ALL')
  const [discRef, discOn]   = useReveal(0.08)
  const [projRef, projOn]   = useReveal(0.08)
  const [aboutRef, aboutOn] = useReveal(0.08)
  const [toolRef, toolOn]   = useReveal(0.08)

  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const scrollToTop = () => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  const activeFn = FILTERS.find(f => f.label === filter)?.fn || (() => true)
  const displayProjects = PROJECTS.filter(activeFn)

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: '#F4F5F0', position: 'relative' }}
    >
      <style>{`
        /* ── Nav ────────────────────────── */
        .nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 5vw;
          background: rgba(180,185,168,0.96);
          backdrop-filter: blur(10px);
          border-bottom: 2px solid #186878;
        }
        .nav-logo { font-family: 'La Belle Aurore', cursive; font-weight: 400; font-size: 24px; color: #071A12; background: rgba(7,26,18,0.13); border-radius: 8px; padding: 6px 18px; cursor: pointer; border: none; transition: background 0.2s; }
        .nav-logo:hover { background: rgba(7,26,18,0.2); }
        .nav-links { display: flex; gap: 10px; }
        .nav-btn { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 17px; color: #071A12; background: rgba(7,26,18,0.12); border-radius: 8px; border: none; cursor: pointer; padding: 6px 20px; text-decoration: none; transition: background 0.2s; }
        .nav-btn:hover { background: rgba(7,26,18,0.2); }

        /* ── Hero ──────────────────────── */
        .hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 56px 6vw 68px; position: relative; }
        .hero-name { font-family: 'Fraunces', serif; font-weight: 400; color: #0A3020; font-size: clamp(50px, 9.5vw, 132px); letter-spacing: 0; line-height: 1; white-space: nowrap; opacity: 0; transform: translateY(20px); transition: opacity 0.65s ease 0.1s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.1s; }
        .hero-name.rdy { opacity: 1; transform: none; }
        .hero-rule { width: 86%; max-width: 820px; height: 2px; background: #186878; margin: 18px auto 20px; opacity: 0; transition: opacity 0.5s ease 0.38s; }
        .hero-rule.rdy { opacity: 1; }
        .hero-sparkle { font-family: 'Stoke', serif; font-weight: 400; font-size: clamp(14px, 1.6vw, 19px); letter-spacing: 3px; text-transform: uppercase; color: #186878; display: flex; align-items: center; justify-content: center; gap: 14px; opacity: 0; transition: opacity 0.5s ease 0.5s; }
        .hero-sparkle.rdy { opacity: 1; }
        .hero-availability {
          display: inline-flex; align-items: center; gap: 8px; margin-top: 18px;
          font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 12px;
          letter-spacing: 1.5px; text-transform: uppercase; color: #186878;
          border: 1px solid rgba(24,104,120,0.3); border-radius: 20px; padding: 7px 16px;
          opacity: 0; transition: opacity 0.5s ease 0.6s;
        }
        .hero-availability.rdy { opacity: 1; }
        .hero-availability-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #8DC4C0; flex-shrink: 0;
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(141,196,192,0.5); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(141,196,192,0); }
        }
        .hero-gem { font-size: 16px; color: rgba(24,104,120,0.5); }
        .hero-socials { display: flex; gap: 10px; justify-content: center; margin: 22px 0; opacity: 0; transition: opacity 0.5s ease 0.7s; }
        .hero-socials.rdy { opacity: 1; }
        .social-btn { width: 38px; height: 38px; border-radius: 9px; background: rgba(7,26,18,0.1); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #0A3020; text-decoration: none; transition: background 0.2s, color 0.2s, transform 0.2s; }
        .social-btn:hover { background: #186878; color: #F0EDE6; transform: translateY(-2px); }
        .hero-text { font-family: 'Caveat', cursive; font-weight: 400; font-size: clamp(19px, 2.1vw, 25px); color: rgba(7,26,18,0.58); line-height: 1.6; max-width: 520px; opacity: 0; transition: opacity 0.5s ease 0.85s; }
        .hero-text.rdy { opacity: 1; }
        .hero-vline { width: 2px; height: 64px; background: linear-gradient(180deg, #186878 0%, rgba(24,104,120,0) 100%); margin: 24px auto 0; opacity: 0; transition: opacity 0.5s ease 1s; }
        .hero-vline.rdy { opacity: 1; }

        /* ── Marquee ────────────────────── */
        .marquee-wrap { background: #0A3020; overflow: hidden; padding: 13px 0; }
        .marquee-track { display: inline-flex; white-space: nowrap; animation: marqueeScroll 24s linear infinite; }
        .marquee-item { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 14px; letter-spacing: 4px; text-transform: uppercase; color: rgba(240,237,230,0.6); padding: 0 28px; display: inline-flex; align-items: center; gap: 28px; }
        .marquee-gem { color: rgba(141,196,192,0.55); font-size: 12px; }

        /* ── Section bar ────────────────── */
        .sec-bar { background: #0A3020; display: flex; align-items: center; justify-content: space-between; padding: 15px 6vw; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: rgba(240,237,230,0.5); border-top: 1px solid rgba(240,237,230,0.07); }
        .sec-bar-num { color: rgba(141,196,192,0.8); }
        .sec-bar-star { color: rgba(240,237,230,0.25); font-size: 14px; }

        /* ── Section heading ────────────── */
        .sec-eyebrow { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(7,26,18,0.38); margin-bottom: 10px; }
        .sec-heading { font-family: 'Cormorant Garamond', serif; line-height: 0.9; letter-spacing: -1px; margin-bottom: 44px; }
        .sec-heading .h1 { display: block; color: #071A12; font-family: 'Fraunces', serif; font-weight: 400; font-size: clamp(42px, 6vw, 82px); }
        .sec-heading .h2 { display: block; color: #186878; font-family: 'Stoke', serif; font-weight: 400; font-size: clamp(42px, 6vw, 82px); }

        /* ── Disciplines ────────────────── */
        .disc-wrap { padding: 58px 6vw 62px; }
        .disc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; }
        @media (max-width: 680px) { .disc-grid { grid-template-columns: 1fr; } }

        .disc-card {
          padding: 38px 34px 34px; min-height: 250px; display: flex; flex-direction: column;
          cursor: pointer; position: relative;
          outline: 2px solid transparent;
          transition:
            box-shadow 0.7s ease,
            transform 0.7s ease,
            outline-color 0.7s ease;
        }
        .disc-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 60px rgba(24,104,120,0.22), 0 16px 40px rgba(0,0,0,0.2);
          outline-color: rgba(141,196,192,0.35);
          z-index: 2;
        }

        .disc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; }
        .disc-num { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 11px; letter-spacing: 2px; }
        .disc-title { font-family: 'Stoke', serif; font-weight: 400; font-size: clamp(22px, 2.6vw, 37px); line-height: 1.1; letter-spacing: 0; margin-bottom: 10px; }
        .disc-desc { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 15px; line-height: 1.7; flex: 1; margin-bottom: 18px; }
        .disc-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto; }
        .disc-tag { font-family: 'Cormorant Garamond', serif; font-size: 11px; font-weight: 500; padding: 3px 10px; border: 1px solid; letter-spacing: 0.3px; }

        /* ── Wave ──────────────────────── */
        .wave-wrap { line-height: 0; margin-top: 40px; }
        .wave-wrap svg { display: block; width: 100%; }

        /* ── Projects ───────────────────── */
        .proj-wrap { padding: 58px 6vw 64px; }
        .filter-row { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 34px; }
        .ftab { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 7px 16px; border: 1.5px solid rgba(7,26,18,0.16); background: none; color: rgba(7,26,18,0.45); cursor: pointer; transition: all 0.2s; }
        .ftab.active { background: #071A12; color: #F0EDE6; border-color: #071A12; }
        .ftab:hover:not(.active) { border-color: rgba(7,26,18,0.38); color: #071A12; }
        .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        @media (max-width: 900px) { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .proj-grid { grid-template-columns: 1fr; } }
        .proj-empty { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: rgba(7,26,18,0.3); letter-spacing: 2px; padding: 40px 0; text-align: center; grid-column: 1/-1; }

        /* ── Full index — a fast, scannable list of every project ── */
        .proj-index { margin-top: 56px; border-top: 1px solid rgba(7,26,18,0.1); }
        .proj-index-label { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase; color: rgba(7,26,18,0.36); margin: 26px 0 4px; }
        .proj-index-row {
          display: flex; align-items: baseline; gap: 18px; padding: 16px 0;
          border-bottom: 1px solid rgba(7,26,18,0.1); cursor: pointer;
        }
        .proj-index-title { font-family: 'Stoke', serif; font-size: 19px; color: #071A12; transition: color 0.2s; white-space: nowrap; }
        .proj-index-row:hover .proj-index-title { color: #186878; }
        .proj-index-meta { font-family: 'Cormorant Garamond', serif; font-size: 14px; color: rgba(7,26,18,0.42); flex: 1; }
        .proj-index-arrow { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: rgba(7,26,18,0.3);
          transition: transform 0.2s ease, color 0.2s ease; }
        .proj-index-row:hover .proj-index-arrow { color: #186878; transform: translateX(4px); }
        @media (max-width: 620px) {
          .proj-index-row { flex-wrap: wrap; }
          .proj-index-meta { flex-basis: 100%; order: 3; }
        }
        .proj-card { cursor: pointer; }
        .proj-card:hover .proj-title { color: #186878; }
        .proj-img { aspect-ratio: 4/3; background: rgba(7,26,18,0.055); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; border-radius: 4px;
          box-shadow: none;
          transition: box-shadow 0.9s ease; }
        .proj-card:hover .proj-img {
          box-shadow:
            0 0 28px rgba(212,184,128,0.22),
            0 0 58px rgba(212,184,128,0.10),
            inset 0 0 24px rgba(212,184,128,0.07);
        }
        .proj-img-label { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(7,26,18,0.18); }
        .proj-cat { position: absolute; top: 10px; left: 10px; font-family: 'Cormorant Garamond', serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #F0EDE6; padding: 4px 10px; }
        .proj-yr  { position: absolute; top: 10px; right: 10px; font-family: 'Cormorant Garamond', serif; font-size: 11px; color: rgba(240,237,230,0.65); }
        .proj-title { font-family: 'Stoke', serif; font-weight: 400; font-size: 19px; color: #071A12; margin-bottom: 6px; line-height: 1.2; transition: color 0.2s; }
        .proj-desc  { font-family: 'Cormorant Garamond', serif; font-size: 15px; color: rgba(7,26,18,0.48); line-height: 1.6; margin-bottom: 10px; }
        .proj-tags  { display: flex; flex-wrap: wrap; gap: 5px; }
        .proj-tag   { font-family: 'Cormorant Garamond', serif; font-size: 11px; font-weight: 500; padding: 3px 10px; border: 1px solid rgba(7,26,18,0.14); color: rgba(7,26,18,0.45); }

        /* ── About ─────────────────────── */
        .about-wrap { background: #0A3020; padding: 64px 6vw; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; }
        @media (max-width: 760px) { .about-grid { grid-template-columns: 1fr; } }
        .about-eyebrow { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(240,237,230,0.35); margin-bottom: 11px; }
        .about-heading { font-family: 'Cormorant Garamond', serif; line-height: 0.95; letter-spacing: -1px; margin-bottom: 22px; }
        .about-heading .al { display: block; color: #F0EDE6; font-family: 'Fraunces', serif; font-weight: 400; font-size: clamp(34px, 5vw, 60px); }
        .about-heading .ab { display: block; color: #8DC4C0; font-family: 'Stoke', serif; font-weight: 400; font-size: clamp(34px, 5vw, 60px); }
        .about-bio { font-family: 'Cormorant Garamond', serif; font-size: 17px; color: rgba(240,237,230,0.62); line-height: 1.78; margin-bottom: 26px; }
        .about-links { display: flex; gap: 9px; flex-wrap: wrap; }
        .about-lnk { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(240,237,230,0.5); text-decoration: none; border: 1px solid rgba(240,237,230,0.18); padding: 8px 16px; transition: all 0.2s; }
        .about-lnk:hover { color: #F0EDE6; border-color: rgba(240,237,230,0.45); }
        .about-photo-label { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(240,237,230,0.18); }

        /* ── Toolkit ────────────────────── */
        .toolkit-wrap { padding: 64px 6vw 68px; }
        .skill-pills { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 42px; }
        .skill-pill { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; padding: 7px 18px; border: 1.5px solid rgba(7,26,18,0.16); color: #071A12; cursor: default; transition: all 0.2s; }
        .skill-pill:hover { background: #071A12; color: #F0EDE6; }
        .tool-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
        @media (max-width: 760px) { .tool-grid { grid-template-columns: repeat(2, 1fr); } }
        .tool-label { font-family: 'Cormorant Garamond', serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: rgba(7,26,18,0.32); margin-bottom: 13px; padding-bottom: 8px; border-bottom: 1px solid rgba(7,26,18,0.09); }
        .tool-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .tool-item { font-family: 'Cormorant Garamond', serif; font-size: 15px; color: rgba(7,26,18,0.62); display: flex; align-items: center; gap: 9px; }
        .tool-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(24,104,120,0.45); flex-shrink: 0; }

        /* ── Divider ────────────────────── */
        .mimzy-div { display: flex; align-items: center; gap: 16px; padding: 0 6vw; margin: 6px 0 0; }
        .mimzy-line { flex: 1; height: 1px; background: rgba(7,26,18,0.1); }
        .mimzy-gems { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 8px; color: rgba(7,26,18,0.22); }

        /* ── Footer ─────────────────────── */
        .footer { background: #071A12; padding: 40px 6vw; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid rgba(240,237,230,0.05); }
        .footer-logo { font-family: 'La Belle Aurore', cursive; font-weight: 400; font-size: 28px; color: rgba(240,237,230,0.55); }
        .footer-logo em { color: #8DC4C0; font-style: normal; }
        .footer-links { display: flex; gap: 18px; flex-wrap: wrap; }
        .footer-lnk { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: rgba(240,237,230,0.28); text-decoration: none; background: none; border: none; cursor: pointer; padding: 0; transition: color 0.2s; }
        .footer-lnk:hover { color: rgba(240,237,230,0.65); }
        .footer-copy { font-family: 'Cormorant Garamond', serif; font-size: 11px; color: rgba(240,237,230,0.14); }

        /* ── Reveal ─────────────────────── */
        .rv { opacity: 0; transform: translateY(14px); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .rv.on { opacity: 1; transform: none; }
        .rv.d1 { transition-delay: 0ms; }
        .rv.d2 { transition-delay: 80ms; }
        .rv.d3 { transition-delay: 160ms; }
        .rv.d4 { transition-delay: 240ms; }

        /* ── Blob / symbol animations ─── */
        @keyframes blobMorph {
          0%   { border-radius: 42% 58% 62% 38% / 55% 40% 60% 45%; }
          25%  { border-radius: 65% 35% 45% 55% / 40% 65% 35% 60%; }
          50%  { border-radius: 38% 62% 55% 45% / 65% 35% 65% 35%; }
          75%  { border-radius: 60% 40% 38% 62% / 45% 60% 40% 55%; }
          100% { border-radius: 42% 58% 62% 38% / 55% 40% 60% 45%; }
        }
        @keyframes symFloat {
          from { transform: translateY(0px) rotate(0deg); }
          to   { transform: translateY(-7px) rotate(10deg); }
        }

        /* ── About photo blob ────────────*/
        .about-photo {
          aspect-ratio: 4/5;
          background: rgba(240,237,230,0.07);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: visible;
          border: none;
        }
      `}</style>

      <ScatteredSymbols />

      {/* ── NAV ─────────────────────────── */}
      <nav className="nav">
        <button className="nav-logo" onClick={scrollToTop}>Eden</button>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => scrollTo('disc-section')}>works</button>
          <button className="nav-btn" onClick={() => scrollTo('about-section')}>about</button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────── */}
      <section className="hero">
        <h1 className={`hero-name${ready ? ' rdy' : ''}`} style={{ position: 'relative', zIndex: 1 }}>Kate Mezger</h1>
        <div className={`hero-rule${ready ? ' rdy' : ''}`} />
        <div className={`hero-sparkle${ready ? ' rdy' : ''}`}>
          <span className="hero-gem">✦</span>
          UX/UI &nbsp;|&nbsp; HCI &nbsp;|&nbsp; ML/AI
          <span className="hero-gem">✦</span>
        </div>

        <div className={`hero-availability${ready ? ' rdy' : ''}`}>
          <span className="hero-availability-dot" />
          Open to Summer 2027 Internships
        </div>

        <Portal items={PORTAL_ITEMS} onExplore={() => scrollTo('disc-section')} size={280} />

        <div className={`hero-socials${ready ? ' rdy' : ''}`}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} className="social-btn"
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer" title={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
        <p className={`hero-text${ready ? ' rdy' : ''}`}>
          Hello! My name is Kate but you can also call me Eden :)<br />
          Came to take a look at my stuff? Feel free to scroll to adventure around my portfolio....
        </p>
        <div className={`hero-vline${ready ? ' rdy' : ''}`} />
      </section>

      {/* ── MARQUEE ─────────────────────── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              {i % 3 === 2 && <span className="marquee-gem">✦</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── SECTION BAR 01 ──────────────── */}
      <div className="sec-bar" id="disc-section">
        <span className="sec-bar-num">01</span>
        <span>Disciplines</span>
        <span className="sec-bar-star">✦</span>
      </div>

      {/* ── DISCIPLINES ─────────────────── */}
      <section className="disc-wrap">
        <p className="sec-eyebrow">What I Do</p>
        <div className="sec-heading">
          <span className="h1"><RevealText text="My" /></span>
          <span className="h2"><RevealText text="Disciplines" /></span>
        </div>
        <div className="disc-grid" ref={discRef}>
          {DISCIPLINES.map((d, i) => (
            <div key={d.num} className={`disc-card rv${discOn ? ' on' : ''} d${i + 1}`}
              style={{ background: d.bg }} onClick={() => navigate(`/${d.page}`)}
              role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(`/${d.page}`)}>
              <div className="disc-top">
                <CardIcon type={i} color={d.iconDim} />
                <span className="disc-num" style={{ color: d.iconDim }}>{d.num}</span>
              </div>
              <div className="disc-title" style={{ color: d.fg }}>{d.title}</div>
              <div className="disc-desc" style={{ color: d.fg === '#F0EDE6' ? 'rgba(240,237,230,0.7)' : 'rgba(7,26,18,0.58)' }}>{d.desc}</div>
              <div className="disc-tags">
                {d.tools.map(t => (
                  <span key={t} className="disc-tag" style={{ color: d.fg === '#F0EDE6' ? 'rgba(240,237,230,0.65)' : 'rgba(7,26,18,0.48)', borderColor: d.fg === '#F0EDE6' ? 'rgba(240,237,230,0.18)' : 'rgba(7,26,18,0.14)' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WAVE ────────────────────────── */}
      <div className="wave-wrap">
        <svg viewBox="0 0 1440 88" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,44 C180,88 360,0 540,44 C720,88 900,0 1080,44 C1260,88 1350,22 1440,44 L1440,88 L0,88 Z" fill="#0A3020"/>
        </svg>
      </div>

      {/* ── SECTION BAR 02 ──────────────── */}
      <div className="sec-bar" id="work-section">
        <span className="sec-bar-num">02</span>
        <span>Selected Work</span>
        <span className="sec-bar-star">✦</span>
      </div>

      {/* ── PROJECTS ────────────────────── */}
      <section className="proj-wrap">
        <p className="sec-eyebrow">Selected Work</p>
        <div className="sec-heading">
          <span className="h1"><RevealText text="The" /></span>
          <span className="h2"><RevealText text="Projects" /></span>
        </div>
        <div className="filter-row">
          {FILTERS.map(f => (
            <button key={f.label} className={`ftab${filter === f.label ? ' active' : ''}`} onClick={() => setFilter(f.label)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="proj-grid" ref={projRef}>
          {displayProjects.length === 0
            ? <div className="proj-empty">No projects in this category yet.</div>
            : displayProjects.map((p, i) => (
              <div key={p.id} className={`rv${projOn ? ' on' : ''} d${Math.min(i + 1, 4)}`}>
                <TiltCard
                  className="proj-card"
                  onClick={() => navigate(`/project/${p.slug}`)}
                  role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(`/project/${p.slug}`)}>
                  <div className="proj-img">
                    {p.img
                      ? <img src={p.img} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span className="proj-img-label">Add Image</span>
                    }
                    <span className="proj-cat" style={{ background: p.catBg }}>{p.cat}</span>
                    <span className="proj-yr">{p.year}</span>
                  </div>
                  <div className="proj-title">
                    {PROJECT_MOTIFS[p.slug] && (
                      <span style={{ display: 'inline-flex', verticalAlign: -3, marginRight: 7 }}>
                        <MotifIcon name={PROJECT_MOTIFS[p.slug]} color={p.catBg} size={16} />
                      </span>
                    )}
                    {p.title}
                  </div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                </TiltCard>
              </div>
            ))
          }
        </div>

        {/* Full index — every project, one line each, for a fast scan
            regardless of the filter tabs above. */}
        <div className="proj-index">
          <p className="proj-index-label">Full Index</p>
          {PROJECTS.map(p => (
            <div key={p.id} className="proj-index-row" onClick={() => navigate(`/project/${p.slug}`)}
              role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && navigate(`/project/${p.slug}`)}>
              <span className="proj-index-title">{p.title}</span>
              <span className="proj-index-meta">{p.cat} · {p.year}</span>
              <span className="proj-index-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────── */}
      <div className="mimzy-div">
        <div className="mimzy-line" />
        <span className="mimzy-gems">✦ ✦ ✦</span>
        <div className="mimzy-line" />
      </div>

      {/* ── SECTION BAR 03 ──────────────── */}
      <div className="sec-bar" id="about-section">
        <span className="sec-bar-num">03</span>
        <span>The Person</span>
        <span className="sec-bar-star">✦</span>
      </div>

      {/* ── ABOUT ───────────────────────── */}
      <section className="about-wrap" ref={aboutRef}>
        <div className="about-grid">
          <div className={`rv${aboutOn ? ' on' : ''} d1`}>
            <p className="about-eyebrow">About Me</p>
            <div className="about-heading">
              <span className="al"><RevealText text="Curious by" /></span>
              <span className="ab"><RevealText text="design." /></span>
            </div>
            <p className="about-bio">
              I'm Kate, a multi-disciplinary designer and developer. I've always been drawn to the edges where disciplines overlap: the moment a game's design breaks down into a piece of UX beauty, or a data visualisation becomes a piece of art.<br /><br />
              I'm going into my third year at UT Dallas as a Cognitive Science major, concentrating in AI/Computation and HCI, and I'm working through a data science certification alongside it.<br /><br />
              On campus I'm part of AIS, where I started as a mentee in Spring 2026 and joined the tech team as of Summer 2026, and I also work with the Nebula Labs product team. Outside of school I work part time as a Game Master at Red Door Escape Room, something I've been doing for just over a year now.
            </p>
            <div className="about-links">
              <a href="mailto:kate.mezger22@gmail.com" className="about-lnk">Email</a>
              <a href="https://www.linkedin.com/in/kate-mezger-437397263/" target="_blank" rel="noopener noreferrer" className="about-lnk">LinkedIn</a>
              <a href="https://github.com/katemezger" target="_blank" rel="noopener noreferrer" className="about-lnk">GitHub</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="about-lnk">Resume</a>
            </div>
          </div>
          <div className={`rv${aboutOn ? ' on' : ''} d2`} style={{ width: '100%', maxWidth: 400, marginInline: 'auto', marginTop: 60, position: 'relative', left: 12 }}>
            <BlobPhotoFrame />
          </div>
        </div>
      </section>

      {/* ── TOOLKIT ─────────────────────── */}
      <section className="toolkit-wrap">
        <p className="sec-eyebrow">Tools & Skills</p>
        <div className="sec-heading">
          <span className="h1"><RevealText text="The" /></span>
          <span className="h2"><RevealText text="Toolkit" /></span>
        </div>
        <div className="skill-pills">
          {SKILLS.map(s => <span key={s} className="skill-pill">{s}</span>)}
        </div>
        <div className="tool-grid" ref={toolRef}>
          {Object.entries(TOOLS).map(([cat, items], i) => (
            <div key={cat} className={`rv${toolOn ? ' on' : ''} d${i + 1}`}>
              <div className="tool-label">{cat}</div>
              <ul className="tool-list">
                {items.map(t => <li key={t} className="tool-item"><span className="tool-dot" />{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────── */}
      <footer className="footer">
        <span className="footer-logo">Eden<em>.</em></span>
        <div className="footer-links">
          <button className="footer-lnk" onClick={() => scrollTo('disc-section')}>Work</button>
          <a href="mailto:kate.mezger22@gmail.com" className="footer-lnk">Email</a>
          <a href="https://www.linkedin.com/in/kate-mezger-437397263/" target="_blank" rel="noopener noreferrer" className="footer-lnk">LinkedIn</a>
          <a href="https://github.com/katemezger" target="_blank" rel="noopener noreferrer" className="footer-lnk">GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="footer-lnk">Resume</a>
          <button className="footer-lnk" onClick={scrollToTop}>↑ Top</button>
        </div>
        <span className="footer-copy">© 2026 Kate Mezger</span>
      </footer>
    </motion.div>
  )
}
