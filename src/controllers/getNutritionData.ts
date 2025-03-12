import { Request, Response } from "express";
import { prisma } from "../database/db";

export async function getNutrition(req: Request, res: Response) {
  const { barcode } = req.query;

  if (!barcode || typeof barcode !== "string") {
    res.status(400).json({error: "Código de barras inválido."})
  }

  try {
    const history = await prisma.consults.findMany({
      where: {
        barcode: barcode as string
      },
      include: {nutrition: true},
    });

    if (!history.length) {
      return res.status(404).json({ error: "Nenhum histórico encontrado para o código de barras fornecido." });
    }

    const formattedHistory = history.map((consult) => ({
      id: consult.id,
      barcode: consult.barcode,
      date: consult.date,
      titulo: "Consulta pelo Gemini", // Pode ser ajustado conforme necessário
      calorias: consult.nutrition?.calorias || 0,
      carboidratos: consult.nutrition?.carboidratos || 0,
      proteinas: consult.nutrition?.proteinas || 0,
      gorduras: consult.nutrition?.gorduras || 0,
      fibras: consult.nutrition?.fibras || 0,
    }));

    res.status(200).json({
      formattedHistory
    });
  } catch (error) {
    console.error("Erro em getNutrition:", error);
    res.status(500).json({
      error: "Erro ao buscar dados de nutrição",
    });
  }
}


