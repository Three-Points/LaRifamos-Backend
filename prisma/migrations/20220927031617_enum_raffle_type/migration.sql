/*
  Warnings:

  - Added the required column `type` to the `raffle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RaffleType" AS ENUM ('COMMON', 'COMBO');

-- AlterTable
ALTER TABLE "raffle" ADD COLUMN "type" "RaffleType" NOT NULL DEFAULT 'COMMON';
