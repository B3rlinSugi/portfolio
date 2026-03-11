import { useState, useEffect } from "react";

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
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

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      padding:"0 48px", height:62,
      display:"flex", justifyContent:"space-between", alignItems:"center",
      backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      background: scrolled ? "rgba(28,27,46,0.96)" : "rgba(28,27,46,0.5)",
      borderBottom: scrolled ? "1px solid rgba(147,51,234,0.15)" : "1px solid transparent",
      transition:"all 0.3s ease",
    }}>
      <button onClick={() => scrollTo("hero")} style={{
        background:"none", border:"none", cursor:"pointer", padding:0,
        fontFamily:"'Inter',sans-serif", fontWeight:800, fontSize:20,
        background:"linear-gradient(135deg,#C084FC,#EC4899)",
        WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent",
        letterSpacing:"-0.5px",
      }}>
        BS<span style={{opacity:0.3,color:"#C084FC",WebkitTextFillColor:"rgba(192,132,252,0.3)"}}>.</span>
      </button>

      <ul className="nav-links" style={{display:"flex",gap:28,listStyle:"none"}}>
        {links.map((link) => (
          <li key={link}>
            <a href={"#"+link} onClick={(e)=>{e.preventDefault();scrollTo(link);}}
              style={{
                color: active===link ? "#C084FC" : "#4A4870",
                fontSize:11, fontWeight: active===link ? 600 : 500,
                letterSpacing:"1.8px", textTransform:"uppercase",
                textDecoration:"none", transition:"color 0.2s",
                position:"relative", paddingBottom:3,
              }}
              onMouseEnter={(e)=>{ if(active!==link) e.currentTarget.style.color="#8B87A8"; }}
              onMouseLeave={(e)=>{ if(active!==link) e.currentTarget.style.color="#4A4870"; }}
            >
              {link}
              {active===link && (
                <span style={{
                  position:"absolute", bottom:-2, left:0, right:0, height:1,
                  background:"linear-gradient(to right,#9333EA,#EC4899,transparent)",
                  borderRadius:1,
                }}/>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
