import { useEffect, useRef, useState } from "react";

const GITHUB_USERNAME = "B3rlinSugi";

/* ── Fetch repos from GitHub public API ── */
async function fetchGitHubData() {
  const [reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`),
  ]);
  const repos = await reposRes.json();
  const events = await eventsRes.json();
  return { repos: Array.isArray(repos) ? repos : [], events: Array.isArray(events) ? events : [] };
}

/* ── Build 52-week contribution grid from events ── */
function buildContribGrid(events) {
  const counts = {};
  events.forEach(e => {
    const d = e.created_at?.slice(0, 10);
    if (d) counts[d] = (counts[d] || 0) + 1;
  });
  // Build last 16 weeks of days
  const weeks = [];
  const today = new Date();
  for (let w = 15; w >= 0; w--) {
    const week = [];
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + d));
      const key = date.toISOString().slice(0, 10);
      week.push({ date: key, count: counts[key] || 0 });
    }
    weeks.push(week);
  }
  return weeks;
}

function getColor(count) {
  if (count === 0) return "rgba(59,130,246,0.06)";
  if (count === 1) return "rgba(29,78,216,0.3)";
  if (count <= 3) return "rgba(29,78,216,0.55)";
  if (count <= 6) return "rgba(6,182,212,0.7)";
  return "#06B6D4";
}

const langColors = {
  PHP: "#4f5d95", JavaScript: "#f1e05a", Java: "#b07219", Python: "#3572A5",
  HTML: "#e34c26", CSS: "#563d7c", Vue: "#41b883", TypeScript: "#3178c6",
};

const StatBadge = ({ label, value, color }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "12px 20px", borderRadius: 12,
    background: `${color}08`, border: `1px solid ${color}25`,
    minWidth: 80,
  }}>
    <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 22, color, lineHeight: 1, letterSpacing: "-1px" }}>{value}</span>
    <span style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", marginTop: 4, letterSpacing: "0.5px" }}>{label}</span>
  </div>
);

const RepoCard = ({ repo, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const lang = repo.language || "Other";
  const langColor = langColors[lang] || "#6B84A8";

  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", textDecoration: "none",
        padding: "14px 16px", borderRadius: 12,
        background: hovered ? "rgba(29,78,216,0.1)" : "rgba(15,31,56,0.5)",
        border: `1px solid ${hovered ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.1)"}`,
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        transform: visible ? `translateY(0) scale(1)` : "translateY(16px) scale(0.96)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 80}ms`,
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#06B6D4" : "#6B84A8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s", flexShrink: 0 }}>
            <path d="M3 3h18v18H3z"/><path d="M9 9h6m-6 4h6m-6 4h4"/>
          </svg>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: hovered ? "#fff" : "var(--white-2)", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s" }}>{repo.name}</span>
        </div>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#06B6D4" : "rgba(107,132,168,0.4)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "all 0.2s", transform: hovered ? "translate(2px,-2px)" : "none", flexShrink: 0 }}>
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      </div>
      {repo.description && (
        <p style={{ fontSize: 11.5, color: "#6B84A8", fontFamily: "'Outfit',sans-serif", lineHeight: 1.5, margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{repo.description}</p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {repo.language && (
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: langColor, flexShrink: 0 }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
            ⭐ {repo.stargazers_count}
          </span>
        )}
        <span style={{ fontSize: 10, color: "var(--muted-2)", fontFamily: "'JetBrains Mono',monospace", marginLeft: "auto" }}>
          {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
      </div>
    </a>
  );
};

const GitHubActivity = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetchGitHubData()
      .then(({ repos, events }) => {
        const weeks = buildContribGrid(events);
        const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
        const topRepos = repos
          .filter(r => !r.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6);
        const totalContribs = events.length;
        setData({ weeks, repos: topRepos, totalStars, totalContribs, totalRepos: repos.length });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github-activity" ref={ref} style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.07)", padding: "80px 48px" }}>
      <p className="s-label" style={{ opacity: visible ? 1 : 0, transition: "opacity .5s", fontFamily: "'JetBrains Mono',monospace" }}>
        <span style={{ color: "rgba(6,182,212,0.5)" }}>&lt;</span>github<span style={{ color: "rgba(6,182,212,0.5)" }}> /&gt;</span>
      </p>
      <h2 className="s-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>
        GitHub Activity
      </h2>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          <div style={{ display: "inline-block", width: 20, height: 20, border: "2px solid rgba(59,130,246,0.2)", borderTopColor: "#3B82F6", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginBottom: 12 }} />
          <div>{">"} fetching github data...</div>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {error && (
        <div style={{ textAlign: "center", padding: "24px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 12, color: "#EF4444", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          {">"} GitHub API rate limit reached. Check back in a minute.
        </div>
      )}

      {data && !loading && (
        <>
          {/* Stats row */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
            <StatBadge label="REPOS" value={data.totalRepos} color="#3B82F6" />
            <StatBadge label="STARS" value={data.totalStars} color="#F59E0B" />
            <StatBadge label="EVENTS (100d)" value={data.totalContribs} color="#06B6D4" />
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 12, background: "rgba(200,216,240,0.06)", border: "1px solid rgba(200,216,240,0.15)", color: "#C8D8F0", textDecoration: "none", fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", marginLeft: "auto", alignSelf: "center", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,216,240,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,216,240,0.06)"; e.currentTarget.style.transform = "none"; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View Profile →
            </a>
          </div>

          {/* Contribution grid */}
          <div style={{ marginBottom: 32, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
            <div style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", marginBottom: 10, letterSpacing: "1px" }}>
              ACTIVITY — LAST 16 WEEKS
            </div>
            <div style={{ display: "flex", gap: 3, position: "relative" }}>
              {data.weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {week.map((day, di) => (
                    <div key={di}
                      onMouseEnter={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({ x: rect.left, y: rect.top - 36, date: day.date, count: day.count });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        width: 12, height: 12, borderRadius: 3,
                        background: getColor(day.count),
                        border: day.count > 0 ? "1px solid rgba(6,182,212,0.2)" : "1px solid rgba(59,130,246,0.06)",
                        cursor: "default",
                        transition: "transform 0.1s ease",
                      }}
                      onMouseOver={e => { e.currentTarget.style.transform = "scale(1.3)"; }}
                      onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 9.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
              <span>Less</span>
              {[0, 1, 3, 6, 9].map(n => (
                <div key={n} style={{ width: 10, height: 10, borderRadius: 2, background: getColor(n), border: "1px solid rgba(59,130,246,0.1)" }} />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Repos grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
            {data.repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} visible={visible} />
            ))}
          </div>
        </>
      )}

      {/* Floating tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed", left: tooltip.x, top: tooltip.y,
          background: "rgba(6,14,30,0.95)", border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 7, padding: "5px 10px", fontSize: 10.5,
          color: "#C8D8F0", fontFamily: "'JetBrains Mono',monospace",
          pointerEvents: "none", zIndex: 999, whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        }}>
          <span style={{ color: "#06B6D4" }}>{tooltip.count}</span> event{tooltip.count !== 1 ? "s" : ""} — {tooltip.date}
        </div>
      )}
    </section>
  );
};

export default GitHubActivity;
