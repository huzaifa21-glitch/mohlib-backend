const express = require("express");
const prisma = require("../lib/prisma");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { hashPassword } = require("../lib/password");

const router = express.Router();

function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    assignedSiteIds: (user.assignments || []).map((a) => a.siteId),
  };
}

router.use(requireAuth, requireAdmin);

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    include: { assignments: true },
    orderBy: { createdAt: "asc" },
  });
  res.json({ users: users.map(serializeUser) });
});

router.post("/", async (req, res) => {
  const { username, password, name, role, assignedSiteIds } = req.body;
  if (!username || !password || !name) {
    return res.status(400).json({ error: "Username, password and name are required." });
  }
  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) return res.status(409).json({ error: "Username already taken." });

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username: username.trim(),
      passwordHash,
      name: name.trim(),
      role: role === "ADMIN" ? "ADMIN" : "USER",
      assignments:
        role === "ADMIN"
          ? undefined
          : { create: (assignedSiteIds || []).map((siteId) => ({ siteId })) },
    },
    include: { assignments: true },
  });
  res.status(201).json({ user: serializeUser(user) });
});

router.patch("/:id", async (req, res) => {
  const { username, name, role, password, assignedSiteIds } = req.body;
  const data = {};
  if (username !== undefined) data.username = username.trim();
  if (name !== undefined) data.name = name.trim();
  if (role !== undefined) data.role = role === "ADMIN" ? "ADMIN" : "USER";
  if (password) data.passwordHash = await hashPassword(password);

  if (assignedSiteIds !== undefined) {
    // Replace the whole assignment set rather than diffing — simplest
    // correct behavior for a small admin list like this.
    await prisma.userSiteAssignment.deleteMany({ where: { userId: req.params.id } });
    if (role !== "ADMIN" && assignedSiteIds.length) {
      data.assignments = { create: assignedSiteIds.map((siteId) => ({ siteId })) };
    }
  }

  const user = await prisma.user.update({
    where: { id: req.params.id },
    data,
    include: { assignments: true },
  });
  res.json({ user: serializeUser(user) });
});

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.user.id) {
    return res.status(400).json({ error: "You can't delete your own account while signed in as it." });
  }
  await prisma.user.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = router;
