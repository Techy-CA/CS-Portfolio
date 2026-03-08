import { projects } from "../data/portfolioData";

interface Project {
  title: string;
  color: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

const Projects = () => {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Projects</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {projects.map((project: Project) => (
            <div
              key={project.title}
              className="card"
              style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              {/* Color bar */}
              <div style={{ height: "6px", background: project.color }} />

              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: "16px",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        padding: "2px 8px",
                        border: `1.5px solid ${project.color}`,
                        color: project.color,
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "#1a1a1a",
                        textDecoration: "none",
                        fontWeight: 700,
                        borderBottom: "1.5px solid #1a1a1a",
                        paddingBottom: "1px",
                      }}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: project.color,
                        textDecoration: "none",
                        fontWeight: 700,
                        borderBottom: `1.5px solid ${project.color}`,
                        paddingBottom: "1px",
                      }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
