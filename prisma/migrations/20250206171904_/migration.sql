-- CreateTable
CREATE TABLE "Consults" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "titulo" TEXT NOT NULL,
    "dados" JSONB NOT NULL,

    CONSTRAINT "Consults_pkey" PRIMARY KEY ("id")
);
