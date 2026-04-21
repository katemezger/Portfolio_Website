import PageLayout from '../components/PageLayout.jsx'

const SKILLS = [
  { label: "Design & Dev",         value: 88 },
  { label: "Research & UX/UI",     value: 90 },
  { label: "Analytics & Science",  value: 82 },
]

export default function About() {
  return (
    <PageLayout title="About" number="05">
      <style>{`
        .ab-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          max-width: 900px;
        }
        @media (max-width: 700px) {
          .ab-wrap { grid-template-columns: 1fr; gap: 40px; }
        }

        .ab-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 500;
          font-size: 48px;
          color: #F7F4D5;
          line-height: 0.9;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        .ab-role {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(211,150,140,0.7);
          margin-bottom: 24px;
        }
        .ab-bio {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 15px;
          color: rgba(247,244,213,0.5);
          line-height: 1.85;
          margin-bottom: 30px;
        }
        .ab-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .ab-link {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(131,153,88,0.7);
          text-decoration: none;
          border: 1px solid rgba(131,153,88,0.25);
          padding: 7px 18px;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .ab-link:hover {
          background: rgba(131,153,88,0.1);
          color: #F7F4D5;
          border-color: rgba(131,153,88,0.5);
        }

        .ab-skills-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
          font-size: 20px;
          color: rgba(131,153,88,0.6);
          margin-bottom: 28px;
          letter-spacing: 0.5px;
        }
        .ab-skill-row {
          margin-bottom: 22px;
        }
        .ab-skill-name {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(247,244,213,0.45);
          margin-bottom: 8px;
        }
        .ab-bar-bg {
          height: 1px;
          background: rgba(247,244,213,0.08);
          position: relative;
        }
        .ab-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #D3968C, rgba(131,153,88,0.6));
          transform-origin: left;
          animation: barGrow 1s cubic-bezier(0.22,1,0.36,1) forwards;
          transform: scaleX(0);
        }
        @keyframes barGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div className="ab-wrap">
        <div>
          <div className="ab-name">Kate Mezger</div>
          <div className="ab-role">Designer · Researcher · Developer</div>
          <p className="ab-bio">
            Add your bio here — your story, what drives you, and why you work
            across design, UX research, and data.
          </p>
          <div className="ab-links">
            <a href="mailto:kate.mezger22@gmail.com" className="ab-link">Email</a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="ab-link">LinkedIn</a>
            <a href="https://github.com/katemezger" target="_blank" rel="noopener noreferrer" className="ab-link">GitHub</a>
          </div>
        </div>

        <div>
          <div className="ab-skills-label">Areas of focus</div>
          {SKILLS.map((s, i) => (
            <div key={s.label} className="ab-skill-row">
              <div className="ab-skill-name">{s.label}</div>
              <div className="ab-bar-bg">
                <div
                  className="ab-bar-fill"
                  style={{ width: `${s.value}%`, animationDelay: `${i * 120 + 200}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
