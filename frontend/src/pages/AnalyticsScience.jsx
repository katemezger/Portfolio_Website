import DisciplineLayout from '../components/DisciplineLayout.jsx'

const PROJECTS = [
  {
    title: 'TrackSense AI',
    desc:  'An AI-powered Formula 1 race analytics model built for the AIM S26 AI Mentorship program: frontend design and development for a platform surfacing predictions and race performance insights.',
    tags:  ['AI/ML', 'Formula 1', 'Data Visualisation', 'React', 'AIS AIM'],
    img:   '/images/projects/tracksense-ai-hero.png',
    link:  '/project/tracksense-ai',
  },
  {
    title: 'Predicting Netflix Success',
    desc:  'A data science study testing whether genre, country of origin, and release metadata can predict Netflix title success: trained classification models and evaluated feature importance.',
    tags:  ['R', 'Machine Learning', 'dplyr', 'caret', 'Data Analysis'],
    img:   '/images/projects/netflix-prediction-hero.png',
    link:  '/project/netflix-prediction',
  },
  {
    title: 'Divinity: First-Year Sales Prediction',
    desc:  'A machine learning model forecasting first-year sales for an upcoming Larian Studios game using comparable RPG performance data, including manually reconciled Baldur\'s Gate 3 figures.',
    tags:  ['Python', 'Machine Learning', 'Jupyter', 'Data Cleaning'],
    img:   '/images/projects/divinity-sales-prediction-hero.svg',
    link:  '/project/divinity-sales-prediction',
  },
  {
    title: 'Customer Segmentation for Steam',
    desc:  'Unsupervised clustering on 200K Steam interaction logs: PCA + K-Means surfaced four player personas, deployed as a FastAPI microservice with sub-15ms inference.',
    tags:  ['Python', 'Scikit-learn', 'K-Means', 'PCA', 'FastAPI'],
    img:   '/images/projects/steam-customer-segmentation-hero.svg',
    link:  '/project/steam-customer-segmentation',
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

export default function AnalyticsScience() {
  return (
    <DisciplineLayout num="03" h1="AI/ML &" h2="Data Science" eyebrow="Discipline">
      <div className="dl-grid">
        {PROJECTS.map((p, i) => <Card key={i} {...p} />)}
      </div>
    </DisciplineLayout>
  )
}
