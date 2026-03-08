import { useState, useEffect, useRef } from "react";

interface OrbitNode {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  color: string;
  relatedIds: number[];
  level: number;
}

const journeyData: OrbitNode[] = [
  {
    id: 1, title: "C++", subtitle: "Systems & DSA", year: "2022",
    description: "Started competitive programming. Built strong DSA foundations — trees, graphs, DP. Solved 200+ problems on Codeforces and LeetCode.",
    color: "#e63946", relatedIds: [2, 7], level: 85,
  },
  {
    id: 2, title: "Python", subtitle: "Scripting & ML", year: "2022",
    description: "Scripting, automation, and introductory machine learning. Built small NLP projects and data analysis scripts.",
    color: "#3a86ff", relatedIds: [1, 3], level: 78,
  },
  {
    id: 3, title: "React", subtitle: "Frontend Dev", year: "2023",
    description: "Deep dive into React ecosystem — hooks, context, state management. Built multiple full-stack apps with real users.",
    color: "#2a9d5c", relatedIds: [2, 4, 5], level: 90,
  },
  {
    id: 4, title: "TypeScript", subtitle: "Type Safety", year: "2023",
    description: "Adopted TypeScript for all new projects. Improved code quality, caught bugs early, and scaled codebases cleanly.",
    color: "#ff9f1c", relatedIds: [3, 5], level: 82,
  },
  {
    id: 5, title: "Node.js", subtitle: "Backend APIs", year: "2023",
    description: "Built REST APIs, real-time socket servers, and authentication systems. Deployed on Render and Railway.",
    color: "#8338ec", relatedIds: [3, 4, 6], level: 75,
  },
  {
    id: 6, title: "MongoDB", subtitle: "Databases", year: "2023",
    description: "Schema design, aggregation pipelines, indexing. Used extensively with Mongoose in production apps.",
    color: "#e63946", relatedIds: [5, 7], level: 70,
  },
  {
    id: 7, title: "Docker", subtitle: "DevOps", year: "2024",
    description: "Containerized full-stack apps, wrote Dockerfiles and compose configs. Basic CI/CD with GitHub Actions.",
    color: "#3a86ff", relatedIds: [1, 6], level: 60,
  },
];

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

const OrbitalJourney = () => {
  const isMobile = useIsMobile();
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (autoRotate) {
      rafRef.current = setInterval(() => {
        setRotation((prev) => (prev + 0.25) % 360);
      }, 50);
    }
    return () => { if (rafRef.current) clearInterval(rafRef.current); };
  }, [autoRotate]);

  // Mobile: smaller radius
  const radius = isMobile ? 120 : 200;
  const canvasH = isMobile ? 310 : 520;
  const nodeSize = isMobile ? 36 : 44;

  const getPos = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotation) % 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      opacity: Math.max(0.35, 0.35 + 0.65 * ((1 + Math.sin(rad)) / 2)),
      zIndex: Math.round(100 + 50 * Math.cos(rad)),
    };
  };

  const isRelated = (id: number) => {
    if (!activeId) return false;
    return journeyData.find((n) => n.id === activeId)?.relatedIds.includes(id) ?? false;
  };

  const handleNodeClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeId === id) {
      setActiveId(null);
      setAutoRotate(true);
    } else {
      setActiveId(id);
      setAutoRotate(false);
    }
  };

  const handleBgClick = () => {
    setActiveId(null);
    setAutoRotate(true);
  };

  const activeNode = journeyData.find((n) => n.id === activeId);

  return (
    <section
      id="journey"
      style={{
        padding: isMobile ? "48px 0" : "80px 0",
        background: "#fff",
        borderTop: "2px solid #1a1a1a",
        borderBottom: "2px solid #1a1a1a",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2>Tech Journey</h2>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginLeft: "auto",
          }}>
            Click any node
          </span>
        </div>

        {/* Layout — stacks on mobile */}
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
              position: "relative",
              height: canvasH,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default",
            }}
          >
            {/* Orbit rings */}
            <div style={{
              position: "absolute",
              width: radius * 2,
              height: radius * 2,
              borderRadius: "50%",
              border: "1px dashed rgba(26,26,26,0.15)",
              pointerEvents: "none",
            }}/>
            <div style={{
              position: "absolute",
              width: radius * 1.5,
              height: radius * 1.5,
              borderRadius: "50%",
              border: "1px dashed rgba(26,26,26,0.07)",
              pointerEvents: "none",
            }}/>

            {/* Center orb */}
            <div style={{
              position: "absolute",
              width: isMobile ? 44 : 56,
              height: isMobile ? 44 : 56,
              borderRadius: "50%",
              background: "#1a1a1a",
              border: "2px solid #1a1a1a",
              boxShadow: "0 0 0 8px rgba(26,26,26,0.06), 4px 4px 0 #e63946",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? "0.52rem" : "0.6rem",
                color: "#f4f1eb",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}>
                CS
              </span>
            </div>

            {/* Nodes */}
            {journeyData.map((node, index) => {
              const pos = getPos(index, journeyData.length);
              const isActive = activeId === node.id;
              const related = isRelated(node.id);

              return (
                <div
                  key={node.id}
                  onClick={(e) => handleNodeClick(node.id, e)}
                  style={{
                    position: "absolute",
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    zIndex: isActive ? 200 : pos.zIndex,
                    opacity: isActive ? 1 : pos.opacity,
                    transition: "opacity 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {related && (
                    <div style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: "50%",
                      border: `2px solid ${node.color}`,
                      opacity: 0.5,
                      animation: "pulse-dot 1.5s ease-in-out infinite",
                    }}/>
                  )}

                  <div style={{
                    width: nodeSize,
                    height: nodeSize,
                    borderRadius: "50%",
                    background: isActive ? node.color : related ? node.color + "33" : "#f4f1eb",
                    border: `2px solid ${isActive ? node.color : related ? node.color : "#1a1a1a"}`,
                    boxShadow: isActive
                      ? "3px 3px 0 #1a1a1a"
                      : related
                      ? `0 0 0 3px ${node.color}22`
                      : "2px 2px 0 rgba(26,26,26,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                    }}>
                      {node.title.slice(0, 3).toUpperCase()}
                    </span>
                  </div>

                  {/* Label — hide on mobile to save space */}
                  {!isMobile && (
                    <div style={{
                      position: "absolute",
                      top: 50,
                      left: "50%",
                      transform: "translateX(-50%)",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? node.color : "#777",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      transition: "all 0.25s",
                      userSelect: "none",
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
                background: "#fff",
                overflow: "hidden",
                transition: "box-shadow 0.25s ease",
              }}>
                {/* Header bar */}
                <div style={{
                  background: activeNode.color,
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}>
                    {activeNode.title}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.1em",
                  }}>
                    Since {activeNode.year}
                  </span>
                </div>

                <div style={{ padding: "20px" }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: "12px",
                  }}>
                    {activeNode.subtitle}
                  </div>

                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: isMobile ? "0.82rem" : "0.88rem",
                    lineHeight: 1.8,
                    color: "#444",
                    marginBottom: "20px",
                  }}>
                    {activeNode.description}
                  </p>

                  {/* Proficiency bar */}
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "#999",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                    }}>
                      <span>Proficiency</span>
                      <span style={{ color: activeNode.color, fontWeight: 700 }}>
                        {activeNode.level}%
                      </span>
                    </div>
                    <div style={{
                      height: 6,
                      background: "#ede9e2",
                      border: "1px solid #ddd",
                      position: "relative",
                    }}>
                      <div style={{
                        position: "absolute",
                        left: 0, top: 0, bottom: 0,
                        width: `${activeNode.level}%`,
                        background: activeNode.color,
                        transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
                      }}/>
                    </div>
                  </div>

                  {/* Connected skills */}
                  {activeNode.relatedIds.length > 0 && (
                    <div>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBottom: "10px",
                        paddingTop: "16px",
                        borderTop: "1px solid #ede9e2",
                      }}>
                        Connected Skills
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {activeNode.relatedIds.map((rid) => {
                          const rel = journeyData.find((n) => n.id === rid);
                          return rel ? (
                            <button
                              key={rid}
                              onClick={(e) => { e.stopPropagation(); handleNodeClick(rid, e); }}
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                padding: "4px 12px",
                                border: `1.5px solid ${rel.color}`,
                                color: rel.color,
                                background: "transparent",
                                cursor: "pointer",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                transition: "all 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = rel.color;
                                e.currentTarget.style.color = "#fff";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = rel.color;
                              }}
                            >
                              {rel.title} &rarr;
                            </button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Idle state */
              <div style={{
                border: "2px solid #1a1a1a",
                boxShadow: "6px 6px 0 #1a1a1a",
                background: "#fff",
                padding: isMobile ? "20px 16px" : "32px 24px",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  marginBottom: "16px",
                }}>
                  / Tech Stack
                </div>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: isMobile ? "0.82rem" : "0.95rem",
                  lineHeight: 1.85,
                  color: "#555",
                  marginBottom: "20px",
                }}>
                  Click any orbiting node to explore experience, proficiency &amp; connections.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {journeyData.map((node) => (
                    <div
                      key={node.id}
                      onClick={(e) => handleNodeClick(node.id, e)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                        padding: "6px 0",
                        borderBottom: "1px solid #ede9e2",
                      }}
                    >
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: node.color, flexShrink: 0,
                      }}/>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        flex: 1,
                      }}>
                        {node.title}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "#999",
                      }}>
                        {node.level}%
                      </span>
                      <div style={{
                        width: isMobile ? 48 : 60,
                        height: 4,
                        background: "#ede9e2",
                        position: "relative",
                        flexShrink: 0,
                      }}>
                        <div style={{
                          position: "absolute", left: 0, top: 0, bottom: 0,
                          width: `${node.level}%`,
                          background: node.color,
                        }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrbitalJourney;
