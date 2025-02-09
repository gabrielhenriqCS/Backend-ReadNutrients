import { Consults, GeminiResponse, Nutrition } from '../models/Nutrition';

const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://api.gemini.com/v1beta/completions';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function getNutritionFromGemini(barcode: string): Promise<GeminiResponse | null> {
  if (!GEMINI_API_KEY) {
    console.error("Chave de API Gemini não configurada.");
    return null;
  }


  try {
    console.log("URL: ", GEMINI_API_URL)
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gemini-pro",
        prompt: {
            text: `Valores nutricionais do produto com código de barras ${barcode}`
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro ao consultar Gemini:', response.status, errorData);
      return null;
    }

    const data: GeminiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao consultar Gemini:', error);
    return null;
  }
}

console.log("GEMINI_API_KEY:", GEMINI_API_KEY); // Para depuração

function extrairValor(texto: string, regex: RegExp): string | undefined {
  const match = texto.match(regex);
  return match ? match[1] : undefined;
}

export function extractNutritionFacts(geminiResponse: GeminiResponse, titulo: string): Consults | null {
  try {
    const text = geminiResponse.choices[0].text;
    const nutrition: Nutrition = {
        carboidratos: extrairValor(text, /Carboidratos:\s*([\d,]+)/) ?? "",
        proteinas: extrairValor(text, /Proteinas:\s*([\d,]+)/) ?? "",
        gorduras: extrairValor(text, /Gorduras:\s*([\d,]+)/) ?? "",
        fibra: extrairValor(text, /Fibra:\s*([\d,]+)/) ?? ""
    };
    const consult: Consults = {
        id: 0,
        date: new Date(),
        titulo: titulo,
        dados: nutrition,
    };
    return consult;
  } catch (error: any) {
    console.error("Erro ao extrair dados nutricionais:", error.message);
    return null;
  }
}



