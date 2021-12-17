-- CreateTable
CREATE TABLE "Dictionary" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "ipa" TEXT,
    "pronunciation" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dictionary.word_unique" ON "Dictionary"("word");
