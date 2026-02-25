import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const API_TARGET = "https://data.sundsvall.se";
const SMHI_TARGET = "https://opendata-download-metobs.smhi.se";

const app = express();

// Simple in-memory rate limiter
const hits = {};
const RATE_WINDOW = 60_000;
const RATE_LIMIT = 60;

// Proxy /api/* → data.sundsvall.se/api/*
app.use("/api", async (req, res) => {
  const ip = req.ip;
  const now = Date.now();
  if (!hits[ip] || now - hits[ip].start > RATE_WINDOW) {
    hits[ip] = { start: now, count: 1 };
  } else {
    hits[ip].count++;
  }
  if (hits[ip].count > RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const url = `${API_TARGET}/api${req.url}`;
  try {
    const upstream = await fetch(url, {
      headers: { "Accept": "application/json" },
    });
    res.status(upstream.status);
    res.set("Content-Type", upstream.headers.get("content-type") || "application/json");
    res.set("Cache-Control", "public, max-age=60");
    const body = await upstream.text();
    res.send(body);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(502).json({ error: "Upstream API unavailable" });
  }
});

// Proxy /smhi/* → opendata-download-metobs.smhi.se/*
app.use("/smhi", async (req, res) => {
  const ip = req.ip;
  const now = Date.now();
  if (!hits[ip] || now - hits[ip].start > RATE_WINDOW) {
    hits[ip] = { start: now, count: 1 };
  } else {
    hits[ip].count++;
  }
  if (hits[ip].count > RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const url = `${SMHI_TARGET}${req.url}`;
  try {
    const upstream = await fetch(url, {
      headers: { "Accept": "application/json" },
    });
    res.status(upstream.status);
    res.set("Content-Type", upstream.headers.get("content-type") || "application/json");
    res.set("Cache-Control", "public, max-age=300");
    const body = await upstream.text();
    res.send(body);
  } catch (err) {
    console.error("SMHI proxy error:", err.message);
    res.status(502).json({ error: "SMHI API unavailable" });
  }
});

// Serve static build
const distPath = join(__dirname, "..", "dist");
app.use(express.static(distPath));

// SPA fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Proxying /api/* → ${API_TARGET}`);
});
