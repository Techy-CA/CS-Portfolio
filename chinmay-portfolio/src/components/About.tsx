import { useEffect, useState } from "react";
import { personal } from "../data/portfolioData";

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

const About = () => {
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      style={{
        background: "#fff",
        borderTop: "2px solid #1a1a1a",
        borderBottom: "2px solid #1a1a1a",
        padding: isMobile ? "48px 0" : "80px 0",
      }}
    >
      <div className="container">
        <div className="section-header">
          <h2>About</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "300px 1fr",
          gap: isMobile ? "32px" : "56px",
          alignItems: "start",
        }}>

          {/* ── LEFT — Photo + Venture Cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Photo — with name label */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "100%", aspectRatio: "1",
                border: "2px solid #1a1a1a",
                boxShadow: "5px 5px 0 #e63946",
                background: "#ede9e2", overflow: "hidden",
              }}>
                <img
                  src="/portfoliophoto.JPG"
                  alt="Chinmay Sugandhi"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                  }}
                />
              </div>

              {/* ── Name label ── */}
              <div style={{
                position: "absolute",
                bottom: -2, left: -2,
                background: "#1a1a1a",
                padding: "5px 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "#f4f1eb",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}>
                CHINMAY SUGANDHI
              </div>
            </div>

            {/* Eka Gifts card */}
            <div
              style={{
                border: "2px solid #e63946",
                boxShadow: "4px 4px 0 #e63946",
                padding: "16px", background: "#fff",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px,-2px)";
                e.currentTarget.style.boxShadow = "6px 6px 0 #e63946";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "4px 4px 0 #e63946";
              }}
            >
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", marginBottom: "8px",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  color: "#e63946", textTransform: "uppercase",
                  letterSpacing: "0.14em", fontWeight: 700,
                }}>
                  Founder
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                  color: "#2a9d5c", textTransform: "uppercase",
                  letterSpacing: "0.1em", border: "1px solid #2a9d5c",
                  padding: "2px 6px", fontWeight: 700,
                }}>
                  Building
                </span>
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.88rem",
                fontWeight: 700, marginBottom: "6px",
              }}>
                Eka Gifts
              </div>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "0.78rem",
                color: "#666", lineHeight: 1.7, margin: "0 0 12px 0",
              }}>
                A gifting startup focused on corporate &amp; personal gifting - making gifting thoughtful, seamless, and scalable.
              </p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["Corporate Gifting", "Personal Gifting", "Startup"].map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                    fontWeight: 700, padding: "2px 8px",
                    border: "1.5px solid #e63946", color: "#e63946",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* FRNT Media card */}
            <div
              style={{
                border: "2px solid #1a1a1a",
                boxShadow: "4px 4px 0 #1a1a1a",
                padding: "16px", background: "#fff",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px,-2px)";
                e.currentTarget.style.boxShadow = "5px 5px 0 #3a86ff";
                e.currentTarget.style.borderColor = "#3a86ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "4px 4px 0 #1a1a1a";
                e.currentTarget.style.borderColor = "#1a1a1a";
              }}
            >
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", marginBottom: "8px",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  color: "#3a86ff", textTransform: "uppercase",
                  letterSpacing: "0.14em", fontWeight: 700,
                }}>
                  Founder &amp; CEO
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                  color: "#999", textTransform: "uppercase",
                  letterSpacing: "0.1em", border: "1px solid #ddd",
                  padding: "2px 6px",
                }}>
                  Active
                </span>
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.88rem",
                fontWeight: 700, marginBottom: "6px",
              }}>
                FRNT Media
              </div>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "0.78rem",
                color: "#666", lineHeight: 1.7, margin: 0,
              }}>
                Software solutions, influencer marketing &amp; digital growth systems for businesses.
              </p>
            </div>
          </div>

          {/* ── RIGHT — Bio + Socials ── */}
          <div>
            <div style={{
              display: "flex", gap: "8px",
              marginBottom: "28px", flexWrap: "wrap",
            }}>
              {personal.tags.map((tag, i) => (
                <span key={tag} className="tag" style={{
                  background: i === 0 ? "#e63946" : i === 1 ? "#2a9d5c" : "#3a86ff",
                  color: "white",
                  borderColor: i === 0 ? "#e63946" : i === 1 ? "#2a9d5c" : "#3a86ff",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {[personal.bio1, personal.bio2, personal.bio3, personal.bio4].map((para, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-sans)",
                fontSize: i === 0 ? (isMobile ? "1rem" : "1.08rem") : (isMobile ? "0.88rem" : "0.95rem"),
                lineHeight: 1.9,
                color: i === 0 ? "#1a1a1a" : "#555",
                marginBottom: "18px",
                fontWeight: i === 0 ? 500 : 400,
                borderLeft: i === 2 ? "3px solid #e63946" : "none",
                paddingLeft: i === 2 ? "16px" : "0",
              }}>
                {para}
              </p>
            ))}

            <div style={{
              display: "flex", gap: "10px",
              marginTop: "32px", paddingTop: "28px",
              borderTop: "1px solid #ddd", flexWrap: "wrap",
            }}>
              {[
                { label: "GitHub",   href: personal.github },
                { label: "LinkedIn", href: personal.linkedin },
                { label: "Email",    href: `mailto:${personal.email}` },
              ].map(({ label, href }) => (
                <a
                  key={label} href={href} target="_blank" rel="noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: isMobile ? "0.65rem" : "0.72rem",
                    color: "#1a1a1a", textDecoration: "none",
                    border: "1.5px solid #1a1a1a",
                    padding: isMobile ? "5px 10px" : "5px 14px",
                    boxShadow: "2px 2px 0 #1a1a1a",
                    transition: "all 0.15s",
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1a1a1a";
                    e.currentTarget.style.color = "#f4f1eb";
                    e.currentTarget.style.transform = "translate(-1px,-1px)";
                    e.currentTarget.style.boxShadow = "3px 3px 0 #e63946";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#1a1a1a";
                    e.currentTarget.style.transform = "translate(0,0)";
                    e.currentTarget.style.boxShadow = "2px 2px 0 #1a1a1a";
                  }}
                >
                  {label} &uarr;
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
