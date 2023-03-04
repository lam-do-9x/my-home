-- CreateTable
CREATE TABLE `TopicSentence` (
    `topicId` INTEGER NOT NULL,
    `sentenceId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`topicId`, `sentenceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
