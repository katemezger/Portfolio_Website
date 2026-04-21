import PageLayout from '../components/PageLayout.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const research = [
  {
    title: "Project Title",
    tags: ["User Interviews", "Affinity Mapping", "Insights"],
    description: "Describe your UX research project — methodology, participants, key findings.",
    link: "#",
  },
  {
    title: "Project Title",
    tags: ["Usability Testing", "Think-Aloud", "Report"],
    description: "Describe a second research project here.",
    link: "#",
  },
]

const uxui = [
  {
    title: "Project Title",
    tags: ["Figma", "Design System", "Prototyping"],
    description: "Describe your UI design project — the problem space, your design decisions, the outcome.",
    link: "#",
  },
  {
    title: "Project Title",
    tags: ["Wireframing", "Visual Design", "Accessibility"],
    description: "Describe a second UX/UI project here.",
    link: "#",
  },
]

export default function ResearchUX() {
  return (
    <PageLayout title="Research & UX/UI" subtitle="UX Research · Interface Design" number="02">
      <div className="gl-section-label">UX Research</div>
      <div className="eden-grid" style={{ marginBottom: 48 }}>
        {research.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>

      <div className="gl-section-label">UX / UI Design</div>
      <div className="eden-grid">
        {uxui.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>
    </PageLayout>
  )
}
