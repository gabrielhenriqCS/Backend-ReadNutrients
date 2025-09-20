import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiParser {
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error("Chave da API do Gemini não configurada.");
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async parseNutritionData(productData: any): Promise<string> {
        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        A seguir estão os dados de um produto no formato JSON:
        
        ${JSON.stringify(productData, null, 2)}
        
        Extraia as informações nutricionais e apresente-as de forma clara e objetiva, incluindo os valores de Calorias, Carboidratos, Proteínas e Gorduras.
        Se alguma informação não estiver disponível, indique 'Não disponível'.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        return responseText;
    }
}