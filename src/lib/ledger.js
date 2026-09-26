// Display-ID formatting. The actual uniqueness guarantee is Postgres's
// autoincrement on `seqNo` (see schema.prisma) — this just renders it the
// way the frontend already expects (TXN-000001, VND-1001).
function formatTxnId(seqNo) {
  return `TXN-${String(seqNo).padStart(6, "0")}`;
}

function formatVendorRef(seqNo) {
  return `VND-${1000 + seqNo}`;
}

// Same rule as the old client-side withRunningBalance(): a day-book isn't
// re-sorted by date, entries are walked in the order they were recorded
// (srNo / insertion order), and each row's balance is the running total.
function withRunningBalance(openingBalance, transactions) {
  let balance = Number(openingBalance);
  return transactions.map((t) => {
    balance = balance + Number(t.receipt) - Number(t.payment);
    return { ...t, balance };
  });
}

function serializeTransaction(t) {
  return {
    txnId: formatTxnId(t.seqNo),
    srNo: t.srNo,
    date: t.date.toISOString().slice(0, 10),
    particular: t.particular,
    missingParticular: t.missingParticular,
    receipt: Number(t.receipt),
    payment: Number(t.payment),
    vendorId: t.vendorId ? formatVendorRef(t.vendor?.seqNo ?? 0) : "",
    balance: t.balance !== undefined ? t.balance : undefined,
  };
}

function serializeVendor(v) {
  return { id: formatVendorRef(v.seqNo), name: v.name };
}

// The frontend works with display refs ("VND-1001"), not internal uuids.
// This turns a submitted ref back into the vendor's real database id, so
// routes can accept exactly what the frontend already sends without the
// frontend needing to know uuids exist.
async function resolveVendorRef(prisma, vendorRef) {
  if (!vendorRef) return null;
  const seqNo = parseInt(String(vendorRef).replace(/\D/g, ""), 10) - 1000;
  if (isNaN(seqNo)) return null;
  const vendor = await prisma.vendor.findUnique({ where: { seqNo } });
  return vendor?.id ?? null;
}

module.exports = {
  formatTxnId,
  formatVendorRef,
  withRunningBalance,
  serializeTransaction,
  serializeVendor,
  resolveVendorRef,
};
