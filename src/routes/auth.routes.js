const express = require("express");
const prisma = require("../lib/prisma");
const { verifyPassword } = require("../lib/password");
const { signToken } = require("../lib/jwt");
const { requireAuth } = require("../middleware/auth");

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: { assignments: true },
  });
  if (!user) return res.status(401).json({ error: "Incorrect username or password." });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Incorrect username or password." });

  const token = signToken(user);
  res.json({ token, user: serializeUser(user) });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: serializeUser(req.user) });
});

module.exports = router;
