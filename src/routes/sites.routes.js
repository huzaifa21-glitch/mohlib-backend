const express = require("express");
const prisma = require("../lib/prisma");
const { requireAuth, requireAdmin, canAccessSite } = require("../middleware/auth");
const { nextSiteId } = require("../lib/slug");
const { withRunningBalance } = require("../lib/ledger");

const router = express.Router();

async function summarize(site) {
  const transactions = await prisma.transaction.findMany({
    where: { siteId: site.id },
    orderBy: { srNo: "asc" },
  });
  const totalReceipts = transactions.reduce((s, t) => s + Number(t.receipt), 0);
  const totalPayments = transactions.reduce((s, t) => s + Number(t.payment), 0);
  const rows = withRunningBalance(site.openingBalance, transactions);
  const balance = rows.length ? rows[rows.length - 1].balance : Number(site.openingBalance);
  const missingParticularCount = transactions.filter((t) => t.missingParticular).length;
  return {
    id: site.id,
    name: site.name,
    location: site.location,
    openingBalance: Number(site.openingBalance),
    totalReceipts,
    totalPayments,
    balance,
    count: transactions.length,
    missingParticularCount,
  };
}

// GET /api/sites — admins see everything, ordinary users see only what
// they're assigned to.
router.get("/", requireAuth, async (req, res) => {
  const where = req.user.role === "ADMIN"
    ? {}
    : { id: { in: req.user.assignments.map((a) => a.siteId) } };

  const sites = await prisma.site.findMany({ where, orderBy: { createdAt: "asc" } });
  const summaries = await Promise.all(sites.map(summarize));
  res.json({ sites: summaries });
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const { name, location } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: "Site name is required." });

  const id = await nextSiteId(prisma, name);
  const site = await prisma.site.create({
    data: { id, name: name.trim(), location: (location || "").trim() || null, openingBalance: 0 },
  });
  res.status(201).json({ site: await summarize(site) });
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const { name, location } = req.body;
  const site = await prisma.site.update({
    where: { id: req.params.id },
    data: {
      ...(name !== undefined ? { name: name.trim() } : {}),
      ...(location !== undefined ? { location: location.trim() || null } : {}),
    },
  });
  res.json({ site: await summarize(site) });
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await prisma.site.delete({ where: { id: req.params.id } }); // cascades to transactions and assignments
  res.status(204).end();
});

router.patch("/:id/opening-balance", requireAuth, async (req, res) => {
  if (!canAccessSite(req.user, req.params.id)) {
    return res.status(403).json({ error: "You don't have access to this site." });
  }
  const { amount } = req.body;
  const site = await prisma.site.update({
    where: { id: req.params.id },
    data: { openingBalance: Number(amount) || 0 },
  });
  res.json({ site: await summarize(site) });
});

module.exports = router;
