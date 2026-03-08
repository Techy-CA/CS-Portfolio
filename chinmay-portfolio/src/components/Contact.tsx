import { useState, useEffect } from "react";
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

const Contact = () => {
  const isMobile = useIsMobile();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setShowForm(false);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      style={{ padding: isMobile ? "48px 0" : "80px 0" }}
    >
      {/* ── Success Toast ── */}
      <div style={{
        position: "fixed",
        bottom: isMobile ? 20 : 32,
        right: isMobile ? 16 : 32,
        zIndex: 9999,
        transform: submitted ? "translateY(0)" : "translateY(120px)",
        opacity: submitted ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "none",
      }}>
        <div style={{
          background: "#1a1a1a",
          color: "#f4f1eb",
          border: "2px solid #1a1a1a",
          boxShadow: "4px 4px 0 #2a9d5c",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          fontWeight: 700,
          maxWidth: isMobile ? "calc(100vw - 32px)" : "280px",
        }}>
          <span style={{
            width: 24, height: 24,
            background: "#2a9d5c",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontSize: "0.75rem",
          }}>✓</span>
          <div>
            <div style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Message Sent!
            </div>
            <div style={{ fontWeight: 400, color: "#aaa", fontSize: "0.7rem", marginTop: "2px" }}>
              I'll get back to you soon.
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "32px" : "48px",
        }}>

          {/* ── LEFT — Info ── */}
          <div>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: isMobile ? "0.88rem" : "0.95rem",
              color: "var(--text-muted)",
              lineHeight: 1.8,
              marginBottom: "24px",
            }}>
              I'm currently open to new opportunities — whether it's a full-time role,
              internship, or an exciting freelance project. My inbox is always open!
            </p>

            {/* Social links — desktop only */}
            {!isMobile && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {[
                  { label: "Email",    value: personal.email,    href: `mailto:${personal.email}` },
                  { label: "GitHub",   value: "chinmaysugandhi", href: personal.github },
                  { label: "LinkedIn", value: "chinmaysugandhi", href: personal.linkedin },
                ].map(({ label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      textDecoration: "none",
                      color: "#1a1a1a",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      padding: "12px 16px",
                      border: "1.5px solid #1a1a1a",
                      background: "#f4f1eb",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1a1a1a";
                      e.currentTarget.style.color = "#f4f1eb";
                      e.currentTarget.style.boxShadow = "4px 4px 0 #e63946";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f4f1eb";
                      e.currentTarget.style.color = "#1a1a1a";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span style={{ fontWeight: 700, width: "72px", flexShrink: 0 }}>{label}</span>
                    <span style={{
                      color: "#555", overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap",
                      flex: 1, minWidth: 0,
                    }}>
                      {value}
                    </span>
                    <span style={{ marginLeft: "auto", flexShrink: 0 }}>↗</span>
                  </a>
                ))}
              </div>
            )}

            {/* ── "Drop a Message" Button ── */}
            {/* ── "Drop a Message" Button — mobile only ── */}
{isMobile && (
  <button
    onClick={() => setShowForm((prev) => !prev)}
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.78rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      padding: "12px 20px",
      background: showForm ? "#e63946" : "#1a1a1a",
      color: "#f4f1eb",
      border: "2px solid #1a1a1a",
      boxShadow: showForm ? "4px 4px 0 #1a1a1a" : "4px 4px 0 #e63946",
      cursor: "pointer",
      transition: "all 0.2s ease",
      width: "100%",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
    }}
  >
    {showForm ? "✕ Close Form" : "✉ Drop a Message"}
  </button>
)}

          </div>

          {/* ── RIGHT — Form (desktop always visible, mobile toggle) ── */}
          {(!isMobile || showForm) && (
            <div
              className="card"
              style={{
                padding: isMobile ? "20px 16px" : "24px",
                animation: "fadeSlideUp 0.35s ease",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {[
                  { id: "name",  label: "Name",  type: "text",  placeholder: "Your Name",  val: form.name },
                  { id: "email", label: "Email", type: "email", placeholder: "Your Email", val: form.email },
                ].map(({ id, label, type, placeholder, val }) => (
                  <div key={id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label htmlFor={id} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>
                      {label}
                    </label>
                    <input
                      id={id} type={type} required
                      placeholder={placeholder}
                      value={val}
                      onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                        padding: "10px 14px",
                        border: "2px solid #1a1a1a",
                        background: "#f4f1eb",
                        outline: "none",
                        transition: "box-shadow 0.15s",
                        width: "100%", boxSizing: "border-box",
                      }}
                      onFocus={(e) => { e.target.style.boxShadow = "3px 3px 0 #e63946"; }}
                      onBlur={(e)  => { e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="msg" style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    Message
                  </label>
                  <textarea
                    id="msg" rows={4} required
                    placeholder="Let's build something great together..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: isMobile ? "0.8rem" : "0.85rem",
                      padding: "10px 14px",
                      border: "2px solid #1a1a1a",
                      background: "#f4f1eb",
                      outline: "none", resize: "vertical",
                      transition: "box-shadow 0.15s",
                      width: "100%", boxSizing: "border-box",
                    }}
                    onFocus={(e) => { e.target.style.boxShadow = "3px 3px 0 #e63946"; }}
                    onBlur={(e)  => { e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? "#555" : "#1a1a1a",
                    color: "#f4f1eb",
                    padding: "12px",
                    border: "2px solid #1a1a1a",
                    boxShadow: "4px 4px 0 #e63946",
                    fontFamily: "var(--font-mono)",
                    fontSize: isMobile ? "0.78rem" : "0.85rem",
                    fontWeight: 700, textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    letterSpacing: "0.05em",
                    transition: "all 0.15s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.target as HTMLElement).style.transform = "translate(-2px,-2px)";
                      (e.target as HTMLElement).style.boxShadow = "6px 6px 0 #e63946";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = "translate(0,0)";
                    (e.target as HTMLElement).style.boxShadow = "4px 4px 0 #e63946";
                  }}
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Fade-slide animation */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
