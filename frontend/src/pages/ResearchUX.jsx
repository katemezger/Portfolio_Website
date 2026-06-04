import DisciplineLayout from '../components/DisciplineLayout.jsx'

// ── ADD PROJECTS ─────────────────────────────────────────────────────────────
const RESEARCH = [
  { title: 'Add Your Project', desc: 'Describe your UX research project — methodology, participants, key findings.', tags: ['User Interviews', 'Affinity Mapping', 'Insights'], img: '', link: '#' },
  { title: 'Add Your Project', desc: 'Describe a second research project here.', tags: ['Usability Testing', 'Think-Aloud'], img: '', link: '#' },
]

const UXUI = [
  { title: 'Add Your Project', desc: 'Describe your UI design project — the problem space, your decisions, the outcome.', tags: ['Figma', 'Design System', 'Prototyping'], img: '', link: '#' },
  { title: 'Add Your Project', desc: 'Describe a second UX/UI project here.', tags: ['Wireframing', 'Visual Design', 'Accessibility'], img: '', link: '#' },
]

function Card({ title, desc, tags, img, link }) {
  return (
    <div className="dl-card" onClick={() => link !== '#' && (window.location.href = link)}>
      <div className="dl-card-img">
        {img ? <img src={img} alt={title} /> : <span className="dl-img-label">Add Image</span>}
      </div>
      <div className="dl-card-title">{title}</div>
      <div className="dl-card-desc">{desc}</div>
      <div className="dl-tags">{tags.map(t => <span key={t} className="dl-tag">{t}</span>)}</div>
    </div>
  )
}

export default function ResearchUX() {
  return (
    <DisciplineLayout num="02" h1="UX/UI &" h2="Research" eyebrow="Discipline">
      <div className="dl-section-label">UX Research</div>
      <div className="dl-grid">
        {RESEARCH.map((p, i) => <Card key={i} {...p} />)}
      </div>

      <div className="dl-section-label">UX / UI Design</div>
      <div className="dl-grid">
        {UXUI.map((p, i) => <Card key={i} {...p} />)}
      </div>
    </DisciplineLayout>
  )
}
