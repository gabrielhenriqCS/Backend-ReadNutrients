-- CreateTable
CREATE TABLE `Consults` (
    `id` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Consults_barcode_key`(`barcode`),
    INDEX `Consults_barcode_idx`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nutrition` (
    `id` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,
    `calorias` DOUBLE NOT NULL,
    `carboidratos` DOUBLE NOT NULL,
    `proteinas` DOUBLE NOT NULL,
    `gorduras` DOUBLE NOT NULL,
    `fibras` DOUBLE NOT NULL,
    `consultsId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Nutrition_consultsId_key`(`consultsId`),
    INDEX `Nutrition_barcode_idx`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Nutrition` ADD CONSTRAINT `Nutrition_consultsId_fkey` FOREIGN KEY (`consultsId`) REFERENCES `Consults`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
