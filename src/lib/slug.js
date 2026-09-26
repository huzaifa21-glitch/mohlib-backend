async function nextSiteId(prisma, name) {
  const slug = name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  let id = `SITE-${slug || "NEW"}`;
  let n = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await prisma.site.findUnique({ where: { id } })) {
    id = `SITE-${slug || "NEW"}-${n++}`;
  }
  return id;
}

module.exports = { nextSiteId };
