import { useEffect, useRef, useState } from "react";
import { personal } from "../data/portfolioData";
import ParticleOrb from "./ParticleOrb";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!$%&";

const useScramble = (finalText: string, delay = 0) => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const totalFrames = 18;
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        setDisplay(
          finalText.split("").map((char, i) => {
            if (char === " ") return " ";
            if (frame / totalFrames > i / finalText.length) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        if (frame >= totalFrames) clearInterval(interval);
      }, 55);
    }, delay);
    return () => { clearTimeout(timeout); };
  }, [finalText, delay]);
  return display;
};

const Counter = ({
  to, suffix = "", delay = 0,
}: { to: number; suffix?: string; delay?: number }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const duration = 1400;
    let raf: number;
    const t = setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setVal(Math.floor(ease * to));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to, delay]);
  return <>{val}{suffix}</>;
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

const MARQUEE_ITEMS = [
  "React","TypeScript","Node.js","C++","Python","System Design",
  "MongoDB","REST APIs","Git","Docker","Linux","Full-Stack","DSA",
  "React","TypeScript","Node.js","C++","Python","System Design",
  "MongoDB","REST APIs","Git","Docker","Linux","Full-Stack","DSA",
];

const Hero = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const trail   = useRef({ x: -200, y: -200 });
  const rafRef  = useRef<number>(0);
  const [hoverName, setHoverName] = useState(false);
  const [revealed, setRevealed]   = useState(false);
  const isMobile = useIsMobile();

  const firstName = useScramble("CHINMAY",  200);
  const lastName  = useScramble("SUGANDHI", 600);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    const animate = () => {
      trail.current.x += (mouse.current.x - trail.current.x) * 0.11;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.11;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px,${mouse.current.y - 4}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${trail.current.x - 20}px,${trail.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return (
    <>
      {!isMobile && (
        <>
          <div ref={dotRef} style={{
            position: "fixed", top: 0, left: 0, width: 8, height: 8,
            background: "#e63946", borderRadius: "50%", pointerEvents: "none",
            zIndex: 9999, willChange: "transform",
          }} />
          <div ref={ringRef} style={{
            position: "fixed", top: 0, left: 0, width: 40, height: 40,
            border: "1.5px solid rgba(26,26,26,0.45)", borderRadius: "50%",
            pointerEvents: "none", zIndex: 9998, willChange: "transform",
          }} />
        </>
      )}

      <div className="noise-overlay" />

      <section id="home" style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: isMobile ? "64px" : "72px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}>

        {/* Dot grid bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(26,26,26,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }} />

        {!isMobile && (
          <>
            <div style={{
              position: "absolute", top: "-10%", right: "8%",
              width: 4, height: "130%", background: "#e63946",
              transform: "rotate(12deg)", opacity: 0.18, pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", top: "-10%", right: "10%",
              width: 1, height: "130%", background: "#1a1a1a",
              transform: "rotate(12deg)", opacity: 0.08, pointerEvents: "none",
            }} />
          </>
        )}

        <div className="container" style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "flex-start",
          position: "relative",
          paddingTop: 0,
          paddingBottom: 0,
          minHeight: 0,
          overflow: "hidden",
        }}>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
            gap: 0,
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}>

            {/* ── LEFT / CENTRE (mobile) ── */}
            <div style={{
              paddingRight: isMobile ? 0 : "40px",
              textAlign: isMobile ? "center" : "left",
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start",
            }}>

              {/* Name */}
              <div
                onMouseEnter={() => !isMobile && setHoverName(true)}
                onMouseLeave={() => !isMobile && setHoverName(false)}
                style={{ position: "relative", marginBottom: isMobile ? 14 : 20, lineHeight: 0.9 }}
              >
                {/* Ghost */}
                <div style={{
                  position: "absolute", top: 3, left: 3,
                  fontFamily: "var(--font-mono)", fontWeight: 700,
                  fontSize: isMobile ? "clamp(2.6rem, 14vw, 4rem)" : "clamp(2.8rem, 8.5vw, 8rem)",
                  textTransform: "uppercase", letterSpacing: "-0.03em",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(230,57,70,0.15)",
                  userSelect: "none", pointerEvents: "none", lineHeight: 0.9,
                  textAlign: isMobile ? "center" : "left", width: "100%",
                }}>
                  <div>CHINMAY</div>
                  <div>SUGANDHI</div>
                </div>

                <h1 style={{
                  fontFamily: "var(--font-mono)", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "-0.03em",
                  position: "relative", margin: 0, padding: 0,
                }}>
                  <div style={{
                    overflow: "hidden",
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(100%)",
                    transition: "opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                  }}>
                    <span style={{
                      display: "block",
                      fontSize: isMobile ? "clamp(2.6rem, 14vw, 4rem)" : "clamp(2.8rem, 8.5vw, 8rem)",
                      color: "#1a1a1a",
                      animation: hoverName ? "glitch-text 0.4s steps(2) forwards" : "none",
                    }}>
                      {firstName || "CHINMAY"}
                    </span>
                  </div>
                  <div style={{
                    overflow: "hidden",
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(100%)",
                    transition: "opacity 0.7s ease 0.55s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s",
                  }}>
                    <span style={{
                      display: "block",
                      fontSize: isMobile ? "clamp(2.6rem, 14vw, 4rem)" : "clamp(2.8rem, 8.5vw, 8rem)",
                      WebkitTextStroke: isMobile ? "1.5px #1a1a1a" : "2.5px #1a1a1a",
                      color: "transparent",
                    }}>
                      {lastName || "SUGANDHI"}
                    </span>
                  </div>
                </h1>

                {/* Red bar */}
                <div style={{
                  height: 4, background: "#e63946", marginTop: 8,
                  width: revealed ? (isMobile ? "55%" : "42%") : "0%",
                  transition: "width 0.9s cubic-bezier(0.16,1,0.3,1) 1s",
                }} />
              </div>

              {/* Bio */}
              <div style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.9s, transform 0.7s ease 0.9s",
                marginBottom: isMobile ? 20 : 20,
              }}>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: isMobile ? "0.88rem" : "1.05rem",
                  lineHeight: 1.8, color: "#2a2a2a",
                  maxWidth: isMobile ? "100%" : 420,
                  fontWeight: 500, margin: 0,
                }}>
                  {personal.heroBio}
                </p>
              </div>

              {/* Counters */}
              <div style={{
                display: "flex",
                gap: isMobile ? 28 : 36,
                justifyContent: isMobile ? "center" : "flex-start",
                paddingTop: 16,
                borderTop: "1px solid #ddd",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 1.1s, transform 0.6s ease 1.1s",
                marginBottom: 20,
              }}>
                {[
                  { to: 2,  suffix: "+", label: "Years Coding"   },
                  { to: 10, suffix: "+", label: "Projects Built" },
                  { to: 5,  suffix: "+", label: "Tech Stacks"    },
                ].map(({ to, suffix, label }, i) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: isMobile ? "1.5rem" : "2rem",
                      fontWeight: 700, color: "#1a1a1a", lineHeight: 1,
                    }}>
                      <Counter to={to} suffix={suffix} delay={1200 + i * 150} />
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: isMobile ? "0.5rem" : "0.58rem",
                      color: "#999", textTransform: "uppercase",
                      letterSpacing: "0.1em", marginTop: 4,
                    }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{
                display: "flex", gap: "10px", flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 1.3s, transform 0.6s ease 1.3s",
                marginBottom: 14,
              }}>
                <a href="#projects" className="btn-primary" style={{
                  fontSize: isMobile ? "0.7rem" : undefined,
                  padding: isMobile ? "10px 20px" : undefined,
                }}>
                  View Work &rarr;
                </a>
                <a href="#contact" className="btn-secondary" style={{
                  fontSize: isMobile ? "0.7rem" : undefined,
                  padding: isMobile ? "10px 20px" : undefined,
                }}>
                  Get in Touch
                </a>
              </div>

              {/* Socials */}
              <div style={{
                display: "flex", gap: "16px",
                alignItems: "center", flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
                opacity: revealed ? 1 : 0,
                transition: "opacity 0.6s ease 1.5s",
              }}>
                {[
                  { label: "GitHub",   href: personal.github   },
                  { label: "LinkedIn", href: personal.linkedin  },
                  { label: "Twitter",  href: personal.twitter   },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: isMobile ? "0.62rem" : "0.68rem",
                      color: "#777", textDecoration: "none",
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      borderBottom: "1px solid transparent", paddingBottom: 1,
                      transition: "color 0.15s, border-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#1a1a1a";
                      e.currentTarget.style.borderColor = "#e63946";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#777";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    {label} &uarr;
                  </a>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Orb desktop only ── */}
            {!isMobile && (
              <div style={{
                height: "100%", minHeight: 0,
                opacity: revealed ? 1 : 0,
                transition: "opacity 1s ease 1.2s",
                position: "relative",
              }}>
                <ParticleOrb />
              </div>
            )}

          </div>
        </div>

        {/* ── MARQUEE ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "#1a1a1a", borderTop: "2px solid #1a1a1a",
          padding: "10px 0", overflow: "hidden", zIndex: 10,
        }}>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} style={{
                  display: "inline-flex", alignItems: "center",
                  paddingRight: 28, gap: 28,
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: isMobile ? "0.6rem" : "0.72rem",
                    color: i % 7 === 0 ? "#e63946" : "#f4f1eb",
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    fontWeight: i % 7 === 0 ? 700 : 400,
                  }}>
                    {item}
                  </span>
                  <span style={{ color: "#444", fontSize: "0.45rem" }}>&#9632;</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Hero;
