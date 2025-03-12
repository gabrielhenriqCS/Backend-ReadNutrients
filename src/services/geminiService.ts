import { GoogleGenerativeAI } from "@google/generative-ai";

export function createGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Chave de API não configurada.");
  }
  return new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 100,
    },
  });
}

function extractValue(text: string, key: string): number {
  const match = text.match(new RegExp(`${key}:\\s*([\\d.,]+)\\s*(kcal|g)?`, "i"));
  return match ? parseFloat(match[1].replace(",", ".")) || 0 : 0;
}

export function parseNutritionData(responseText: string) {
  return {
    calorias: extractValue(responseText, "Calorias"),
    carboidratos: extractValue(responseText, "Carboidratos"),
    proteinas: extractValue(responseText, "Proteínas"),
    gorduras: extractValue(responseText, "Gorduras"),
    fibras: extractValue(responseText, "Fibras"),
  };
}

