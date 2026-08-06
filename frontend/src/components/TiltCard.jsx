import { useRef, useState, useCallback } from 'react'

// Cursor-reactive 3D tilt + a soft spotlight that follows the pointer,
// inspired by the tilt/spotlight card patterns on reactbits.dev. Renders as
// a plain wrapper (no visual tilt) when the OS is set to reduce motion.
export default function TiltCard({ children, className = '', style = {}, maxTilt = 7, ...rest }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)')
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const onMove = useCallback((e) => {
    if (reducedMotion.current) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * maxTilt * 2
    const rotateX = (0.5 - py) * maxTilt * 2
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    setSpotlight({ x: px * 100, y: py * 100, opacity: 1 })
  }, [maxTilt])

  const onLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg)')
    setSpotlight(s => ({ ...s, opacity: 0 }))
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transform, transition: 'transform 0.15s ease-out', position: 'relative' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
        background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.16), transparent 55%)`,
        opacity: spotlight.opacity, transition: 'opacity 0.25s ease',
      }} />
    </div>
  )
}
