/*
  Warnings:

  - You are about to drop the column `clothes` on the `Fashion` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Fashion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fashion" DROP COLUMN "clothes",
DROP COLUMN "type";

-- CreateTable
CREATE TABLE "Selected" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Selected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FashionClothesSelected" (
    "fashionId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FashionClothesSelected_pkey" PRIMARY KEY ("fashionId","selectedId")
);

-- CreateTable
CREATE TABLE "FashionTypesSelected" (
    "fashionId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FashionTypesSelected_pkey" PRIMARY KEY ("fashionId","selectedId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Selected_name_key" ON "Selected"("name");

-- AddForeignKey
ALTER TABLE "FashionClothesSelected" ADD CONSTRAINT "FashionClothesSelected_fashionId_fkey" FOREIGN KEY ("fashionId") REFERENCES "Fashion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FashionClothesSelected" ADD CONSTRAINT "FashionClothesSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FashionTypesSelected" ADD CONSTRAINT "FashionTypesSelected_fashionId_fkey" FOREIGN KEY ("fashionId") REFERENCES "Fashion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FashionTypesSelected" ADD CONSTRAINT "FashionTypesSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
