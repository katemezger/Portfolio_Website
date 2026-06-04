import { useState, useEffect } from "react"

const ITEMS = [
  { id: "design-dev",        label: "Design & Dev",         page: "design-dev",        size: 74 },
  { id: "research-ux",       label: "Research & UX/UI",     page: "research-ux",        size: 62 },
  { id: "analytics-science", label: "Analytics & Science",  page: "analytics-science",  size: 58 },
  { id: "other",             label: "Other",                page: "other",              size: 80 },
  { id: "about",             label: "About",                page: "about",              size: 76 },
]

const FIREFLIES = [
  { id: 0, left: '68%', top: '12%',  size: 3,   delay: 0,   duration: 5.5 },
  { id: 1, left: '82%', top: '38%',  size: 2,   delay: 1.8, duration: 6.5 },
  { id: 2, left: '58%', top: '62%',  size: 2.5, delay: 0.6, duration: 4.8 },
  { id: 3, left: '91%', top: '74%',  size: 1.8, delay: 2.5, duration: 7   },
  { id: 4, left: '74%', top: '50%',  size: 2.2, delay: 3.2, duration: 5   },
  { id: 5, left: '62%', top: '28%',  size: 1.5, delay: 1.1, duration: 6   },
  { id: 6, left: '88%', top: '88%',  size: 2.8, delay: 0.3, duration: 4.5 },
  { id: 7, left: '50%', top: '80%',  size: 1.6, delay: 4,   duration: 5.8 },
]

export default function Menu({ onNavigate }) {
  const [active, setActive]   = useState(0)
  const [mounted, setMounted] = useState(false)

  const activate = (idx) => setActive(idx)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1))
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1))
      if (e.key === "Enter")     onNavigate?.(ITEMS[active].page)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@1,300;1,400;1,500&display=swap');

        .g-shell {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding-left: 9vw;
          pointer-events: none;
        }

        .g-firefly {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #D4A853 0%, rgba(212,168,83,0.3) 60%, transparent 100%);
          pointer-events: none;
          animation: firefly-drift var(--duration) ease-in-out var(--delay) infinite;
        }

        .g-topline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(100,118,86,0.5) 30%, rgba(212,168,83,0.35) 65%, transparent);
          pointer-events: none;
        }

        .g-left-line {
          position: absolute;
          left: 6vw; top: 10%; bottom: 10%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(100,118,86,0.35) 25%, rgba(212,168,83,0.25) 75%, transparent);
          pointer-events: none;
        }

        .g-brand-ghost {
          position: absolute;
          top: 20px;
          right: 4vw;
          font-family: 'Cinzel', serif;
          font-weight: 400;
          font-size: clamp(70px, 11vw, 140px);
          line-height: 0.85;
          letter-spacing: 20px;
          color: rgba(243,236,205,0.04);
          user-select: none;
          pointer-events: none;
          z-index: 5;
        }

        .g-brand-plate {
          position: absolute;
          top: 36px;
          left: 9vw;
          z-index: 5;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.9s ease 0.2s;
        }
        .g-brand-plate.mounted { opacity: 1; }

        .g-brand-name {
          font-family: 'Cinzel', serif;
          font-weight: 400;
          font-size: clamp(13px, 1.6vw, 20px);
          letter-spacing: 10px;
          color: #F3ECCD;
          text-transform: uppercase;
          display: block;
        }

        .g-brand-rule {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .g-rule-line {
          height: 1px;
          width: 48px;
          background: linear-gradient(90deg, rgba(212,168,83,0.65), rgba(212,168,83,0.1));
          flex-shrink: 0;
        }
        .g-rule-diamond {
          width: 5px;
          height: 5px;
          background: #D4A853;
          transform: rotate(45deg);
          flex-shrink: 0;
          opacity: 0.7;
        }
        .g-rule-line-r {
          height: 1px;
          width: 48px;
          background: linear-gradient(90deg, rgba(212,168,83,0.1), transparent);
          flex-shrink: 0;
        }

        .g-subtitle {
          position: absolute;
          bottom: 30px;
          left: 9vw;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(243,236,205,0.18);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.8s ease 1.2s;
          z-index: 5;
        }
        .g-subtitle.mounted { opacity: 1; }

        .g-hint {
          position: absolute;
          bottom: 30px;
          right: 5vw;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(243,236,205,0.14);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          opacity: 0;
          transition: opacity 0.6s ease 1.4s;
          pointer-events: none;
          z-index: 5;
        }
        .g-hint.mounted { opacity: 1; }
        .g-hint-row { display: flex; align-items: center; gap: 8px; }
        .g-hint-key {
          border: 1px solid rgba(100,118,86,0.35);
          border-radius: 2px;
          padding: 1px 5px;
          font-size: 9px;
          color: rgba(100,118,86,0.55);
        }

        .g-nav {
          position: relative;
          z-index: 20;
          pointer-events: all;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .g-item {
          display: flex;
          align-items: baseline;
          gap: 18px;
          cursor: pointer;
          text-decoration: none;
          padding: 4px 0;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.5s ease,
            transform 0.5s cubic-bezier(0.22,1,0.36,1);
          position: relative;
        }
        .g-item.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .g-item::before {
          content: '';
          position: absolute;
          left: -30px;
          top: 50%;
          transform: translateY(-50%);
          width: 480px;
          height: 120px;
          background: radial-gradient(ellipse 45% 70% at 6% 50%, rgba(212,168,83,0) 0%, transparent 70%);
          pointer-events: none;
          transition: background 0.5s ease;
          z-index: -1;
        }
        .g-item.active::before {
          background: radial-gradient(ellipse 45% 70% at 6% 50%, rgba(212,168,83,0.11) 0%, transparent 70%);
        }

        .g-num {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 3px;
          color: rgba(100,118,86,0.4);
          width: 22px;
          text-align: right;
          flex-shrink: 0;
          transition: color 0.35s ease;
          padding-bottom: 4px;
        }
        .g-item.active .g-num { color: #D4A853; }
        .g-item:hover .g-num  { color: rgba(100,118,86,0.75); }

        .g-label-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .g-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
          line-height: 0.9;
          white-space: nowrap;
          user-select: none;
          color: rgba(243,236,205,0.18);
          transition: color 0.4s ease, text-shadow 0.4s ease;
        }
        .g-item.active .g-label {
          color: #F3ECCD;
          text-shadow: 0 0 40px rgba(212,168,83,0.3);
        }
        .g-item:hover:not(.active) .g-label { color: rgba(243,236,205,0.52); }

        .g-line {
          height: 1px;
          background: linear-gradient(90deg, #D4A853, rgba(212,168,83,0));
          width: 0;
          margin-top: 3px;
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .g-item.active .g-line { width: 100%; }

        .g-ornament {
          width: 5px;
          height: 5px;
          background: #D4A853;
          transform: rotate(45deg) scale(0);
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          margin-bottom: 4px;
          align-self: flex-end;
        }
        .g-item.active .g-ornament {
          opacity: 0.8;
          transform: rotate(45deg) scale(1);
        }
      `}</style>

      <div className="g-shell">
        <div className="g-topline" />
        <div className="g-left-line" />
        <div className="g-brand-ghost">Eden</div>

        {FIREFLIES.map(f => (
          <div
            key={f.id}
            className="g-firefly"
            style={{
              left: f.left,
              top: f.top,
              width: f.size,
              height: f.size,
              '--duration': `${f.duration}s`,
              '--delay': `${f.delay}s`,
            }}
          />
        ))}

        <div className={`g-brand-plate${mounted ? " mounted" : ""}`}>
          <span className="g-brand-name">Eden</span>
          <div className="g-brand-rule">
            <div className="g-rule-line" />
            <div className="g-rule-diamond" />
            <div className="g-rule-line-r" />
          </div>
        </div>

        <nav className="g-nav">
          {ITEMS.map((item, i) => {
            const isActive = active === i
            return (
              <a
                key={item.id}
                href="#"
                className={`g-item${isActive ? " active" : ""}${mounted ? " mounted" : ""}`}
                style={{ transitionDelay: mounted ? `${i * 80 + 400}ms` : "0ms" }}
                onClick={(e) => { e.preventDefault(); onNavigate?.(item.page) }}
                onMouseEnter={() => activate(i)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="g-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="g-label-wrap">
                  <span className="g-label" style={{ fontSize: item.size }}>
                    {item.label}
                  </span>
                  <div className="g-line" />
                </div>
                <div className="g-ornament" />
              </a>
            )
          })}
        </nav>

        <div className={`g-subtitle${mounted ? " mounted" : ""}`}>
          Portfolio &nbsp;·&nbsp; Kate Mezger
        </div>

        <div className={`g-hint${mounted ? " mounted" : ""}`}>
          <div className="g-hint-row"><span className="g-hint-key">↑↓</span><span>navigate</span></div>
          <div className="g-hint-row"><span className="g-hint-key">↵</span><span>open</span></div>
        </div>
      </div>
    </>
  )
}