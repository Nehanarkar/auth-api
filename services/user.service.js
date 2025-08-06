const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function findUserByEmail(email) {
  return prisma.admin.findUnique({ where: { email } });
}

async function createUserByEmailAndPassword({ email, password }) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name: "Admin", // Placeholder, replace with dynamic name if needed
    },
  });
}

async function findUserById(id) {
  return prisma.admin.findUnique({ where: { id } });
}

module.exports = {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
};