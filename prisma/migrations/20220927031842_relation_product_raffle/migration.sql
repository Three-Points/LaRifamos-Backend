/*
  Warnings:

  - Added the required column `raffle_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "raffle_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
