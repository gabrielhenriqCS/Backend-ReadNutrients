import { Request, Response } from 'express';
import { getNutritionFromGemini, extractNutritionFacts } from '../services/geminiService';
import { Nutrition } from '../models/Nutrition'; 

export const getNutrition = async (req: Request, res: Response): Promise<void> => {
    const { code: barcode } = req.body;

    console.log("Código de barras recebido:", barcode);

    try {
        const geminiResponseText = await getNutritionFromGemini(barcode); // Obtém o texto da resposta

        if (!geminiResponseText) {
            res.status(500).json({
                success: false,
                message: 'Falha ao consultar a API Gemini.',
            });
            return;
        }

        const nutrition: Nutrition = extractNutritionFacts(geminiResponseText); // Extrai os dados nutricionais

        const consult: Nutrition = {
            id: 0,
            date: new Date(),
            carboidratos: nutrition.carboidratos,
            proteinas: nutrition.proteinas,
            gorduras: nutrition.gorduras,
            fibra: nutrition.fibra,
        };

        res.status(200).json({
            success: true,
            message: "Dados nutricionais obtidos com sucesso!",
            data: consult
        });
        return;
    } catch (error: any) {
        console.error("Erro na função getNutrition:", error);
        res.status(500).json({
            success: false,
            message: `Erro interno do servidor: ${error.message}`  // Inclui a mensagem de erro
        });
        return;
    }
};