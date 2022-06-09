/*
  Warnings:

  - You are about to drop the column `name` on the `Selected` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `Selected` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `Selected` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Selected_name_key";

-- AlterTable
ALTER TABLE "Selected" DROP COLUMN "name",
ADD COLUMN     "label" TEXT,
ADD COLUMN     "value" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Selected_value_key" ON "Selected"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Selected_label_key" ON "Selected"("label");
