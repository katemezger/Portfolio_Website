import { useNavigate } from 'react-router-dom'
import PageTransition from './PageTransition.jsx'

export default function PageLayout({ title, subtitle, number, children }) {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{
        width: '100%',
        height: '100vh',
        background: '#0C120C',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@1,300;1,400;1,500&display=swap');

          .gl-bg-img {
            position: absolute;
            inset: 0;
            background-image: url(/images/bg-landscape.jpg);
            background-size: cover;
            background-position: center right;
            opacity: 0.06;
            filter: saturate(0.4) brightness(0.6) sepia(0.3);
            z-index: 0;
            pointer-events: none;
          }
          .gl-bg-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(12,18,12,0.97) 0%, rgba(12,18,12,0.88) 100%);
            z-index: 1;
            pointer-events: none;
          }
          .gl-glow-tr {
            position: absolute;
            top: -10%;
            right: -5%;
            width: 50%;
            height: 60%;
            background: radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 70%);
            z-index: 1;
            pointer-events: none;
            animation: candleflicker 7s ease-in-out infinite;
          }

          .gl-header {
            position: relative;
            z-index: 10;
            padding: 28px 6vw 22px 6vw;
            border-bottom: 1px solid rgba(100,118,86,0.14);
            flex-shrink: 0;
          }
          .gl-header::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(100,118,86,0.5) 30%, rgba(212,168,83,0.35) 65%, transparent);
          }

          .gl-eyebrow {
            font-family: 'Cinzel', serif;
            font-weight: 400;
            font-size: 9px;
            letter-spacing: 5px;
            text-transform: uppercase;
            color: rgba(100,118,86,0.55);
            margin-bottom: 10px;
          }

          .gl-title {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(40px, 6vw, 72px);
            letter-spacing: 1px;
            color: #F3ECCD;
            line-height: 0.9;
          }

          .gl-subtitle {
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 11px;
            letter-spacing: 4px;
            color: rgba(212,168,83,0.5);
            margin-top: 8px;
            text-transform: uppercase;
          }

          .gl-back {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: 'Cinzel', serif;
            font-weight: 400;
            font-size: 9px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(243,236,205,0.18);
            cursor: pointer;
            border: none;
            background: none;
            padding: 0;
            margin-top: 18px;
            transition: color 0.25s ease;
          }
          .gl-back::before {
            content: '◆';
            font-size: 5px;
            color: rgba(212,168,83,0.4);
            transition: color 0.25s ease;
          }
          .gl-back:hover { color: rgba(212,168,83,0.75); }
          .gl-back:hover::before { color: #D4A853; }

          .gl-content {
            position: relative;
            z-index: 10;
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 36px 6vw 52px 6vw;
          }

          .eden-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }

          .gl-section-label {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-weight: 400;
            font-size: 26px;
            color: rgba(100,118,86,0.6);
            margin-bottom: 18px;
            margin-top: 36px;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .gl-section-label::after {
            content: '';
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, rgba(100,118,86,0.2), transparent);
            max-width: 200px;
          }
          .gl-section-label:first-child { margin-top: 0; }
        `}</style>

        <div className="gl-bg-img" />
        <div className="gl-bg-overlay" />
        <div className="gl-glow-tr" />

        <header className="gl-header">
          <div className="gl-eyebrow">Eden &nbsp;·&nbsp; {number}</div>
          <div className="gl-title">{title}</div>
          {subtitle && <div className="gl-subtitle">{subtitle}</div>}
          <button className="gl-back" onClick={() => navigate('/')}>
            return
          </button>
        </header>

        <main className="gl-content">
          {children}
        </main>
      </div>
    </PageTransition>
  )
}