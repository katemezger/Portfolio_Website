import PageLayout from '../components/PageLayout.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const design = [
  {
    title: "Project Title",
    tags: ["Game Design", "Narrative", "Systems"],
    description: "Describe your game design project — mechanics, story, what makes it interesting.",
    link: "#",
  },
  {
    title: "Project Title",
    tags: ["Level Design", "Prototyping", "Playtesting"],
    description: "Describe a second game design project here.",
    link: "#",
  },
]

const dev = [
  {
    title: "Project Title",
    tags: ["Unity", "C#", "Gameplay"],
    description: "Describe your game dev project — engine, tech stack, what you built.",
    link: "#",
  },
  {
    title: "Project Title",
    tags: ["Godot", "GDScript", "2D"],
    description: "Describe a second dev project here.",
    link: "#",
  },
]

export default function DesignDev() {
  return (
    <PageLayout title="Design & Dev" subtitle="Game Design · Development" number="01">
      <div className="gl-section-label">Game Design</div>
      <div className="eden-grid" style={{ marginBottom: 48 }}>
        {design.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>

      <div className="gl-section-label">Development</div>
      <div className="eden-grid">
        {dev.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>
    </PageLayout>
  )
}
