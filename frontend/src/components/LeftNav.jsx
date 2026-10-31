import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PROJECT_NAV } from '../data/projectNav.js'

// Collapsed width of the rail on desktop — every page's outer container pads
// its content by this amount (see the shared `.page-shell` rule each page
// defines) so nothing renders underneath it. Expanding the rail (to show
// text labels) is an overlay on top of that reserved space, so it never
// shifts page content. Below MOBILE_BP the rail becomes a horizontal top
// bar via CSS, and pages switch their padding from padding-left to
// padding-top to match.
export const LEFTNAV_WIDTH = 64
export const LEFTNAV_MOBILE_BP = 680

// Small stroke-based line icons, same technique as MotifIcon.jsx, so the nav
// reads as part of the same icon system instead of a separate placeholder
// element (a plain letter glyph, which is what this replaced).
function NavIcon({ name }) {
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (name === 'work') {
    return <svg {...p}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></svg>
  }
  if (name === 'about') {
    return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21C4 16.5 7.5 13 12 13C16.5 13 20 16.5 20 21" /></svg>
  }
  if (name === 'projects') {
    return <svg {...p}><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="14" y2="18" /></svg>
  }
  if (name === 'chevron') {
    return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
  }
  return null
}

const LINKS = [
  { id: 'work-section', label: 'Works', icon: 'work' },
  { id: 'about-section', label: 'About', icon: 'about' },
]

export default function LeftNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)

  // Section anchors only exist on the Home page. From any other page,
  // navigate home and hand the target id via router state; Home reads that
  // state once on mount and scrolls to it there (see Home.jsx).
  const goToSection = (id) => {
    setOpen(false)
    setProjectsOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  const goToProject = (slug) => {
    setOpen(false)
    setProjectsOpen(false)
    navigate(`/project/${slug}`)
  }

  const toggleProjects = () => {
    if (!open) setOpen(true)
    setProjectsOpen(o => !o)
  }

  return (
    <>
      <style>{`
        .leftnav {
          position: fixed; top: 0; left: 0; bottom: 0; width: ${LEFTNAV_WIDTH}px;
          display: flex; flex-direction: column; align-items: center;
          padding: 20px 0; z-index: 150;
          background: var(--rail);
          border-right: 1px solid rgba(var(--ink-rgb),0.14);
          box-shadow: 2px 0 14px rgba(0,0,0,0.14);
          transition: width 0.25s ease;
          overflow: hidden;
        }
        .leftnav.open { width: 220px; align-items: flex-start; overflow: visible; }
        .leftnav-logo {
          font-family: 'La Belle Aurore', cursive; font-weight: 400; font-size: 24px;
          color: var(--forest); background: none; padding: 0; cursor: pointer; border: none;
          margin-bottom: 28px; line-height: 1; transition: color 0.2s;
        }
        .leftnav-logo:hover { color: var(--terra); }
        .leftnav.open .leftnav-logo { margin-left: 18px; }
        .leftnav-toggle {
          width: 30px; height: 30px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          background: transparent; border-radius: 7px; border: none; cursor: pointer;
          color: rgba(var(--ink-rgb),0.55); transition: background 0.2s, color 0.2s; margin-bottom: 16px;
        }
        .leftnav.open .leftnav-toggle { margin-left: 15px; }
        .leftnav-toggle:hover { background: rgba(var(--ink-rgb),0.1); color: var(--ink); }
        .leftnav-links { display: flex; flex-direction: column; gap: 6px; align-items: center; margin: auto 0; max-height: calc(100vh - 160px); overflow-y: auto; }
        .leftnav.open .leftnav-links { align-items: stretch; width: 100%; padding: 0 12px; }
        .leftnav-btn {
          font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 13px;
          color: var(--ink); background: transparent;
          border-radius: 8px; border: none; cursor: pointer;
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.2s, color 0.2s; flex-shrink: 0;
        }
        .leftnav.open .leftnav-btn {
          width: 100%; height: auto; justify-content: flex-start; text-align: left;
          padding: 10px 11px;
        }
        .leftnav-btn:hover { background: rgba(var(--ink-rgb),0.12); color: var(--terra); }
        .leftnav-btn .label { display: none; flex: 1; }
        .leftnav.open .leftnav-btn .label { display: inline; }
        .leftnav-btn .chevron { display: none; transition: transform 0.2s ease; }
        .leftnav.open .leftnav-btn .chevron { display: inline-flex; }
        .leftnav-btn.projects-active .chevron { transform: rotate(90deg); }

        /* Project sub-list — only shown once the rail is open and the
           Projects toggle is active. Its own scroll so 9+ projects don't
           push the rail taller than the viewport. */
        .leftnav-project-list {
          display: none; flex-direction: column; gap: 1px;
          max-height: 240px; overflow-y: auto; padding: 2px 0 2px 14px; margin-bottom: 4px;
        }
        .leftnav.open .leftnav-btn.projects-active + .leftnav-project-list { display: flex; }
        .leftnav-project-link {
          font-family: 'Quicksand', sans-serif; font-size: 12px; color: rgba(var(--ink-rgb),0.7);
          background: transparent; border: none; border-radius: 5px; cursor: pointer;
          padding: 6px 10px; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .leftnav-project-link:hover { background: rgba(var(--ink-rgb),0.1); color: var(--terra); }

        @media (max-width: ${LEFTNAV_MOBILE_BP}px) {
          .leftnav, .leftnav.open {
            left: 0; right: 0; top: 0; bottom: auto; width: 100%; height: auto;
            flex-direction: row; align-items: center; justify-content: space-between;
            padding: 10px 5vw; border-right: none; border-bottom: 1px solid rgba(var(--ink-rgb),0.14);
            overflow: visible;
          }
          .leftnav-toggle { display: none; }
          .leftnav-logo, .leftnav.open .leftnav-logo { margin: 0; }
          .leftnav-links, .leftnav.open .leftnav-links {
            flex-direction: row; margin: 0; padding: 0; width: auto; max-height: none; position: relative;
          }
          .leftnav-btn, .leftnav.open .leftnav-btn {
            width: auto; height: auto; padding: 6px 12px;
          }
          .leftnav-btn .label, .leftnav.open .leftnav-btn .label { display: inline; }
          .leftnav-btn .chevron, .leftnav.open .leftnav-btn .chevron { display: inline-flex; }
          .leftnav-project-list, .leftnav.open .leftnav-btn.projects-active + .leftnav-project-list {
            display: none; position: absolute; top: 100%; right: 0; margin-top: 8px;
            background: var(--rail); border: 1px solid rgba(var(--ink-rgb),0.14); border-radius: 8px;
            padding: 8px; min-width: 240px; max-height: 320px; overflow-y: auto;
            box-shadow: 0 10px 24px rgba(0,0,0,0.43);
          }
          .leftnav-btn.projects-active + .leftnav-project-list { display: flex; }
        }
      `}</style>
      <nav className={`leftnav${open ? ' open' : ''}`}>
        <button className="leftnav-toggle" onClick={() => { setOpen(o => !o); setProjectsOpen(false) }} aria-label={open ? 'Collapse menu' : 'Expand menu'}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="2" y1="4" x2="14" y2="4" /><line x1="2" y1="8" x2="14" y2="8" /><line x1="2" y1="12" x2="14" y2="12" />
          </svg>
        </button>
        <button className="leftnav-logo" onClick={() => { setOpen(false); setProjectsOpen(false); navigate('/') }}>Eden</button>
        <div className="leftnav-links">
          {LINKS.map(l => (
            <button key={l.id} className="leftnav-btn" onClick={() => goToSection(l.id)} title={l.label}>
              <NavIcon name={l.icon} />
              <span className="label">{l.label}</span>
            </button>
          ))}
          <button
            className={`leftnav-btn${projectsOpen ? ' projects-active' : ''}`}
            onClick={toggleProjects} title="Projects"
            aria-expanded={projectsOpen}>
            <NavIcon name="projects" />
            <span className="label">Projects</span>
            <span className="chevron"><NavIcon name="chevron" /></span>
          </button>
          <div className="leftnav-project-list">
            {PROJECT_NAV.map(p => (
              <button key={p.slug} className="leftnav-project-link" onClick={() => goToProject(p.slug)}>
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
