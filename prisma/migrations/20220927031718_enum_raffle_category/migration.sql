/*
  Warnings:

  - Added the required column `category` to the `raffle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RaffleCategory" AS ENUM ('cellphone', 'event', 'travel');

-- AlterTable
ALTER TABLE "raffle" ADD COLUMN     "category" "RaffleCategory" NOT NULL;
