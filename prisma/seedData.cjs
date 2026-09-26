// Auto-generated from the cleaned December day-book (Nawabshah site).
// This file is the seed/mock data layer — swap it for real API calls
// once the backend exists; nothing else in the app should need to change.

// Two users for now, per your instructions: one admin (every site, plus user
// management), one ordinary user (only their assigned site). This becomes a
// real users table once the backend exists — the shape (id, username,
// password, name, role, assignedSiteIds) is written to survive that move.
// NEVER store real passwords in plaintext like this outside a mock/demo.
const seedUsers = [
  {
    id: "USR-ADMIN",
    username: "admin",
    password: "admin123",
    name: "Mohtashim",
    role: "ADMIN",
    assignedSiteIds: [], // irrelevant for admins — they see every site regardless
  },
  {
    id: "USR-001",
    username: "manager",
    password: "manager123",
    name: "Site Manager",
    role: "USER",
    assignedSiteIds: ["SITE-NAWABSHAH"],
  },
];

const seedSites = [
  { id: "SITE-NAWABSHAH", name: "Nawabshah Site", location: "Nawabshah, Sindh, Pakistan" },
];

const seedVendors = [
  { id: "VND-1001", name: "Khalid Rabbani" },
  { id: "VND-1002", name: "Shabir Shuttering" },
  { id: "VND-1003", name: "Azeem Raiti" },
  { id: "VND-1004", name: "Muola Bux" },
];

const seedSiteData = {
  "SITE-NAWABSHAH": {
    openingBalance: -76471,
    transactions: [
      { txnId: "TXN-000002", srNo: 2, date: "2026-12-01", particular: "Cement 160 bags", missingParticular: false, receipt: 0, payment: 235200, vendorId: "" },
      { txnId: "TXN-000003", srNo: 3, date: "2026-12-01", particular: "Khalid Rabbani", missingParticular: false, receipt: 14810, payment: 0, vendorId: "VND-1001" },
      { txnId: "TXN-000004", srNo: 4, date: "2026-12-04", particular: "Paid for cement", missingParticular: false, receipt: 235200, payment: 0, vendorId: "" },
      { txnId: "TXN-000005", srNo: 5, date: "2026-12-03", particular: "Expences for water rank", missingParticular: false, receipt: 0, payment: 24500, vendorId: "" },
      { txnId: "TXN-000006", srNo: 6, date: "2026-12-04", particular: "Received", missingParticular: false, receipt: 24500, payment: 0, vendorId: "" },
      { txnId: "TXN-000007", srNo: 7, date: "2026-12-08", particular: "Bolder", missingParticular: false, receipt: 47880, payment: 47880, vendorId: "" },
      { txnId: "TXN-000008", srNo: 8, date: "2026-12-08", particular: "Bricks", missingParticular: false, receipt: 0, payment: 48000, vendorId: "" },
      { txnId: "TXN-000009", srNo: 9, date: "2026-12-08", particular: "Cement 20 bags", missingParticular: false, receipt: 0, payment: 29400, vendorId: "" },
      { txnId: "TXN-000010", srNo: 10, date: "2026-12-08", particular: "Muola Bux", missingParticular: false, receipt: 0, payment: 5000, vendorId: "VND-1004" },
      { txnId: "TXN-000011", srNo: 11, date: "2026-12-08", particular: "Moulai", missingParticular: false, receipt: 0, payment: 7400, vendorId: "" },
      { txnId: "TXN-000012", srNo: 12, date: "2026-12-08", particular: "Fair (kiraya) N-K", missingParticular: false, receipt: 0, payment: 2400, vendorId: "" },
      { txnId: "TXN-000013", srNo: 13, date: "2026-12-08", particular: "Petrol", missingParticular: false, receipt: 0, payment: 750, vendorId: "" },
      { txnId: "TXN-000014", srNo: 14, date: "2026-12-08", particular: "Molai balance pay + meal", missingParticular: false, receipt: 0, payment: 21600, vendorId: "" },
      { txnId: "TXN-000015", srNo: 15, date: "2026-12-08", particular: "Muola Bux", missingParticular: false, receipt: 0, payment: 24000, vendorId: "VND-1004" },
      { txnId: "TXN-000016", srNo: 16, date: "2026-12-09", particular: "Excavation ST + El", missingParticular: false, receipt: 0, payment: 25100, vendorId: "" },
      { txnId: "TXN-000017", srNo: 17, date: "2026-12-10", particular: "Khalid Rabbani", missingParticular: false, receipt: 15550, payment: 0, vendorId: "VND-1001" },
      { txnId: "TXN-000018", srNo: 18, date: "2026-12-10", particular: null, missingParticular: true, receipt: 27000, payment: 0, vendorId: "" },
      { txnId: "TXN-000019", srNo: 19, date: "2026-12-11", particular: "Mix + crush", missingParticular: false, receipt: 0, payment: 82000, vendorId: "" },
      { txnId: "TXN-000020", srNo: 20, date: "2026-12-10", particular: "Shabir shuttering", missingParticular: false, receipt: 100000, payment: 100000, vendorId: "VND-1002" },
      { txnId: "TXN-000021", srNo: 21, date: "2026-12-09", particular: "Ststionary", missingParticular: false, receipt: 0, payment: 470, vendorId: "" },
      { txnId: "TXN-000022", srNo: 22, date: "2026-12-09", particular: "petrol for pump", missingParticular: false, receipt: 0, payment: 200, vendorId: "" },
      { txnId: "TXN-000023", srNo: 23, date: "2026-12-09", particular: "Milk", missingParticular: false, receipt: 0, payment: 150, vendorId: "" },
      { txnId: "TXN-000024", srNo: 24, date: "2026-12-09", particular: "Cutting of RCC foudation", missingParticular: false, receipt: 0, payment: 1000, vendorId: "" },
      { txnId: "TXN-000025", srNo: 25, date: "2026-12-10", particular: "Diesel", missingParticular: false, receipt: 0, payment: 2000, vendorId: "" },
      { txnId: "TXN-000026", srNo: 26, date: "2026-12-10", particular: "Air filling ", missingParticular: false, receipt: 0, payment: 200, vendorId: "" },
      { txnId: "TXN-000027", srNo: 27, date: "2026-12-10", particular: "Plaster and Block Masonry", missingParticular: false, receipt: 0, payment: 7600, vendorId: "" },
      { txnId: "TXN-000028", srNo: 28, date: "2026-12-10", particular: "Mason starter making", missingParticular: false, receipt: 0, payment: 3000, vendorId: "" },
      { txnId: "TXN-000029", srNo: 29, date: "2026-12-10", particular: "FareKiraya N-K", missingParticular: false, receipt: 0, payment: 2400, vendorId: "" },
      { txnId: "TXN-000030", srNo: 30, date: "2026-12-10", particular: "Petrol Kr.", missingParticular: false, receipt: 0, payment: 500, vendorId: "" },
      { txnId: "TXN-000031", srNo: 31, date: "2026-12-10", particular: "Lohar", missingParticular: false, receipt: 0, payment: 10000, vendorId: "" },
      { txnId: "TXN-000032", srNo: 32, date: "2026-12-15", particular: "Cement Liaqat", missingParticular: false, receipt: 66800, payment: 66800, vendorId: "" },
      { txnId: "TXN-000033", srNo: 33, date: "2026-12-15", particular: "Khalid Rabbani", missingParticular: false, receipt: 18000, payment: 0, vendorId: "VND-1001" },
      { txnId: "TXN-000034", srNo: 34, date: "2026-12-15", particular: "Khalid Rabbani", missingParticular: false, receipt: 10000, payment: 0, vendorId: "VND-1001" },
      { txnId: "TXN-000035", srNo: 35, date: "2026-12-15", particular: "Azeem Raiti", missingParticular: false, receipt: 82000, payment: 0, vendorId: "VND-1003" },
      { txnId: "TXN-000036", srNo: 36, date: "2026-12-15", particular: "Amjad Ghori", missingParticular: false, receipt: 48000, payment: 48000, vendorId: "" },
      { txnId: "TXN-000037", srNo: 37, date: "2026-12-17", particular: "Khalid Rabbani", missingParticular: false, receipt: 40000, payment: 0, vendorId: "VND-1001" },
      { txnId: "TXN-000038", srNo: 38, date: "2026-12-17", particular: "Cement H, Liaqat", missingParticular: false, receipt: 0, payment: 205800, vendorId: "" },
      { txnId: "TXN-000039", srNo: 39, date: "2026-12-18", particular: "Mix truck + troly", missingParticular: false, receipt: 0, payment: 51000, vendorId: "" },
      { txnId: "TXN-000040", srNo: 40, date: "2026-12-19", particular: "Payment for starter + Bricks sht.", missingParticular: false, receipt: 0, payment: 5000, vendorId: "" },
      { txnId: "TXN-000041", srNo: 41, date: "2026-12-22", particular: "Shabir Shuttering", missingParticular: false, receipt: 8000, payment: 8000, vendorId: "VND-1002" },
      { txnId: "TXN-000042", srNo: 42, date: "2026-12-19", particular: "Excavtion Soling lean Partial", missingParticular: false, receipt: 0, payment: 10000, vendorId: "" },
      { txnId: "TXN-000043", srNo: 43, date: "2026-12-16", particular: "Pit excavation + soling +lean", missingParticular: false, receipt: 0, payment: 28000, vendorId: "" },
      { txnId: "TXN-000044", srNo: 44, date: "2026-12-24", particular: "Azeem Raiti", missingParticular: false, receipt: 51000, payment: 0, vendorId: "VND-1003" },
      { txnId: "TXN-000045", srNo: 45, date: "2026-12-24", particular: "Liaqat ali Cement", missingParticular: false, receipt: 20500, payment: 0, vendorId: "" },
      { txnId: "TXN-000046", srNo: 46, date: "2026-12-24", particular: "Pit excavation + soling +lean", missingParticular: false, receipt: 0, payment: 24000, vendorId: "" },
      { txnId: "TXN-000047", srNo: 47, date: "2026-12-24", particular: "Diesel", missingParticular: false, receipt: 0, payment: 5000, vendorId: "" },
      { txnId: "TXN-000048", srNo: 48, date: "2026-12-24", particular: "Shabir shuttering", missingParticular: false, receipt: 0, payment: 15000, vendorId: "VND-1002" },
      { txnId: "TXN-000049", srNo: 49, date: "2026-12-25", particular: "Shabir shuttering", missingParticular: false, receipt: 15000, payment: 0, vendorId: "VND-1002" },
      { txnId: "TXN-000050", srNo: 50, date: "2026-12-25", particular: "Azeem Raiti", missingParticular: false, receipt: 51000, payment: 0, vendorId: "VND-1003" },
      { txnId: "TXN-000051", srNo: 51, date: "2026-12-25", particular: "Khalid Rabbani", missingParticular: false, receipt: 10000, payment: 0, vendorId: "VND-1001" },
      { txnId: "TXN-000052", srNo: 52, date: "2026-12-26", particular: "Abdul Moiz (ahsan)", missingParticular: false, receipt: 40000, payment: 0, vendorId: "" },
      { txnId: "TXN-000053", srNo: 53, date: "2026-12-28", particular: "Liqaqat Ali Cement", missingParticular: false, receipt: 29400, payment: 29400, vendorId: "" },
      { txnId: "TXN-000054", srNo: 54, date: "2026-12-28", particular: "Excavation of pits, lean & marking", missingParticular: false, receipt: 0, payment: 12000, vendorId: "" },
      { txnId: "TXN-000055", srNo: 55, date: "2026-12-28", particular: "Excavation of connecting pits", missingParticular: false, receipt: 0, payment: 28000, vendorId: "" },
      { txnId: "TXN-000056", srNo: 56, date: "2026-12-28", particular: "Diesel", missingParticular: false, receipt: 0, payment: 5000, vendorId: "" },
      { txnId: "TXN-000057", srNo: 57, date: "2026-12-28", particular: "Shabir shuttering", missingParticular: false, receipt: 0, payment: 50000, vendorId: "VND-1002" },
      { txnId: "TXN-000058", srNo: 58, date: "2026-12-28", particular: "Iron smith", missingParticular: false, receipt: 0, payment: 20000, vendorId: "" },
      { txnId: "TXN-000059", srNo: 59, date: "2026-12-30", particular: "Fair (kiraya) N-K", missingParticular: false, receipt: 0, payment: 2400, vendorId: "" },
      { txnId: "TXN-000060", srNo: 60, date: "2026-12-30", particular: "Tyre for troly", missingParticular: false, receipt: 0, payment: 4500, vendorId: "" },
      { txnId: "TXN-000061", srNo: 61, date: "2026-12-30", particular: "Mola bux for gas", missingParticular: false, receipt: 0, payment: 1100, vendorId: "" },
      { txnId: "TXN-000062", srNo: 62, date: "2026-12-30", particular: "Petrol Karachi", missingParticular: false, receipt: 0, payment: 500, vendorId: "" },
      { txnId: "TXN-000063", srNo: 63, date: "2026-12-30", particular: "Khalid Rabbani", missingParticular: false, receipt: 22120, payment: 0, vendorId: "VND-1001" },
    ],
  },
};

module.exports = { seedUsers, seedSites, seedVendors, seedSiteData };
