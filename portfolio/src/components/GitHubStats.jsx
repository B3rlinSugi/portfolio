import { useEffect, useRef, useState } from "react";

const GitHubStats = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { label: "Repositories", value: "6", icon: "📦" },
    { label: "Tech Stack", value: "PHP, Laravel, Java, MySQL", icon: "🛠" },
    { label: "API Projects", value: "3", icon: "🔌" },
  ];

  return (
    <section 
      id="github-activity" 
      ref={ref}
      style={{ 
        background: "var(--navy-2)", 
        borderTop: "1px solid rgba(59,130,246,0.07)",
        padding: "80px 0"
      }}
    >
      <p className="s-label" style={{ opacity: visible ? 1 : 0, transition: "opacity .5s", fontFamily: "'JetBrains Mono',monospace" }}>
        <span style={{ color: "rgba(6,182,212,0.5)" }}>&lt;</span>
        GitHub Stats
        <span style={{ color: "rgba(6,182,212,0.5)" }}> /&gt;</span>
      </p>
      <h2 className="s-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s", marginBottom: 40 }}>
        Open Source Contributions
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* GitHub Stats Card */}
        <div style={{
          background: "rgba(15,31,56,0.5)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 16,
          padding: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.2s"
        }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)", margin: "0 0 20px 0" }}>
            📊 Repository Overview
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>{stat.icon}</span>
                <div>
                  <p style={{ fontSize: 10, color: "var(--muted)", margin: 0, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</p>
                  <p style={{ fontSize: 14, color: "var(--white)", margin: "4px 0 0 0", fontWeight: 600 }}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          <a 
            href="https://github.com/B3rlinSugi" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: "block", 
              marginTop: 20, 
              padding: "10px 16px", 
              background: "rgba(59,130,246,0.1)", 
              border: "1px solid rgba(59,130,246,0.25)", 
              borderRadius: 8, 
              textAlign: "center",
              textDecoration: "none",
              color: "#3B82F6",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Outfit',sans-serif",
              transition: "all 0.2s"
            }}
          >
            View GitHub Profile →
          </a>
        </div>

        {/* Featured Repos */}
        <div style={{
          background: "rgba(15,31,56,0.5)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 16,
          padding: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.3s"
        }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)", margin: "0 0 20px 0" }}>
            ⭐ Featured Projects
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "student-management-api", desc: "Laravel REST API + JWT Auth", lang: "PHP" },
              { name: "tokoku-ecommerce", desc: "Full-stack E-Commerce", lang: "PHP" },
              { name: "portfolio", desc: "React Portfolio Website", lang: "JavaScript" },
            ].map((repo, i) => (
              <a 
                key={i}
                href={`https://github.com/B3rlinSugi/${repo.name}`}
                target="_blank"
                rel="noreferrer"
                style={{ 
                  display: "block",
                  padding: 12,
                  background: "rgba(6,14,30,0.5)",
                  border: "1px solid rgba(59,130,246,0.1)",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "all 0.2s"
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--white)", margin: "0 0 4px 0" }}>{repo.name}</p>
                <p style={{ fontSize: 11, color: "var(--muted)", margin: 0 }}>{repo.desc}</p>
                <span style={{ 
                  display: "inline-block",
                  marginTop: 8,
                  fontSize: 10, 
                  color: "#06B6D4", 
                  fontFamily: "'JetBrains Mono',monospace",
                  background: "rgba(6,182,212,0.1)",
                  padding: "2px 8px",
                  borderRadius: 4
                }}>{repo.lang}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Tech Stack Summary */}
        <div style={{
          background: "rgba(15,31,56,0.5)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 16,
          padding: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.4s"
        }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)", margin: "0 0 20px 0" }}>
            🏗️ Backend Focus
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["PHP", "Laravel", "Java", "Spring Boot", "MySQL", "PostgreSQL", "REST API", "JWT", "RBAC", "bcrypt"].map((tech, i) => (
              <span 
                key={i}
                style={{ 
                  fontSize: 11, 
                  fontWeight: 600,
                  color: i < 4 ? "#3B82F6" : "#06B6D4",
                  background: i < 4 ? "rgba(59,130,246,0.1)" : "rgba(6,182,212,0.1)",
                  border: `1px solid ${i < 4 ? "rgba(59,130,246,0.2)" : "rgba(6,182,212,0.2)"}`,
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontFamily: "'JetBrains Mono',monospace"
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
