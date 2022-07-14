/*
  Warnings:

  - You are about to drop the column `notes` on the `Receipt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "notes",
ADD COLUMN     "note" TEXT,
ADD COLUMN     "reference" TEXT;
