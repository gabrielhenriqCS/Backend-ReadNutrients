import { GoogleGenerativeAI } from "@google/generative-ai";
import { Nutrition } from "../models/Nutrition";

function getApiKey(): string {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Chave de API Gemini não configurada.");
        throw new Error("Chave de API Gemini não configurada.");
    }
    return apiKey;
}

// Função para inicializar o modelo Gemini
export function createGeminiModel(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Ou gemini-pro
}

// Função para consultar o Gemini e obter os dados nutricionais
export async function getNutritionFromGemini(barcode: string): Promise<string | undefined> {
    try {
        const apiKey = getApiKey();
        const model = createGeminiModel(apiKey);

        const prompt = `Valores nutricionais do produto com código de barras ${barcode}`;

        const result = await model.generateContent(prompt);
        return result.response.text(); // Retorna o texto da resposta
    } catch (error: any) {
        console.error("Erro ao consultar Gemini:", error);
        throw error; // Propaga o erro
    }
}

// Função para extrair os fatos nutricionais do texto
export function extractNutritionFacts(geminiResponseText: string): Nutrition {
    if (!geminiResponseText) {
        console.error("Resposta Gemini inválida ou incompleta.");
        throw new Error("Resposta Gemini inválida ou incompleta.");
    }

    const carboidratos = extrairValor(geminiResponseText, "Carboidratos");
    const proteinas = extrairValor(geminiResponseText, "Proteinas");
    const gorduras = extrairValor(geminiResponseText, "Gorduras");
    const fibra = extrairValor(geminiResponseText, "Fibra");

    return {
        carboidratos,
        proteinas,
        gorduras,
        fibra,
    };
}

// Função auxiliar para extrair valores
export function extrairValor(texto: string, chave: string): string | undefined {
    const indiceChave = texto.indexOf(chave);
    if (indiceChave === -1) {
        return undefined;
    }

    const indiceValor = indiceChave + chave.length + 2; // +2 para ": "
    const indiceProximoValor = texto.indexOf('\n', indiceValor); // Encontra a próxima linha
    const valor = indiceProximoValor === -1 ? texto.substring(indiceValor) : texto.substring(indiceValor, indiceProximoValor).trim();

    return valor;
}