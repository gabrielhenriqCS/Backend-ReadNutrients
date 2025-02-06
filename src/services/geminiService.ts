import fetch from 'node-fetch';
import { GeminiResponse, Nutrition } from '../models/Nutrition';

const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://api.gemini.com/v1beta/completions';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function getNutritionFromGemini(barcode: string): Promise<GeminiResponse | null> {
  if (!GEMINI_API_KEY) {
    console.error("Chave de API Gemini não configurada.");
    return null;
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemini-pro',
        prompt: `Quais são os valores nutricionais do produto com código de barras ${barcode}?`,
        api_key: GEMINI_API_KEY,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
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

export function extractNutritionFacts(geminiResponse: GeminiResponse): Nutrition | null {
  try {
    const text = geminiResponse.choices[0].text;
    const nutrition: Nutrition = {
        carboidratos: extrairValor(text, /Carboidratos:\s*([\d,]+)/),
        proteinas: extrairValor(text, /Proteinas:\s*([\d,]+)/),
        gorduras: extrairValor(text, /Gorduras:\s*([\d,]+)/),
        fibra: extrairValor(text, /Fibra:\s*([\d,]+)/)
    };
    return nutrition;
  } catch (error: any) {
    console.error("Erro ao extrair dados nutricionais:", error.message);
    return null;
  }
}

function extrairValor(texto: string, regex: RegExp): string | undefined {
  const match = texto.match(regex);
  return match ? match[1] : undefined;
}