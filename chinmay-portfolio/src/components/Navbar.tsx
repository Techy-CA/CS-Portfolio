import { useState, useEffect } from "react";
import { personal } from "../data/portfolioData";

const NAV_LINKS = ["about", "projects", "skills", "contact"] as const;

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "#f4f1eb" : "transparent",
        borderBottom: scrolled || menuOpen ? "2px solid #1a1a1a" : "none",
        transition: "all 0.2s",
        padding: "14px 0",
      }}>
        <div className="container" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          {/* Logo */}
          <a href="#home" onClick={handleLinkClick} style={{
            fontWeight: 700,
            fontSize: isMobile ? "0.85rem" : "1rem",
            letterSpacing: "0.05em",
            textDecoration: "none",
            color: "#1a1a1a",
          }}>
            CHINMAY{" "}
            <span style={{ color: "#e63946" }}>SUGANDHI</span>
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                    textDecoration: "none", color: "var(--text)",
                    padding: "4px 12px", border: "1.5px solid transparent",
                    transition: "all 0.15s", textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = "1.5px solid #1a1a1a";
                    e.currentTarget.style.boxShadow = "2px 2px 0 #1a1a1a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = "1.5px solid transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                style={{
                  background: "#1a1a1a", color: "#f4f1eb",
                  padding: "6px 16px", border: "2px solid #1a1a1a",
                  boxShadow: "2px 2px 0 #e63946", fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem", textDecoration: "none",
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  fontWeight: 700, transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-1px,-1px)";
                  e.currentTarget.style.boxShadow = "4px 4px 0 #e63946";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0,0)";
                  e.currentTarget.style.boxShadow = "2px 2px 0 #e63946";
                }}
              >
                Hire Me
              </a>
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((p) => !p)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "4px", display: "flex", flexDirection: "column",
                gap: "5px", zIndex: 101,
              }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "#1a1a1a",
                  transition: "all 0.25s ease",
                  transformOrigin: "center",
                  transform:
                    menuOpen
                      ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                      : i === 1 ? "scaleX(0)"
                      : "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
          background: "#f4f1eb",
          borderBottom: "2px solid #1a1a1a",
          padding: "80px 24px 28px",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: menuOpen ? "0 8px 0 rgba(26,26,26,0.08)" : "none",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={handleLinkClick}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#1a1a1a",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: i < NAV_LINKS.length - 1 ? "1px solid #ddd" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#e63946"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#1a1a1a"; }}
              >
                <span>{link}</span>
                <span style={{
                  fontSize: "0.7rem",
                  color: "#999",
                  letterSpacing: "0.1em",
                }}>
                  0{i + 1}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              style={{
                marginTop: "16px",
                background: "#1a1a1a", color: "#f4f1eb",
                padding: "14px", textAlign: "center",
                border: "2px solid #1a1a1a",
                boxShadow: "4px 4px 0 #e63946",
                fontFamily: "var(--font-mono)", fontSize: "0.85rem",
                textDecoration: "none", textTransform: "uppercase",
                letterSpacing: "0.08em", fontWeight: 700,
                display: "block",
              }}
            >
              Hire Me &rarr;
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
