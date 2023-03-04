-- CreateTable
CREATE TABLE `BodyLanguageExam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `examDate` DATETIME(3) NOT NULL,
    `correct` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
