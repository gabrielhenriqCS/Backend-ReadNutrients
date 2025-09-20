import { ConsultRepository } from "@/repositories/ConsultRepository";
import { NutritionService } from "./NutritionService";

export class ConsultService {
  constructor(
    private consultRepo: ConsultRepository,
    private nutritionService: NutritionService
  ) {}

  async addConsult(barcode: string) {
    const existing = await this.consultRepo.findByBarcode(barcode);
    if (existing) {
      return {
        status: 200,
        body: { message: "Já existe", data: existing }
      };
    }
    const nutrition = await this.nutritionService.getNutritionalInfo(barcode);
    const consult = await this.consultRepo.createWithNutrition(barcode, nutrition);
    return {
      status: 201,
      body: { message: "Criado com sucesso", data: consult }
    };
  }

  async listConsults() {
    return this.consultRepo.findAll();
  }
}