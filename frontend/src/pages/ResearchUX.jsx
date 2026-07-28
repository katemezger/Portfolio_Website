import DisciplineLayout from '../components/DisciplineLayout.jsx'

const PROJECTS = [
  {
    title: 'MonkeyType vs KeyHero',
    desc:  'A comparative usability study for CGS 4321: evaluated two typing platforms head-to-head on WPM, accuracy, and test duration using think-aloud sessions and statistical analysis.',
    tags:  ['Usability Testing', 'Think-Aloud', 'Comparative Study', 'HCI', 'Data Analysis'],
    img:   '/images/projects/cgs-usability-study-hero.png',
    link:  '/project/cgs-usability-study',
  },
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
      <div className="dl-grid">
        {PROJECTS.map((p, i) => <Card key={i} {...p} />)}
      </div>
    </DisciplineLayout>
  )
}
