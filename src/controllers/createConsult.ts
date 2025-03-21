import { Request, Response } from "express";
import { prisma } from "../database/db";
import { nutritionConsults } from "../services/geminiService";

export async function addNutritionConsult(req: Request, res: Response) {
  const { barcode } = req.params;

  try {
    const existingConsult = await prisma.consults.findFirst({
      where: { barcode },
      include: { nutrition: true },
    });

    if (existingConsult) {
      res.status(200).json({
        message: "Dados nutricionais já existem no banco de dados.",
        data: {
          title: "Consulta automática",
          barcode: existingConsult.barcode,
          nutrition: existingConsult.nutrition,
        },
      });
    }

    const nutritionData = await nutritionConsults(barcode);

    const savedConsult = await prisma.consults.create({
      data: {
        barcode,
        date: new Date(),
        nutrition: {
          create: {
            barcode,
            calorias: nutritionData.calorias,
            carboidratos: nutritionData.carboidratos,
            proteinas: nutritionData.proteinas,
            gorduras: nutritionData.gorduras,
            fibras: nutritionData.fibras,
          },
        },
      },
      include: { nutrition: true },
    });

    res.status(201).json({
      message: "Dados nutricionais obtidos com sucesso!",
      data: {
        title: "Consulta via Gemini API",
        barcode: savedConsult.barcode,
        nutrition: savedConsult.nutrition,
      },
    });
  } catch (error) {
    console.error("Erro ao adicionar consulta nutricional:", error);
    res.status(500).json({ error: "Erro ao processar a requisição." });
  }
}