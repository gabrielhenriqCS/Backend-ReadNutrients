import { GoogleGenerativeAI } from "@google/generative-ai";

export interface NutritionInfo {
  calorias: number;
  carboidratos: number;
  proteinas: number;
  gorduras: number;
  fibras: number;
}

export class NutritionService {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey?: string) {
    if (!apiKey) {
      throw new Error("Chave da API do Gemini não configurada.");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async parseNutritionData(productData: any): Promise<NutritionInfo | string> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        A seguir estão os dados de um produto no formato JSON:
        
        ${JSON.stringify(productData, null, 2)}
        
        Extraia as informações nutricionais e apresente-as de forma clara e objetiva, incluindo os valores de Calorias, Carboidratos, Proteínas e Gorduras.
        Se alguma informação não estiver disponível, indique 'Não disponível'.
        `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return JSON.parse(responseText) as NutritionInfo;
  }

  private async getProductFromOpenFoodFacts(barcode: string): Promise<any> {
    try {
      const apiUrl = `https://br.openfoodfacts.org/api/v2/product/${barcode}.json`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 0) {
        return "Não há dados";
      }

      const nutriments = data.product.nutriments;

      return {
        calorias: nutriments["energy-kcal"],
        carboidratos: nutriments["carbohydrates"],
        proteinas: nutriments["proteins"],
        gorduras: nutriments["fat"],
        fibras: nutriments["fiber"],
      };
    } catch (error) {
      console.error("Erro na consulta ao OpenFoodFacts:", error);
    }
  }

  async getNutritionalInfo(barcode: string): Promise<NutritionInfo | string> {
    let resultIA = await this.parseNutritionData(barcode);

    if (resultIA) {
      console.log("Dados da IA");
      return resultIA;
    }

    let result = await this.getProductFromOpenFoodFacts(barcode);
    if (result) {
      console.log("Dados do OpenFoodFacts");
      return result;
    } else {
      return "Não encontrado no OpenFoodFacts";
    }
  }
}
