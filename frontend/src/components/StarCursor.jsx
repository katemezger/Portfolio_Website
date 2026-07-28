import { useEffect, useRef } from 'react'

export default function StarCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      el.style.opacity = '1'
      el.style.transform = `translate(${e.clientX - 9}px, ${e.clientY - 9}px)`
    }

    const onOver = (e) => {
      const hit = e.target instanceof Element
        ? e.target.closest('a, button, [role="button"], [tabindex="0"]')
        : null
      el.classList.toggle('hovered', !!hit)
    }

    // Hide the custom cursor when the pointer leaves the browser window
    // (relatedTarget is null on that transition), so it can't get stuck
    // frozen at its last position. It reappears on the next mousemove.
    const onLeave = (e) => {
      if (!e.relatedTarget) el.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onLeave, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        #star-cursor {
          position: fixed;
          top: 0; left: 0;
          width: 18px; height: 18px;
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          transition: opacity 0.2s ease;
          will-change: transform;
        }

        #star-cursor svg {
          display: block;
          transition:
            transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
            filter    0.28s ease;
          transform-origin: 9px 9px;
        }

        #star-cursor.hovered svg {
          transform: scale(2.2);
          filter:
            drop-shadow(0 0 5px rgba(24,104,120,0.70))
            drop-shadow(0 0 12px rgba(141,196,192,0.45));
        }
      `}</style>

      <div id="star-cursor" ref={ref}>
        <svg width="18" height="18" viewBox="-12 -12 24 24" fill="none">
          {/* 4-pointed sparkle star matching the ✦ aesthetic */}
          <path
            d="M 0,-11 C 1,-4 4,-1 11,0 C 4,1 1,4 0,11 C -1,4 -4,1 -11,0 C -4,-1 -1,-4 0,-11 Z"
            fill="#186878"
          />
          <circle cx="0" cy="0" r="2.2" fill="#8DC4C0" />
        </svg>
      </div>
    </>
  )
}
