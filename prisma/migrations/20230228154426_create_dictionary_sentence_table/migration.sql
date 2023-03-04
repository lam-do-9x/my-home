-- CreateTable
CREATE TABLE `DictionarySentence` (
    `dictionaryId` INTEGER NOT NULL,
    `sentenceId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`dictionaryId`, `sentenceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
