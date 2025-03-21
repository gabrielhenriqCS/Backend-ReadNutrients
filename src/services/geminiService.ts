import { GoogleGenerativeAI } from "@google/generative-ai";

function createGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Chave de API não configurada.");
  }
  return new GoogleGenerativeAI(apiKey)
}

export async function nutritionConsults(barcode: string) {
  const gemini = createGeminiModel();
  const model = gemini.getGenerativeModel({model: "gemini-2.0-flash"});
  const prompt = `Forneça os dados nutricionais do produto com o código de barras ${barcode}.
  Responda com o seguinte formato:
  Calorias: X kcal
  Carboidratos: X g
  Proteínas: X g
  Gorduras: X g
  Fibras: X g`;

  const result = await model.generateContent(prompt)

  if (!result) {
    throw new Error("nenhuma resposta obtida.")
  }

  return parseNutritionData(result.response.text());
}

function extractValue(text: string, key: string): number {
  const match = text.match(new RegExp(`${key}:\\s*([\\d.,]+)\\s*(kcal|g)?`, "i"));
  return match ? parseFloat(match[1].replace(",", ".")) || 0 : 0;
}

function parseNutritionData(responseText: string) {
  return {
    calorias: extractValue(responseText, "Calorias"),
    carboidratos: extractValue(responseText, "Carboidratos"),
    proteinas: extractValue(responseText, "Proteínas"),
    gorduras: extractValue(responseText, "Gorduras"),
    fibras: extractValue(responseText, "Fibras"),
  };
}

