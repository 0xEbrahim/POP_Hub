import { PrismaClient } from "@Shared/prisma-client/client";

const prisma = new PrismaClient();
export const testPrismaConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected successfully to the database");
  } catch (err) {
    console.error("Prisma connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
};

export { prisma };
