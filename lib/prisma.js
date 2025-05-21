import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };

// const { PrismaClient } = require('@/app/generated/prisma/client')

// export const prisma = new PrismaClient()