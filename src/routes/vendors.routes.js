const express = require("express");
const prisma = require("../lib/prisma");
const { requireAuth } = require("../middleware/auth");
const { serializeVendor } = require("../lib/ledger");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const vendors = await prisma.vendor.findMany({ orderBy: { seqNo: "asc" } });
  res.json({ vendors: vendors.map(serializeVendor) });
});

router.post("/", requireAuth, async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: "Vendor name is required." });
  const vendor = await prisma.vendor.create({ data: { name: name.trim() } });
  res.status(201).json({ vendor: serializeVendor(vendor) });
});

module.exports = router;
