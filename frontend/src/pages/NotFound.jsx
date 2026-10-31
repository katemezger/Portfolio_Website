import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScatteredSymbolsFixed } from '../components/ScatteredSymbols.jsx'
import LeftNav, { LEFTNAV_WIDTH, LEFTNAV_MOBILE_BP } from '../components/LeftNav.jsx'
import useDocumentTitle from '../components/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('Page Not Found: Kate Mezger')
  const navigate = useNavigate()

  return (
    <motion.main
      className="page-shell"
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ background: 'var(--bg)', height: '100vh', overflow: 'hidden', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}
    >
      <style>{`
        .page-shell { padding-left: ${LEFTNAV_WIDTH}px; }
        @media (max-width: ${LEFTNAV_MOBILE_BP}px) { .page-shell { padding-left: 0; padding-top: 56px; } }
      `}</style>
      <ScatteredSymbolsFixed />
      <LeftNav />

      <span style={{ fontSize: 15, letterSpacing: 4, textTransform: 'uppercase',
        color: 'var(--terra)', fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>
        ✦ Lost in the Garden ✦
      </span>

      <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400,
        fontSize: 'clamp(70px, 14vw, 160px)', color: 'var(--forest)', lineHeight: 1, margin: '4px 0' }}>
        404
      </h1>

      <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 19,
        color: 'rgba(var(--ink-rgb),0.55)', maxWidth: 420, textAlign: 'center', lineHeight: 1.7, padding: '0 24px' }}>
        This path doesn't lead anywhere, the page you're looking for wandered off somewhere in the vines.
      </p>

      <button onClick={() => navigate('/')}
        style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, fontWeight: 600,
          letterSpacing: 2, textTransform: 'uppercase', color: '#E8E1D6', background: 'var(--forest-fill)',
          border: 'none', padding: '13px 30px', marginTop: 10, cursor: 'pointer',
          borderRadius: 6, transition: 'background 0.2s' }}
        onMouseEnter={e => { e.target.style.background = 'var(--terra-fill)' }}
        onMouseLeave={e => { e.target.style.background = 'var(--forest-fill)' }}>
        ← Back to the garden
      </button>
    </motion.main>
  )
}
