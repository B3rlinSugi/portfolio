import { useState, useEffect, useRef } from "react";

const links = {
  en: [
    { id: "about",         label: "About",         icon: "👤" },
    { id: "skills",        label: "Skills",         icon: "⚡" },
    { id: "projects",      label: "Projects",       icon: "🚀" },
    { id: "certifications",label: "Certifications", icon: "🏅" },
    { id: "organizations", label: "Organizations",  icon: "🏛️" },
    { id: "contact",       label: "Contact",        icon: "✉️" },
  ],
  id: [
    { id: "about",         label: "Tentang",        icon: "👤" },
    { id: "skills",        label: "Keahlian",       icon: "⚡" },
    { id: "projects",      label: "Proyek",         icon: "🚀" },
    { id: "certifications",label: "Sertifikasi",    icon: "🏅" },
    { id: "organizations", label: "Organisasi",     icon: "🏛️" },
    { id: "contact",       label: "Kontak",         icon: "✉️" },
  ],
};

const socialLinks = [
  { href: "https://github.com/B3rlinSugi",            title: "GitHub",    color: "#C8D8F0", glow: "200,216,240",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
  { href: "https://linkedin.com/in/berlinsugi",       title: "LinkedIn",  color: "#0A66C2", glow: "10,102,194",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { href: "mailto:berlinsugiyanto23@gmail.com",       title: "Email",     color: "#EA4335", glow: "234,67,53",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/></svg> },
  { href: "https://wa.me/6281294500613",              title: "WhatsApp",  color: "#25D366", glow: "37,211,102",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
];

/* Typewriter hook */
function useTypewriter(text, speed = 80, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++; setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text]);
  return { displayed, done };
}

const SocialIcon = ({ s }) => {
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    setHovered(true);
    timerRef.current = setTimeout(() => setShowTooltip(true), 100);
  };
  const handleLeave = () => {
    setHovered(false);
    clearTimeout(timerRef.current);
    setShowTooltip(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <a href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
        onMouseEnter={handleEnter} onMouseLeave={handleLeave}
        style={{
          width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: 8, color: hovered ? s.color : "rgba(200,216,240,0.4)", textDecoration: "none",
          background: hovered ? `rgba(${s.glow},0.12)` : "transparent",
          border: `1px solid ${hovered ? `rgba(${s.glow},0.35)` : "transparent"}`,
          transform: hovered ? "translateY(-3px) scale(1.15)" : "translateY(0) scale(1)",
          transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
          boxShadow: hovered ? `0 4px 16px rgba(${s.glow},0.4), 0 0 0 1px rgba(${s.glow},0.15)` : "none",
        }}
      >{s.icon}</a>
      {/* Tooltip */}
      <div style={{
        position: "absolute", bottom: -32, left: "50%", transform: "translateX(-50%)",
        background: "rgba(10,20,38,0.95)", border: "1px solid rgba(59,130,246,0.2)",
        borderRadius: 6, padding: "3px 8px", fontSize: 10, color: s.color,
        fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap",
        opacity: showTooltip ? 1 : 0, transform: showTooltip ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-4px)",
        transition: "all 0.2s ease", pointerEvents: "none", zIndex: 300,
        boxShadow: `0 4px 12px rgba(${s.glow},0.2)`,
      }}>{s.title}</div>
    </div>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [lang, setLang] = useState("en");
  const [darkMode, setDarkMode] = useState(true);
  const { displayed, done } = useTypewriter("Berlin Sugiyanto", 75, 800);

  const currentLinks = links[lang];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const all = ["hero", ...currentLinks.map(l => l.id)];
      for (let i = all.length - 1; i >= 0; i--) {
        const el = document.getElementById(all[i]);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(all[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lang]);

  // Dark/light mode toggle
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 60, padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        background: scrolled ? "rgba(6,14,30,0.96)" : "rgba(6,14,30,0.5)",
        borderBottom: scrolled ? "1px solid rgba(59,130,246,0.14)" : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>

        {/* ── Logo: Typewriter name ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <button onClick={() => go("hero")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 0 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 400, fontSize: 14, color: "rgba(6,182,212,0.6)" }}>&lt;</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, color: "#F0F6FF", letterSpacing: "-0.3px", minWidth: 130 }}>
              {displayed}
              {!done && <span style={{ animation: "navCursorBlink 0.8s step-end infinite", color: "#06B6D4" }}>|</span>}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 400, fontSize: 14, color: "rgba(6,182,212,0.6)", marginLeft: 1, opacity: done ? 1 : 0, transition: "opacity 0.3s" }}> /&gt;</span>
          </button>

          <div style={{ width: 1, height: 16, background: "rgba(59,130,246,0.25)", margin: "0 12px" }} />

          {/* Social icons with glow + tooltip */}
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {socialLinks.map(s => <SocialIcon key={s.title} s={s} />)}
          </div>
        </div>

        {/* ── Desktop nav ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ul className="nav-links" style={{ display: "flex", gap: 2, listStyle: "none", margin: 0, padding: 0 }}>
            {currentLinks.map(link => {
              const isActive = active === link.id;
              const isHovered = hoveredLink === link.id;
              return (
                <li key={link.id}>
                  <a href={"#" + link.id}
                    onClick={e => { e.preventDefault(); go(link.id); }}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "6px 12px", borderRadius: 7,
                      color: isActive ? "#fff" : isHovered ? "#C8D8F0" : "#6B84A8",
                      fontSize: 11, fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.6px", textTransform: "uppercase",
                      textDecoration: "none",
                      background: isActive ? "rgba(29,78,216,0.18)" : isHovered ? "rgba(59,130,246,0.06)" : "transparent",
                      border: isActive ? "1px solid rgba(59,130,246,0.25)" : "1px solid transparent",
                      fontFamily: "'JetBrains Mono',monospace",
                      transition: "all 0.22s ease",
                      transform: isHovered ? "translateY(-1px)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 12, opacity: isActive || isHovered ? 1 : 0.5, transition: "all 0.2s", transform: isHovered ? "scale(1.2)" : "scale(1)" }}>{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div style={{ width: 1, height: 16, background: "rgba(59,130,246,0.2)", margin: "0 6px" }} />

          {/* Language toggle */}
          <button onClick={() => setLang(l => l === "en" ? "id" : "en")}
            title={lang === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
            style={{
              display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 7,
              background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
              color: "#06B6D4", fontSize: 10.5, fontWeight: 700,
              fontFamily: "'JetBrains Mono',monospace", cursor: "pointer",
              transition: "all 0.2s ease", letterSpacing: "0.5px",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.15)"; e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.08)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <span style={{ fontSize: 13 }}>{lang === "en" ? "🇬🇧" : "🇮🇩"}</span>
            {lang === "en" ? "EN" : "ID"}
          </button>

          {/* Dark/Light toggle */}
          <button onClick={() => setDarkMode(d => !d)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(59,130,246,0.2)",
              background: "rgba(59,130,246,0.08)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
              transform: "scale(1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.15)"; e.currentTarget.style.transform = "scale(1.1) rotate(15deg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.08)"; e.currentTarget.style.transform = "scale(1) rotate(0)"; }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* ── Hamburger ── */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 6 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: 22, height: 2, background: "#C8D8F0", display: "block", borderRadius: 2, transition: "all 0.3s", transform: menuOpen && i === 0 ? "rotate(45deg) translateY(7px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-7px)" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 199, background: "rgba(6,14,30,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(59,130,246,0.12)", maxHeight: menuOpen ? "420px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div style={{ padding: "12px 28px 20px" }}>
          {currentLinks.map(link => (
            <a key={link.id} href={"#" + link.id} onClick={e => { e.preventDefault(); go(link.id); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", color: active === link.id ? "#3B82F6" : "#6B84A8", fontSize: 13, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", borderBottom: "1px solid rgba(59,130,246,0.07)" }}
            >
              <span>{link.icon}</span>{link.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 12, paddingTop: 16, alignItems: "center" }}>
            {socialLinks.map(s => (
              <a key={s.title} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
                style={{ color: "rgba(200,216,240,0.5)", textDecoration: "none" }}>{s.icon}</a>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button onClick={() => setLang(l => l === "en" ? "id" : "en")} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 6, color: "#06B6D4", fontSize: 10, padding: "4px 8px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}>{lang === "en" ? "🇬🇧 EN" : "🇮🇩 ID"}</button>
              <button onClick={() => setDarkMode(d => !d)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 6, fontSize: 14, padding: "4px 8px", cursor: "pointer" }}>{darkMode ? "☀️" : "🌙"}</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes navCursorBlink{0%,100%{opacity:1}50%{opacity:0}}
        @media(max-width:900px){.nav-links{display:none !important;} .nav-hamburger{display:flex !important;} nav{padding:0 20px !important;}}
      `}</style>
    </>
  );
};

export default Navbar;
