/*
  Warnings:

  - Added the required column `state` to the `raffle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RaffleState" AS ENUM ('waiting', 'passed', 'rejected', 'canceled', 'finished');

-- AlterTable
ALTER TABLE "raffle" ADD COLUMN     "state" "RaffleState" NOT NULL;
