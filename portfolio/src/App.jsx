import { useEffect, useState } from "react";
import "./index.css";
import Navbar, { LangContext, i18n } from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Organizations from "./components/Organizations";
import Contact from "./components/Contact";

/* ── Animated gradient mesh background ── */
const GradientMesh = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
    <div style={{ position: "absolute", width: "55vw", height: "55vw", top: "-15vw", left: "-15vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(29,78,216,0.07) 0%, transparent 65%)", animation: "meshBlob1 18s ease-in-out infinite", filter: "blur(40px)" }} />
    <div style={{ position: "absolute", width: "45vw", height: "45vw", top: "-10vw", right: "-10vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)", animation: "meshBlob2 22s ease-in-out infinite", filter: "blur(50px)" }} />
    <div style={{ position: "absolute", width: "40vw", height: "40vw", top: "30vh", left: "30vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)", animation: "meshBlob3 26s ease-in-out infinite", filter: "blur(60px)" }} />
    <div style={{ position: "absolute", width: "50vw", height: "50vw", bottom: "-10vw", left: "-5vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(29,78,216,0.06) 0%, transparent 65%)", animation: "meshBlob4 20s ease-in-out infinite", filter: "blur(45px)" }} />
    <div style={{ position: "absolute", width: "40vw", height: "40vw", bottom: "-5vw", right: "-5vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)", animation: "meshBlob5 24s ease-in-out infinite", filter: "blur(55px)" }} />
    <style>{`
      @keyframes meshBlob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(4vw,6vh) scale(1.1)}66%{transform:translate(-3vw,3vh) scale(0.95)}}
      @keyframes meshBlob2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-6vw,4vh) scale(1.08)}70%{transform:translate(2vw,-3vh) scale(0.92)}}
      @keyframes meshBlob3{0%,100%{transform:translate(0,0) scale(1)}30%{transform:translate(5vw,-5vh) scale(1.15)}60%{transform:translate(-4vw,6vh) scale(0.9)}}
      @keyframes meshBlob4{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(6vw,-4vh) scale(1.12)}}
      @keyframes meshBlob5{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(-5vw,3vh) scale(1.06)}80%{transform:translate(3vw,-2vh) scale(0.94)}}
    `}</style>
  </div>
);

/* ── Glitch Text Reveal Loader — Split Line ── */
const Loader = ({ onDone }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSub, setShowSub] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Line 1: "Berlin" — glitches first
  const [line1, setLine1] = useState("");
  const [line1Done, setLine1Done] = useState(false);
  const [line1Glitch, setLine1Glitch] = useState(true);

  // Line 2: "Sugiyanto" — glitches after line1 done
  const [line2, setLine2] = useState("");
  const [line2Done, setLine2Done] = useState(false);
  const [line2Glitch, setLine2Glitch] = useState(false);

  const glitchChars = "!@#$%^&*<>[]{}|\\?~`ABCDEFabcdef0123456789";

  const glitchReveal = (word, setter, setDone, setGlitch, onComplete) => {
    let count = 0;
    const max = 18;
    const iv = setInterval(() => {
      count++;
      const revealed = Math.floor((count / max) * word.length);
      let text = word.slice(0, revealed);
      const rem = word.length - revealed;
      for (let i = 0; i < Math.min(rem, 4); i++) {
        text += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      setter(text);
      if (count >= max) {
        clearInterval(iv);
        setter(word);
        setDone(true);
        setGlitch(false);
        onComplete();
      }
    }, 55);
  };

  useEffect(() => {
    // Line 1 starts after 200ms
    setTimeout(() => {
      glitchReveal("Berlin", setLine1, setLine1Done, setLine1Glitch, () => {
        // Line 2 starts 150ms after line 1 done
        setLine2Glitch(true);
        setTimeout(() => {
          glitchReveal("Sugiyanto", setLine2, setLine2Done, setLine2Glitch, () => {
            setTimeout(() => setShowSub(true), 100);
            setTimeout(() => setShowProgress(true), 280);
            // Progress bar
            let p = 0;
            const pi = setInterval(() => {
              p += Math.random() * 15 + 8;
              if (p >= 100) {
                p = 100;
                clearInterval(pi);
                setTimeout(() => { setFadeOut(true); setTimeout(onDone, 650); }, 400);
              }
              setProgress(Math.min(p, 100));
            }, 100);
          });
        }, 150);
      });
    }, 200);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "var(--navy)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fadeOut ? 0 : 1, transition: "opacity 0.65s cubic-bezier(.22,1,.36,1)",
      pointerEvents: fadeOut ? "none" : "all", overflow: "hidden",
    }}>
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)", pointerEvents: "none", zIndex: 1 }} />
      {/* Ambient glows */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: "45vw", height: "45vw", background: "radial-gradient(circle,rgba(29,78,216,0.15),transparent 65%)", filter: "blur(70px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: "40vw", height: "40vw", background: "radial-gradient(circle,rgba(6,182,212,0.1),transparent 65%)", filter: "blur(70px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* Split name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 0.92, gap: 0 }}>
          {/* Line 1: Berlin — white */}
          <div style={{ position: "relative" }}>
            <h1 style={{
              fontFamily: "'Clash Display','Syne',sans-serif",
              fontSize: "clamp(52px,10vw,110px)",
              fontWeight: 700, color: "#FFFFFF",
              letterSpacing: "-3px", margin: 0, lineHeight: 1,
              animation: line1Glitch ? "glitchMain 0.12s infinite" : "none",
              textShadow: line1Glitch
                ? "3px 0 #06B6D4,-3px 0 #3B82F6,0 0 30px rgba(6,182,212,0.6)"
                : line1Done ? "0 0 60px rgba(255,255,255,0.15)" : "none",
              transition: "text-shadow 0.5s ease",
            }}>
              {line1}{!line1Done && <span style={{ animation: "cursorBlink 0.7s step-end infinite", color: "#06B6D4" }}>_</span>}
            </h1>
            {line1Glitch && <>
              <h1 aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, fontFamily: "'Clash Display','Syne',sans-serif", fontSize: "clamp(52px,10vw,110px)", fontWeight: 700, color: "#06B6D4", letterSpacing: "-3px", margin: 0, lineHeight: 1, opacity: 0.4, animation: "glitchLayerR 0.1s infinite", clipPath: "inset(20% 0 50% 0)", pointerEvents: "none", userSelect: "none" }}>{line1}</h1>
              <h1 aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, fontFamily: "'Clash Display','Syne',sans-serif", fontSize: "clamp(52px,10vw,110px)", fontWeight: 700, color: "#3B82F6", letterSpacing: "-3px", margin: 0, lineHeight: 1, opacity: 0.35, animation: "glitchLayerB 0.13s infinite", clipPath: "inset(55% 0 10% 0)", pointerEvents: "none", userSelect: "none" }}>{line1}</h1>
            </>}
          </div>

          {/* Line 2: Sugiyanto — gradient biru-cyan */}
          <div style={{ position: "relative" }}>
            <h1 style={{
              fontFamily: "'Clash Display','Syne',sans-serif",
              fontSize: "clamp(52px,10vw,110px)",
              fontWeight: 700,
              background: "linear-gradient(135deg,#3B82F6,#06B6D4 55%,#38BDF8)",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              color: line2.length > 0 ? "transparent" : "#3B82F6",
              letterSpacing: "-3px", margin: 0, lineHeight: 1,
              backgroundSize: "200%",
              animation: line2Glitch ? "glitchMain 0.12s infinite, gradShiftLoader 3s ease infinite" : line2Done ? "gradShiftLoader 3s ease infinite" : "none",
              textShadow: line2Glitch ? "3px 0 #06B6D4,-3px 0 #3B82F6" : "none",
              minHeight: "1em", minWidth: "4ch",
            }}>
              {line2}{line2.length > 0 && !line2Done && <span style={{ animation: "cursorBlink 0.7s step-end infinite", color: "#06B6D4", WebkitTextFillColor: "#06B6D4" }}>_</span>}
            </h1>
            {line2Glitch && line2.length > 0 && <>
              <h1 aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, fontFamily: "'Clash Display','Syne',sans-serif", fontSize: "clamp(52px,10vw,110px)", fontWeight: 700, color: "#06B6D4", letterSpacing: "-3px", margin: 0, lineHeight: 1, opacity: 0.4, animation: "glitchLayerR 0.1s infinite", clipPath: "inset(20% 0 50% 0)", pointerEvents: "none", userSelect: "none" }}>{line2}</h1>
              <h1 aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, fontFamily: "'Clash Display','Syne',sans-serif", fontSize: "clamp(52px,10vw,110px)", fontWeight: 700, color: "#3B82F6", letterSpacing: "-3px", margin: 0, lineHeight: 1, opacity: 0.35, animation: "glitchLayerB 0.13s infinite", clipPath: "inset(55% 0 10% 0)", pointerEvents: "none", userSelect: "none" }}>{line2}</h1>
            </>}
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 11, letterSpacing: "6px", textTransform: "uppercase",
          fontFamily: "'JetBrains Mono',monospace", color: "#06B6D4",
          opacity: showSub ? 1 : 0, transform: showSub ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>Backend Developer</div>

        {/* Progress */}
        <div style={{ width: 260, opacity: showProgress ? 1 : 0, transition: "opacity 0.4s ease" }}>
          <div style={{ height: 1.5, background: "rgba(59,130,246,0.12)", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
            <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(to right,#1D4ED8,#06B6D4)", width: progress + "%", transition: "width 0.12s ease", boxShadow: "0 0 14px rgba(6,182,212,0.7)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>{progress < 100 ? "> initializing_portfolio..." : "> ready."}</span>
            <span style={{ fontSize: 9.5, color: "var(--muted-2)", fontFamily: "'JetBrains Mono',monospace" }}>{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glitchMain{0%{transform:translate(0)}20%{transform:translate(-2px,1px)}40%{transform:translate(2px,-1px)}60%{transform:translate(-1px,2px)}80%{transform:translate(1px,-1px)}100%{transform:translate(0)}}
        @keyframes glitchLayerR{0%{transform:translate(-4px,0);clip-path:inset(20% 0 50% 0)}50%{transform:translate(4px,0);clip-path:inset(35% 0 35% 0)}100%{transform:translate(-4px,0);clip-path:inset(20% 0 50% 0)}}
        @keyframes glitchLayerB{0%{transform:translate(4px,0);clip-path:inset(55% 0 10% 0)}50%{transform:translate(-4px,0);clip-path:inset(65% 0 5% 0)}100%{transform:translate(4px,0);clip-path:inset(55% 0 10% 0)}}
        @keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes gradShiftLoader{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      `}</style>
    </div>
  );
};

const sections = [
  { id: "hero", label: "Home" }, { id: "about", label: "About" }, { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" }, { id: "certifications", label: "Certifications" },
  { id: "organizations", label: "Organizations" }, { id: "contact", label: "Contact" },
];

const SectionDots = () => {
  const [active, setActive] = useState("hero");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 80);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && window.scrollY >= el.offsetTop - 160) { setActive(sections[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", gap: 9, opacity: show ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: show ? "all" : "none" }}>
      {sections.map(s => {
        const isActive = active === s.id;
        return <button key={s.id} onClick={() => go(s.id)} title={s.label} style={{ width: isActive ? 7 : 5, height: isActive ? 22 : 5, borderRadius: isActive ? 4 : "50%", background: isActive ? "linear-gradient(to bottom,#1D4ED8,#06B6D4)" : "rgba(59,130,246,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s cubic-bezier(.22,1,.36,1)", boxShadow: isActive ? "0 0 10px rgba(29,78,216,0.5)" : "none", outline: "none" }} />;
      })}
    </div>
  );
};

const BackToTop = () => {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => { const onScroll = () => setShow(window.scrollY > 400); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "fixed", bottom: 28, right: 20, zIndex: 50, width: 42, height: 42, borderRadius: 11, background: hovered ? "linear-gradient(135deg,#1D4ED8,#06B6D4)" : "rgba(15,31,56,0.9)", border: `1px solid ${hovered ? "transparent" : "rgba(59,130,246,0.25)"}`, color: hovered ? "#fff" : "var(--white-2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: show ? 1 : 0, transform: show ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)", transition: "all 0.3s cubic-bezier(.22,1,.36,1)", pointerEvents: show ? "all" : "none", boxShadow: hovered ? "0 0 24px rgba(29,78,216,0.4)" : "0 4px 16px rgba(0,0,0,0.3)", backdropFilter: "blur(12px)" }} title="Back to top">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
    </button>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (loading) return;
    const bar = document.getElementById("progress-bar");
    const onScroll = () => { const total = document.body.scrollHeight - window.innerHeight; if (bar && total > 0) bar.style.width = (window.scrollY / total * 100) + "%"; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  return (
    <LangContext.Provider value={lang}>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <GradientMesh />
      <div style={{ background: "transparent", minHeight: "100vh", opacity: loading ? 0 : 1, transition: "opacity 0.5s ease 0.1s", position: "relative", zIndex: 1 }}>
        <div id="progress-bar" style={{ position: "fixed", top: 0, left: 0, height: 3, background: "linear-gradient(to right,#1D4ED8,#06B6D4)", zIndex: 201, width: "0%", transition: "width 0.08s linear", pointerEvents: "none" }} />
        <Navbar lang={lang} setLang={setLang} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Organizations />
        <Contact />
        <SectionDots />
        <BackToTop />
      </div>
    </LangContext.Provider>
  );
}

export default App;
