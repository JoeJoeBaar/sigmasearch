
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
  res.json({
    name: "SigmaSearch",
    status: "online"
  });
});

app.get("/api/search", async (req, res) => {
  const q = String(req.query.q || "").trim();

  if (!q || q.length > 300) {
    return res.status(400).json({
      error: "Enter a search query."
    });
  }

  try {
    const url =
      "https://puri.li/api/search?q=" +
      encodeURIComponent(q);

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({
        error: "Search provider failed. Try again."
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Could not retrieve search results."
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("SigmaSearch is running!");
});
