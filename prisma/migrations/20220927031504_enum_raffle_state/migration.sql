/*
  Warnings:

  - Added the required column `state` to the `raffle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RaffleState" AS ENUM ('WAITING', 'PASSED', 'REJECTED', 'CANCELED', 'FINISHED');

-- AlterTable
ALTER TABLE "raffle" ADD COLUMN "state" "RaffleState" NOT NULL DEFAULT 'WAITING';
