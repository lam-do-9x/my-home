-- AlterTable
ALTER TABLE "Dictionary" ADD COLUMN     "contentAt" TIMESTAMP(3);

-- RenameIndex
ALTER INDEX "Dictionary.word_unique" RENAME TO "Dictionary_word_key";
