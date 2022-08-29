-- CreateTable
CREATE TABLE "Dictionary" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "ipa" TEXT,
    "pronunciation" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "contentAt" TIMESTAMP(3),

    CONSTRAINT "Dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Improvisation" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "display" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Improvisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fashion" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fashion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selected" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Selected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FashionClothesSelected" (
    "fashionId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FashionClothesSelected_pkey" PRIMARY KEY ("fashionId","selectedId")
);

-- CreateTable
CREATE TABLE "FashionTypesSelected" (
    "fashionId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FashionTypesSelected_pkey" PRIMARY KEY ("fashionId","selectedId")
);

-- CreateTable
CREATE TABLE "BodyLanguage" (
    "id" SERIAL NOT NULL,
    "media" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BodyLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyLanguageEmotionsSelected" (
    "bodyLanguageId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BodyLanguageEmotionsSelected_pkey" PRIMARY KEY ("bodyLanguageId","selectedId")
);

-- CreateTable
CREATE TABLE "BodyLanguageTypesSelected" (
    "bodyLanguageId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BodyLanguageTypesSelected_pkey" PRIMARY KEY ("bodyLanguageId","selectedId")
);

-- CreateTable
CREATE TABLE "BodyLanguageExam" (
    "id" SERIAL NOT NULL,
    "question" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BodyLanguageExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reference" TEXT,
    "cover" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceiptIngredientsSelected" (
    "receiptId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReceiptIngredientsSelected_pkey" PRIMARY KEY ("receiptId","selectedId")
);

-- CreateTable
CREATE TABLE "ReceiptSessionsSelected" (
    "receiptId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReceiptSessionsSelected_pkey" PRIMARY KEY ("receiptId","selectedId")
);

-- CreateTable
CREATE TABLE "ReceiptMethodsSelected" (
    "receiptId" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReceiptMethodsSelected_pkey" PRIMARY KEY ("receiptId","selectedId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dictionary_word_key" ON "Dictionary"("word");

-- CreateIndex
CREATE UNIQUE INDEX "Improvisation_content_key" ON "Improvisation"("content");

-- CreateIndex
CREATE UNIQUE INDEX "Selected_value_key" ON "Selected"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Selected_label_key" ON "Selected"("label");

-- AddForeignKey
ALTER TABLE "FashionClothesSelected" ADD CONSTRAINT "FashionClothesSelected_fashionId_fkey" FOREIGN KEY ("fashionId") REFERENCES "Fashion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FashionClothesSelected" ADD CONSTRAINT "FashionClothesSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FashionTypesSelected" ADD CONSTRAINT "FashionTypesSelected_fashionId_fkey" FOREIGN KEY ("fashionId") REFERENCES "Fashion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FashionTypesSelected" ADD CONSTRAINT "FashionTypesSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyLanguageEmotionsSelected" ADD CONSTRAINT "BodyLanguageEmotionsSelected_bodyLanguageId_fkey" FOREIGN KEY ("bodyLanguageId") REFERENCES "BodyLanguage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyLanguageEmotionsSelected" ADD CONSTRAINT "BodyLanguageEmotionsSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyLanguageTypesSelected" ADD CONSTRAINT "BodyLanguageTypesSelected_bodyLanguageId_fkey" FOREIGN KEY ("bodyLanguageId") REFERENCES "BodyLanguage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyLanguageTypesSelected" ADD CONSTRAINT "BodyLanguageTypesSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyLanguageExam" ADD CONSTRAINT "BodyLanguageExam_question_fkey" FOREIGN KEY ("question") REFERENCES "BodyLanguage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptIngredientsSelected" ADD CONSTRAINT "ReceiptIngredientsSelected_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptIngredientsSelected" ADD CONSTRAINT "ReceiptIngredientsSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptSessionsSelected" ADD CONSTRAINT "ReceiptSessionsSelected_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptSessionsSelected" ADD CONSTRAINT "ReceiptSessionsSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptMethodsSelected" ADD CONSTRAINT "ReceiptMethodsSelected_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptMethodsSelected" ADD CONSTRAINT "ReceiptMethodsSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
