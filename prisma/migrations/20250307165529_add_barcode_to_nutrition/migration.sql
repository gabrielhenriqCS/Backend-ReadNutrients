/*
  Warnings:

  - Added the required column `barcode` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nutrition" ADD COLUMN     "barcode" TEXT NOT NULL;
