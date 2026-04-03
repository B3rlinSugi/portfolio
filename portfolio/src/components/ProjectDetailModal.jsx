import { useEffect, useState } from "react";
import { data } from "../data/portfolioData";

/* ─────────────────────────────────────────────
   Project Detail Modal — with Architecture Tab
   Tabs: Achievements | Tech Stack | Architecture
   Architecture shows: ERD + relevant flow diagram
───────────────────────────────────────────── */

const accents = [
  { a: "#3B82F6", b: "#06B6D4" },
  { a: "#8B5CF6", b: "#3B82F6" },
  { a: "#06B6D4", b: "#10B981" },
  { a: "#F59E0B", b: "#EF4444" },
];

/* ── Mermaid ERD definitions per project ── */
const architectureData = {
  "Student Management API": {
    erd: `erDiagram
  USERS {
    bigint id PK
    string name
    string email
    string password
    enum role
    timestamp created_at
  }
  MAJORS {
    bigint id PK
    string code
    string name
    string faculty
    text description
    timestamp created_at
  }
  STUDENTS {
    bigint id PK
    string nim
    string name
    string email
    string phone
    enum gender
    date birth_date
    text address
    bigint major_id FK
    enum status
    int semester
    decimal gpa
    timestamp deleted_at
    timestamp created_at
  }
  MAJORS ||--o{ STUDENTS : "has"`,
    flow: {
      title: "JWT Auth Flow",
      steps: [
        { label: "POST /auth/login", sub: "email + password", color: "#3B82F6" },
        { label: "Validate credentials", sub: "bcrypt compare", color: "#6366F1" },
        { label: "Generate JWT", sub: "access + refresh token", color: "#8B5CF6" },
        { label: "Authorize request", sub: "Bearer token → middleware", color: "#06B6D4" },
        { label: "Check role", sub: "admin / user RBAC", color: "#10B981" },
        { label: "Return resource", sub: "API Resource transformer", color: "#22C55E" },
      ],
    },
  },
  "TokoKu — E-Commerce Platform": {
    erd: `erDiagram
  USERS {
    bigint id PK
    string name
    string email
    string password
    enum role
  }
  PRODUCTS {
    bigint id PK
    string name
    decimal price
    int stock
    bigint category_id FK
  }
  CATEGORIES {
    bigint id PK
    string name
  }
  ORDERS {
    bigint id PK
    bigint user_id FK
    bigint voucher_id FK
    decimal total
    decimal discount
    enum status
    enum payment_method
    timestamp created_at
  }
  ORDER_ITEMS {
    bigint id PK
    bigint order_id FK
    bigint product_id FK
    int quantity
    decimal price
  }
  VOUCHERS {
    bigint id PK
    string code
    decimal discount
    enum type
    timestamp expires_at
  }
  USERS ||--o{ ORDERS : "places"
  ORDERS ||--|{ ORDER_ITEMS : "contains"
  PRODUCTS ||--o{ ORDER_ITEMS : "in"
  CATEGORIES ||--o{ PRODUCTS : "has"
  VOUCHERS ||--o{ ORDERS : "applied to"`,
    flow: {
      title: "Order & Payment Flow",
      steps: [
        { label: "Add to cart", sub: "session-based cart", color: "#3B82F6" },
        { label: "Apply voucher", sub: "validate + compute discount", color: "#8B5CF6" },
        { label: "Checkout", sub: "create Order record", color: "#06B6D4" },
        { label: "Deduct stock", sub: "atomic DB transaction", color: "#F59E0B" },
        { label: "Payment method", sub: "bank transfer / e-wallet", color: "#EF4444" },
        { label: "Update status", sub: "pending → paid → shipped", color: "#10B981" },
      ],
    },
  },
  "Cash Flow Manager": {
    erd: `erDiagram
  USERS {
    bigint id PK
    string name
    string email
    string password
    enum role
    string reset_token
  }
  TRANSACTIONS {
    bigint id PK
    bigint user_id FK
    enum type
    decimal amount
    string description
    date date
    timestamp created_at
  }
  DEFERRED_PAYMENTS {
    bigint id PK
    bigint user_id FK
    string label
    decimal amount
    date due_date
    enum status
    timestamp created_at
  }
  USERS ||--o{ TRANSACTIONS : "records"
  USERS ||--o{ DEFERRED_PAYMENTS : "tracks"`,
    flow: {
      title: "Auth & Security Upgrade",
      steps: [
        { label: "Legacy MD5 auth", sub: "original codebase", color: "#EF4444" },
        { label: "Migrate to bcrypt", sub: "cost factor 12", color: "#F59E0B" },
        { label: "InnoDB + FK", sub: "schema redesign", color: "#8B5CF6" },
        { label: "Token reset", sub: "secure password reset flow", color: "#3B82F6" },
        { label: "PDF export", sub: "server-side generation", color: "#06B6D4" },
        { label: "Chart.js dashboard", sub: "6-month cash analytics", color: "#10B981" },
      ],
    },
  },
  "Sistem Data Akademik": {
    erd: `erDiagram
  USERS {
    bigint id PK
    string name
    string email
    string password
    enum role
  }
  STUDENTS {
    bigint id PK
    string nim
    string name
    string class
    enum status
  }
  COURSES {
    bigint id PK
    string code
    string name
    int credits
  }
  GRADES {
    bigint id PK
    bigint student_id FK
    bigint course_id FK
    decimal score
    string grade
    string semester
  }
  STUDENTS ||--o{ GRADES : "receives"
  COURSES ||--o{ GRADES : "given in"`,
    flow: {
      title: "RBAC Access Control",
      steps: [
        { label: "Login request", sub: "PDO prepared statement", color: "#3B82F6" },
        { label: "Verify credentials", sub: "password_verify()", color: "#6366F1" },
        { label: "Set session role", sub: "admin / staff", color: "#8B5CF6" },
        { label: "Route middleware", sub: "check session role", color: "#06B6D4" },
        { label: "Scope data access", sub: "filter by role boundary", color: "#F59E0B" },
        { label: "Return response", sub: "paginated + filterable", color: "#10B981" },
      ],
    },
  },
};

/* ── Mermaid ERD Renderer ── */
const ERDDiagram = ({ definition, accentColor }) => {
  const [rendered, setRendered] = useState(false);
  const [svg, setSvg] = useState("");
  const id = `erd-${Math.random().toString(36).slice(2, 8)}`;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const { default: mermaid } = await import(
          "https://esm.sh/mermaid@11/dist/mermaid.esm.min.mjs"
        );
        const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          fontFamily: "'JetBrains Mono', monospace",
          themeVariables: {
            darkMode: dark,
            fontSize: "12px",
            fontFamily: "'JetBrains Mono', monospace",
            primaryColor: accentColor + "18",
            primaryBorderColor: accentColor + "60",
            primaryTextColor: "#C8D8F0",
            lineColor: accentColor + "80",
            background: "rgba(6,14,30,0.8)",
            mainBkg: "rgba(15,31,56,0.9)",
            nodeBorder: accentColor + "40",
            clusterBkg: "rgba(15,31,56,0.5)",
            titleColor: "#C8D8F0",
            edgeLabelBackground: "rgba(6,14,30,0.8)",
            attributeBackgroundColorEven: "rgba(6,14,30,0.5)",
            attributeBackgroundColorOdd: "rgba(15,31,56,0.4)",
          },
        });
        const { svg: renderedSvg } = await mermaid.render(id, definition);
        if (!cancelled) {
          setSvg(renderedSvg);
          setRendered(true);
        }
      } catch {
        if (!cancelled) setRendered(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [definition, accentColor]);

  if (!rendered) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: 180, gap: 10,
        color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
      }}>
        <div style={{
          width: 16, height: 16,
          border: `2px solid ${accentColor}30`,
          borderTopColor: accentColor,
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }} />
        loading diagram...
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div
      style={{ overflow: "auto", maxHeight: 340 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

/* ── Step Flow Diagram ── */
const FlowDiagram = ({ flow, accentColor }) => {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: "var(--muted)",
        fontFamily: "'JetBrains Mono',monospace",
        letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14,
      }}>
        {flow.title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {flow.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
            {/* Left: number + connector line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32, flexShrink: 0 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: hovered === i ? step.color + "28" : "rgba(15,31,56,0.9)",
                border: `1.5px solid ${hovered === i ? (accentColor || step.color) : (accentColor || step.color) + "40"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: step.color,
                fontFamily: "'JetBrains Mono',monospace",
                transition: "all 0.2s",
                boxShadow: hovered === i ? `0 0 12px ${step.color}40` : "none",
              }}>
                {i + 1}
              </div>
              {i < flow.steps.length - 1 && (
                <div style={{
                  width: 1.5, flex: 1, minHeight: 16,
                  background: `linear-gradient(to bottom, ${step.color}60, ${flow.steps[i + 1].color}40)`,
                  margin: "2px 0",
                }} />
              )}
            </div>
            {/* Right: content card */}
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1, marginLeft: 10, marginBottom: i < flow.steps.length - 1 ? 6 : 0,
                padding: "8px 14px", borderRadius: 9,
                background: hovered === i ? `${step.color}08` : "rgba(15,31,56,0.4)",
                border: `1px solid ${hovered === i ? step.color + "30" : "rgba(59,130,246,0.08)"}`,
                transition: "all 0.2s",
                cursor: "default",
              }}
            >
              <div style={{
                fontSize: 12.5, fontWeight: 600, color: hovered === i ? "var(--white)" : "var(--white-2)",
                fontFamily: "'Outfit',sans-serif", transition: "color 0.2s",
              }}>
                {step.label}
              </div>
              <div style={{
                fontSize: 10.5, color: hovered === i ? step.color : "var(--muted)",
                fontFamily: "'JetBrains Mono',monospace", marginTop: 2,
                transition: "color 0.2s",
              }}>
                {step.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Architecture Tab Content ── */
const ArchitectureTab = ({ project, accentColor }) => {
  const arch = architectureData[project.title];

  if (!arch) {
    return (
      <div style={{
        textAlign: "center", padding: "40px 20px",
        color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
      }}>
        {">"} architecture diagram coming soon...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ERD */}
      <div>
        <div style={{
          fontSize: 10, fontWeight: 700, color: "var(--muted)",
          fontFamily: "'JetBrains Mono',monospace",
          letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12,
        }}>
          DATABASE SCHEMA (ERD)
        </div>
        <div style={{
          borderRadius: 12, overflow: "hidden",
          background: "rgba(6,14,30,0.7)",
          border: `1px solid ${accentColor}20`,
          padding: "16px",
        }}>
          <ERDDiagram definition={arch.erd} accentColor={accentColor} />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${accentColor}30, transparent)` }} />

      {/* Flow diagram */}
      <FlowDiagram flow={arch.flow} accentColor={accentColor} />
    </div>
  );
};

/* ── Tab Button ── */
const TabBtn = ({ label, active, onClick, accentColor }) => (
  <button
    onClick={onClick}
    style={{
      padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
      background: active ? `${accentColor}18` : "transparent",
      color: active ? accentColor : "var(--muted)",
      fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
      borderBottom: active ? `2px solid ${accentColor}` : "2px solid transparent",
      transition: "all 0.2s",
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--white-2)"; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--muted)"; }}
  >
    {label}
  </button>
);

/* ── Main Modal ── */
const ProjectDetailModal = () => {
  const [project, setProject] = useState(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("achievements");

  const open = (title) => {
    const p = data.projects.find(p => p.title === title);
    if (!p) return;
    setProject(p);
    setActiveTab("achievements");
    setVisible(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setProject(null);
      document.body.style.overflow = "";
    }, 280);
  };

  useEffect(() => {
    window.__openProject = open;
    return () => { delete window.__openProject; };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible || !project) return null;

  const idx = data.projects.findIndex(p => p.title === project.title);
  const { a, b } = accents[idx % accents.length];

  const tabs = [
    { key: "achievements", label: "Achievements" },
    { key: "techstack", label: "Tech Stack" },
    { key: "architecture", label: "Architecture" },
  ];

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 800,
        background: "rgba(4,10,22,0.88)",
        backdropFilter: "blur(14px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: closing ? "modalFadeOut 0.28s ease forwards" : "modalFadeIn 0.3s ease",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 720,
        maxHeight: "92vh", overflowY: "auto",
        borderRadius: 20,
        background: "rgba(8,18,36,0.98)",
        border: `1px solid ${a}40`,
        boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${a}20`,
        animation: closing ? "modalSlideOut 0.28s cubic-bezier(.22,1,.36,1) forwards" : "modalSlideIn 0.35s cubic-bezier(.22,1,.36,1)",
        display: "flex", flexDirection: "column",
      }}>

        {/* Gradient top bar */}
        <div style={{ height: 3, background: `linear-gradient(to right,${a},${b})`, flexShrink: 0, borderRadius: "20px 20px 0 0" }} />

        {/* Header */}
        <div style={{ padding: "24px 28px 0", position: "relative", flexShrink: 0 }}>
          <button
            onClick={close}
            style={{
              position: "absolute", top: 20, right: 20, width: 32, height: 32,
              borderRadius: "50%", background: "rgba(200,216,240,0.07)",
              border: "1px solid rgba(200,216,240,0.12)", color: "rgba(200,216,240,0.5)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,216,240,0.07)"; e.currentTarget.style.color = "rgba(200,216,240,0.5)"; e.currentTarget.style.borderColor = "rgba(200,216,240,0.12)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: a, background: `${a}10`, border: `1px solid ${a}25`, padding: "3px 10px", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace" }}>
              {project.type}
            </span>
            <span style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", background: "rgba(15,31,56,0.8)", border: "1px solid rgba(59,130,246,0.1)", padding: "3px 10px", borderRadius: 6 }}>
              {project.period}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(18px,3vw,26px)", fontWeight: 800, color: "#F0F6FF", margin: "0 0 8px", letterSpacing: "-0.5px", paddingRight: 40 }}>
            {project.title}
          </h2>
          <p style={{ fontSize: 13.5, color: "#6B84A8", lineHeight: 1.75, fontFamily: "'Outfit',sans-serif", margin: "0 0 20px" }}>
            {project.desc}
          </p>

          {/* Tab Bar */}
          <div style={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(59,130,246,0.1)", marginBottom: 0 }}>
            {tabs.map(tab => (
              <TabBtn
                key={tab.key}
                label={tab.label}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                accentColor={a}
              />
            ))}
            {/* Architecture badge — new */}
            {activeTab !== "architecture" && (
              <span style={{
                marginLeft: "auto", alignSelf: "center",
                fontSize: 9.5, color: a, background: `${a}12`,
                border: `1px solid ${a}30`, padding: "2px 8px",
                borderRadius: 6, fontFamily: "'JetBrains Mono',monospace",
                fontWeight: 700, letterSpacing: "0.5px",
              }}>
                NEW: ERD + Flow
              </span>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ padding: "20px 28px", flex: 1, overflowY: "auto" }}>

          {/* ACHIEVEMENTS TAB */}
          {activeTab === "achievements" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {project.points && project.points.length > 0 ? (
                project.points.map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: 10, background: `${a}06`, border: `1px solid ${a}12` }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, background: `${a}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, color: a, fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: 13.5, color: "#8BA4C8", lineHeight: 1.75, fontFamily: "'Outfit',sans-serif", margin: 0 }}>{typeof pt === "string" ? pt : `${pt.challenge} / ${pt.solution} / ${pt.result}`}</p>
                  </div>
                ))
              ) : (
                <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(15,31,56,0.4)", border: "1px solid rgba(59,130,246,0.1)" }}>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>No detailed project achievement data tersedia untuk saat ini.</p>
                </div>
              )}
            </div>
          )}

          {/* TECH STACK TAB */}
          {activeTab === "techstack" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {project.tech.map(t => (
                <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(6,14,30,0.7)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 10, padding: "10px 16px" }}>
                  <img src={t.icon} alt={t.name} style={{ width: 24, height: 24, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
                  <span style={{ fontSize: 13, color: "var(--white-2)", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{t.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* ARCHITECTURE TAB */}
          {activeTab === "architecture" && (
            <ArchitectureTab project={project} accentColor={a} />
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px 24px", borderTop: `1px solid ${a}15`, display: "flex", gap: 10, flexWrap: "wrap", flexShrink: 0 }}>
          <a
            href={project.github} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", flex: 1, minWidth: 140, alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 20px", borderRadius: 10, background: `${a}18`, border: `1px solid ${a}40`, color: "#fff", fontSize: 13.5, fontWeight: 600, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${a}28`; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${a}18`; e.currentTarget.style.transform = "none"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            View on GitHub
          </a>
          {project.demo != null && project.demo !== "" && (
            <a
              href={project.demo} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", flex: 1, minWidth: 140, alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 20px", borderRadius: 10, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06B6D4", fontSize: 13.5, fontWeight: 600, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.18)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,182,212,0.1)"; e.currentTarget.style.transform = "none"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              Live Demo
            </a>
          )}
          {project.postman != null && project.postman !== "" && (
            <a
              href={project.postman} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", flex: 1, minWidth: 140, alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 20px", borderRadius: 10, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.35)", color: "#34D399", fontSize: 13.5, fontWeight: 600, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(16,185,129,0.2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(16,185,129,0.12)"; e.currentTarget.style.transform = "none"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
              API Docs
            </a>
          )}
          <button
            onClick={close}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "11px 20px", borderRadius: 10, background: "rgba(200,216,240,0.05)", border: "1px solid rgba(200,216,240,0.12)", color: "rgba(200,216,240,0.5)", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit',sans-serif", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,216,240,0.1)"; e.currentTarget.style.color = "#C8D8F0"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,216,240,0.05)"; e.currentTarget.style.color = "rgba(200,216,240,0.5)"; }}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn  { from{opacity:0}  to{opacity:1} }
        @keyframes modalFadeOut { from{opacity:1}  to{opacity:0} }
        @keyframes modalSlideIn { from{opacity:0;transform:translateY(20px) scale(0.96)} to{opacity:1;transform:none} }
        @keyframes modalSlideOut{ from{opacity:1;transform:none} to{opacity:0;transform:translateY(16px) scale(0.97)} }
      `}</style>
    </div>
  );
};

export default ProjectDetailModal;
