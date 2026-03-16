import { useState, useEffect, useRef } from "react";

interface ExperienceNode {
  id: number;
  title: string;
  type: string;
  year: string;
  description: string;
  position: string;
  skills: string[];
  color: string;
}

const experienceData: ExperienceNode[] = [
  {
    id: 1,
    title: "Codeversity",
    type: "National Level Hackathon",
    year: "2026",
    position: "Final Round Qualifier",
    description: "Participated in the Codeversity National Level Hackathon at IIT Gandhinagar. Collaborated with my team to develop and present a solution under tight timelines while competing with teams from across the country.",
    skills: ["Problem Solving", "Team Collaboration", "Rapid Prototyping"],
    color: "#e63946",
  },
  {
    id: 2,
    title: "AI Workshop",
    type: "Artificial Intelligence Workshop",
    year: "2026",
    position: "Certified Participant",
    description: "Received certification for the Artificial Intelligence workshop conducted during Codeversity at IIT Gandhinagar, gaining exposure to AI concepts and emerging technologies.",
    skills: ["Artificial Intelligence", "AI Tools", "Tech Exploration"],
    color: "#3a86ff",
  },
  {
    id: 3,
    title: "Yugantar 2.0",
    type: "Inter Institute Hackathon",
    year: "2025",
    position: "Hackathon Participant",
    description: "Participated in Yugantar 2.0 hackathon at NMIMS Shirpur, working with teammates to develop a solution within a limited time frame and present it to mentors and judges.",
    skills: ["Teamwork", "Problem Solving", "Idea Development"],
    color: "#2a9d5c",
  },
  {
    id: 4,
    title: "Gen AI Mastermind",
    type: "AI Learning Program",
    year: "2025",
    position: "Program Completion",
    description: "Completed the Generative AI Mastermind program by Outskill, exploring practical applications of generative AI tools and their use in productivity and automation workflows.",
    skills: ["Generative AI", "AI Automation", "AI Workflows"],
    color: "#ff9f1c",
  },
  {
    id: 5,
    title: "EcomFest 2026",
    type: "Ecommerce Industry Event",
    year: "2025",
    position: "Industry Event Attendee",
    description: "Attended EcomFest 2026 in Dehradun, India's largest seller-focused ecommerce event. Gained insights into how sellers scale businesses on Amazon, Flipkart, and Meesho.",
    skills: ["Ecommerce Strategy", "Marketplace Business", "Seller Ecosystem"],
    color: "#8338ec",
  },
  {
    id: 6,
    title: "EKA",
    type: "Entrepreneurial Project",
    year: "2024",
    position: "Website Launched",
    description: "Building EKA, a brand focused on personalized corporate gifting. Working on product development, ecommerce operations, logistics systems, and internal team coordination.",
    skills: ["Product Building", "Logistics Management", "Ecommerce Operations"],
    color: "#f4a261",
  },
];

const getBadgeStyle = (position: string) => {
  if (position.includes("Final Round") || position.includes("Qualifier"))
    return { bg: "#fff0f1", color: "#e63946", border: "#e63946" };
  if (position.includes("1st") || position.includes("Won"))
    return { bg: "#fff9ed", color: "#e67e00", border: "#f4a261" };
  if (position.includes("2nd"))
    return { bg: "#f4f4f4", color: "#555", border: "#999" };
  if (position.includes("Certified") || position.includes("Completion"))
    return { bg: "#eef4ff", color: "#3a86ff", border: "#3a86ff" };
  if (position.includes("Contributor") || position.includes("Top"))
    return { bg: "#f0fff4", color: "#2a9d5c", border: "#2a9d5c" };
  if (position.includes("Launched"))
    return { bg: "#fff5ee", color: "#f4a261", border: "#f4a261" };
  return { bg: "#f5f5f5", color: "#777", border: "#ccc" };
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

const OrbitalExperience = () => {
  const isMobile = useIsMobile();
  const [rotation, setRotation]     = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeId, setActiveId]     = useState<number | null>(null);
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (autoRotate) {
      rafRef.current = setInterval(() => {
        setRotation((prev) => (prev + 0.25) % 360);
      }, 50);
    }
    return () => { if (rafRef.current) clearInterval(rafRef.current); };
  }, [autoRotate]);

  const radius   = isMobile ? 120 : 200;
  const canvasH  = isMobile ? 310  : 520;
  const nodeSize = isMobile ? 36   : 44;

  const getPos = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotation) % 360;
    const rad   = (angle * Math.PI) / 180;
    return {
      x:       radius * Math.cos(rad),
      y:       radius * Math.sin(rad),
      opacity: Math.max(0.35, 0.35 + 0.65 * ((1 + Math.sin(rad)) / 2)),
      zIndex:  Math.round(100 + 50 * Math.cos(rad)),
    };
  };

  const isRelated = (id: number) => {
    if (!activeId) return false;
    const activeIdx = experienceData.findIndex((n) => n.id === activeId);
    const prev = experienceData[(activeIdx - 1 + experienceData.length) % experienceData.length];
    const next = experienceData[(activeIdx + 1) % experienceData.length];
    return prev.id === id || next.id === id;
  };

  const handleNodeClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeId === id) { setActiveId(null); setAutoRotate(true);  }
    else                 { setActiveId(id);   setAutoRotate(false); }
  };

  const handleBgClick = () => { setActiveId(null); setAutoRotate(true); };

  const activeNode = experienceData.find((n) => n.id === activeId);

  return (
    <section
      id="experience"
      style={{
        padding: isMobile ? "48px 0" : "80px 0",
        background: "#fff",
        borderTop: "2px solid #1a1a1a",
        borderBottom: "2px solid #1a1a1a",
        overflow: "hidden",
      }}
    >
      <div className="container">

        {/* ── Header ── */}
        <div className="section-header">
          <h2>Experience</h2>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem",
            color: "#999", textTransform: "uppercase",
            letterSpacing: "0.12em", marginLeft: "auto",
          }}>
            Click any node
          </span>
        </div>

        {/* ── Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 320px",
          gap: isMobile ? "24px" : "48px",
          alignItems: "center",
        }}>

          {/* ── Orbital Canvas ── */}
          <div
            onClick={handleBgClick}
            style={{
              position: "relative", height: canvasH,
              display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "default",
            }}
          >
            {/* Rings */}
            {[1, 1.5].map((scale) => (
              <div key={scale} style={{
                position: "absolute",
                width:  radius * 2 * (scale === 1 ? 1 : scale / 1.5),
                height: radius * 2 * (scale === 1 ? 1 : scale / 1.5),
                borderRadius: "50%",
                border: `1px dashed rgba(26,26,26,${scale === 1 ? 0.15 : 0.07})`,
                pointerEvents: "none",
              }} />
            ))}

            {/* Centre orb */}
            <div style={{
              position: "absolute",
              width: isMobile ? 44 : 56, height: isMobile ? 44 : 56,
              borderRadius: "50%", background: "#1a1a1a",
              border: "2px solid #1a1a1a",
              boxShadow: "0 0 0 8px rgba(26,26,26,0.06), 4px 4px 0 #e63946",
              zIndex: 10, display: "flex", alignItems: "center",
              justifyContent: "center", pointerEvents: "none",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? "0.48rem" : "0.55rem",
                color: "#f4f1eb", fontWeight: 700,
                letterSpacing: "0.04em", textAlign: "center", lineHeight: 1.3,
              }}>
                EXP
              </span>
            </div>

            {/* Nodes */}
            {experienceData.map((node, index) => {
              const pos      = getPos(index, experienceData.length);
              const isActive = activeId === node.id;
              const related  = isRelated(node.id);

              return (
                <div
                  key={node.id}
                  onClick={(e) => handleNodeClick(node.id, e)}
                  style={{
                    position: "absolute",
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    zIndex:    isActive ? 200 : pos.zIndex,
                    opacity:   isActive ? 1   : pos.opacity,
                    transition: "opacity 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {/* Pulse ring */}
                  {related && (
                    <div style={{
                      position: "absolute", inset: -8,
                      borderRadius: "50%",
                      border: `2px solid ${node.color}`,
                      opacity: 0.5,
                      animation: "pulse-dot 1.5s ease-in-out infinite",
                    }} />
                  )}

                  {/* Node circle */}
                  <div style={{
                    width: nodeSize, height: nodeSize,
                    borderRadius: "50%",
                    background: isActive ? node.color : related ? node.color + "33" : "#f4f1eb",
                    border: `2px solid ${isActive ? node.color : related ? node.color : "#1a1a1a"}`,
                    boxShadow: isActive
                      ? "3px 3px 0 #1a1a1a"
                      : related
                      ? `0 0 0 3px ${node.color}22`
                      : "2px 2px 0 rgba(26,26,26,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s ease",
                    transform: isActive ? "scale(1.3)" : "scale(1)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: isMobile ? "0.42rem" : "0.5rem",
                      fontWeight: 700,
                      color: isActive ? "#fff" : "#1a1a1a",
                      letterSpacing: "0.03em",
                      userSelect: "none",
                      textAlign: "center", lineHeight: 1.2, padding: "0 2px",
                    }}>
                      {node.year.slice(2)}
                    </span>
                  </div>

                  {/* Label — desktop only */}
                  {!isMobile && (
                    <div style={{
                      position: "absolute", top: 50,
                      left: "50%", transform: "translateX(-50%)",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? node.color : "#777",
                      textTransform: "uppercase", letterSpacing: "0.08em",
                      transition: "all 0.25s", userSelect: "none",
                    }}>
                      {node.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Info Panel ── */}
          <div>
            {activeNode ? (
              <div style={{
                border: "2px solid #1a1a1a",
                boxShadow: `6px 6px 0 ${activeNode.color}`,
                background: "#fff", overflow: "hidden",
                transition: "box-shadow 0.25s ease",
              }}>
                {/* Colour header */}
                <div style={{
                  background: activeNode.color, padding: "12px 20px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.85rem",
                    fontWeight: 700, color: "#fff",
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    {activeNode.title}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em",
                  }}>
                    {activeNode.year}
                  </span>
                </div>

                <div style={{ padding: "20px" }}>

                  {/* Type */}
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                    color: "#999", textTransform: "uppercase",
                    letterSpacing: "0.12em", marginBottom: "12px",
                  }}>
                    {activeNode.type}
                  </div>

                  {/* Description */}
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: isMobile ? "0.82rem" : "0.88rem",
                    lineHeight: 1.8, color: "#444", marginBottom: "20px",
                  }}>
                    {activeNode.description}
                  </p>

                  {/* Achievement badge */}
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                      color: "#999", textTransform: "uppercase",
                      letterSpacing: "0.1em", marginBottom: "10px",
                    }}>
                      Achievement
                    </div>
                    {(() => {
                      const badge = getBadgeStyle(activeNode.position);
                      return (
                        <span style={{
                          display: "inline-block",
                          fontFamily: "var(--font-mono)", fontSize: "0.72rem",
                          fontWeight: 700, padding: "5px 14px",
                          background: badge.bg, color: badge.color,
                          border: `1.5px solid ${badge.border}`,
                          textTransform: "uppercase", letterSpacing: "0.08em",
                        }}>
                          {activeNode.position}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Skills used */}
                  {activeNode.skills.length > 0 && (
                    <div style={{ paddingTop: "16px", borderTop: "1px solid #ede9e2" }}>
                      <div style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                        color: "#999", textTransform: "uppercase",
                        letterSpacing: "0.12em", marginBottom: "10px",
                      }}>
                        Skills Used
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {activeNode.skills.map((skill) => (
                          <span key={skill} style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                            fontWeight: 700, padding: "4px 12px",
                            border: `1.5px solid ${activeNode.color}`,
                            color: activeNode.color,
                            textTransform: "uppercase", letterSpacing: "0.06em",
                            background: activeNode.color + "10",
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            ) : (
              /* ── Idle panel — short ── */
              <div style={{
                border: "2px solid #1a1a1a",
                boxShadow: "6px 6px 0 #1a1a1a",
                background: "#fff",
                padding: isMobile ? "16px" : "20px 24px",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  color: "#999", textTransform: "uppercase",
                  letterSpacing: "0.14em", marginBottom: "16px",
                }}>
                  / Events &amp; Hackathons
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {experienceData.map((node) => {
                    const badge = getBadgeStyle(node.position);
                    return (
                      <div
                        key={node.id}
                        onClick={(e) => handleNodeClick(node.id, e)}
                        style={{
                          display: "flex", alignItems: "center",
                          gap: "10px", cursor: "pointer",
                          padding: "8px 0",
                          borderBottom: "1px solid #ede9e2",
                        }}
                      >
                        <div style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: node.color, flexShrink: 0,
                        }} />
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                          fontWeight: 700, textTransform: "uppercase",
                          letterSpacing: "0.06em", flex: 1,
                        }}>
                          {node.title}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                          color: "#bbb", flexShrink: 0,
                        }}>
                          {node.year}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                          fontWeight: 700, color: badge.color,
                          flexShrink: 0, whiteSpace: "nowrap",
                        }}>
                          {node.position.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrbitalExperience;
