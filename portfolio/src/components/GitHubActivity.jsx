import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const GITHUB_USERNAME = "B3rlinSugi";
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

const langColors = {
  PHP: "#4f5d95", JavaScript: "#f1e05a", Java: "#b07219",
  Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c",
  TypeScript: "#3178c6", Vue: "#41b883", Blade: "#f05340",
};

const COMMIT_METEORS = [
  { id: "m1", fromX: -610, fromY: -148, toX: -198, toY: 214, width: 230, color: "#3B82F6", delay: 0.02, duration: 0.86, rotate: 27 },
  { id: "m2", fromX: -520, fromY: -132, toX: -162, toY: 246, width: 198, color: "#06B6D4", delay: 0.04, duration: 0.82, rotate: 24 },
  { id: "m3", fromX: -386, fromY: -124, toX: -116, toY: 230, width: 186, color: "#38BDF8", delay: 0.08, duration: 0.78, rotate: 21 },
  { id: "m4", fromX: -246, fromY: -116, toX: -52, toY: 240, width: 178, color: "#0EA5E9", delay: 0.11, duration: 0.74, rotate: 18 },
  { id: "m5", fromX: -98, fromY: -106, toX: 10, toY: 224, width: 170, color: "#06B6D4", delay: 0.14, duration: 0.72, rotate: 15 },
  { id: "m6", fromX: 44, fromY: -110, toX: 62, toY: 238, width: 168, color: "#10B981", delay: 0.09, duration: 0.78, rotate: 12 },
  { id: "m7", fromX: 188, fromY: -126, toX: 122, toY: 246, width: 182, color: "#22D3EE", delay: 0.12, duration: 0.8, rotate: 9 },
  { id: "m8", fromX: 332, fromY: -140, toX: 186, toY: 232, width: 198, color: "#3B82F6", delay: 0.16, duration: 0.84, rotate: 6 },
  { id: "m9", fromX: 472, fromY: -138, toX: 232, toY: 220, width: 214, color: "#60A5FA", delay: 0.18, duration: 0.88, rotate: 4 },
  { id: "m10", fromX: 620, fromY: -152, toX: 282, toY: 254, width: 236, color: "#06B6D4", delay: 0.22, duration: 0.92, rotate: 2 },
];

const COMMIT_PACKETS = [
  { id: "c1", label: "feat/api", fromX: -430, toX: -178, delay: 0.02, color: "#3B82F6" },
  { id: "c2", label: "fix/auth", fromX: -326, toX: -126, delay: 0.05, color: "#38BDF8" },
  { id: "c3", label: "merge/pr", fromX: -240, toX: -78, delay: 0.08, color: "#06B6D4" },
  { id: "c4", label: "refactor", fromX: -152, toX: -18, delay: 0.1, color: "#0EA5E9" },
  { id: "c5", label: "hotfix", fromX: -36, toX: 46, delay: 0.12, color: "#10B981" },
  { id: "c6", label: "deploy", fromX: 118, toX: 124, delay: 0.14, color: "#22D3EE" },
  { id: "c7", label: "release", fromX: 242, toX: 188, delay: 0.17, color: "#3B82F6" },
  { id: "c8", label: "chore", fromX: 356, toX: 242, delay: 0.2, color: "#67E8F9" },
];

const IMPACT_BURSTS = [
  { id: "b1", x: -172, y: 228, delay: 0.5, color: "#3B82F6" },
  { id: "b2", x: -82, y: 244, delay: 0.56, color: "#06B6D4" },
  { id: "b3", x: 6, y: 236, delay: 0.61, color: "#38BDF8" },
  { id: "b4", x: 98, y: 244, delay: 0.66, color: "#10B981" },
  { id: "b5", x: 188, y: 228, delay: 0.72, color: "#22D3EE" },
];

// ─── Fetch GitHub Data ─────────────────────────────────────────────────────────
async function fetchAll() {
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`),
  ]);
  const user = await userRes.json();
  const repos = await reposRes.json();
  const events = await eventsRes.json();
  return {
    user: userRes.ok ? user : null,
    repos: Array.isArray(repos) ? repos : [],
    events: Array.isArray(events) ? events : [],
  };
}

// ─── Build Heatmap (16 weeks) ─────────────────────────────────────────────────
function buildHeatmap(events) {
  const counts = {};
  events.forEach(e => {
    const d = e.created_at?.slice(0, 10);
    if (d) counts[d] = (counts[d] || 0) + 1;
  });
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

function cellColor(count) {
  if (count === 0) return "rgba(59,130,246,0.06)";
  if (count === 1) return "rgba(29,78,216,0.35)";
  if (count <= 3) return "rgba(29,78,216,0.6)";
  if (count <= 6) return "rgba(6,182,212,0.75)";
  return "#06B6D4";
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
const Counter = ({ target, started }) => {
  const [val, setVal] = useState(0);
  const n = parseInt(target, 10);
  useEffect(() => {
    if (!started || isNaN(n) || n === 0) return;
    let frame = 0;
    const steps = 40;
    const id = setInterval(() => {
      frame++;
      setVal(Math.round((n / steps) * frame));
      if (frame >= steps) { setVal(n); clearInterval(id); }
    }, 30);
    return () => clearInterval(id);
  }, [started, n]);
  if (isNaN(n)) return <>{target}</>;
  return <>{val}</>;
};

// ─── Heatmap Cell ────────────────────────────────────────────────────────────
const HeatCell = ({ day, visible, delay }) => {
  const [hovered, setHovered] = useState(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  return (
    <div style={{ position: "relative" }}>
      <div
        onMouseEnter={(e) => { setHovered(true); const r = e.currentTarget.getBoundingClientRect(); setTipPos({ x: r.left + r.width / 2, y: r.top - 8 }); }}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 11, height: 11, borderRadius: 3,
          background: visible ? cellColor(day.count) : "rgba(59,130,246,0.04)",
          border: day.count > 0 ? "1px solid rgba(6,182,212,0.2)" : "1px solid rgba(59,130,246,0.06)",
          transition: `background ${0.4 + delay * 0.002}s ease, transform 0.1s`,
          transform: hovered ? "scale(1.5)" : "scale(1)",
          cursor: "default",
          boxShadow: hovered && day.count > 0 ? `0 0 8px ${cellColor(day.count)}` : "none",
        }}
      />
      {hovered && (
        <div style={{
          position: "fixed", left: tipPos.x, top: tipPos.y, transform: "translate(-50%,-100%)",
          background: "rgba(6,14,30,0.95)", border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 6, padding: "4px 9px", fontSize: 10, color: "#C8D8F0",
          fontFamily: "'JetBrains Mono',monospace", pointerEvents: "none", zIndex: 999,
          whiteSpace: "nowrap", marginBottom: 4,
        }}>
          <span style={{ color: "#06B6D4" }}>{day.count}</span> event{day.count !== 1 ? "s" : ""} · {day.date}
        </div>
      )}
    </div>
  );
};

// ─── Repo Card ────────────────────────────────────────────────────────────────
const RepoCard = ({ repo, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const lang = repo.language || "Other";
  const lc = langColors[lang] || "#6B84A8";
  const updated = new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
        borderRadius: 10, textDecoration: "none",
        background: hovered ? "rgba(59,130,246,0.08)" : "rgba(0,0,0,0.25)",
        border: `1px solid ${hovered ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.04)"}`,
        transition: "all 0.2s",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)",
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* lang dot */}
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: lc, flexShrink: 0 }} />
      {/* name */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700, color: hovered ? "#F8FAFC" : "#94A3B8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{repo.name}</div>
        {repo.description && <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>{repo.description}</div>}
      </div>
      {/* meta */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#334155" }}>{updated}</span>
        {repo.stargazers_count > 0 && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#F59E0B" }}>★ {repo.stargazers_count}</span>}
      </div>
      {/* arrow */}
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#3B82F6" : "#334155"} strokeWidth="2.5" strokeLinecap="round" style={{ transition: "all 0.2s", transform: hovered ? "translate(2px,-2px)" : "none", flexShrink: 0 }}>
        <path d="M7 17L17 7M7 7h10v10" />
      </svg>
    </a>
  );
};

// ─── Language Bar ─────────────────────────────────────────────────────────────
const LangBar = ({ lang, pct, color, visible, delay }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#94A3B8" }}>{lang}</span>
      </div>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#475569" }}>{pct}%</span>
    </div>
    <div style={{ height: 6, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{
        height: "100%", background: `linear-gradient(to right,${color},${color}99)`,
        borderRadius: 3, width: visible ? `${pct}%` : "0%",
        transition: `width 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        boxShadow: `0 0 6px ${color}80`,
      }} />
    </div>
  </div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const GitHubActivity = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ghData, setGhData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { scrollYProgress: meteorProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.32"],
  });

  const meteorSpring = { stiffness: 132, damping: 21, mass: 0.5 };
  const rawSectionY = useTransform(meteorProgress, [0, 1], [112, 0]);
  const rawSectionX = useTransform(meteorProgress, [0, 0.24, 0.36, 0.5, 1], [0, -10, 8, -4, 0]);
  const rawSectionOpacity = useTransform(meteorProgress, [0, 0.38, 1], [0, 0.8, 1]);
  const rawSectionScale = useTransform(meteorProgress, [0, 1], [0.95, 1]);
  const rawHeaderY = useTransform(meteorProgress, [0, 1], [58, 0]);
  const rawHeaderOpacity = useTransform(meteorProgress, [0, 0.5, 1], [0, 0.88, 1]);
  const rawBodyY = useTransform(meteorProgress, [0, 1], [42, 0]);
  const rawBodyOpacity = useTransform(meteorProgress, [0, 0.5, 1], [0, 0.9, 1]);
  const rawMeteorOverlayOpacity = useTransform(meteorProgress, [0, 0.24, 0.6, 1], [1, 0.96, 0.28, 0]);
  const rawMeteorOverlayY = useTransform(meteorProgress, [0, 1], [-30, 0]);
  const rawMeteorOverlayScale = useTransform(meteorProgress, [0, 0.3, 1], [1.12, 1.02, 1]);
  const rawMeteorFlashOpacity = useTransform(meteorProgress, [0, 0.14, 0.28, 1], [0.92, 0.66, 0.08, 0]);

  const sectionY = useSpring(rawSectionY, meteorSpring);
  const sectionX = useSpring(rawSectionX, meteorSpring);
  const sectionOpacity = useSpring(rawSectionOpacity, meteorSpring);
  const sectionScale = useSpring(rawSectionScale, meteorSpring);
  const headerY = useSpring(rawHeaderY, meteorSpring);
  const headerOpacity = useSpring(rawHeaderOpacity, meteorSpring);
  const bodyY = useSpring(rawBodyY, meteorSpring);
  const bodyOpacity = useSpring(rawBodyOpacity, meteorSpring);
  const meteorOverlayOpacity = useSpring(rawMeteorOverlayOpacity, meteorSpring);
  const meteorOverlayY = useSpring(rawMeteorOverlayY, meteorSpring);
  const meteorOverlayScale = useSpring(rawMeteorOverlayScale, meteorSpring);
  const meteorFlashOpacity = useSpring(rawMeteorFlashOpacity, meteorSpring);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetchAll().then(({ user, repos, events }) => {
      const weeks = buildHeatmap(events);
      const topRepos = repos.filter(r => !r.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 8);
      const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
      const totalEvents = events.length;

      // Language breakdown
      const langCount = {};
      repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
      const totalLangs = Object.values(langCount).reduce((s, v) => s + v, 0);
      const langs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l, c]) => ({ lang: l, pct: Math.round((c / totalLangs) * 100), color: langColors[l] || "#6B84A8" }));

      setGhData({ user, weeks, repos: topRepos, totalStars, totalEvents, totalRepos: repos.length, langs });
    }).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);

  // ── Now date string
  const now = new Date().toISOString().slice(0, 10);

  return (
    <section id="github-activity" ref={ref} style={{ background: "#020617", padding: "100px 0", borderTop: "1px solid rgba(59,130,246,0.07)", position: "relative", overflow: "hidden" }}>
      {/* bg grid */}
      <div style={{ position: "absolute", inset: 0, backgroundSize: "40px 40px", backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.015) 1px,transparent 1px)", pointerEvents: "none" }} />
      <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, opacity: meteorOverlayOpacity, y: meteorOverlayY, scale: meteorOverlayScale, overflow: "hidden", transformOrigin: "50% 18%" }}>
        <motion.div
          style={{ position: "absolute", inset: 0, opacity: meteorFlashOpacity }}
          animate={visible ? { opacity: [0, 0.8, 0.12, 0] } : { opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(125,211,252,0.36) 0%, rgba(56,189,248,0.04) 44%, transparent 78%)" }} />
        </motion.div>
        <div style={{ position: "absolute", left: "50%", top: -34, transform: "translateX(-50%)", width: "min(1180px, calc(100% - 20px))", height: 430, background: "radial-gradient(ellipse at center, rgba(56,189,248,0.44) 0%, rgba(59,130,246,0.24) 30%, rgba(14,165,233,0.08) 56%, rgba(2,6,23,0) 80%)" }} />
        {COMMIT_PACKETS.map((packet) => (
          <motion.div
            key={packet.id}
            initial={{ opacity: 0, x: packet.fromX, y: -62, scale: 0.72, rotate: -14, filter: "blur(3px)" }}
            animate={visible ? { opacity: [0, 1, 0], x: [packet.fromX, packet.toX], y: [-62, 34, 208], scale: [0.72, 1.12, 0.7], rotate: [-14, 2, 10], filter: ["blur(3px)", "blur(0px)", "blur(4px)"] } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: packet.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: "50%", top: 18, padding: "4px 10px", borderRadius: 999, border: `1px solid ${packet.color}99`, background: "rgba(2,6,23,0.78)", color: packet.color, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.6px", textTransform: "uppercase", boxShadow: `0 0 24px ${packet.color}66` }}
          >
            {packet.label}
          </motion.div>
        ))}
        {COMMIT_METEORS.map((meteor) => (
          <motion.div
            key={meteor.id}
            initial={{ opacity: 0, x: meteor.fromX, y: meteor.fromY, rotate: meteor.rotate - 24, scale: 0.46 }}
            animate={visible ? { opacity: [0, 1, 0], x: [meteor.fromX, meteor.toX], y: [meteor.fromY, meteor.toY], rotate: [meteor.rotate - 24, meteor.rotate], scale: [0.46, 1.22, 0.64] } : { opacity: 0 }}
            transition={{ duration: meteor.duration, delay: meteor.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", left: "50%", top: -40, width: meteor.width, height: 3, transformOrigin: "0% 50%" }}
          >
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: `linear-gradient(to right, ${meteor.color}, rgba(56,189,248,0))`, boxShadow: `0 0 20px ${meteor.color}, 0 0 32px ${meteor.color}66` }} />
            <div style={{ position: "absolute", right: -3, top: "50%", width: 8, height: 8, borderRadius: "50%", transform: "translateY(-50%)", background: meteor.color, boxShadow: `0 0 16px ${meteor.color}, 0 0 22px ${meteor.color}AA` }} />
          </motion.div>
        ))}
        {IMPACT_BURSTS.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={visible ? { opacity: [0, 0.95, 0], scale: [0.2, 1.3, 2.5] } : { opacity: 0 }}
            transition={{ duration: 0.64, delay: burst.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", left: "50%", top: 0, x: burst.x, y: burst.y, width: 18, height: 18, borderRadius: "50%", border: `2px solid ${burst.color}`, boxShadow: `0 0 18px ${burst.color}` }}
          />
        ))}
      </motion.div>

      <motion.div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 3, x: sectionX, y: sectionY, opacity: sectionOpacity, scale: sectionScale, transformOrigin: "center top", willChange: "transform, opacity" }}>

        {/* Header — centered, matching About/Skills style */}
        <motion.div style={{ textAlign: "center", marginBottom: 32, y: headerY, opacity: headerOpacity, transformOrigin: "center top", willChange: "transform, opacity" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#3B82F6", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px" }}>04. GITHUB ACTIVITY</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 32, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.5px", margin: "8px 0 8px" }}>Code speaks louder.</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748B", margin: "0 0 10px" }}>Commit meteor shower from the Projects zone, now landing as live GitHub signals.</p>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#3B82F6"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#475569"; }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            @{GITHUB_USERNAME} ↗
          </a>
        </motion.div>


        {/* ── STATUS BAR ── */}
        <motion.div style={{ y: bodyY, opacity: bodyOpacity, willChange: "transform, opacity" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(59,130,246,0.1)", borderRadius: 10, padding: "10px 20px", marginBottom: 20, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#475569", flexWrap: "wrap" }}>
          {[
            { label: "USER", value: GITHUB_USERNAME, color: "#3B82F6" },
            { label: "STATUS", value: "ACTIVE", color: "#10B981" },
            { label: "DATE", value: now, color: "#94A3B8" },
            { label: "REPOS", value: ghData ? ghData.totalRepos : "...", color: "#F8FAFC" },
            { label: "STARS", value: ghData ? ghData.totalStars : "...", color: "#F59E0B" },
          ].map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {i > 0 && <span style={{ margin: "0 12px", color: "#1E293B" }}>|</span>}
              <span style={{ color: "#334155" }}>{item.label}: </span>
              <span style={{ color: item.color, marginLeft: 4, fontWeight: 700 }}>{item.value}</span>
            </span>
          ))}
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "ghPulse 2s infinite" }} />
            <span style={{ color: "#10B981" }}>ONLINE</span>
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#475569", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
            <div style={{ width: 20, height: 20, border: "2px solid rgba(59,130,246,0.2)", borderTopColor: "#3B82F6", borderRadius: "50%", animation: "ghSpin 0.8s linear infinite", margin: "0 auto 12px" }} />
            {">"} fetching github data...
          </div>
        )}

        {error && (
          <div style={{ padding: "20px 24px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, color: "#EF4444", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
            {">"} GitHub API rate limit reached. Try again in a moment.
          </div>
        )}

        {ghData && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* ── ROW 1: Stats tiles ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="gh-stats-row">
              {[
                { label: "REPOSITORIES", value: ghData.totalRepos, color: "#3B82F6", suffix: "" },
                { label: "TOTAL STARS", value: ghData.totalStars, color: "#F59E0B", suffix: "" },
                { label: "EVENTS (100d)", value: ghData.totalEvents, color: "#06B6D4", suffix: "" },
                { label: "FOLLOWERS", value: ghData.user?.followers ?? "—", color: "#10B981", suffix: "" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 52, scale: 0.56, rotateX: -18 }}
                  animate={visible ? { opacity: 1, y: 0, scale: [0.56, 1.18, 1], rotateX: [-18, 4, 0] } : { opacity: 0, y: 52, scale: 0.56, rotateX: -18 }}
                  transition={{ type: "spring", stiffness: 320, damping: 12, mass: 0.62, delay: 0.24 + i * 0.08 }}
                  style={{
                    background: "rgba(0,0,0,0.4)", border: `1px solid ${stat.color}18`,
                    borderRadius: 12, padding: "16px 20px", transformOrigin: "center top", willChange: "transform, opacity",
                    boxShadow: `0 0 0 1px ${stat.color}18, 0 16px 34px rgba(0,0,0,0.35)`,
                  }}
                >
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#475569", letterSpacing: "1.5px", marginBottom: 6 }}>{stat.label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 26, fontWeight: 800, color: stat.color }}>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={visible ? { opacity: 1, scale: [0.6, 1.34, 0.94, 1] } : { opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.68, delay: 0.34 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: "inline-block" }}
                    >
                      <Counter target={typeof stat.value === "number" ? stat.value : 0} started={visible} />
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── ROW 2: Heatmap ── */}
            <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#475569", letterSpacing: "1.5px" }}>CONTRIBUTION HEATMAP — LAST 16 WEEKS</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#334155" }}>
                  <span>Less</span>
                  {[0, 1, 3, 6, 9].map(n => <div key={n} style={{ width: 9, height: 9, borderRadius: 2, background: cellColor(n), border: "1px solid rgba(59,130,246,0.1)" }} />)}
                  <span>More</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {ghData.weeks.map((week, wi) => (
                  <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {week.map((day, di) => (
                      <HeatCell key={di} day={day} visible={visible} delay={wi * 7 + di} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 3: Repos + Languages ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }} className="gh-bottom-row">

              {/* Repos list */}
              <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "20px 24px" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#475569", letterSpacing: "1.5px", marginBottom: 14 }}>RECENT REPOSITORIES</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {ghData.repos.map((repo, i) => (
                    <RepoCard key={repo.id} repo={repo} index={i} visible={visible} />
                  ))}
                </div>
              </div>

              {/* Language breakdown */}
              <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "20px 24px" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#475569", letterSpacing: "1.5px", marginBottom: 16 }}>LANGUAGE BREAKDOWN</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {ghData.langs.map((l, i) => (
                    <LangBar key={l.lang} {...l} visible={visible} delay={i * 100} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
        </motion.div>
      </motion.div>

      <style>{`
        @media(max-width:900px) { .gh-stats-row{ grid-template-columns: 1fr 1fr !important; } .gh-bottom-row{ grid-template-columns: 1fr !important; } }
        @keyframes ghPulse { 0%{transform:scale(1);opacity:0.8} 70%{transform:scale(2.2);opacity:0} 100%{transform:scale(1);opacity:0} }
        @keyframes ghSpin { to{ transform:rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default GitHubActivity;
