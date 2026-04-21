import { useState, useEffect } from "react"

const ITEMS = [
  { id: "design-dev",        label: "Design & Dev",         page: "design-dev",        size: 74 },
  { id: "research-ux",       label: "Research & UX/UI",     page: "research-ux",        size: 62 },
  { id: "analytics-science", label: "Analytics & Science",  page: "analytics-science",  size: 58 },
  { id: "other",             label: "Other",                page: "other",              size: 80 },
  { id: "about",             label: "About",                page: "about",              size: 76 },
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,500&display=swap');

        .g-shell {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding-left: 9vw;
          pointer-events: none;
        }

        /* Thin botanical top line */
        .g-topline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(131,153,88,0.5) 30%, rgba(211,150,140,0.4) 70%, transparent);
          pointer-events: none;
        }

        /* Thin left accent line */
        .g-left-line {
          position: absolute;
          left: 6vw; top: 12%; bottom: 12%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(131,153,88,0.35) 30%, rgba(211,150,140,0.3) 70%, transparent);
          pointer-events: none;
        }

        /* Brand — large faded italic serif, upper right */
        .g-brand {
          position: absolute;
          top: 32px;
          right: 5vw;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(80px, 12vw, 160px);
          line-height: 0.85;
          letter-spacing: 8px;
          color: rgba(247,244,213,0.04);
          user-select: none;
          pointer-events: none;
          z-index: 5;
        }

        /* Subtitle */
        .g-subtitle {
          position: absolute;
          bottom: 32px;
          left: 9vw;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(247,244,213,0.2);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.8s ease 1s;
          z-index: 5;
        }
        .g-subtitle.mounted { opacity: 1; }

        /* Keyboard hint */
        .g-hint {
          position: absolute;
          bottom: 32px;
          right: 5vw;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(247,244,213,0.15);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          opacity: 0;
          transition: opacity 0.6s ease 1.2s;
          pointer-events: none;
          z-index: 5;
        }
        .g-hint.mounted { opacity: 1; }
        .g-hint-row { display: flex; align-items: center; gap: 8px; }
        .g-hint-key {
          border: 1px solid rgba(131,153,88,0.3);
          border-radius: 2px;
          padding: 1px 5px;
          font-size: 9px;
          color: rgba(131,153,88,0.5);
        }

        /* Nav */
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
          padding: 2px 0;
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.5s ease,
            transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .g-item.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .g-num {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 3px;
          color: rgba(131,153,88,0.5);
          width: 22px;
          text-align: right;
          flex-shrink: 0;
          transition: color 0.3s ease;
          padding-bottom: 4px;
        }
        .g-item.active .g-num,
        .g-item:hover .g-num { color: #839958; }

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
          color: rgba(247,244,213,0.22);
          transition: color 0.4s ease;
        }
        .g-item.active .g-label  { color: #F7F4D5; }
        .g-item:hover:not(.active) .g-label { color: rgba(247,244,213,0.6); }

        /* Underline that blooms on active */
        .g-line {
          height: 1px;
          background: linear-gradient(90deg, #D3968C, rgba(211,150,140,0));
          width: 0;
          margin-top: 3px;
          transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .g-item.active .g-line { width: 100%; }

        /* Small rose ornament dot on active */
        .g-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #D3968C;
          flex-shrink: 0;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          margin-bottom: 4px;
          align-self: flex-end;
        }
        .g-item.active .g-dot {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      <div className="g-shell">
        <div className="g-topline" />
        <div className="g-left-line" />
        <div className="g-brand">Eden</div>

        <div className={`g-subtitle${mounted ? " mounted" : ""}`}>
          Portfolio &nbsp;·&nbsp; Kate Mezger
        </div>

        <nav className="g-nav">
          {ITEMS.map((item, i) => {
            const isActive = active === i
            return (
              <a
                key={item.id}
                href="#"
                className={`g-item${isActive ? " active" : ""}${mounted ? " mounted" : ""}`}
                style={{ transitionDelay: mounted ? `${i * 70}ms` : "0ms" }}
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
                <div className="g-dot" />
              </a>
            )
          })}
        </nav>

        <div className={`g-hint${mounted ? " mounted" : ""}`}>
          <div className="g-hint-row"><span className="g-hint-key">↑↓</span><span>navigate</span></div>
          <div className="g-hint-row"><span className="g-hint-key">↵</span><span>open</span></div>
        </div>
      </div>
    </>
  )
}
