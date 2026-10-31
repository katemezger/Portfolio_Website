import { motion, useReducedMotion } from 'framer-motion'

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
  // Reduced-motion users get the plain heading, no per-letter animation.
  const reduce = useReducedMotion()
  if (reduce) return <span className={className} style={{ display: 'inline-block', ...style }}>{text}</span>
  // Split into words first, then characters within each word. Each word is
  // its own inline-block (white-space: nowrap) so the browser can only
  // break the line *between* words, never between two character spans
  // inside one — splitting per-character without this grouping let the
  // line-breaking algorithm treat every letter as an independent inline
  // box, which produced mid-word breaks like "Netfli" / "x Success".
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((c, i) => (
            <motion.span key={i} variants={char} style={{ display: 'inline-block' }}>
              {c}
            </motion.span>
          ))}
          {wi < words.length - 1 && <motion.span variants={char} style={{ display: 'inline-block' }}>&nbsp;</motion.span>}
        </span>
      ))}
    </motion.span>
  )
}
