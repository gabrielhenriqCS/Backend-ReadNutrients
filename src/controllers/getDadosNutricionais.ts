import { Request, Response } from 'express';
import { getNutritionFromGemini, extractNutritionFacts } from '../services/geminiService';

export const getNutrition = async (req: Request, res: Response): Promise<any> => {
  const { barcode } = req.body;

  console.log("Código de barras recebido:", barcode);

  try {
    const geminiResponse = await getNutritionFromGemini(barcode);

    if (!geminiResponse) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao consultar a API Gemini.'
      });
    }

    // Verifique se geminiResponse é um objeto antes de chamar extractNutritionFacts
    if (typeof geminiResponse === 'object' && geminiResponse !== null) {
        const nutrition = extractNutritionFacts(geminiResponse, "Título do Produto"); // Passa o título
        if (!nutrition) {
            return res.status(500).json({
                success: false,
                message: "Não foi possível extrair os dados nutricionais."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Dados nutricionais obtidos com sucesso!",
            data: nutrition
        });
    } else {
        return res.status(500).json({
            success: false,
            message: "Resposta da API Gemini inválida."
        });
    }


  } catch (error: any) {
    console.error("Erro na função getNutrition:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor."
    });
  }
};