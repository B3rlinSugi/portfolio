import { useEffect, useMemo, useState } from "react";
import { data } from "../data/portfolioData";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const ProgressChip = ({ label, value, target, unit }) => {
  const percent = unit === "%" ? clamp(value, 0, 100) : clamp((value / target) * 100, 0, 100);
  const statusColor = percent > 85 ? "#22C55E" : percent > 65 ? "#F59E0B" : "#EF4444";

  return (
    <div style={{ background: "rgba(6,14,30,0.72)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 12, padding: 14, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--white)", fontFamily: "'Outfit',sans-serif" }}>
          {value}{unit} / {target}{unit}
        </div>
      </div>
      <div style={{ width: "100%", height: 9, borderRadius: 999, background: "rgba(59,130,246,0.12)" }}>
        <div style={{ width: `${percent}%`, height: "100%", borderRadius: 999, background: statusColor, transition: "width 0.35s ease" }} />
      </div>
    </div>
  );
};

const buildRunbookMarkdown = (runbook) => {
  let md = "# Runbook dan Incident Playbook\n\n";
  md += "## Incident Response\n";
  runbook.incidentResponse?.forEach((line, idx) => {
    md += `${idx + 1}. ${line}\n`;
  });
  md += "\n## Maintenance Cadence\n";
  runbook.maintenance?.forEach((line) => {
    md += `- ${line}\n`;
  });
  md += "\n## Catatan\n";
  md += "Sumber: src/data/portfolioData.js\n";
  return md;
};

const OperationalReadiness = () => {
  const monitoring = useMemo(() => data.monitoring || {}, []);
  const runbook = useMemo(() => data.runbook || { incidentResponse: [], maintenance: [] }, []);

  const [selectedMetric, setSelectedMetric] = useState(monitoring.serviceMetrics?.[0]?.metric || "");
  const [trendData, setTrendData] = useState(() => {
    const initial = {};
    monitoring.serviceMetrics?.forEach((m) => {
      const base = typeof m.value === "number" ? m.value : Number(m.value) || 0;
      initial[m.metric] = Array.from({ length: 12 }, () => clamp(base * (0.86 + Math.random() * 0.28), 0, base * 1.5));
    });
    return initial;
  });

  useEffect(() => {
    if (!monitoring.serviceMetrics?.length) return undefined;
    const timer = setInterval(() => {
      setTrendData((prev) => {
        const next = { ...prev };
        monitoring.serviceMetrics.forEach((m) => {
          const current = prev[m.metric] || [];
          const lastValue = current[current.length - 1] || (typeof m.value === "number" ? m.value : Number(m.value) || 0);
          const fluctuation = (Math.random() - 0.5) * (parseFloat(m.unit === "%" ? m.value : m.value || 0) * 0.04 || 2);
          const newValue = clamp(lastValue + fluctuation, 0, (typeof m.target === "number" ? m.target : Number(m.target) || 1) * 1.4);
          next[m.metric] = [...current.slice(-11), newValue];
        });
        return next;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [monitoring.serviceMetrics]);

  const metricOptions = monitoring.serviceMetrics?.map((m) => m.metric) || [];
  const selectedSeries = trendData[selectedMetric] || [];
  const minTrend = Math.min(...selectedSeries, 0);
  const maxTrend = Math.max(...selectedSeries, 1);

  const svgPoints = selectedSeries.map((value, idx) => {
    const x = 12 + (idx * 1.0 * (100 / Math.max(selectedSeries.length - 1, 1)));
    const y = 90 - ((value - minTrend) / Math.max(maxTrend - minTrend, 0.01)) * 80;
    return `${x},${y}`;
  }).join(" ");

  const runbookMarkdown = useMemo(() => buildRunbookMarkdown(runbook), [runbook]);

  const copyRunbook = async () => {
    try {
      await navigator.clipboard.writeText(runbookMarkdown);
      alert("Runbook berhasil disalin ke clipboard!");
    } catch {
      const temp = document.createElement("textarea");
      temp.value = runbookMarkdown;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      alert("Runbook berhasil disalin (fallback)!");
    }
  };

  const downloadRunbook = () => {
    const blob = new Blob([runbookMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "runbook-berlin-sugiyanto.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="operational-readiness" style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.08)", padding: "80px 0" }}>
      <p className="s-label" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#A5B4FC" }}>&lt;ops /&gt;</p>
      <h2 className="s-title" style={{ marginBottom: 18 }}>Operational Readiness</h2>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 24 }}>
        <div style={{ color: "var(--muted)", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
          Real-time KPI trend + runbook quick actions.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={copyRunbook} style={{ padding: "7px 11px", borderRadius: 8, border: "1px solid rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.12)", color: "#BEE3F8", fontSize: 11, cursor: "pointer" }}>Copy Runbook</button>
          <button onClick={downloadRunbook} style={{ padding: "7px 11px", borderRadius: 8, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.12)", color: "#A7F3D0", fontSize: 11, cursor: "pointer" }}>Download Markdown</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginBottom: 20 }}>
        <div style={{ background: "rgba(15,31,56,0.6)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "var(--white)" }}>Service Health</h3>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
            Uptime: {monitoring.uptime || "N/A"} • Open incidents: {monitoring.openIncidents ?? "N/A"}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "var(--muted-2)", lineHeight: 1.4 }}>
            Last incident: {monitoring.lastIncident || "-"}. Fokus pada observability + triage cepat.
          </p>
        </div>

        <div style={{ background: "rgba(15,31,56,0.6)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "var(--white)" }}>Sentry Integration</h3>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
            DSN: {import.meta.env.VITE_SENTRY_DSN ? "configured" : "not set"}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "var(--muted-2)", lineHeight: 1.4 }}>
            `VITE_SENTRY_DSN` environment variable can activate real error tracing in production.
          </p>
        </div>

        <div style={{ background: "rgba(15,31,56,0.6)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "var(--white)" }}>Actions Pending</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--white-2)", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.5 }}>
            <li>Review on-call runbook setiap minggu.</li>
            <li>Run regression test setelah deploy hotfix.</li>
            <li>Validasi OpenAPI dan contract per sprint.</li>
            <li>Audit dependency security bulanan.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "var(--muted)", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>Metric Trend Visual</div>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            style={{ background: "rgba(15,31,56,0.75)", border: "1px solid rgba(59,130,246,0.2)", color: "#CFE6FF", padding: "6px 10px", borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}
          >
            {metricOptions.map((metric) => (
              <option key={metric} value={metric}>{metric}</option>
            ))}
          </select>
        </div>

        <div style={{ background: "rgba(15,31,56,0.5)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 16, padding: 14 }}>
          {selectedMetric && selectedSeries.length ? (
            <svg viewBox="0 0 120 100" preserveAspectRatio="none" style={{ width: "100%", height: 180 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <polyline points={svgPoints} fill="none" stroke="url(#lineGradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              {selectedSeries.map((v, idx) => {
                const x = 12 + (idx * (100 / Math.max(selectedSeries.length - 1, 1)));
                const y = 90 - ((v - minTrend) / Math.max(maxTrend - minTrend, 0.01)) * 80;
                return <circle key={idx} cx={x} cy={y} r="1.7" fill="#fff" />;
              })}
            </svg>
          ) : (
            <div style={{ color: "var(--muted)", fontSize: 13, textAlign: "center", padding: 18 }}>Tidak ada data trend untuk metric ini.</div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "rgba(15,31,56,0.6)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 16, padding: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--white)", margin: "0 0 10px" }}>Incident Response Playbook</h4>
          <ol style={{ margin: 0, paddingLeft: 18, color: "var(--white-2)", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.5 }}>
            {runbook.incidentResponse?.map((line, idx) => <li key={idx}>{line}</li>)}
          </ol>
        </div>
        <div style={{ background: "rgba(15,31,56,0.6)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 16, padding: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--white)", margin: "0 0 10px" }}>Maintenance Cadence</h4>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--white-2)", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.5 }}>
            {runbook.maintenance?.map((line, idx) => <li key={idx}>{line}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ background: "rgba(15,31,56,0.52)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 16, padding: 14, marginTop: 20 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--white)", margin: "0 0 10px" }}>Infrastructure & SLO Model</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {['Kubernetes', 'Docker', 'AWS ECS', 'Terraform', 'Prometheus', 'Grafana'].map((item) => (
            <span key={item} style={{ fontSize: 11, fontWeight: 700, color: "#E0EBFF", background: "rgba(59,130,246,0.14)", border: "1px solid rgba(59,130,246,0.24)", borderRadius: 8, padding: "5px 8px", fontFamily: "'JetBrains Mono',monospace" }}>{item}</span>
          ))}
        </div>
        <p style={{ margin: "9px 0 0", fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
          SLO: {">99.9% uptime"}, {"<1% error rate"}, P95 latency &lt;250ms. Tambahkan custom alert dan threshold dalam CI/CD pipeline.
        </p>
      </div>

      <div style={{ marginTop: 14, border: "1px solid rgba(59,130,246,0.15)", background: "rgba(6,14,30,0.42)", borderRadius: 12, padding: 12 }}>
        <div style={{ marginBottom: 8, fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>Runbook Markdown Preview (auto-updated):</div>
        <textarea readOnly value={runbookMarkdown} rows={7} style={{ width: "100%", resize: "vertical", background: "rgba(6,14,30,0.85)", border: "1px solid rgba(59,130,246,0.2)", color: "#C8D8F0", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, borderRadius: 8, padding: 10 }} />
      </div>

      <div style={{ marginTop: 14, fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
        Monitoring and runbook data diambil dari konfigurasi local (`src/data/portfolioData.js`).
      </div>
    </section>
  );
};

export default OperationalReadiness;
