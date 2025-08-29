import { getNutritionFromGemini } from "@/utils/geminiParser";
import { parse } from "path";

export interface NutritionInfo {
  calorias: number;
  carboidratos: number;
  proteinas: number;
  gorduras: number;
  fibras: number;
}

export class NutritionService {
    async getNutritionalInfo(barcode: string): Promise<NutritionInfo> {
        function extractValue(text: string, key: string): number {
            const match = text.match(
                new RegExp(`${key}:\\s*([\\d.,]+)\\s*(kcal|g)?`, "i")
            );
            return match ? parseFloat(match[1].replace(",", ".")) || 0 : 0;
        }
        function parseNutritionData(response: string): NutritionInfo {
            return {
                calorias: extractValue(response, "Calorias"),
                carboidratos: extractValue(response, "Carboidratos"),
                proteinas: extractValue(response, "Proteínas"),
                gorduras: extractValue(response, "Gorduras"),
                fibras: extractValue(response, "Fibras"),
            };
        }
        return parseNutritionData(barcode);
    }
}
    

