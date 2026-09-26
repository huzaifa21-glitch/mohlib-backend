const { verifyToken } = require("../lib/jwt");
const prisma = require("../lib/prisma");

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not signed in." });

  try {
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { assignments: true },
    });
    if (!user) return res.status(401).json({ error: "Session no longer valid." });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Session expired or invalid — please sign in again." });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin access required." });
  }
  next();
}

// A user can act on a site if they're an admin, or if they have an
// assignment row for it. Attaches nothing — just a yes/no check routes call.
function canAccessSite(user, siteId) {
  if (user.role === "ADMIN") return true;
  return user.assignments.some((a) => a.siteId === siteId);
}

module.exports = { requireAuth, requireAdmin, canAccessSite };
