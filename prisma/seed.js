// Populates a freshly migrated database with the same starting data your
// frontend's mock store (seedData.js) already has — the two users, the
// Nawabshah site, its 4 auto-tagged vendors, and its 62 real transactions.
// Safe to re-run: it skips anything that already exists rather than
// duplicating it.
const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../src/lib/password");
const { seedUsers, seedSites, seedVendors, seedSiteData } = require("./seedData.cjs");

const prisma = new PrismaClient();

// Old display refs ("VND-1001") -> the vendor row's real database id,
// filled in as we create each vendor, so transactions can be linked properly.
const vendorRefToDbId = {};

async function main() {
  for (const site of seedSites) {
    await prisma.site.upsert({
      where: { id: site.id },
      update: {},
      create: {
        id: site.id,
        name: site.name,
        location: site.location || null,
        openingBalance: seedSiteData[site.id]?.openingBalance ?? 0,
      },
    });
    console.log(`Site ready: ${site.name}`);
  }

  for (const v of seedVendors) {
    const existing = await prisma.vendor.findFirst({ where: { name: v.name } });
    const vendor = existing ?? (await prisma.vendor.create({ data: { name: v.name } }));
    vendorRefToDbId[v.id] = vendor.id;
  }
  console.log(`Vendors ready: ${seedVendors.length}`);

  for (const [siteId, data] of Object.entries(seedSiteData)) {
    const alreadyImported = await prisma.transaction.count({ where: { siteId } });
    if (alreadyImported > 0) {
      console.log(`Skipping transactions for ${siteId} — ${alreadyImported} already present.`);
      continue;
    }
    for (const t of data.transactions) {
      await prisma.transaction.create({
        data: {
          siteId,
          srNo: t.srNo,
          date: new Date(t.date),
          particular: t.particular,
          missingParticular: t.missingParticular,
          receipt: t.receipt,
          payment: t.payment,
          vendorId: t.vendorId ? vendorRefToDbId[t.vendorId] ?? null : null,
        },
      });
    }
    console.log(`Imported ${data.transactions.length} transactions for ${siteId}.`);
  }

  for (const u of seedUsers) {
    const existing = await prisma.user.findUnique({ where: { username: u.username } });
    if (existing) {
      console.log(`User already exists: ${u.username}`);
      continue;
    }
    const passwordHash = await hashPassword(u.password);
    await prisma.user.create({
      data: {
        username: u.username,
        passwordHash,
        name: u.name,
        role: u.role,
        assignments:
          u.role === "ADMIN"
            ? undefined
            : { create: u.assignedSiteIds.map((siteId) => ({ siteId })) },
      },
    });
    console.log(`User created: ${u.username} (password: ${u.password} — change this later)`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
