import { getNutritionFromGemini } from "../utils/geminiParser";

export class NutritionService {
  async fetchNutrition(barcode: string) {
    return getNutritionFromGemini(barcode);
  }
}