/*
  Warnings:

  - The primary key for the `Consults` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nutritionId` on the `Consults` table. All the data in the column will be lost.
  - The primary key for the `Nutrition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `barcode` to the `Consults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consultId` to the `Consults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Consults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consultId` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Consults" DROP CONSTRAINT "Consults_nutritionId_fkey";

-- DropIndex
DROP INDEX "Consults_nutritionId_key";

-- AlterTable
ALTER TABLE "Consults" DROP CONSTRAINT "Consults_pkey",
DROP COLUMN "nutritionId",
ADD COLUMN     "barcode" TEXT NOT NULL,
ADD COLUMN     "consultId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Consults_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Consults_id_seq";

-- AlterTable
ALTER TABLE "Nutrition" DROP CONSTRAINT "Nutrition_pkey",
ADD COLUMN     "consultId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Nutrition_id_seq";

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_consultId_fkey" FOREIGN KEY ("consultId") REFERENCES "Consults"("id") ON DELETE CASCADE ON UPDATE CASCADE;
