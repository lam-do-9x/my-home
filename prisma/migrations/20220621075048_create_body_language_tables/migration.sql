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

-- AddForeignKey
ALTER TABLE "BodyLanguageEmotionsSelected" ADD CONSTRAINT "BodyLanguageEmotionsSelected_bodyLanguageId_fkey" FOREIGN KEY ("bodyLanguageId") REFERENCES "BodyLanguage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyLanguageEmotionsSelected" ADD CONSTRAINT "BodyLanguageEmotionsSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyLanguageTypesSelected" ADD CONSTRAINT "BodyLanguageTypesSelected_bodyLanguageId_fkey" FOREIGN KEY ("bodyLanguageId") REFERENCES "BodyLanguage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyLanguageTypesSelected" ADD CONSTRAINT "BodyLanguageTypesSelected_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Selected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
