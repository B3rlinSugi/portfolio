import { useState, useEffect } from "react";

const links = ["about","skills","projects","certifications","organizations","contact"];

const Navbar = () => {
  const [active, setActive]   = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        {/* Logo */}
        <button onClick={() => go("hero")} style={{
          background:"none", border:"none", cursor:"pointer", padding:0,
          display:"flex", alignItems:"center", gap:10,
        }}>
          <div style={{
            width:34, height:34, borderRadius:9,
            background:"linear-gradient(135deg,#1D4ED8,#06B6D4)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 0 16px rgba(29,78,216,0.4)",
          }}>
            <span style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontWeight:700, fontSize:13, color:"#fff",
            }}>BS</span>
          </div>
          <div style={{ lineHeight:1.2 }}>
            <div style={{
              fontFamily:"'Bricolage Grotesque',sans-serif",
              fontWeight:700, fontSize:14, color:"#F0F6FF", letterSpacing:"-0.3px",
            }}>Berlin Sugiyanto</div>
            <div style={{
              fontSize:10, color:"#6B84A8",
              fontFamily:"'JetBrains Mono',monospace",
            }}>backend developer</div>
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="nav-links" style={{display:"flex",gap:2,listStyle:"none",margin:0,padding:0}}>
          {links.map(link => (
            <li key={link}>
              <a href={"#"+link} onClick={e=>{e.preventDefault();go(link);}}
                style={{
                  display:"block", padding:"6px 14px", borderRadius:7,
                  color: active===link ? "#fff" : "#6B84A8",
                  fontSize:11.5, fontWeight:500, letterSpacing:"0.6px",
                  textTransform:"uppercase", textDecoration:"none",
                  background: active===link ? "rgba(29,78,216,0.18)" : "transparent",
                  border: active===link ? "1px solid rgba(59,130,246,0.25)" : "1px solid transparent",
                  fontFamily:"'JetBrains Mono',monospace",
                  transition:"all 0.2s",
                }}
                onMouseEnter={e=>{ if(active!==link) e.currentTarget.style.color="#C8D8F0"; }}
                onMouseLeave={e=>{ if(active!==link) e.currentTarget.style.color="#6B84A8"; }}
              >{link}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
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

      {/* Mobile menu */}
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
