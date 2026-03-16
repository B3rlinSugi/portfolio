import { useState, useEffect } from "react";

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["about","skills","projects","certifications","organizations","contact"];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["hero",...links];
      for (let i = sections.length-1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        padding:"0 48px", height:58,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        background: scrolled ? "rgba(250,250,252,0.97)" : "rgba(250,250,252,0.8)",
        borderBottom: scrolled ? "1px solid #E2E4EA" : "1px solid transparent",
        transition:"all 0.3s ease",
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} style={{
          background:"none", border:"none", cursor:"pointer", padding:0,
          display:"flex", alignItems:"center", gap:10,
        }}>
          <div style={{
            width:32, height:32, borderRadius:8,
            background:"#0F172A",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <span style={{
              fontFamily:"'JetBrains Mono','Fira Code',monospace",
              fontWeight:700, fontSize:13, color:"#F8FAFC",
              letterSpacing:"-0.5px",
            }}>BS</span>
          </div>
          <div style={{ lineHeight:1 }}>
            <div style={{
              fontFamily:"'JetBrains Mono','Fira Code',monospace",
              fontWeight:700, fontSize:13, color:"#0F172A", letterSpacing:"-0.3px",
            }}>berlin.sugiyanto</div>
            <div style={{ fontSize:10, color:"#64748B", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"0.3px" }}>backend dev</div>
          </div>
        </button>

        {/* Desktop Links */}
        <ul className="nav-links" style={{display:"flex",gap:2,listStyle:"none",margin:0,padding:0}}>
          {links.map((link) => (
            <li key={link}>
              <a href={"#"+link} onClick={(e)=>{e.preventDefault();scrollTo(link);}}
                style={{
                  color: active===link ? "#0F172A" : "#94A3B8",
                  fontSize:11.5, fontWeight:500,
                  letterSpacing:"0.8px", textTransform:"uppercase",
                  textDecoration:"none", transition:"color 0.2s",
                  padding:"6px 12px", borderRadius:6,
                  background: active===link ? "#F1F5F9" : "transparent",
                  display:"block",
                  fontFamily:"'JetBrains Mono',monospace",
                }}
                onMouseEnter={(e)=>{ if(active!==link) e.currentTarget.style.color="#475569"; }}
                onMouseLeave={(e)=>{ if(active!==link) e.currentTarget.style.color="#94A3B8"; }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={()=>setMenuOpen(!menuOpen)} style={{
          display:"none", background:"none", border:"none", cursor:"pointer",
          padding:6, flexDirection:"column", gap:5, alignItems:"center", justifyContent:"center",
        }}>
          <span style={{width:22,height:2,background:"#0F172A",display:"block",borderRadius:2,transition:"all 0.3s",transform:menuOpen?"rotate(45deg) translateY(7px)":"none"}}/>
          <span style={{width:22,height:2,background:"#0F172A",display:"block",borderRadius:2,transition:"all 0.3s",opacity:menuOpen?0:1}}/>
          <span style={{width:22,height:2,background:"#0F172A",display:"block",borderRadius:2,transition:"all 0.3s",transform:menuOpen?"rotate(-45deg) translateY(-7px)":"none"}}/>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" style={{
        position:"fixed", top:58, left:0, right:0, zIndex:99,
        background:"rgba(250,250,252,0.98)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid #E2E4EA",
        padding: menuOpen ? "16px 24px 20px" : "0 24px",
        maxHeight: menuOpen ? "400px" : "0",
        overflow:"hidden",
        transition:"all 0.3s ease",
      }}>
        {links.map((link) => (
          <a key={link} href={"#"+link} onClick={(e)=>{e.preventDefault();scrollTo(link);}}
            style={{
              display:"block", padding:"10px 0",
              color: active===link ? "#0F172A" : "#64748B",
              fontSize:13, fontWeight:500,
              letterSpacing:"0.8px", textTransform:"uppercase",
              textDecoration:"none", fontFamily:"'JetBrains Mono',monospace",
              borderBottom:"1px solid #F1F5F9",
            }}
          >{link}</a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
