import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScatteredSymbolsFixed } from '../components/ScatteredSymbols.jsx'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ background: '#E5EAD8', height: '100vh', overflow: 'hidden', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}
    >
      <ScatteredSymbolsFixed />

      <span style={{ fontSize: 15, letterSpacing: 4, textTransform: 'uppercase',
        color: '#186878', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
        ✦ Lost in the Garden ✦
      </span>

      <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontWeight: 400,
        fontSize: 'clamp(70px, 14vw, 160px)', color: '#0A3020', lineHeight: 1, margin: '4px 0' }}>
        404
      </h1>

      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
        color: 'rgba(7,26,18,0.55)', maxWidth: 420, textAlign: 'center', lineHeight: 1.7, padding: '0 24px' }}>
        This path doesn't lead anywhere, the page you're looking for wandered off somewhere in the vines.
      </p>

      <button onClick={() => navigate('/')}
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 600,
          letterSpacing: 2, textTransform: 'uppercase', color: '#F0EDE6', background: '#0A3020',
          border: 'none', padding: '13px 30px', marginTop: 10, cursor: 'pointer',
          borderRadius: 6, transition: 'background 0.2s' }}
        onMouseEnter={e => { e.target.style.background = '#186878' }}
        onMouseLeave={e => { e.target.style.background = '#0A3020' }}>
        ← Back to the garden
      </button>
    </motion.div>
  )
}
