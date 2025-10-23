import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express()

const prisma = new PrismaClient();

app.use(cors())
app.use(express.json())
async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected successfully to PostgreSQL!");
  } catch (error) {
    console.error("❌ Prisma connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

app.listen(3000,() =>{
    console.log("server running on port 3000")
})