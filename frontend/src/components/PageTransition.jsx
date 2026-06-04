import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.2, ease: [0.7, 0, 1, 1] },
  },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {children}
    </motion.div>
  )
}