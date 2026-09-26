require("dotenv").config();
require("express-async-errors"); // lets async route handlers' rejections reach the error handler below, since Express 4 doesn't do this on its own
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const siteRoutes = require("./routes/sites.routes");
const transactionRoutes = require("./routes/transactions.routes");
const vendorRoutes = require("./routes/vendors.routes");
const userRoutes = require("./routes/users.routes");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/sites/:siteId/transactions", transactionRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/users", userRoutes);

// Centralized error handler — anything thrown/rejected in a route lands
// here instead of crashing the process or leaking a raw stack trace.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
  if (err.code === "P2002") return res.status(409).json({ error: "That value is already in use." });
  res.status(500).json({ error: "Something went wrong on our end." });
});

const port = process.env.PORT || 4000;

// Only bind a port when this file is run directly (local dev with `node
// src/index.js` or `npm run dev`). On Vercel, this file is imported as a
// serverless function handler instead — Vercel calls the exported Express
// app directly per request, so listening on a port here would be pointless
// (and is skipped via the check below).
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

module.exports = app;