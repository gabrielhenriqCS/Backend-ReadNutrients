/*
  Warnings:

  - You are about to drop the column `data` on the `Consults` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nutritionId]` on the table `Consults` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nutritionId` to the `Consults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consults" DROP COLUMN "data",
ADD COLUMN     "nutritionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Nutrition" (
    "id" SERIAL NOT NULL,
    "calorias" DECIMAL(65,30) NOT NULL,
    "carboidratos" DECIMAL(65,30) NOT NULL,
    "proteinas" DECIMAL(65,30) NOT NULL,
    "gorduras" DECIMAL(65,30) NOT NULL,
    "fibra" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consults_nutritionId_key" ON "Consults"("nutritionId");

-- AddForeignKey
ALTER TABLE "Consults" ADD CONSTRAINT "Consults_nutritionId_fkey" FOREIGN KEY ("nutritionId") REFERENCES "Nutrition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
