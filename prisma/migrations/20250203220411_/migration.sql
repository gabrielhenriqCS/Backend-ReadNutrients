/*
  Warnings:

  - You are about to drop the column `codeBar` on the `Consults` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Consults_codeBar_key";

-- AlterTable
ALTER TABLE "Consults" DROP COLUMN "codeBar";
