-- CreateTable
CREATE TABLE "Consults" (
    "id" SERIAL NOT NULL,
    "codeBar" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "dados" JSONB NOT NULL,

    CONSTRAINT "Consults_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consults_codeBar_key" ON "Consults"("codeBar");
