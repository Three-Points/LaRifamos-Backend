/*
  Warnings:

  - Added the required column `role` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMPANY', 'USER');

-- AlterTable
ALTER TABLE "account" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'USER';
