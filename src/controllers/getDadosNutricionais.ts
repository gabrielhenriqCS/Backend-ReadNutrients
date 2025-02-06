import { Request, Response } from 'express';
import { readBarcodeFromImage } from '../services/barcodeService';
import { getNutritionFromGemini, extractNutritionFacts } from '../services/geminiService';

export const getNutrition = async (req: Request, res: Response): Promise<any> => {
  const { imagePath } = req.body;

  try {
    const barcode = await readBarcodeFromImage(imagePath);
    if (!barcode) {
      return res.status(400).json({ 
        success: false, // Adicione o campo 'success'
        message: 'Não foi possível ler o código de barras.' 
      });
    }

    const geminiResponse = await getNutritionFromGemini(barcode);
    if (!geminiResponse) {
      return res.status(500).json({ 
        success: false, // Adicione o campo 'success'
        message: 'Erro ao consultar a API Gemini.' 
      });
    }

    const nutrition = extractNutritionFacts(geminiResponse);
    if (!nutrition) {
      return res.status(500).json({ 
        success: false, // Adicione o campo 'success'
        message: "Não foi possível extrair os dados nutricionais." 
      });
    }

    res.status(200).json({  // Status 200 para sucesso
      success: true,
      message: "Dados nutricionais obtidos com sucesso!",
      data: nutrition // Envie os dados nutricionais no campo 'data'
    });

  } catch (error: any) { // Capture erros genéricos
    console.error("Erro na função getNutrition:", error); // Log do erro para depuração
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor." // Mensagem genérica para o cliente
    });
  }
};