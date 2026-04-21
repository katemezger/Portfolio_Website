import { useNavigate } from 'react-router-dom'
import Menu from '../components/Menu.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{
        width: '100%',
        height: '100vh',
        background: '#071a10',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Painterly background image — drop a landscape/garden painting into public/images/bg-landscape.jpg */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/bg-landscape.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.12,
          filter: 'saturate(0.7) brightness(0.8)',
          zIndex: 1,
        }} />

        {/* Warm dappled light — upper right glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 70% at 80% 20%, rgba(131,153,88,0.08) 0%, transparent 65%)',
          zIndex: 2,
        }} />

        {/* Lower rose warmth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 40% at 75% 85%, rgba(211,150,140,0.06) 0%, transparent 60%)',
          zIndex: 2,
        }} />

        {/* Dark gradient — left stays deep for the menu */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(7,26,16,0.97) 35%, rgba(7,26,16,0.6) 70%, rgba(7,26,16,0.8) 100%)',
          zIndex: 3,
        }} />

        <div style={{ position: 'relative', zIndex: 4, width: '100%', height: '100%' }}>
          <Menu onNavigate={(page) => navigate(`/${page}`)} />
        </div>
      </div>
    </PageTransition>
  )
}
