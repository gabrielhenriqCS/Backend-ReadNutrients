import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../database/db";
import { Nutrition } from "../models/Nutrition";

// Função para obter a chave da API
function getApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Chave de API não configurada.");
  }
  return apiKey;
}

// Inicializa o modelo Gemini
function createGeminiModel() {
  return new GoogleGenerativeAI(getApiKey()).getGenerativeModel({
    model: "gemini-2.0-flash",
  });
}

// Extrai valores numéricos do texto com regex
function extractValue(text: string, key: string): number {
  const match = text.match(new RegExp(`${key}:\\s*([\\d.,]+)`, "i"));
  return match ? parseFloat(match[1].replace(",", ".")) || 0 : 0;
}

// Processa o texto da resposta para obter dados nutricionais
function parseNutritionData(responseText: string): Nutrition {
  return {
    calorias: extractValue(responseText, "Calorias"),
    carboidratos: extractValue(responseText, "Carboidratos"),
    proteinas: extractValue(responseText, "Proteínas"),
    gorduras: extractValue(responseText, "Gorduras"),
    fibra: extractValue(responseText, "Fibra"),
  };
}

// Busca os dados no banco ou consulta a API Gemini
export async function getAndSaveNutrition(barcode: string) {
  try {
    // Verifica se os dados já existem no banco
    const existingData = await prisma.nutrition.findUnique({
      where: { id: barcode },
    });
    if (existingData) {
      return { success: true, source: "database", nutrition: existingData };
    }

    // Consulta Gemini para obter os dados nutricionais
    const model = createGeminiModel();
    const result = await model.generateContent(
      `Valores nutricionais do produto com código de barras ${barcode}`
    );
    if (!result?.response) {
      throw new Error("Resposta inválida da API Gemini");
    }

    const responseText = await result.response.text();
    const nutritionData = parseNutritionData(responseText);

    // Valida se os dados foram extraídos corretamente
    if (
      !nutritionData.calorias &&
      !nutritionData.carboidratos &&
      !nutritionData.proteinas &&
      !nutritionData.gorduras &&
      !nutritionData.fibra
    ) {
      throw new Error(
        "Não foi possível extrair dados nutricionais da resposta."
      );
    }

    // Salva os dados no banco
    const savedNutrition = await prisma.nutrition.create({
      data: { barcode, ...nutritionData },
    });

    return { success: true, source: "gemini", nutrition: savedNutrition };
  } catch (error) {
    console.error("Erro ao buscar/salvar dados nutricionais:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro ao processar os dados.",
    };
  }
}
