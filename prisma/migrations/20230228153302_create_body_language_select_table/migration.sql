-- CreateTable
CREATE TABLE `BodyLanguageEmotionsSelect` (
    `bodyLanguageId` INTEGER NOT NULL,
    `selectId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`bodyLanguageId`, `selectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BodyLanguageTypesSelect` (
    `bodyLanguageId` INTEGER NOT NULL,
    `selectId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`bodyLanguageId`, `selectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
