/*
  Warnings:

  - Added the required column `state` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductState" AS ENUM ('new', 'used');

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "state" "ProductState" NOT NULL;
