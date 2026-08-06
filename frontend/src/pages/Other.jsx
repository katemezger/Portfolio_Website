import DisciplineLayout from '../components/DisciplineLayout.jsx'
import useDocumentTitle from '../components/useDocumentTitle.js'

export default function Other() {
  useDocumentTitle('Other: Kate Mezger')
  return (
    <DisciplineLayout num="04" h1="Other" h2="Experiments" eyebrow="Discipline">
      <div className="dl-section-label">Side Projects & Experiments</div>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: 16, letterSpacing: 1,
        color: 'rgba(7,26,18,0.32)', padding: '20px 0 60px',
      }}>
        Nothing here yet, check back soon.
      </p>
    </DisciplineLayout>
  )
}
