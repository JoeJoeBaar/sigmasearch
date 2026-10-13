
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("SigmaSearch backend is online!");
});

app.get("/api/health", (req, res) => {
  res.json({ name: "SigmaSearch", status: "online" });
});

app.get("/api/search", (req, res) => {
  const query = String(req.query.q || "").trim();

  if (!query || query.length > 300) {
    return res.status(400).json({ error: "Enter a search query under 300 characters." });
  }

  res.redirect(
    302,
    "https://html.duckduckgo.com/html/?q=" + encodeURIComponent(query)
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SigmaSearch running on port ${PORT}`);
});
