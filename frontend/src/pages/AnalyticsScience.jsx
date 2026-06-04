import DisciplineLayout from '../components/DisciplineLayout.jsx'

// ── ADD PROJECTS ─────────────────────────────────────────────────────────────
const ANALYTICS = [
  { title: 'Add Your Project', desc: 'Describe your data analytics project — what you measured, how you visualised it, the impact.', tags: ['Data Visualisation', 'SQL', 'Tableau'], img: '', link: '#' },
  { title: 'Add Your Project', desc: 'Describe a second analytics project here.', tags: ['Excel', 'Power BI', 'Statistical Analysis'], img: '', link: '#' },
]

const SCIENCE = [
  { title: 'Add Your Project', desc: 'Describe your data science / ML project — the dataset, model, and what you learned.', tags: ['Python', 'Machine Learning', 'Pandas'], img: '', link: '#' },
  { title: 'Add Your Project', desc: 'Describe a second data science project here.', tags: ['Scikit-learn', 'D3.js', 'Jupyter'], img: '', link: '#' },
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

export default function AnalyticsScience() {
  return (
    <DisciplineLayout num="03" h1="AI/ML &" h2="Data Science" eyebrow="Discipline">
      <div className="dl-section-label">Data Analytics</div>
      <div className="dl-grid">
        {ANALYTICS.map((p, i) => <Card key={i} {...p} />)}
      </div>

      <div className="dl-section-label">Data Science & ML</div>
      <div className="dl-grid">
        {SCIENCE.map((p, i) => <Card key={i} {...p} />)}
      </div>
    </DisciplineLayout>
  )
}
