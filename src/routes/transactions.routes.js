const express = require("express");
const prisma = require("../lib/prisma");
const { requireAuth, canAccessSite } = require("../middleware/auth");
const {
  withRunningBalance,
  serializeTransaction,
  resolveVendorRef,
} = require("../lib/ledger");

const router = express.Router({ mergeParams: true });

async function loadSiteOr404(req, res, next) {
  const site = await prisma.site.findUnique({ where: { id: req.params.siteId } });
  if (!site) return res.status(404).json({ error: "Site not found." });
  if (!canAccessSite(req.user, site.id)) {
    return res.status(403).json({ error: "You don't have access to this site." });
  }
  req.site = site;
  next();
}

router.use(requireAuth, loadSiteOr404);

router.get("/", async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    where: { siteId: req.site.id },
    include: { vendor: true },
    orderBy: { srNo: "asc" },
  });
  const rows = withRunningBalance(req.site.openingBalance, transactions);
  res.json({
    openingBalance: Number(req.site.openingBalance),
    transactions: rows.map((t, i) => serializeTransaction({ ...transactions[i], balance: t.balance })),
  });
});

router.post("/", async (req, res) => {
  const { date, particular, receipt, payment, vendorId } = req.body;
  if (!date) return res.status(400).json({ error: "Date is required." });

  const last = await prisma.transaction.findFirst({
    where: { siteId: req.site.id },
    orderBy: { srNo: "desc" },
  });
  const srNo = (last?.srNo ?? 0) + 1;
  const resolvedVendorId = await resolveVendorRef(prisma, vendorId);
  const trimmedParticular = (particular || "").trim();

  const created = await prisma.transaction.create({
    data: {
      siteId: req.site.id,
      srNo,
      date: new Date(date),
      particular: trimmedParticular || null,
      missingParticular: !trimmedParticular,
      receipt: Number(receipt) || 0,
      payment: Number(payment) || 0,
      vendorId: resolvedVendorId,
    },
    include: { vendor: true },
  });
  res.status(201).json({ transaction: serializeTransaction(created) });
});

router.patch("/:txnId", async (req, res) => {
  const seqNo = parseInt(String(req.params.txnId).replace(/\D/g, ""), 10);
  const existing = await prisma.transaction.findFirst({ where: { seqNo, siteId: req.site.id } });
  if (!existing) return res.status(404).json({ error: "Transaction not found on this site." });

  const { date, particular, receipt, payment, vendorId } = req.body;
  const data = {};
  if (date !== undefined) data.date = new Date(date);
  if (particular !== undefined) {
    const trimmed = (particular || "").trim();
    data.particular = trimmed || null;
    data.missingParticular = !trimmed;
  }
  if (receipt !== undefined) data.receipt = Number(receipt) || 0;
  if (payment !== undefined) data.payment = Number(payment) || 0;
  if (vendorId !== undefined) data.vendorId = await resolveVendorRef(prisma, vendorId);

  const updated = await prisma.transaction.update({
    where: { id: existing.id },
    data,
    include: { vendor: true },
  });
  res.json({ transaction: serializeTransaction(updated) });
});

router.delete("/:txnId", async (req, res) => {
  const seqNo = parseInt(String(req.params.txnId).replace(/\D/g, ""), 10);
  const existing = await prisma.transaction.findFirst({ where: { seqNo, siteId: req.site.id } });
  if (!existing) return res.status(404).json({ error: "Transaction not found on this site." });
  await prisma.transaction.delete({ where: { id: existing.id } });
  res.status(204).end();
});

module.exports = router;
