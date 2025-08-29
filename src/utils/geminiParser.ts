import { GoogleGenerativeAI } from "@google/generative-ai";


function geminiModel() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Chave da API não configurada.");
    }
    return new GoogleGenerativeAI(apiKey);
}


export class getNutritionFromGemini {
  async getNutrition(barcode: string) {
    const gemini = geminiModel();
    const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Forneça os dados nutricionais do produto com o código de barras ${barcode}.
  Responda com o seguinte formato:
  Calorias: X kcal
  Carboidratos: X g
  Proteínas: X g
  Gorduras: X g
  Fibras: X g`;

      const result = await model.generateContent(prompt);
    
      

    if (!result) {
      throw new Error("nenhuma resposta obtida.");
    }

    return result;
  }
}
