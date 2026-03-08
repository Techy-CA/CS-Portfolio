import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import OrbitalJourney from "./components/OrbitalJourney";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import "./index.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        width: 44,
        height: 44,
        background: "#1a1a1a",
        border: "2px solid #1a1a1a",
        boxShadow: visible ? "3px 3px 0 #e63946" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 999,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-2px,-2px)";
        e.currentTarget.style.boxShadow = "5px 5px 0 #e63946";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "3px 3px 0 #e63946";
      }}
      aria-label="Scroll to top"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 12V2M2 7l5-5 5 5"
          stroke="#f4f1eb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <OrbitalJourney />
      <Skills />
      <Contact />
      <ScrollToTop />

      <footer
        style={{
          borderTop: "2px solid #1a1a1a",
          padding: "24px 0",
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          background: "#1a1a1a",
          color: "#f4f1eb",
        }}
      >
        built by{" "}
        <span style={{ color: "#e63946", fontWeight: 700 }}>
          Chinmay Sugandhi
        </span>{" "}
        with React + TypeScript ·{" "}
        <span style={{ color: "#2a9d5c" }}>2026</span>
      </footer>
    </>
  );
}

export default App;
