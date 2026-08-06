import { motion } from 'framer-motion'

// Staggered character-by-character reveal for big headings, inspired by the
// text-reveal patterns on reactbits.dev (e.g. SplitText). Built on Framer
// Motion's whileInView (already a project dependency) rather than a bespoke
// IntersectionObserver hook. Character-level, not word-level, since most of
// the headings this wraps are single words ("Disciplines", "Projects").
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
}
const char = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export default function RevealText({ text, className, style, once = true }) {
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
    >
      {text.split('').map((c, i) => (
        <motion.span key={i} variants={char} style={{ display: 'inline-block', whiteSpace: c === ' ' ? 'pre' : 'normal' }}>
          {c}
        </motion.span>
      ))}
    </motion.span>
  )
}
