import DisciplineLayout from '../components/DisciplineLayout.jsx'
import useDocumentTitle from '../components/useDocumentTitle.js'

const PROJECTS = [
  {
    title: 'TrackSense AI',
    desc:  'Frontend design and development for an AI-powered Formula 1 race analytics platform. Designed the UI in Figma and built it in React for the AIM S26 capstone showcase.',
    tags:  ['React', 'Figma', 'UI Design', 'Data Visualisation', 'Formula 1'],
    img:   '/images/projects/tracksense-ai-hero.png',
    link:  '/project/tracksense-ai',
  },
  {
    title: 'Eden Portfolio',
    desc:  'A personal portfolio with a whimsical garden aesthetic: custom botanical illustrations, animated blob shapes, and a full design system built from scratch in React.',
    tags:  ['React', 'Framer Motion', 'SVG', 'CSS', 'Design Systems'],
    img:   '/images/projects/eden-portfolio-hero.png',
    link:  '/project/eden-portfolio',
  },
  {
    title: 'Time2Invest',
    desc:  'A financial literacy tool built in 24 hours at WEHack: designed and developed a React app that teaches investing through real historical headlines and market data.',
    tags:  ['React', 'Hackathon', 'WEHack', 'FinTech', 'Financial Literacy'],
    img:   '/images/projects/time2invest-hero.png',
    link:  '/project/time2invest',
  },
  {
    title: 'AIS Membership Portal',
    desc:  'Designed and integrated the mobile pages for AI Society\'s membership platform, aligned to current AIS brand guidelines under a one-month deadline.',
    tags:  ['Figma', 'Next.js', 'TypeScript', 'Mobile Design'],
    img:   '/images/ais_logo_black.png',
    link:  '/project/ais-portal',
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

export default function DesignDev() {
  useDocumentTitle('Design & Development: Kate Mezger')
  return (
    <DisciplineLayout num="01" h1="Design &" h2="Development" eyebrow="Discipline"
      intro="I care about the gap between a good idea and an interface that actually holds up under real use. That means starting in Figma, but not stopping there: I build the systems myself in React, from a from-scratch design system for this site to a mobile-responsive membership portal built inside an existing organization's guidelines. Design that never gets built is just a sketch.">

      <div className="dl-grid">
        {PROJECTS.map((p, i) => <Card key={i} {...p} />)}
      </div>
    </DisciplineLayout>
  )
}
