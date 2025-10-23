import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected successfully to PostgreSQL!");
  } catch (error) {
    console.error("❌ Prisma connection failed:", error);
  } 
}