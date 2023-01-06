/*
  Warnings:

  - Added the required column `topicId` to the `Dictionary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Dictionary` ADD COLUMN `topicId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `content` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Topic_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
