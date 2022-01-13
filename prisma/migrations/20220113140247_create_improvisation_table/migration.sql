-- CreateTable
CREATE TABLE "Improvisation" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "display" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Improvisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Improvisation_content_key" ON "Improvisation"("content");
