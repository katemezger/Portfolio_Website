import PageLayout from '../components/PageLayout.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const projects = [
  {
    title: "Project Title",
    tags: ["Miscellaneous"],
    description: "Anything that doesn't fit neatly elsewhere — experiments, collaborations, creative side projects.",
    link: "#",
  },
]

export default function Other() {
  return (
    <PageLayout title="Other" subtitle="Experiments · Side Projects" number="04">
      <div className="eden-grid">
        {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>
    </PageLayout>
  )
}
