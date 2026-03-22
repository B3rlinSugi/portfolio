export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const clientId     = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(500).json({ error: "Missing env vars" });
  }

  try {
    // Step 1: Get access token
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
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

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(500).json({ error: "Failed to get access token", detail: tokenData });
    }

    // Step 2: Get currently playing
    const spotifyRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (spotifyRes.status === 204 || spotifyRes.status === 404) {
      return res.status(200).json({ isPlaying: false });
    }

    const track = await spotifyRes.json();

    if (!track || !track.item) {
      return res.status(200).json({ isPlaying: false });
    }

    return res.status(200).json({
      isPlaying:   track.is_playing,
      title:       track.item.name,
      artist:      track.item.artists.map(a => a.name).join(", "),
      album:       track.item.album.name,
      albumArt:    track.item.album.images?.[0]?.url || null,
      songUrl:     track.item.external_urls.spotify,
      progressMs:  track.progress_ms,
      durationMs:  track.item.duration_ms,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
