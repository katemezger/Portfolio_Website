import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: 30 },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {children}
    </motion.div>
  )
}