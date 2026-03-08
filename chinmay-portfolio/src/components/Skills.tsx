import { useEffect, useState } from "react";
import { skills } from "../data/portfolioData";

const categoryColors: Record<string, string> = {
  Languages: "#e63946",
  Frontend: "#3a86ff",
  Backend: "#2a9d5c",
  Database: "#ff9f1c",
  "Tools & Others": "#8338ec",
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const Skills = () => {
  const isMobile = useIsMobile();

  return (
    <section
      id="skills"
      style={{
        background: "#fff",
        borderTop: "2px solid #1a1a1a",
        borderBottom: "2px solid #1a1a1a",
        padding: isMobile ? "48px 0" : "80px 0",
      }}
    >
      <div className="container">
        <div className="section-header">
          <h2>Skills</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "20px" : "24px" }}>
          {Object.entries(skills).map(([category, items]) => {
            const color = categoryColors[category] || "#1a1a1a";
            return (
              <div
                key={category}
                style={{
                  paddingBottom: isMobile ? "20px" : "24px",
                  borderBottom: "1px dashed #ccc",
                  // mobile: stack vertically, desktop: side by side
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "160px 1fr",
                  gap: isMobile ? "10px" : "16px",
                  alignItems: "start",
                }}
              >
                {/* Category label */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  {/* Color dot on mobile for visual anchor */}
                  {isMobile && (
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: color,
                      flexShrink: 0,
                    }}/>
                  )}
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: isMobile ? "0.65rem" : "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: color,
                  }}>
                    {category}
                  </span>
                </div>

                {/* Skill tags */}
                <div style={{
                  display: "flex",
                  gap: isMobile ? "6px" : "8px",
                  flexWrap: "wrap",
                }}>
                  {(items as string[]).map((skill: string) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                        padding: isMobile ? "4px 10px" : "5px 14px",
                        border: `1.5px solid ${color}`,
                        color: "#1a1a1a",
                        background: "transparent",
                        transition: "all 0.15s",
                        cursor: "default",
                        lineHeight: 1.4,
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.background = color;
                        (e.target as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.background = "transparent";
                        (e.target as HTMLElement).style.color = "#1a1a1a";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
