/*
  Warnings:

  - You are about to drop the column `userId` on the `consults` table. All the data in the column will be lost.
  - You are about to drop the `Description` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `descriptionId` on table `NutritionData` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "NutritionData" DROP CONSTRAINT "NutritionData_descriptionId_fkey";

-- AlterTable
ALTER TABLE "NutritionData" ALTER COLUMN "protein" SET DEFAULT 0.0,
ALTER COLUMN "carbohydrate" SET DEFAULT 0.0,
ALTER COLUMN "sugar" SET DEFAULT 0.0,
ALTER COLUMN "gluten" SET DEFAULT false,
ALTER COLUMN "fat" SET DEFAULT 0.0,
ALTER COLUMN "lactose" SET DEFAULT false,
ALTER COLUMN "energy" SET DEFAULT 0.0,
ALTER COLUMN "descriptionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "consults" DROP COLUMN "userId";

-- DropTable
DROP TABLE "Description";

-- CreateTable
CREATE TABLE "listdescription" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "listdescription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NutritionData" ADD CONSTRAINT "NutritionData_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "listdescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
