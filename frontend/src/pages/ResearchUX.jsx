import DisciplineLayout from '../components/DisciplineLayout.jsx'
import useDocumentTitle from '../components/useDocumentTitle.js'

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
  useDocumentTitle('UX/UI & Research: Kate Mezger')
  return (
    <DisciplineLayout num="02" h1="UX/UI &" h2="Research" eyebrow="Discipline"
      intro="My Cognitive Science background, concentrating in AI/Computation and HCI, shapes how I run research: I want to know not just whether an interface works, but why people trust it, get confused by it, or over-trust it. That question applies just as much to comparing two typing platforms head-to-head as it does to designing the frontend for an AI system, which is where a lot of my human-AI interaction thinking actually lives.">
      <div className="dl-grid">
        {PROJECTS.map((p, i) => <Card key={i} {...p} />)}
      </div>
    </DisciplineLayout>
  )
}
