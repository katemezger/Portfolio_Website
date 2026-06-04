import DisciplineLayout from '../components/DisciplineLayout.jsx'

// ── ADD PROJECTS ─────────────────────────────────────────────────────────────
// Copy a block below, fill in your details, and add an img path if you have one.
// img: '/images/projects/your-image.jpg'  (drop file in frontend/public/images/projects/)
// link: '/project/your-slug'              (add matching entry in ProjectPage.jsx)
// ─────────────────────────────────────────────────────────────────────────────
const DESIGN = [
  {
    title: 'Eden Portfolio',
    desc:  'A personal portfolio with a whimsical garden aesthetic — custom botanical illustrations, animated blob shapes, and a full design system built from scratch in React.',
    tags:  ['React', 'Framer Motion', 'SVG', 'CSS', 'Design Systems'],
    img:   '',
    link:  '/project/eden-portfolio',
  },
  { title: 'Add Your Project', desc: 'Describe your design project here — the problem, your process, the outcome.', tags: ['Figma', 'Prototyping', 'User Research'], img: '', link: '#' },
  { title: 'Add Your Project', desc: 'Describe a second design project here.', tags: ['Design Systems', 'Visual Design'], img: '', link: '#' },
]

const DEV = [
  { title: 'Add Your Project', desc: 'Describe your development project — tech stack, what you built, what you learned.', tags: ['React', 'TypeScript', 'CSS'], img: '', link: '#' },
  { title: 'Add Your Project', desc: 'Describe a second development project here.', tags: ['Node.js', 'API Design'], img: '', link: '#' },
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

export default function DesignDev() {
  return (
    <DisciplineLayout num="01" h1="Design &" h2="Development" eyebrow="Discipline">
      <div className="dl-section-label">Design</div>
      <div className="dl-grid">
        {DESIGN.map((p, i) => <Card key={i} {...p} />)}
      </div>

      <div className="dl-section-label">Development</div>
      <div className="dl-grid">
        {DEV.map((p, i) => <Card key={i} {...p} />)}
      </div>
    </DisciplineLayout>
  )
}
