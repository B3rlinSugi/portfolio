import { useEffect, useState, useRef } from "react";

/* ─────────────────────────────────────────────
   Spotify Now Playing Widget
   
   HOW TO SET UP:
   1. Go to https://developer.spotify.com/dashboard
   2. Create an app → get Client ID + Client Secret
   3. Get refresh token (use: https://github.com/bih/spotify-token-swap-service
      or the quick method at: https://accounts.spotify.com/authorize?... )
   4. Create a small backend endpoint (e.g. Vercel Edge Function) at /api/spotify
      that fetches from Spotify API using your refresh token.
   5. Update SPOTIFY_API_URL below.

   DEMO MODE: When no API is configured, shows a simulated "offline" state.
   The widget auto-hides when nothing is playing.
───────────────────────────────────────────── */

// Replace this with your actual Vercel API route once set up
// e.g. "https://berlinsugi.vercel.app/api/spotify"
const SPOTIFY_API_URL = "/api/spotify";

// Demo/fallback data shown when API is not yet configured
const DEMO_TRACK = null; // Set to null to hide when not configured

async function fetchNowPlaying() {
  const res = await fetch(SPOTIFY_API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("not configured");
  const data = await res.json();
  return data;
}

const SpotifyBars = ({ playing }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14, flexShrink: 0 }}>
    {[1, 0.6, 0.9, 0.4, 0.8].map((h, i) => (
      <div key={i} style={{
        width: 2.5, borderRadius: 2,
        background: "#1DB954",
        height: playing ? undefined : `${h * 14}px`,
        animation: playing ? `spotBar${i} ${0.7 + i * 0.15}s ease-in-out infinite alternate` : "none",
        transition: "height 0.3s ease",
      }} />
    ))}
    <style>{`
      @keyframes spotBar0{from{height:3px}to{height:13px}}
      @keyframes spotBar1{from{height:5px}to{height:10px}}
      @keyframes spotBar2{from{height:2px}to{height:14px}}
      @keyframes spotBar3{from{height:6px}to{height:9px}}
      @keyframes spotBar4{from{height:3px}to{height:12px}}
    `}</style>
  </div>
);

const SpotifyWidget = () => {
  const [track, setTrack] = useState(DEMO_TRACK);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  // Poll every 30s
  useEffect(() => {
    const poll = async () => {
      try {
        const data = await fetchNowPlaying();
        setConfigured(true);
        if (data.isPlaying && data.title) {
          setTrack(data);
          setVisible(true);
          setProgress(data.progressMs && data.durationMs
            ? (data.progressMs / data.durationMs) * 100 : 0);
        } else {
          setTrack(null);
          setVisible(false);
        }
      } catch {
        // API not configured yet — silently hide
        setConfigured(false);
        setVisible(false);
      }
    };
    poll();
    intervalRef.current = setInterval(poll, 30000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Progress bar tick
  useEffect(() => {
    if (!track?.isPlaying || !track?.durationMs) return;
    const tick = setInterval(() => {
      setProgress(p => Math.min(p + (100 / (track.durationMs / 1000)), 100));
    }, 1000);
    return () => clearInterval(tick);
  }, [track]);

  // Not configured or nothing playing → show setup hint in dev mode only
  if (!configured && !DEMO_TRACK) {
    // Show a subtle "Spotify not configured" badge in dev (localhost)
    const isDev = window.location.hostname === "localhost";
    if (!isDev) return null;
    return (
      <div style={{
        position: "fixed", bottom: 130, left: 20, zIndex: 100,
        background: "rgba(15,31,56,0.9)", border: "1px solid rgba(29,185,84,0.2)",
        borderRadius: 10, padding: "8px 12px",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
        color: "rgba(29,185,84,0.5)",
        backdropFilter: "blur(12px)",
      }}>
        🎵 Spotify: <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noreferrer" style={{ color: "#1DB954", textDecoration: "none" }}>setup needed</a>
      </div>
    );
  }

  if (!visible || !track) return null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: 130, left: 20, zIndex: 100,
        width: minimized ? 44 : "min(280px, calc(100vw - 40px))",
        borderRadius: 14, overflow: "hidden",
        background: "rgba(6,14,30,0.95)",
        border: "1px solid rgba(29,185,84,0.25)",
        boxShadow: hovered
          ? "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(29,185,84,0.15)"
          : "0 8px 32px rgba(0,0,0,0.4)",
        backdropFilter: "blur(20px)",
        transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
        cursor: "default",
      }}
    >
      {minimized ? (
        // Minimized: just icon
        <div onClick={() => setMinimized(false)}
          style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <SpotifyBars playing={track?.isPlaying} />
        </div>
      ) : (
        <>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px 6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span style={{ fontSize: 9.5, fontFamily: "'JetBrains Mono',monospace", color: "#1DB954", fontWeight: 700, letterSpacing: "1px" }}>
                NOW PLAYING
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <SpotifyBars playing={track?.isPlaying} />
              <button onClick={() => setMinimized(true)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(200,216,240,0.3)", padding: 2, display: "flex", lineHeight: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>

          {/* Track info */}
          <div style={{ display: "flex", gap: 10, padding: "0 12px 10px", alignItems: "center" }}>
            {track.albumArt ? (
              <img src={track.albumArt} alt={track.album}
                style={{ width: 44, height: 44, borderRadius: 6, objectFit: "cover", flexShrink: 0, border: "1px solid rgba(29,185,84,0.2)" }} />
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: 6, background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(29,185,84,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="18" r="3"/><circle cx="18" cy="15" r="3"/>
                  <polyline points="12 18 12 5 21 2 21 15"/>
                </svg>
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#F0F6FF", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {track.title}
              </div>
              <div style={{ fontSize: 10.5, color: "#6B84A8", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {track.artist}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {track.durationMs && (
            <div style={{ height: 2, background: "rgba(29,185,84,0.1)", marginBottom: 2 }}>
              <div style={{ height: "100%", background: "#1DB954", width: `${progress}%`, transition: "width 1s linear" }} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SpotifyWidget;
