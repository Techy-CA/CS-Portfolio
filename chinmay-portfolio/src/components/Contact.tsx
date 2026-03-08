import { personal } from "../data/portfolioData";

const Contact = () => {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
          {/* Left */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "24px" }}>
              I'm currently open to new opportunities — whether it's a full-time role, internship, or an exciting freelance project.
              My inbox is always open!
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { label: "GitHub", value: "chinmaysugandhi", href: personal.github },
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
                    (e.currentTarget as HTMLElement).style.background = "#1a1a1a";
                    (e.currentTarget as HTMLElement).style.color = "#f4f1eb";
                    (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #e63946";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#f4f1eb";
                    (e.currentTarget as HTMLElement).style.color = "#1a1a1a";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontWeight: 700, width: "80px" }}>{label}</span>
                  <span style={{ color: "#555" }}>{value}</span>
                  <span style={{ marginLeft: "auto" }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: "24px" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Chinmay Sugandhi" },
                { id: "email", label: "Email", type: "email", placeholder: "chinmay@email.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor={id} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      padding: "10px 14px",
                      border: "2px solid #1a1a1a",
                      background: "#f4f1eb",
                      outline: "none",
                      transition: "box-shadow 0.15s",
                    }}
                    onFocus={(e) => { e.target.style.boxShadow = "3px 3px 0 #e63946"; }}
                    onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="msg" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Message
                </label>
                <textarea
                  id="msg"
                  rows={4}
                  placeholder="Let's build something great together..."
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    padding: "10px 14px",
                    border: "2px solid #1a1a1a",
                    background: "#f4f1eb",
                    outline: "none",
                    resize: "vertical",
                    transition: "box-shadow 0.15s",
                  }}
                  onFocus={(e) => { e.target.style.boxShadow = "3px 3px 0 #e63946"; }}
                  onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: "#1a1a1a",
                  color: "#f4f1eb",
                  padding: "12px",
                  border: "2px solid #1a1a1a",
                  boxShadow: "4px 4px 0 #e63946",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = "translate(-2px,-2px)";
                  (e.target as HTMLElement).style.boxShadow = "6px 6px 0 #e63946";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = "translate(0,0)";
                  (e.target as HTMLElement).style.boxShadow = "4px 4px 0 #e63946";
                }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
