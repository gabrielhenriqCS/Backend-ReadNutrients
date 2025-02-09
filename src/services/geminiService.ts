import { Consults, GeminiResponse, Nutrition } from '../models/Nutrition';

const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function getNutritionFromGemini(barcode: string): Promise<GeminiResponse | null> {
  if (!GEMINI_API_KEY) {
    console.error("Chave de API Gemini não configurada.");
    return null;
  }


  try {
    const requestBody = {
      model: "gemini-pro",
      barcode,
      prompt: {
        text: `Valores nutricionais do produto com código de barras ${barcode}`
      }
    }

    console.log("Corpo da requisição:", JSON.stringify(requestBody, null, 2))
    console.log("URL: ", GEMINI_API_URL)
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
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

function extrairValor(texto: string, chave: string): string | undefined {
  const indiceChave = texto.indexOf(chave);
  if (indiceChave === -1) {
      return undefined;
  }

  const indiceValor = indiceChave + chave.length + 2; // +2 para ": "
  const indiceProximoValor = texto.indexOf('\n', indiceValor); // Encontra a próxima linha
  const valor = indiceProximoValor === -1 ? texto.substring(indiceValor) : texto.substring(indiceValor, indiceProximoValor).trim();

  return valor;
}

export function extractNutritionFacts(geminiResponse: GeminiResponse, titulo: string): Consults | null {
  try {
      if (!geminiResponse || !geminiResponse.choices || !geminiResponse.choices[0] || !geminiResponse.choices[0].text) {
          console.error("Resposta Gemini inválida ou incompleta.");
          return null;
      }

      const text = geminiResponse.choices[0].text;
      const nutrition: Nutrition = {
          carboidratos: extrairValor(text, "Carboidratos") ?? "",
          proteinas: extrairValor(text, "Proteinas") ?? "",
          gorduras: extrairValor(text, "Gorduras") ?? "",
          fibra: extrairValor(text, "Fibra") ?? ""
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



