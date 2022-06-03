-- CreateTable
CREATE TABLE "Fashion" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "clothes" JSONB,
    "type" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fashion_pkey" PRIMARY KEY ("id")
);
