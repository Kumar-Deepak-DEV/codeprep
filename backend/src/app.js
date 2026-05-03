const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes");

const app = express();

// Configurable CORS for local development and production deployment
const defaultOrigins = [
  "https://codeprep-dk.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000"
];

const envOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
      .map((origin) => origin.trim().replace(/\/+$/, ""))
      .filter(Boolean)
  : [];

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.trim().replace(/\/+$/, "");

    if (
      allowedOrigins.includes(normalizedOrigin) ||
      /^https:\/\/codeprep(-[a-z0-9-]+)?\.vercel\.app$/.test(normalizedOrigin)
    ) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Mount central API router
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

module.exports = app;
