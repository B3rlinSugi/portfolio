/**
 * Vercel Edge Function — Spotify Now Playing
 * File location: /api/spotify.js  (or /api/spotify/route.js for Next.js App Router)
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://developer.spotify.com/dashboard → Create App
 * 2. Set Redirect URI to http://localhost/callback
 * 3. Get Authorization Code:
 *    Open this URL in browser (replace CLIENT_ID):
 *    https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost/callback&scope=user-read-currently-playing,user-read-playback-state
 * 4. After redirect, copy the ?code= param from URL
 * 5. Exchange for refresh token (run once in terminal):
 *    curl -X POST https://accounts.spotify.com/api/token \
 *      -H "Authorization: Basic BASE64(client_id:client_secret)" \
 *      -d "grant_type=authorization_code&code=CODE&redirect_uri=http://localhost/callback"
 * 6. Copy the refresh_token from the response
 * 7. Add these to Vercel Environment Variables:
 *    SPOTIFY_CLIENT_ID
 *    SPOTIFY_CLIENT_SECRET
 *    SPOTIFY_REFRESH_TOKEN
 */

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify env vars not configured");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, max-age=0");

  try {
    const accessToken = await getAccessToken();
    const spotifyRes = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 204 = nothing playing
    if (spotifyRes.status === 204) {
      return res.status(200).json({ isPlaying: false });
    }

    const track = await spotifyRes.json();

    if (!track || !track.item) {
      return res.status(200).json({ isPlaying: false });
    }

    return res.status(200).json({
      isPlaying: track.is_playing,
      title: track.item.name,
      artist: track.item.artists.map(a => a.name).join(", "),
      album: track.item.album.name,
      albumArt: track.item.album.images?.[0]?.url || null,
      songUrl: track.item.external_urls.spotify,
      progressMs: track.progress_ms,
      durationMs: track.item.duration_ms,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
