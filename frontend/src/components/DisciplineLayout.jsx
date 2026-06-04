import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScatteredSymbolsFixed } from './ScatteredSymbols.jsx'

export default function DisciplineLayout({ num, h1, h2, eyebrow, children }) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: '#E5EAD8', position: 'relative' }}
    >
      <ScatteredSymbolsFixed />
      <style>{`
        .dl-nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 5vw;
          background: rgba(180,185,168,0.96);
          backdrop-filter: blur(10px);
          border-bottom: 2px solid #186878;
        }
        .dl-logo {
          font-family: 'La Belle Aurore', cursive; font-size: 24px; color: #071A12;
          background: rgba(7,26,18,0.13); border-radius: 8px; padding: 6px 18px;
          cursor: pointer; border: none; transition: background 0.2s;
        }
        .dl-logo:hover { background: rgba(7,26,18,0.2); }
        .dl-back {
          font-family: 'Cormorant Garamond', serif; font-size: 13px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; color: rgba(7,26,18,0.5);
          background: rgba(7,26,18,0.08); border-radius: 8px; border: none;
          cursor: pointer; padding: 6px 18px; transition: all 0.2s;
        }
        .dl-back:hover { color: #071A12; background: rgba(7,26,18,0.16); }

        .dl-bar {
          background: #0A3020; display: flex; align-items: center;
          justify-content: space-between; padding: 15px 6vw;
          font-family: 'Cormorant Garamond', serif; font-weight: 500;
          font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(240,237,230,0.5);
        }
        .dl-bar-num { color: rgba(141,196,192,0.8); }

        .dl-header { padding: 52px 6vw 40px; }
        .dl-eyebrow {
          font-family: 'Cormorant Garamond', serif; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(7,26,18,0.38); margin-bottom: 10px;
        }
        .dl-h1 {
          display: block; font-family: 'Berkshire Swash', serif; font-weight: 400;
          font-size: clamp(42px,6vw,82px); color: #071A12; line-height: 0.9; letter-spacing: -1px;
        }
        .dl-h2 {
          display: block; font-family: 'Stoke', serif; font-weight: 400;
          font-size: clamp(42px,6vw,82px); color: #186878; line-height: 0.9; letter-spacing: -1px;
        }

        .dl-content { padding: 0 6vw 80px; }

        .dl-section-label {
          font-family: 'Cormorant Garamond', serif; font-size: 11px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase; color: rgba(7,26,18,0.36);
          margin: 48px 0 22px; display: flex; align-items: center; gap: 14px;
        }
        .dl-section-label::after {
          content: ''; flex: 1; height: 1px; background: rgba(7,26,18,0.10);
        }

        .dl-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 22px;
        }
        @media (max-width: 900px) { .dl-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 580px) { .dl-grid { grid-template-columns: 1fr; } }

        .dl-card { cursor: pointer; }
        .dl-card-img {
          aspect-ratio: 4/3; background: rgba(7,26,18,0.055); border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px; position: relative; overflow: hidden;
          box-shadow: none; transition: box-shadow 0.9s ease;
        }
        .dl-card:hover .dl-card-img {
          box-shadow:
            0 0 28px rgba(212,184,128,0.22),
            0 0 58px rgba(212,184,128,0.10),
            inset 0 0 24px rgba(212,184,128,0.07);
        }
        .dl-card-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .dl-img-label {
          font-family: 'Cormorant Garamond', serif; font-size: 11px;
          letter-spacing: 2.5px; text-transform: uppercase; color: rgba(7,26,18,0.18);
        }
        .dl-card-title {
          font-family: 'Stoke', serif; font-size: 19px; color: #071A12;
          margin-bottom: 6px; line-height: 1.2; transition: color 0.2s;
        }
        .dl-card:hover .dl-card-title { color: #186878; }
        .dl-card-desc {
          font-family: 'Cormorant Garamond', serif; font-size: 15px;
          color: rgba(7,26,18,0.48); line-height: 1.6; margin-bottom: 10px;
        }
        .dl-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .dl-tag {
          font-family: 'Cormorant Garamond', serif; font-size: 11px; font-weight: 500;
          padding: 3px 10px; border: 1px solid rgba(7,26,18,0.14); color: rgba(7,26,18,0.45);
        }

        .dl-footer {
          background: #071A12; padding: 30px 6vw;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .dl-footer-logo { font-family: 'La Belle Aurore', cursive; font-size: 26px; color: rgba(240,237,230,0.55); }
        .dl-footer-logo em { color: #8DC4C0; font-style: normal; }
        .dl-footer-copy { font-family: 'Cormorant Garamond', serif; font-size: 11px; color: rgba(240,237,230,0.14); }
      `}</style>

      <nav className="dl-nav">
        <button className="dl-logo" onClick={() => navigate('/')}>Eden</button>
        <button className="dl-back" onClick={() => navigate('/')}>← Back</button>
      </nav>

      <div className="dl-bar">
        <span className="dl-bar-num">{num}</span>
        <span>{h1} {h2}</span>
        <span style={{ color: 'rgba(240,237,230,0.25)', fontSize: 14 }}>✦</span>
      </div>

      <div className="dl-header">
        <p className="dl-eyebrow">{eyebrow}</p>
        <div>
          <span className="dl-h1">{h1}</span>
          <span className="dl-h2">{h2}</span>
        </div>
      </div>

      <div className="dl-content">{children}</div>

      <footer className="dl-footer">
        <span className="dl-footer-logo">Eden<em>.</em></span>
        <span className="dl-footer-copy">© 2026 Kate Mezger</span>
      </footer>
    </motion.div>
  )
}
