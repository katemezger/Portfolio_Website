import { useNavigate } from 'react-router-dom'
import PageTransition from './PageTransition.jsx'

export default function PageLayout({ title, subtitle, number, children }) {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{
        width: '100%',
        height: '100vh',
        background: '#071a10',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <style>{`
          .gl-bg-img {
            position: absolute;
            inset: 0;
            background-image: url(/images/bg-landscape.jpg);
            background-size: cover;
            background-position: center right;
            opacity: 0.07;
            filter: saturate(0.6) brightness(0.75);
            z-index: 0;
            pointer-events: none;
          }
          .gl-bg-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(7,26,16,0.97) 0%, rgba(7,26,16,0.88) 100%);
            z-index: 1;
            pointer-events: none;
          }
          .gl-glow-tr {
            position: absolute;
            top: -10%;
            right: -5%;
            width: 50%;
            height: 60%;
            background: radial-gradient(ellipse at center, rgba(131,153,88,0.06) 0%, transparent 70%);
            z-index: 1;
            pointer-events: none;
          }

          .gl-header {
            position: relative;
            z-index: 10;
            padding: 28px 6vw 22px 6vw;
            border-bottom: 1px solid rgba(131,153,88,0.15);
            flex-shrink: 0;
          }
          .gl-header::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(131,153,88,0.5) 30%, rgba(211,150,140,0.4) 70%, transparent);
          }

          .gl-eyebrow {
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 10px;
            letter-spacing: 5px;
            text-transform: uppercase;
            color: rgba(131,153,88,0.6);
            margin-bottom: 8px;
          }

          .gl-title {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(40px, 6vw, 72px);
            letter-spacing: 1px;
            color: #F7F4D5;
            line-height: 0.9;
          }

          .gl-subtitle {
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 12px;
            letter-spacing: 3px;
            color: rgba(211,150,140,0.55);
            margin-top: 6px;
            text-transform: uppercase;
          }

          .gl-back {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 10px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(247,244,213,0.2);
            cursor: pointer;
            border: none;
            background: none;
            padding: 0;
            margin-top: 16px;
            transition: color 0.2s ease;
          }
          .gl-back:hover { color: rgba(211,150,140,0.7); }

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
            font-size: 28px;
            color: rgba(131,153,88,0.7);
            margin-bottom: 18px;
            margin-top: 36px;
            letter-spacing: 1px;
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
            ← back
          </button>
        </header>

        <main className="gl-content">
          {children}
        </main>
      </div>
    </PageTransition>
  )
}
