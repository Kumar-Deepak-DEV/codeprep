const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// Mount central API router
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

module.exports = app;
