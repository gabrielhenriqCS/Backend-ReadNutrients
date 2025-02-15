-- CreateTable
CREATE TABLE "Consults" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Consults_pkey" PRIMARY KEY ("id")
);
