/*
  Warnings:

  - You are about to drop the column `title` on the `Consults` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Consults` table. All the data in the column will be lost.
  - You are about to drop the column `consultId` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `fibra` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to alter the column `calorias` on the `Nutrition` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `carboidratos` on the `Nutrition` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `proteinas` on the `Nutrition` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `gorduras` on the `Nutrition` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - A unique constraint covering the columns `[barcode]` on the table `Consults` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[consultsId]` on the table `Nutrition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `consultsId` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fibras` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nutrition" DROP CONSTRAINT "Nutrition_consultId_fkey";

-- AlterTable
ALTER TABLE "Consults" DROP COLUMN "title",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Nutrition" DROP COLUMN "consultId",
DROP COLUMN "fibra",
ADD COLUMN     "consultsId" TEXT NOT NULL,
ADD COLUMN     "fibras" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "calorias" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "carboidratos" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "proteinas" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gorduras" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Consults_barcode_key" ON "Consults"("barcode");

-- CreateIndex
CREATE INDEX "Consults_barcode_idx" ON "Consults"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "Nutrition_consultsId_key" ON "Nutrition"("consultsId");

-- CreateIndex
CREATE INDEX "Nutrition_barcode_idx" ON "Nutrition"("barcode");

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_consultsId_fkey" FOREIGN KEY ("consultsId") REFERENCES "Consults"("id") ON DELETE CASCADE ON UPDATE CASCADE;
