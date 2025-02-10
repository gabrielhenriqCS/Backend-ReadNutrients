import { Request, Response } from 'express';
import { getNutritionFromGemini, extractNutritionFacts } from '../services/geminiService';
import { Consults, Nutrition } from '../models/Nutrition'; // Import the Consults and Nutrition types

export const getNutrition = async (req: Request, res: Response): Promise<void> => {
    const { code: barcode } = req.body;

    console.log("Código de barras recebido:", barcode);

    try {
        const geminiResponse = await getNutritionFromGemini(barcode);

        if (!geminiResponse) {
            res.status(500).json({
                success: false,
                message: 'Erro ao consultar a API Gemini.'
            });
            return;
        }

        const nutrition = extractNutritionFacts(geminiResponse, "Alimento");

        if (!nutrition) {
            res.status(500).json({
                success: false,
                message: "Não foi possível extrair os dados."
            });
            return;
        }

        // Validate the extracted nutrition data:
        if (!nutrition.dados || !nutrition.dados.carboidratos || !nutrition.dados.proteinas || !nutrition.dados.gorduras || !nutrition.dados.fibra) {
            console.error("Dados nutricionais incompletos:", nutrition?.dados);
            res.status(500).json({
                success: false,
                message: "Dados nutricionais incompletos."
            });
            return;
        }

        const consult: Consults = { // Create the Consults object
            id: 0, // Or generate a proper ID
            date: new Date(),
            titulo: "Alimento", // Or get the title from Gemini if available
            dados: nutrition.dados as Nutrition, // Use the validated nutrition data
        };

        res.status(200).json({
            success: true,
            message: "Dados nutricionais obtidos com sucesso!",
            data: consult // Send the Consults object
        });

    } catch (error: any) {
        console.error("Erro na função getNutrition:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
    }
};
