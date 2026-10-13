
const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("SigmaSearch backend is online!");
});

app.get("/api/health", (req, res) => {
  res.json({
    name: "SigmaSearch",
    status: "online"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SigmaSearch running on port ${PORT}`);
});
