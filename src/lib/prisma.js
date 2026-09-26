const { PrismaClient } = require("@prisma/client");

// One client for the whole process — creating a new PrismaClient per
// request exhausts your connection pool fast, especially on Neon's free
// tier where connection counts are limited.
const prisma = new PrismaClient();

module.exports = prisma;
