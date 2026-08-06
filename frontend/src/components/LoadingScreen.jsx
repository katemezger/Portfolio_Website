import { useEffect, useState } from 'react'

const CIRC = 2 * Math.PI * 68  // ≈ 427 — circumference of the vine circle

// Small botanical leaf placed at a point on the circle
function VineLeaf({ angle, delay }) {
  const rad   = (angle - 90) * Math.PI / 180
  const x     = 80 + 68 * Math.cos(rad)
  const y     = 80 + 68 * Math.sin(rad)
  return (
    <g
      transform={`translate(${x},${y}) rotate(${angle + 90})`}
      style={{ opacity: 0, animation: `lsLeaf 0.35s ease ${delay}s both` }}
    >
      <path
        d="M 0,-7 C 3.5,-5 5,0 3.5,3.5 C 2,6 0,7 0,7 C 0,7 -2,6 -3.5,3.5 C -5,0 -3.5,-5 0,-7 Z"
        fill="#186878" opacity="0.85"
      />
    </g>
  )
}

export default function LoadingScreen() {
  const [out,  setOut]  = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true),  2600)
    const t2 = setTimeout(() => setGone(true), 3100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  const leafAngles = [0, 45, 90, 135, 180, 225, 270, 315]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100000,
      background: '#F4F5F0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: out ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: out ? 'none' : 'all',
    }}>
      <style>{`
        @keyframes lsVine {
          from { stroke-dashoffset: ${CIRC.toFixed(1)}; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes lsLeaf {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lsLogo {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lsDot {
          0%,100% { opacity: 0.3; } 50% { opacity: 1; }
        }
      `}</style>

      <div style={{ position: 'relative', width: 160, height: 160 }}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          {/* Faint track */}
          <circle cx="80" cy="80" r="68"
            stroke="rgba(7,26,18,0.10)" strokeWidth="1.5" />

          {/* Vine that draws itself around */}
          <circle cx="80" cy="80" r="68"
            stroke="#186878" strokeWidth="2.2"
            strokeDasharray={CIRC.toFixed(1)}
            strokeDashoffset={CIRC.toFixed(1)}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
            style={{ animation: `lsVine 2s cubic-bezier(0.45,0,0.25,1) 0.35s both` }}
          />

          {/* Leaves that appear as vine passes each point */}
          {leafAngles.map((angle, i) => (
            <VineLeaf
              key={i}
              angle={angle}
              delay={0.35 + (i / leafAngles.length) * 2}
            />
          ))}
        </svg>

        {/* Eden logo centred inside the circle */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          animation: 'lsLogo 0.6s ease 0.15s both',
        }}>
          <span style={{
            fontFamily: "'La Belle Aurore', cursive",
            fontSize: 30, color: '#071A12', letterSpacing: 1, lineHeight: 1,
          }}>
            Eden
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 9, letterSpacing: 4, textTransform: 'uppercase',
            color: 'rgba(7,26,18,0.38)', marginTop: 6,
          }}>
            loading
            <span style={{ animation: 'lsDot 1.2s ease 0.5s infinite' }}>.</span>
            <span style={{ animation: 'lsDot 1.2s ease 0.7s infinite' }}>.</span>
            <span style={{ animation: 'lsDot 1.2s ease 0.9s infinite' }}>.</span>
          </span>
        </div>
      </div>
    </div>
  )
}
