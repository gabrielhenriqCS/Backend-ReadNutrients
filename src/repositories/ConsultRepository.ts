import { prisma } from "../database/prisma";

export interface IWriteRepository<T> {
  save(data: T): Promise<T>;
}

export class ConsultRepository {
  async findByBarcode(barcode: string) {
    return prisma.consults.findFirst({
      where: { barcode },
      include: { nutrition: true },
    });
  }

  async createWithNutrition(barcode: string, nutritionData: any) {
    return prisma.consults.create({
      data: {
        barcode,
        date: new Date(),
        nutrition: {
          create: nutritionData,
        },
      },
      include: { nutrition: true },
    });
  }

  async findAll() {
    return prisma.consults.findMany({ include: { nutrition: true } });
  }
}
