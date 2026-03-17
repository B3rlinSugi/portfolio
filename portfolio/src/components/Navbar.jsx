import { useState, useEffect } from "react";

const links = ["about","skills","projects","certifications","organizations","contact"];

/* 3D flip per huruf */
const FlipWord = ({ word, isActive }) => {
  return (
    <span style={{ display:"inline-flex", gap:0 }}>
      {word.split("").map((char, i) => (
        <span key={i} className={`flip-char ${isActive ? "flip-active" : ""}`}
          style={{
            display:"inline-block",
            animationDelay: isActive ? `${i * 40}ms` : "0ms",
          }}
        >{char}</span>
      ))}
    </span>
  );
};

const Navbar = () => {
  const [active, setActive]   = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const all = ["hero", ...links];
      for (let i = all.length - 1; i >= 0; i--) {
        const el = document.getElementById(all[i]);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(all[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        height:60, padding:"0 48px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        background: scrolled ? "rgba(6,14,30,0.95)" : "rgba(6,14,30,0.5)",
        borderBottom: scrolled ? "1px solid rgba(59,130,246,0.14)" : "1px solid transparent",
        transition:"all 0.35s ease",
      }}>
        {/* ── Wordmark Logo ── */}
        <button onClick={() => go("hero")} style={{
          background:"none", border:"none", cursor:"pointer", padding:0,
          display:"flex", alignItems:"center", gap:0,
        }}>
          <span style={{
            fontFamily:"'Outfit', sans-serif",
            fontWeight:300,
            fontSize:22,
            color:"#F0F6FF",
            letterSpacing:"-0.5px",
          }}>berlin</span>
          <span style={{
            fontFamily:"'JetBrains Mono', monospace",
            fontWeight:700,
            fontSize:26,
            color:"#06B6D4",
            lineHeight:1,
            marginBottom:-3,
            textShadow:"0 0 18px rgba(6,182,212,0.7), 0 0 40px rgba(6,182,212,0.3)",
            animation:"dotPulse 3s ease-in-out infinite",
          }}>.</span>
        </button>

        {/* ── Desktop nav ── */}
        <ul className="nav-links" style={{display:"flex",gap:4,listStyle:"none",margin:0,padding:0}}>
          {links.map(link => {
            const isActive = active === link;
            const isHovered = hoveredLink === link;
            return (
              <li key={link}>
                <a href={"#"+link}
                  onClick={e=>{e.preventDefault();go(link);}}
                  onMouseEnter={()=>setHoveredLink(link)}
                  onMouseLeave={()=>setHoveredLink(null)}
                  style={{
                    display:"block",
                    padding:"6px 14px",
                    borderRadius:7,
                    color: isActive ? "#fff" : isHovered ? "#C8D8F0" : "#6B84A8",
                    fontSize:11.5,
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: isHovered ? "1.5px" : "0.6px",
                    textTransform:"uppercase",
                    textDecoration:"none",
                    background: isActive ? "rgba(29,78,216,0.18)" : "transparent",
                    border: isActive ? "1px solid rgba(59,130,246,0.25)" : "1px solid transparent",
                    fontFamily:"'JetBrains Mono',monospace",
                    transition:"all 0.25s ease",
                    perspective:"400px",
                    transformStyle:"preserve-3d",
                  }}
                >
                  <FlipWord word={link} isActive={isActive || isHovered} />
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Hamburger ── */}
        <button className="nav-hamburger" onClick={()=>setMenuOpen(!menuOpen)} style={{
          display:"none", background:"none", border:"none", cursor:"pointer",
          flexDirection:"column", gap:5, padding:6,
        }}>
          {[0,1,2].map(i=>(
            <span key={i} style={{
              width:22, height:2, background:"#C8D8F0", display:"block", borderRadius:2,
              transition:"all 0.3s",
              transform: menuOpen && i===0 ? "rotate(45deg) translateY(7px)"
                       : menuOpen && i===2 ? "rotate(-45deg) translateY(-7px)" : "none",
              opacity: menuOpen && i===1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div style={{
        position:"fixed", top:60, left:0, right:0, zIndex:199,
        background:"rgba(6,14,30,0.98)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(59,130,246,0.12)",
        maxHeight: menuOpen ? "360px" : "0",
        overflow:"hidden", transition:"max-height 0.35s ease",
      }}>
        <div style={{padding:"12px 28px 20px"}}>
          {links.map(link=>(
            <a key={link} href={"#"+link} onClick={e=>{e.preventDefault();go(link);}}
              style={{
                display:"block", padding:"12px 0",
                color: active===link ? "#3B82F6" : "#6B84A8",
                fontSize:13, fontWeight:500, letterSpacing:"1px",
                textTransform:"uppercase", textDecoration:"none",
                fontFamily:"'JetBrains Mono',monospace",
                borderBottom:"1px solid rgba(59,130,246,0.07)",
              }}
            >{link}</a>
          ))}
        </div>
      </div>

      <style>{`
        /* Dot pulse */
        @keyframes dotPulse {
          0%,100% { text-shadow: 0 0 18px rgba(6,182,212,0.7), 0 0 40px rgba(6,182,212,0.3); }
          50% { text-shadow: 0 0 28px rgba(6,182,212,1), 0 0 60px rgba(6,182,212,0.5); }
        }

        /* 3D flip per huruf */
        .flip-char {
          display: inline-block;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), color 0.2s;
          transform-origin: bottom center;
          transform-style: preserve-3d;
        }
        .flip-active .flip-char,
        .flip-char.flip-active {
          animation: letterFlip 0.45s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes letterFlip {
          0%   { transform: rotateX(0deg) translateY(0px); }
          40%  { transform: rotateX(-90deg) translateY(-4px); opacity: 0.3; }
          60%  { transform: rotateX(20deg) translateY(1px); opacity: 0.8; }
          100% { transform: rotateX(0deg) translateY(0px); opacity: 1; }
        }

        @media (max-width:768px){
          .nav-links{ display:none !important; }
          .nav-hamburger{ display:flex !important; }
          nav{ padding:0 20px !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
