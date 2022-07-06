-- CreateTable
CREATE TABLE "BodyLanguageExam" (
    "id" SERIAL NOT NULL,
    "question" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BodyLanguageExam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BodyLanguageExam" ADD CONSTRAINT "BodyLanguageExam_question_fkey" FOREIGN KEY ("question") REFERENCES "BodyLanguage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
