-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cover" TEXT,
    "notes" TEXT,
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
