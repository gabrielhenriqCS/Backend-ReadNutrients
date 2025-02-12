import { Request, Response } from 'express';
import { getNutritionFromGemini, extractNutritionFacts } from '../services/geminiService';
import { Nutrition } from '../models/Nutrition'; 

export const getNutrition = async (req: Request, res: Response): Promise<void> => {
    const { code: barcode } = req.body;

    console.log("Código de barras recebido:", barcode);

    try {
        const geminiResponse = await getNutritionFromGemini(barcode);

        if (!geminiResponse) {
             res.status(500).json({ // Usa return para sair da função
                success: false,
                message: 'Erro ao consultar a API Gemini.'
            });
            return;
        }

        const nutrition = extractNutritionFacts(geminiResponse); 


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
         res.status(500).json({  //Adicionei o return
            success: false,
            message: error.message || "Erro interno do servidor."  // Inclui a mensagem de erro
        });
        return
    }
};