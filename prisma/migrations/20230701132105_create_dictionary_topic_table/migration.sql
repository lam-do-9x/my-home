-- CreateTable
CREATE TABLE `DictionaryTopic` (
    `dictionaryId` INTEGER NOT NULL,
    `topicId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`dictionaryId`, `topicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
