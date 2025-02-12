import { GeminiResponse, Nutrition } from '../models/Nutrition';

const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("GEMINI_API_KEY:", GEMINI_API_KEY);

export async function getNutritionFromGemini(barcode: string): Promise<GeminiResponse | undefined> {
    if (!GEMINI_API_KEY) {
        console.error("Chave de API Gemini não configurada.");
        throw new Error("Chave de API Gemini não configurada."); 
    }

    try {
        const requestBody = {
            model: "gemini-pro",
            barcode,
            prompt: {
                text: `Valores nutricionais do produto com código de barras ${barcode}`
            }
        };

        console.log("URL: ", GEMINI_API_URL);

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
            return;
        }

        const data: GeminiResponse = await response.json();
        console.log("Resposta Gemini:", data);
        return data; 
    } catch (error: any) {
        console.error('Erro ao consultar Gemini:');
        return;
    }
}


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


export function extractNutritionFacts(geminiResponse: GeminiResponse): Nutrition {
    if (!geminiResponse || !geminiResponse.choices || !geminiResponse.choices[0] || !geminiResponse.choices[0].text) {
        console.error("Resposta Gemini inválida ou incompleta.");
        throw new Error("Resposta Gemini inválida ou incompleta."); // Lança um erro
    }

    const text = geminiResponse.choices[0].text;

    const carboidratos = extrairValor(text, "Carboidratos");
    const proteinas = extrairValor(text, "Proteinas");
    const gorduras = extrairValor(text, "Gorduras");
    const fibra = extrairValor(text, "Fibra");

    if (carboidratos === undefined || proteinas === undefined || gorduras === undefined || fibra === undefined) {
        console.error("Valores nutricionais incompletos.");
        throw new Error("Valores nutricionais incompletos."); // Lança um erro
    }

    const nutrition: Nutrition = {
        datas: {
            carboidratos,
            proteinas,
            gorduras,
            fibra
        }
    };

    return nutrition;
}