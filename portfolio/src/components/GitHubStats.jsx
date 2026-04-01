import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const GitHubStats = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState([
    { label: "Repositories", value: "6", icon: "📦" },
    { label: "API Projects", value: "3", icon: "🔌" },
    { label: "PRs Merged", value: "27", icon: "✅" },
    { label: "Top Languages", value: "PHP, Java", icon: "👨‍💻" },
    { label: "Pipeline Success", value: "95%", icon: "🚀" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [healthStatus, setHealthStatus] = useState("Checking...");

  useEffect(() => {
    const fetchGithubMetrics = async () => {
      try {
        const userResp = await fetch("https://api.github.com/users/B3rlinSugi");
        const repoResp = await fetch("https://api.github.com/users/B3rlinSugi/repos?per_page=100&sort=updated");
        const eventResp = await fetch("https://api.github.com/users/B3rlinSugi/events/public?per_page=100");

        if (!userResp.ok || !repoResp.ok || !eventResp.ok) throw new Error("GitHub rate limit? or API error");

        const userData = await userResp.json();
        const repos = await repoResp.json();
        const events = await eventResp.json();

        const apiProjects = repos.filter(repo => /api/i.test(repo.name) || /backend/i.test(repo.name)).length;
        const topLangs = Array.from(new Set(repos
          .flatMap(repo => repo.language ? [repo.language] : [])
          .filter(Boolean)
          .slice(0, 4))).join(", ") || "PHP, Java";

        const mergedPRs = events.reduce((acc, e) => {
          if (e.type === "PullRequestEvent" && e.payload.action === "closed" && e.payload.pull_request.merged) return acc + 1;
          return acc;
        }, 0);

        setStats([
          { label: "Repositories", value: userData.public_repos?.toString() || "6", icon: "📦" },
          { label: "API Projects", value: apiProjects.toString(), icon: "🔌" },
          { label: "Merged PRs (recent)", value: mergedPRs.toString(), icon: "✅" },
          { label: "Top Languages", value: topLangs, icon: "👨‍💻" },
          { label: "Followers", value: (userData.followers || 0).toString(), icon: "🌟" },
        ]);
      } catch {
        console.warn("Failed to fetch GitHub metrics.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubMetrics();

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const healthUrl = "https://httpstat.us/200?sleep=100";
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 3500));
    const checkHealth = async () => {
      try {
        const response = await Promise.race([fetch(healthUrl), timeout]);
        if (response && response.ok) {
          setHealthStatus("Healthy");
        } else if (response && response.status) {
          setHealthStatus(`Unhealthy (${response.status})`);
        } else {
          setHealthStatus("Unreachable");
        }
      } catch {
        setHealthStatus("Unreachable");
      }
    };
    checkHealth();
  }, []);

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
            {isLoading ? (
              <div style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, textAlign: "center", padding: "14px 0" }}>Fetching latest GitHub metrics...</div>
            ) : stats.length === 0 ? (
              <div style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, textAlign: "center", padding: "14px 0" }}>No metrics available right now.</div>
            ) : stats.map((stat, i) => (
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

        {/* Health Check Card */}
        <div style={{
          background: "rgba(15,31,56,0.5)",
          border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: 16,
          padding: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.25s"
        }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)", margin: "0 0 10px 0" }}>
            🩺 API Health Check
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
            current health state:
          </p>
          <p style={{ margin: "6px 0 0 0", fontSize: 17, fontWeight: 700, color: healthStatus === "Healthy" ? "#22C55E" : healthStatus.startsWith("Unhealthy") ? "#F59E0B" : "#EF4444", fontFamily: "'Outfit',sans-serif" }}>
            {healthStatus}
          </p>
          <div style={{ marginTop: 12, fontSize: 10, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
            Terhubung ke endpoint: https://httpstat.us/200?sleep=100
          </div>
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

        {/* Backend Reliability Highlights */}
        <div style={{
          background: "rgba(15,31,56,0.5)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 16,
          padding: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.5s"
        }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)", margin: "0 0 20px 0" }}>
            🛡️ Backend Reliability
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {data.backendHighlights.map((item, i) => (
              <div key={i} style={{ padding: "9px 12px", borderRadius: 8, background: "rgba(6,14,30,0.7)", border: "1px solid rgba(59,130,246,0.1)", minWidth: 150 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13.5, color: "var(--white)", fontWeight: 700, fontFamily: "'Outfit',sans-serif" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring Chart */}
        <div style={{
          background: "rgba(15,31,56,0.5)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 16,
          padding: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.55s"
        }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)", margin: "0 0 15px 0" }}>
            📈 Monitoring Dashboard
          </h3>
          {data.monitoring && data.monitoring.serviceMetrics?.length > 0 ? (
            <div style={{ display: "grid", gap: 10 }}>
              {data.monitoring.serviceMetrics.map((metric, i) => {
                const score = metric.unit === "%" ? Math.min(100, metric.value) : Math.min(100, (metric.value / metric.target) * 100);
                const progressWidth = `${Math.round(score)}%`;
                const isWarning = metric.unit === "%" ? metric.value > metric.target : metric.value > metric.target;
                return (
                  <div key={i} style={{ display: "grid", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
                      <span>{metric.metric}</span>
                      <span>{metric.value}{metric.unit} / {metric.target}{metric.unit}</span>
                    </div>
                    <div style={{ width: "100%", height: 8, borderRadius: 999, background: "rgba(59,130,246,0.15)" }}>
                      <div style={{ width: progressWidth, height: "100%", borderRadius: 999, background: isWarning ? "#F59E0B" : "#22C55E", transition: "width 0.4s ease" }} />
                    </div>
                  </div>
                );
              })}
              <small style={{ color: "var(--muted)", fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>{data.monitoring.chartNotes}</small>
            </div>
          ) : (
            <p style={{ color: "var(--muted)", fontSize: 13, fontFamily: "'JetBrains Mono',monospace" }}>No monitoring data available</p>
          )}
        </div>

        {/* Runbook */}
        <div style={{
          background: "rgba(15,31,56,0.5)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 16,
          padding: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.6s"
        }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)", margin: "0 0 15px 0" }}>
            🛠️ Runbook & Incident Playbook
          </h3>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>Incident Response</div>
              <ol style={{ margin: 0, paddingLeft: 18, color: "var(--white-2)", fontSize: 13, fontFamily: "'JetBrains Mono',monospace" }}>
                {data.runbook?.incidentResponse?.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>Maintenance Cadence</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--white-2)", fontSize: 13, fontFamily: "'JetBrains Mono',monospace" }}>
                {data.runbook?.maintenance?.map((entry, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{entry}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
