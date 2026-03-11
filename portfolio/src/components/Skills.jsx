import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const SkillCard = ({ item, delay, started }) => {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        rx: (y - 0.5) * -22,
        ry: (x - 0.5) * 22,
        gx: Math.round(x * 100),
        gy: Math.round(y * 100),
      });
    });
  };

  const onMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    setHovered(false);
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        perspective: "600px",
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <div style={{
        background: hovered
          ? `radial-gradient(ellipse at ${tilt.gx}% ${tilt.gy}%, rgba(147,51,234,0.18) 0%, rgba(236,72,153,0.07) 60%, #242336 100%)`
          : "#242336",
        border: `1px solid ${hovered ? "rgba(147,51,234,0.55)" : "rgba(147,51,234,0.12)"}`,
        borderRadius: 12, padding: "14px 16px",
        cursor: "default", position: "relative", overflow: "hidden",
        transform: hovered
          ? `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.04) translateZ(8px)`
          : "perspective(600px) rotateX(0) rotateY(0) scale(1) translateZ(0)",
        transition: hovered
          ? "transform 0.08s linear, border-color 0.2s, background 0.2s, box-shadow 0.2s"
          : "transform 0.45s cubic-bezier(.22,1,.36,1), border-color 0.3s, background 0.4s, box-shadow 0.3s",
        boxShadow: hovered
          ? `0 16px 40px rgba(147,51,234,0.22), 0 0 0 1px rgba(147,51,234,0.15), inset 0 1px 0 rgba(255,255,255,0.06)`
          : "none",
        willChange: "transform",
      }}>
        {/* Shine layer that follows cursor */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 12, pointerEvents: "none",
          background: hovered
            ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            : "transparent",
          transition: "background 0.1s",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: hovered ? "rgba(147,51,234,0.22)" : "rgba(147,51,234,0.08)",
            border: `1px solid ${hovered ? "rgba(147,51,234,0.5)" : "rgba(147,51,234,0.14)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transform: hovered ? `rotateZ(${tilt.ry * 0.4}deg) scale(1.15)` : "none",
            transition: hovered ? "transform 0.08s linear" : "transform 0.45s cubic-bezier(.22,1,.36,1)",
            boxShadow: hovered ? "0 4px 14px rgba(147,51,234,0.3)" : "none",
          }}>
            <img src={item.icon} alt={item.name}
              style={{ width: 20, height: 20, objectFit: "contain" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
            />
            <span style={{ display: "none", fontSize: 12, color: "#9333EA", fontWeight: 700 }}>{item.name[0]}</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: hovered ? "#F8F7FF" : "#D8D4F0", lineHeight: 1.2, transition: "color 0.2s" }}>{item.name}</div>
            <div style={{ fontSize: 11, color: hovered ? "#A855F7" : "#5B4D8A", transition: "color 0.2s" }}>{item.level}%</div>
          </div>
        </div>

        <div style={{ height: 3, background: "rgba(147,51,234,0.1)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 4,
            background: "linear-gradient(to right,#9333EA,#EC4899)",
            width: started ? item.level + "%" : "0%",
            transition: `width 1.4s cubic-bezier(.22,1,.36,1) ${delay + 100}ms`,
            boxShadow: started && item.level > 0 ? "0 0 8px rgba(147,51,234,0.5)" : "none",
          }} />
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const [started,setStarted] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);obs.disconnect();}},{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <section id="skills" ref={ref} className="fade-in">
      <p className="section-label">Technical Skills</p>
      <h2 className="section-title">What I work with</h2>
      <div style={{display:"flex",flexDirection:"column",gap:32}}>
        {data.skills.map((cat,ci)=>(
          <div key={cat.category}>
            <div style={{
              display:"flex",alignItems:"center",gap:12,marginBottom:14,
              opacity:started?1:0,transition:`opacity 0.4s ease ${ci*80}ms`,
            }}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"linear-gradient(135deg,#9333EA,#EC4899)"}}/>
              <span style={{
                fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,
                letterSpacing:"2.5px",textTransform:"uppercase",color:"#5B4D8A",
              }}>{cat.category}</span>
              <div style={{flex:1,height:1,background:"rgba(147,51,234,0.08)"}}/>
            </div>
            <div className="skills-grid" style={{
              display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,
            }}>
              {cat.items.map((item,ii)=>(
                <SkillCard key={item.name} item={item} started={started} delay={ci*60+ii*70+80}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
