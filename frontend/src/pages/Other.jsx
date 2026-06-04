import DisciplineLayout from '../components/DisciplineLayout.jsx'

// ── ADD PROJECTS ─────────────────────────────────────────────────────────────
const PROJECTS = [
  { title: 'Add Your Project', desc: 'Experiments, collaborations, creative side projects — anything that doesn\'t fit neatly elsewhere.', tags: ['Experimental'], img: '', link: '#' },
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

export default function Other() {
  return (
    <DisciplineLayout num="04" h1="Other" h2="Experiments" eyebrow="Discipline">
      <div className="dl-section-label">Side Projects & Experiments</div>
      <div className="dl-grid">
        {PROJECTS.map((p, i) => <Card key={i} {...p} />)}
      </div>
    </DisciplineLayout>
  )
}
