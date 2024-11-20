-- CreateTable
CREATE TABLE "consults" (
    "id" SERIAL NOT NULL,
    "codeBar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "consults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionData" (
    "id" SERIAL NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbohydrate" DOUBLE PRECISION NOT NULL,
    "sugar" DOUBLE PRECISION NOT NULL,
    "gluten" BOOLEAN NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "lactose" BOOLEAN NOT NULL,
    "energy" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descriptionId" INTEGER,

    CONSTRAINT "NutritionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Description" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consults_codeBar_key" ON "consults"("codeBar");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionData_descriptionId_key" ON "NutritionData"("descriptionId");

-- CreateIndex
CREATE INDEX "Description_name_idx" ON "Description"("name");

-- AddForeignKey
ALTER TABLE "NutritionData" ADD CONSTRAINT "NutritionData_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "Description"("id") ON DELETE SET NULL ON UPDATE CASCADE;
