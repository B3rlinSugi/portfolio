import { useMemo, useState } from "react";
import { data } from "../data/portfolioData";

const OpenApiViewer = () => {
  const openApiProjects = useMemo(
    () => data.projects.filter((p) => p.openApi),
    []
  );

  const [selected, setSelected] = useState(openApiProjects[0]?.openApi || "");
  const [embedBlocked, setEmbedBlocked] = useState(false);

  const source = openApiProjects.find((p) => p.openApi === selected);

  const openApiStatus = !selected
    ? "idle"
    : embedBlocked
    ? "unavailable"
    : "available";

  return (
    <section
      id="openapi-viewer"
      style={{
        background: "var(--navy-2)",
        borderTop: "1px solid rgba(59,130,246,0.08)",
        padding: "70px 0",
      }}
    >
      <p className="s-label" style={{ color: "#A5B4FC", fontFamily: "'JetBrains Mono',monospace" }}>
        &lt;docs /&gt;
      </p>
      <h2 className="s-title" style={{ marginBottom: 20 }}>
        OpenAPI / Swagger Viewer
      </h2>

      {openApiProjects.length === 0 ? (
        <p style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
          No OpenAPI endpoints are available in project metadata.
        </p>
      ) : (
        <>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)" }}>
            Select API specification:
            <select
              value={selected}
              onChange={(e) => {
                setSelected(e.target.value);
                setEmbedBlocked(false);
              }}
              style={{
                background: "rgba(15,31,56,0.82)",
                border: "1px solid rgba(59,130,246,0.25)",
                borderRadius: 8,
                color: "var(--white)",
                padding: "5px 8px",
              }}
            >
              {openApiProjects.map((p) => (
                <option key={p.title} value={p.openApi}>
                  {p.title}
                </option>
              ))}
            </select>
          </label>

          {selected ? (
            <>
              <div style={{ marginBottom: 10, fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", display: "flex", alignItems: "center", gap: 8 }}>
                <span>Preview tertutup oleh X-Frame-Options/CSP untuk beberapa URL.</span>
                <a href={selected} target="_blank" rel="noreferrer" style={{ color: "#93C5FD", textDecoration: "underline" }}>
                  Buka OpenAPI langsung di tab baru
                </a>
              </div>

              <iframe
                title="OpenAPI Viewer"
                src={`https://petstore.swagger.io/?url=${encodeURIComponent(selected)}`}
                style={{ width: "100%", height: "650px", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 12 }}
                onError={() => {
                  setEmbedBlocked(true);
                }}
              />

              <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
                Status openapi: {openApiStatus === "checking" ? "Memeriksa..." : ""}
                {openApiStatus === "available" && "Tersedia"}
                {openApiStatus === "not_found" && "404 - Endpoint tidak ditemukan (cek alamat openApi di data)"}
                {openApiStatus === "unavailable" && "Tidak bisa diakses (CORS/dibatasi atau server down)."}
                {openApiStatus === "idle" && "Pilih API untuk memulai."}
              </div>

              {(embedBlocked || openApiStatus === "not_found" || openApiStatus === "unavailable") && (
                <div style={{ marginTop: 14, padding: 14, borderRadius: 10, border: "1px solid rgba(244,63,94,0.35)", background: "rgba(244,63,94,0.08)", color: "#FCA5A5" }}>
                  <strong>Embedded preview gagal dimuat.</strong> Coba link langsung atau ganti ke endpoint OpenAPI yang aktif.
                  <br />
                  Klik:
                  <a href={selected} target="_blank" rel="noreferrer" style={{ color: "#93C5FD", textDecoration: "underline", marginLeft: 6 }}>
                    {selected}
                  </a>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
              Choose an OpenAPI URL to preview.
            </p>
          )}

          {source && (
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>
              Source: {source.title} • {source.openApi}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default OpenApiViewer;
