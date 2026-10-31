import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// Pages scroll inside their own container div rather than the window, so
// scroll-linked motion needs that container. Each page provides its scroll
// ref through this context.
export const ScrollContainerContext = createContext(null)

// Scroll-linked horizontal drift: as the element travels up through the
// viewport, it slides from `from` px to `to` px on the x axis. Gives the
// page sideways movement without hijacking the scroll. Disabled for
// reduced-motion users.
export default function Drift({ from = 50, to = -50, className, style, children }) {
  const ref = useRef(null)
  const ctx = useContext(ScrollContainerContext)
  const reduce = useReducedMotion()
  // A child's layout effects run before its parent's ref is attached, so
  // the container element isn't there yet on the first pass. Pick it up
  // after mount and hand useScroll a fresh ref so it re-subscribes to the
  // real scroller (otherwise it silently tracks the window, which never
  // scrolls here).
  const [containerEl, setContainerEl] = useState(null)
  useEffect(() => { if (ctx?.current) setContainerEl(ctx.current) }, [ctx])
  const container = useMemo(() => (containerEl ? { current: containerEl } : undefined), [containerEl])
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [from, to])
  return (
    <motion.div ref={ref} className={className} style={{ ...style, x: reduce ? 0 : x }}>
      {children}
    </motion.div>
  )
}
