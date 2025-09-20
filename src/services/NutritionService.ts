
import { GeminiParser } from "../utils/geminiParser";

export interface NutritionInfo {
    calorias: number;
    carboidratos: number;
    proteinas: number;
    gorduras: number;
    fibras: number;
}

export class NutritionService {
    private geminiParser: GeminiParser;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Chave da API do Gemini não configurada.");
        }
        this.geminiParser = new GeminiParser(apiKey);
    }

    private async getProductFromOpenFoodFacts(barcode: string): Promise<any> {
        const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }

    private parseNutritionData(dataResponse: string): NutritionInfo {
        const extractValue = (text: string, key: string) => {
            const match = text.match(new RegExp(`${key}:\\s*([\\d.,]+)\\s*(?:kcal|g)?`, "i"));
            return match ? parseFloat(match[1].replace(",", ".")) || 0 : 0;
        };

        return {
            calorias: extractValue(dataResponse, "Calorias"),
            carboidratos: extractValue(dataResponse, "Carboidratos"),
            proteinas: extractValue(dataResponse, "Proteínas"),
            gorduras: extractValue(dataResponse, "Gorduras"),
            fibras: extractValue(dataResponse, "Fibras"),
        };
    }

    async getNutritionalInfo(barcode: string): Promise<NutritionInfo> {
        try {
            const productData = await this.getProductFromOpenFoodFacts(barcode);
            if (productData.status === 0) {
                throw new Error("Código de barras não encontrado na base de dados.");
            }
            
            const geminiResponseText = await this.geminiParser.parseNutritionData(productData.product);
            const nutritionData = this.parseNutritionData(geminiResponseText);
            
            return nutritionData;
        } catch (error) {
            console.error("Erro no serviço de nutrição:", error);
            throw error;
        }
    }
}