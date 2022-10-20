/*
  Warnings:

  - Added the required column `raffleId` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "raffleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
