import PageLayout from '../components/PageLayout.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const analytics = [
  {
    title: "Project Title",
    tags: ["Data Visualization", "SQL", "Tableau"],
    description: "Describe your data analytics project — what you measured, how you visualized it, and the impact.",
    link: "#",
  },
  {
    title: "Project Title",
    tags: ["Excel", "Power BI", "Statistical Analysis"],
    description: "Describe a second analytics project here.",
    link: "#",
  },
]

const science = [
  {
    title: "Project Title",
    tags: ["Python", "Machine Learning", "Pandas"],
    description: "Describe your data science project — the dataset, model, and what you learned.",
    link: "#",
  },
  {
    title: "Project Title",
    tags: ["R", "Regression", "Data Cleaning"],
    description: "Describe a second data science project here.",
    link: "#",
  },
]

export default function AnalyticsScience() {
  return (
    <PageLayout title="Analytics & Science" subtitle="Data Analytics · Data Science" number="03">
      <div className="gl-section-label">Data Analytics</div>
      <div className="eden-grid" style={{ marginBottom: 48 }}>
        {analytics.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>

      <div className="gl-section-label">Data Science</div>
      <div className="eden-grid">
        {science.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>
    </PageLayout>
  )
}
