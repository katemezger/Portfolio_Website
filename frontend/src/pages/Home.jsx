import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import MotifIcon, { PROJECT_MOTIFS } from '../components/MotifIcon.jsx'
import RevealText from '../components/RevealText.jsx'
import Drift, { ScrollContainerContext } from '../components/Drift.jsx'
import PolaroidPhoto from '../components/PolaroidPhoto.jsx'
import LeftNav, { LEFTNAV_WIDTH, LEFTNAV_MOBILE_BP } from '../components/LeftNav.jsx'
import useDocumentTitle from '../components/useDocumentTitle.js'

/* ─── data ────────────────────────────────────── */
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
// One color per category, looked up by name — lets a project belong to more
// than one category (e.g. TrackSense is both a design/dev build and an AI
// project) without needing a separate "which color" field per project.
const CATEGORY_COLORS = {
  'Design & Development':     'var(--forest)',
  'AI/ML & Data Science':     'var(--ink)',
  'UX Quantitative Research': 'var(--terra)',
}
// Chip backgrounds sit under light text, so they use the deep "fill"
// tokens, which stay dark in both themes (the text tokens above lighten).
const CATEGORY_FILLS = {
  'Design & Development':     'var(--forest-fill)',
  'AI/ML & Data Science':     'var(--ink-fill)',
  'UX Quantitative Research': 'var(--terra-fill)',
}

const PROJECTS = [
  {
    id: 1,
    slug:  'tracksense-ai',
    title: 'TrackSense AI',
    cats:  ['Design & Development', 'AI/ML & Data Science'],
    year:  '2026',
    desc:  'Frontend design and development for an AI-powered Formula 1 race analytics platform, presented at AIM S26.',
    tags:  ['React', 'UI Design', 'Formula 1', 'Data Visualisation'],
    img:   '/images/projects/tracksense-ai-hero.webp',
  },
  {
    id: 2,
    slug:  'ais-portal',
    title: 'AIS Membership Portal',
    cats:  ['Design & Development'],
    year:  'Jun 2026',
    desc:  'Lead designer for the platform 800+ AI Society members use to apply, RSVP and check in. Designed ~90% of the screens and built the mobile frontend.',
    tags:  ['Figma', 'Next.js', 'TypeScript', 'Mobile Design'],
    img:   '/images/ais_logo_black.png',
  },
  {
    id: 3,
    slug:  'eden-portfolio',
    title: 'Eden Portfolio',
    cats:  ['Design & Development'],
    year:  '2026',
    desc:  'A whimsical personal portfolio with a garden aesthetic, animated blob shapes, and a custom botanical design system built in React.',
    tags:  ['React', 'Framer Motion', 'SVG', 'CSS'],
    img:   '/images/projects/eden-portfolio-hero.png',
  },
  {
    id: 4,
    slug:  'steam-customer-segmentation',
    title: 'Customer Segmentation for Steam',
    cats:  ['AI/ML & Data Science', 'Design & Development'],
    year:  'Jun 2026',
    desc:  'Unsupervised clustering on 200K Steam interaction logs to surface four distinct player personas, deployed as a FastAPI microservice.',
    tags:  ['Python', 'Scikit-learn', 'K-Means', 'PCA', 'FastAPI'],
    img:   '/images/projects/steam-customer-segmentation-hero.svg',
  },
  {
    id: 5,
    slug:  'cloverleaf-intake-redesign',
    title: 'Cloverleaf CMS: Client Intake Redesign',
    cats:  ['Design & Development'],
    year:  'Aug 2026 – Present',
    desc:  'Redesigned the color scheme, typography, and UI standards for the client intake flow inside a live compliance-sensitive case management platform.',
    tags:  ['Design Systems', 'Typography', 'UI Standards'],
    img:   '/images/projects/cloverleaf-logo.png',
  },
  {
    id: 6,
    slug:  'cgs-usability-study',
    title: 'MonkeyType vs KeyHero',
    cats:  ['UX Quantitative Research'],
    year:  '2025',
    desc:  'A within-subjects A/B study of two typing platforms with 13 participants: MonkeyType won on accuracy, time and ease of use.',
    tags:  ['A/B Testing', 'Survey Design', 'Statistics', 'Python'],
    img:   '/images/projects/cgs-usability-study-hero.webp',
  },
  {
    id: 7,
    slug:  'time2invest',
    title: 'Time2Invest',
    cats:  ['Design & Development'],
    year:  '2026',
    desc:  'A 24-hour WEHack hackathon build: a financial literacy tool that teaches investing through real historical headlines and market data.',
    tags:  ['Hackathon', 'WEHack', 'FinTech', 'React'],
    img:   '/images/projects/time2invest-hero.webp',
  },
  {
    id: 8,
    slug:  'netflix-prediction',
    title: 'Predicting Netflix Success',
    cats:  ['AI/ML & Data Science'],
    year:  '2026',
    desc:  'A data science study testing whether genre, country, and release metadata can predict Netflix title success.',
    tags:  ['R', 'Machine Learning', 'tidyverse', 'Data Analysis'],
    img:   '/images/projects/netflix-prediction-hero.webp',
  },
  {
    id: 9,
    slug:  'divinity-sales-prediction',
    title: 'Divinity: First-Year Sales Prediction',
    cats:  ['AI/ML & Data Science'],
    year:  'Dec 2025',
    desc:  'A machine learning model forecasting first-year sales for an upcoming Larian Studios game using comparable RPG performance data.',
    tags:  ['Python', 'Machine Learning', 'Jupyter', 'Data Cleaning'],
    img:   '/images/projects/divinity-sales-prediction-hero.svg',
  },
  {
    id: 10,
    slug:  'halo-ideathon',
    title: 'Halo',
    cats:  ['Design & Development'],
    year:  'Sep 2026 – Oct 2026',
    desc:  'An AI companion concept for Aston Martin F1\'s fan community, placing 3rd overall at the Cognizant × Aston Martin Ideathon in Austin, TX.',
    tags:  ['Ideathon', 'Product Concept', 'AI UX', 'Fan Engagement'],
    img:   '/images/projects-gallery/Cognizant-1.webp',
  },
]

// Hand-picked, in display order — the 3 flagships (see memory) plus 3 more
// range-showing pieces (UX research, data/AI, a hackathon build). No filter
// tabs: references consistently show a small, curated "featured work" set
// rather than a filterable grid. 6 total = 2 rows of 3 in the grid below.
const FEATURED_SLUGS = [
  'tracksense-ai', 'ais-portal', 'cloverleaf-intake-redesign',
  'steam-customer-segmentation', 'cgs-usability-study', 'halo-ideathon',
]

const TOOLS = {
  DESIGN:        ['Figma', 'After Effects', 'Illustrator', 'Photoshop', 'Framer'],
  DEVELOPMENT:   ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
  'DATA & ML':   ['Python', 'Pandas', 'Scikit-learn', 'D3.js', 'Jupyter', 'Model Interpretability'],
  'UX RESEARCH': ['User Research', 'Usability Testing', 'Journey Mapping', 'Prototyping', 'Human-AI Interaction'],
}

const SKILLS = ['Systems Thinking', 'Prototyping', 'Visual Storytelling', 'Data Modelling', 'Human-AI Interaction', 'Game Mechanics', 'Typography', 'Motion Design', 'User Research']

// Every photo that actually has Kate in it, physically — solo presenting
// shots and team photos from TrackSense (AIM Night) and Halo (the
// Cognizant x Aston Martin Ideathon). Cycled in the hero background.
// kate.jpg (the About section portrait) is deliberately excluded — it's a
// tight portrait crop that reads oddly next to the wide event photos here.
const HERO_PHOTOS = [
  '/images/projects-gallery/tracksense-solospeak.webp',
  '/images/projects-gallery/tracksense-team.webp',
  '/images/projects-gallery/tracksense-teamend.webp',
  '/images/projects-gallery/Cognizant-Team.webp',
  '/images/projects-gallery/Cognizant-Winners.webp',
  '/images/projects-gallery/Cognizant-Janet.jpg',
  '/images/projects-gallery/Cognizant-Full.webp',
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
  const location = useLocation()
  const scrollRef = useRef(null)
  const [ready, setReady]   = useState(false)
  const [projRef, projOn]   = useReveal(0.08)
  const [aboutRef, aboutOn] = useReveal(0.08)
  const [toolRef, toolOn]   = useReveal(0.08)
  const [moreRef, moreOn]   = useReveal(0.1)
  const [heroPhoto, setHeroPhoto] = useState(0)

  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  useEffect(() => {
    const t = setInterval(() => setHeroPhoto(i => (i + 1) % HERO_PHOTOS.length), 5000)
    return () => clearInterval(t)
  }, [])

  // LeftNav, when clicked from another page, navigates here and hands the
  // target section id via router state (sections only exist on this page).
  // Consume it once on mount, then clear it so a later refresh/back doesn't
  // re-trigger the scroll.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    const t = setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      navigate('.', { replace: true, state: {} })
    }, 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const scrollToTop = () => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  const featuredProjects = FEATURED_SLUGS.map(slug => PROJECTS.find(p => p.slug === slug)).filter(Boolean)
  const moreProjects = PROJECTS.filter(p => !FEATURED_SLUGS.includes(p.slug))

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
    <motion.main
      ref={scrollRef}
      className="page-shell"
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: 'var(--bg)', position: 'relative' }}
    >
      <style>{`
        /* ── Page shell (leaves room for the fixed LeftNav rail) ── */
        .page-shell { padding-left: ${LEFTNAV_WIDTH}px; }
        @media (max-width: ${LEFTNAV_MOBILE_BP}px) { .page-shell { padding-left: 0; padding-top: 56px; } }

        /* ── Hero — the "photo" (a placeholder fill for now) is the entire
               full-screen section, edge to edge (aside from the nav rail's
               reserved padding). The name/tagline sit on top of it, with a
               vignette darkening the rim and pooling behind the text so
               it stays readable once a real photo goes in. ── */
        .hero {
          position: relative; overflow: hidden; min-height: 100vh;
          display: flex; align-items: flex-end;
          background: #938573;
        }
        /* Cross-fading photo cycle filling the hero background — every
           photo here actually has Kate in it. Sits behind the ::after
           vignette (z-index 1) and .hero-inner text (z-index 2) so the
           darkening/legibility treatment still applies on top of it. */
        .hero-photo-cycle { position: absolute; inset: 0; z-index: 0; }
        .hero-photo-cycle img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transition: opacity 1.4s ease;
          filter: saturate(0.6) brightness(0.88) contrast(0.92);
        }
        .hero-photo-cycle img.active { opacity: 1; }
        .hero::after {
          content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background:
            linear-gradient(rgba(75,63,47,0.42), rgba(75,63,47,0.42)),
            linear-gradient(to top, rgba(10,8,4,0.72) 0%, rgba(10,8,4,0.15) 45%, rgba(10,8,4,0) 70%),
            radial-gradient(ellipse 70% 60% at 82% 88%, rgba(10,8,4,0.68) 0%, rgba(10,8,4,0) 70%),
            radial-gradient(ellipse at center, rgba(10,8,4,0) 35%, rgba(10,8,4,0.5) 100%);
        }
        .hero-inner {
          position: relative; z-index: 2; width: 100%;
          padding: 56px 7vw 56px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-inner.rdy { opacity: 1; transform: none; }
        @media (max-width: 680px) { .hero-inner { padding: 40px 6vw 40px; } }
        .hero-name {
          font-family: 'Fraunces', serif; font-weight: 700; color: #F5F1EA;
          font-size: clamp(42px, 8vw, 104px); line-height: 0.98; letter-spacing: -1px;
          text-align: right; margin-bottom: 20px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .hero-tagline {
          font-family: 'Fraunces', serif; font-weight: 600; font-style: italic; color: #EBE5D8;
          font-size: clamp(15px, 1.7vw, 20px); margin-top: 6px; text-align: right;
          text-shadow: 0 1px 10px rgba(0,0,0,0.35);
        }
        .hero-socials { display: flex; gap: 8px; justify-content: flex-end; margin-top: 18px; }
        .social-btn { width: 34px; height: 34px; border-radius: 8px; background: rgba(232,225,214,0.16); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #E8E1D6; text-decoration: none; transition: background 0.2s, color 0.2s, transform 0.2s; }
        .social-btn:hover { background: var(--terra-fill); color: #E8E1D6; transform: translateY(-2px); }

        /* ── Marquee ────────────────────── */
        /* ── Section bar ────────────────── */
        .sec-bar { background: var(--forest-fill); display: flex; align-items: center; justify-content: space-between; padding: 15px 6vw; font-family: 'Quicksand', sans-serif; font-weight: 500; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,225,214,0.72); border-top: 1px solid rgba(232,225,214,0.07); }
        .sec-bar-num { color: rgba(232,225,214,0.72); }
        .sec-bar-star { color: rgba(232,225,214,0.25); font-size: 14px; }

        /* ── Section heading ────────────── */
        .sec-eyebrow { font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(var(--ink-rgb),0.58); margin-bottom: 10px; }
        .sec-heading { font-family: 'Quicksand', sans-serif; line-height: 0.9; letter-spacing: -1px; margin-bottom: 44px; }
        .sec-heading .h1 { display: block; color: var(--ink); font-family: 'Fraunces', serif; font-weight: 400; font-size: clamp(42px, 6vw, 82px); }
        .sec-heading .h2 { display: block; color: var(--terra); font-family: 'Stoke', serif; font-weight: 400; font-size: clamp(42px, 6vw, 82px); }

        /* ── Work — a dense card grid (not giant alternating rows with huge
               gaps), plus a "More Work" row of compact thumbnail cards
               underneath. Packed closer to how real portfolio grids read:
               several cards visible at once, tight gaps, no empty CTA
               buttons eating space. ── */
        .proj-wrap { padding: 52px 6vw 8px; }
        .proj-empty { font-family: 'Quicksand', sans-serif; font-size: 16px; color: rgba(var(--ink-rgb),0.58); letter-spacing: 2px; padding: 40px 0; text-align: center; }
        .more-work-wrap { padding: 28px 6vw 56px; }
        .more-work-label {
          font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase; color: rgba(var(--ink-rgb),0.58);
          margin-bottom: 16px;
        }

        /* Featured — responsive card grid */
        /* Fixed 3 columns (6 featured projects = 2 rows of 3), not auto-fit —
           guarantees the row count regardless of viewport width. */
        .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        @media (max-width: 980px) { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .proj-grid { grid-template-columns: 1fr; } }
        .proj-card { cursor: pointer; display: flex; flex-direction: column; }
        .proj-card-img {
          aspect-ratio: 4/3; background: rgba(var(--ink-rgb),0.055); position: relative; overflow: hidden;
          border-radius: 6px; margin-bottom: 13px;
          box-shadow: 0 3px 14px rgba(0,0,0,0.34);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .proj-card:hover .proj-card-img { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(var(--terra-rgb),0.24); }
        /* White behind project images so transparent PNG/SVG art doesn't sit
           on the dark page. Set on the img, not the frame, so cards with no
           image keep their placeholder label readable. */
        .proj-card-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; background: #fff; }
        .more-work-thumb img { background: #fff; }
        .proj-img-label { font-family: 'Quicksand', sans-serif; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(var(--ink-rgb),0.56); }
        .proj-card-cats { position: absolute; top: 10px; left: 10px; right: 48px; display: flex; flex-wrap: wrap; gap: 4px; }
        .proj-card-cat { font-family: 'Quicksand', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #E8E1D6; padding: 4px 10px; border-radius: 3px; }
        .proj-card-yr  { position: absolute; top: 10px; right: 10px; font-family: 'Quicksand', sans-serif; font-size: 11px; color: rgba(232,225,214,0.75); text-shadow: 0 1px 4px rgba(0,0,0,0.35); }
        .proj-card-eyebrow { display: flex; align-items: center; gap: 6px; font-family: 'Quicksand', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
        .proj-title { font-family: 'Stoke', serif; font-weight: 400; font-size: 21px; color: var(--ink); line-height: 1.2; transition: color 0.2s; margin-bottom: 6px; }
        .proj-card:hover .proj-title { color: var(--terra); }
        .proj-desc  {
          font-family: 'Quicksand', sans-serif; font-size: 14px; color: rgba(var(--ink-rgb),0.6); line-height: 1.55; margin-bottom: 10px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .proj-tags  { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
        .proj-tag   { font-family: 'Quicksand', sans-serif; font-size: 10.5px; font-weight: 500; padding: 3px 9px; border: 1px solid rgba(var(--ink-rgb),0.14); color: rgba(var(--ink-rgb),0.58); }
        .proj-card-link {
          font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; color: var(--terra); margin-top: auto;
        }

        /* More Work — compact thumbnail + text rows, denser than plain text */
        .more-work-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
        .more-work-item {
          display: flex; align-items: center; gap: 13px; cursor: pointer;
          padding: 9px; border-radius: 6px; transition: background 0.2s;
        }
        .more-work-item:hover { background: rgba(var(--ink-rgb),0.05); }
        .more-work-thumb {
          flex-shrink: 0; width: 60px; height: 60px; border-radius: 5px; overflow: hidden;
          background: rgba(var(--ink-rgb),0.08); position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .more-work-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .more-work-info { min-width: 0; }
        .more-work-title { font-family: 'Stoke', serif; font-size: 15px; color: var(--ink); transition: color 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .more-work-item:hover .more-work-title { color: var(--terra); }
        .more-work-meta { font-family: 'Quicksand', sans-serif; font-size: 12px; color: rgba(var(--ink-rgb),0.58); margin-top: 2px; }

        /* ── About ─────────────────────── */
        .about-wrap { background: var(--forest-fill); padding: 64px 6vw; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; }
        @media (max-width: 760px) { .about-grid { grid-template-columns: 1fr; } }
        .about-eyebrow { font-family: 'Quicksand', sans-serif; font-weight: 500; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,225,214,0.7); margin-bottom: 11px; }
        .about-heading { font-family: 'Quicksand', sans-serif; line-height: 0.95; letter-spacing: -1px; margin-bottom: 22px; }
        .about-heading .al { display: block; color: #E8E1D6; font-family: 'Fraunces', serif; font-weight: 400; font-size: clamp(34px, 5vw, 60px); }
        .about-heading .ab { display: block; color: var(--stone); font-family: 'Stoke', serif; font-weight: 400; font-size: clamp(34px, 5vw, 60px); }
        .about-bio { font-family: 'Quicksand', sans-serif; font-size: 17px; color: rgba(232,225,214,0.74); line-height: 1.78; margin-bottom: 26px; }
        .about-links { display: flex; gap: 9px; flex-wrap: wrap; }
        .about-lnk { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,225,214,0.72); text-decoration: none; border: 1px solid rgba(232,225,214,0.18); padding: 8px 16px; transition: all 0.2s; }
        .about-lnk:hover { color: #E8E1D6; border-color: rgba(232,225,214,0.45); }
        .about-photo-label { font-family: 'Quicksand', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,225,214,0.7); }

        /* ── Toolkit — plain text, no pill cloud or boxed grid ── */
        .toolkit-wrap { padding: 44px 6vw 56px; border-top: 1px solid rgba(var(--ink-rgb),0.08); }
        .toolkit-line { font-family: 'Quicksand', sans-serif; font-size: 15px; line-height: 1.9; color: rgba(var(--ink-rgb),0.6); max-width: 820px; margin-bottom: 6px; }
        .toolkit-line b { color: var(--ink); font-weight: 600; }

        /* ── Footer ─────────────────────── */
        .footer { background: var(--footer-bg); padding: 40px 6vw; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid rgba(232,225,214,0.05); }
        .footer-logo { font-family: 'La Belle Aurore', cursive; font-weight: 400; font-size: 28px; color: rgba(232,225,214,0.62); }
        .footer-logo em { color: var(--stone); font-style: normal; }
        .footer-links { display: flex; gap: 18px; flex-wrap: wrap; }
        .footer-lnk { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,225,214,0.6); text-decoration: none; background: none; border: none; cursor: pointer; padding: 0; transition: color 0.2s; }
        .footer-lnk:hover { color: rgba(232,225,214,0.88); }
        .footer-copy { font-family: 'Quicksand', sans-serif; font-size: 11px; color: rgba(232,225,214,0.56); }

        /* ── Reveal ─────────────────────── */
        .rv { opacity: 0; transform: translate(var(--rx, 0px), var(--ry, 14px)); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .rv.on { opacity: 1; transform: none; }
        /* Sideways entrances: set --rx (and --ry: 0) on an .rv element to
           have it slide in horizontally instead of rising. */
        .from-left  { --rx: -56px; --ry: 0px; }
        .from-right { --rx: 56px;  --ry: 0px; }
        .toolkit-line { opacity: 0; transform: translateX(-36px);
          transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .toolkit-wrap.on .toolkit-line { opacity: 1; transform: none; }
        .more-work-item.rv { --rx: -36px; --ry: 0px;
          transition: opacity 0.5s ease var(--d, 0ms), transform 0.6s cubic-bezier(0.16,1,0.3,1) var(--d, 0ms), background 0.2s; }
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
          background: rgba(232,225,214,0.07);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: visible;
          border: none;
        }
      `}</style>

      <LeftNav />

      {/* ── HERO ────────────────────────── */}
      <section className="hero">
        <div className="hero-photo-cycle">
          {HERO_PHOTOS.map((src, i) => (
            <img key={src} src={src} alt="" className={i === heroPhoto ? 'active' : ''} />
          ))}
        </div>
        <div className={`hero-inner${ready ? ' rdy' : ''}`}>
          <h1 className="hero-name">Kate Mezger</h1>
          <p className="hero-tagline">UX/UI Designer, Researcher &amp; Programmer</p>
          <div className="hero-socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className="social-btn"
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer" title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION BAR 01 ──────────────── */}
      <div className="sec-bar" id="work-section">
        <span className="sec-bar-num">01</span>
        <span>Selected Work</span>
        <span className="sec-bar-star">✦</span>
      </div>

      {/* ── WORK — a small curated "Featured" set, no filter tabs ────── */}
      <section className="proj-wrap">
        <p className="sec-eyebrow">Featured</p>
        <div className="sec-heading">
          <Drift className="h1" from={-70} to={70}><RevealText text="The" /></Drift>
          <Drift className="h2" from={70} to={-70}><RevealText text="Projects" /></Drift>
        </div>
        <div className="proj-grid" ref={projRef}>
          {featuredProjects.length === 0
            ? <div className="proj-empty">No projects yet.</div>
            : featuredProjects.map((p, i) => (
              <div
                key={p.id}
                className={`proj-card rv${projOn ? ' on' : ''} d${Math.min(i + 1, 4)}${i % 3 === 0 ? ' from-left' : i % 3 === 2 ? ' from-right' : ''}`}
                onClick={() => navigate(`/project/${p.slug}`)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/project/${p.slug}`)}>
                <div className="proj-card-img">
                  {p.img
                    ? <img src={p.img} alt={p.title} />
                    : <span className="proj-img-label">{p.imgNote || 'Add Image'}</span>
                  }
                  <div className="proj-card-cats">
                    {p.cats.map(c => <span key={c} className="proj-card-cat" style={{ background: CATEGORY_FILLS[c] }}>{c}</span>)}
                  </div>
                  <span className="proj-card-yr">{p.year}</span>
                </div>
                <div className="proj-card-eyebrow" style={{ color: CATEGORY_COLORS[p.cats[0]] }}>
                  {PROJECT_MOTIFS[p.slug] && <MotifIcon name={PROJECT_MOTIFS[p.slug]} color={CATEGORY_COLORS[p.cats[0]]} size={13} />}
                  {p.cats.join(' · ')} · {p.year}
                </div>
                <div className="proj-title">{p.title}</div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                <span className="proj-card-link">View Project →</span>
              </div>
            ))
          }
        </div>
      </section>

      {/* ── MORE WORK — compact thumbnail cards, denser than plain text ── */}
      <section className="more-work-wrap" ref={moreRef}>
        <p className="more-work-label">More Work</p>
        <div className="more-work-grid">
          {moreProjects.map((p, i) => (
            <div key={p.id} className={`more-work-item rv${moreOn ? ' on' : ''}`} style={{ '--d': `${i * 70}ms` }} onClick={() => navigate(`/project/${p.slug}`)}
              role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && navigate(`/project/${p.slug}`)}>
              <div className="more-work-thumb">
                {p.img
                  ? <img src={p.img} alt={p.title} />
                  : <MotifIcon name={PROJECT_MOTIFS[p.slug]} color={CATEGORY_COLORS[p.cats[0]]} size={22} />
                }
              </div>
              <div className="more-work-info">
                <div className="more-work-title">{p.title}</div>
                <div className="more-work-meta">{p.cats.join(' · ')} · {p.year}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION BAR 02 ──────────────── */}
      <div className="sec-bar" id="about-section">
        <span className="sec-bar-num">02</span>
        <span>The Person</span>
        <span className="sec-bar-star">✦</span>
      </div>

      {/* ── ABOUT ───────────────────────── */}
      <section className="about-wrap" ref={aboutRef}>
        <div className="about-grid">
          <div className={`rv${aboutOn ? ' on' : ''} d1 from-left`}>
            <p className="about-eyebrow">About Me</p>
            <div className="about-heading">
              <Drift className="al" from={50} to={-50}><RevealText text="Curious by" /></Drift>
              <Drift className="ab" from={-50} to={70}><RevealText text="design." /></Drift>
            </div>
            <p className="about-bio">
              I'm Kate, a multi-disciplinary designer and developer. I've always been drawn to the edges where disciplines overlap: the moment a game's design breaks down into a piece of UX beauty, or a data visualisation becomes a piece of art.<br /><br />
              I'm a Cognitive Science major at UT Dallas, concentrating in AI/Computation and HCI, and I'm working through a data science certification alongside it. Right now I'm an Application Developer Intern at Cooperative Processing Resources, shipping frontend features for Cloverleaf CMS, and I'm the Technology Designer and Officer for the Artificial Intelligence Society, leading web development and product design across the org's platforms.<br /><br />
              Before that, I did UX research with the Nebula Labs product team, co-moderating focus groups and user interviews across three student platforms, and spent over a year as a Game Master at Red Door Escape Room.
            </p>
            <div className="about-links">
              <a href="mailto:kate.mezger22@gmail.com" className="about-lnk">Email</a>
              <a href="https://www.linkedin.com/in/kate-mezger-437397263/" target="_blank" rel="noopener noreferrer" className="about-lnk">LinkedIn</a>
              <a href="https://github.com/katemezger" target="_blank" rel="noopener noreferrer" className="about-lnk">GitHub</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="about-lnk">Resume</a>
            </div>
          </div>
          <div className={`rv${aboutOn ? ' on' : ''} d2 from-right`} style={{ width: '100%', maxWidth: 400, marginInline: 'auto', marginTop: 60 }}>
            <Drift from={40} to={-40} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', width: '82%' }}>
              <PolaroidPhoto src="/images/kate.webp" alt="Kate Mezger" rotate={-3} />
            </div>
            <div style={{ position: 'absolute', top: 150, right: -16, width: '48%' }}>
              <PolaroidPhoto src="/images/projects-gallery/Cognizant-Winners.webp" alt="Kate Mezger at the Cognizant × Aston Martin Ideathon" rotate={4} zoom={1.8} focus="44% 28%" />
            </div>
            </Drift>
          </div>
        </div>
      </section>

      {/* ── TOOLKIT — plain text, folded down to a light closing note ── */}
      <section className={`toolkit-wrap rv${toolOn ? ' on' : ''}`} ref={toolRef}>
        <p className="more-work-label">Toolkit</p>
        {Object.entries(TOOLS).map(([cat, items]) => (
          <p key={cat} className="toolkit-line" style={{ transitionDelay: `${Object.keys(TOOLS).indexOf(cat) * 90}ms` }}><b>{cat}:</b> {items.join(', ')}</p>
        ))}
        <p className="toolkit-line" style={{ transitionDelay: `${Object.keys(TOOLS).length * 90}ms` }}><b>Also:</b> {SKILLS.join(', ')}</p>
      </section>

      {/* ── FOOTER ──────────────────────── */}
      <footer className="footer">
        <span className="footer-logo">Eden<em>.</em></span>
        <div className="footer-links">
          <button className="footer-lnk" onClick={() => scrollTo('work-section')}>Work</button>
          <a href="mailto:kate.mezger22@gmail.com" className="footer-lnk">Email</a>
          <a href="https://www.linkedin.com/in/kate-mezger-437397263/" target="_blank" rel="noopener noreferrer" className="footer-lnk">LinkedIn</a>
          <a href="https://github.com/katemezger" target="_blank" rel="noopener noreferrer" className="footer-lnk">GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="footer-lnk">Resume</a>
          <button className="footer-lnk" onClick={scrollToTop}>↑ Top</button>
        </div>
        <span className="footer-copy">© 2026 Kate Mezger</span>
      </footer>
    </motion.main>
    </ScrollContainerContext.Provider>
  )
}
