import { PrismaClient, Prisma } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

function prismaErrorCode(code, item = "") {
  return {
    P2002: `Unique constraint failed on the ${item}`,
    P2025: "Record to delete does not exist.",
  }[code];
}

export { prisma, Prisma, prismaErrorCode };
