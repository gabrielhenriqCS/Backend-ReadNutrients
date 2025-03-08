import { Request, Response } from "express";
import { prisma } from "../database/db";

export async function getNutrition(req: Request, res: Response) {
  try {
    const { calorias, carboidratos, proteinas, gorduras, fibra } = req.body;
    const consult = await prisma.nutrition.findMany({
      where: {
        calorias,
        carboidratos,
        proteinas,
        gorduras,
        fibra,
      },
    });

    res.status(201).json({
      consult,
    });
  } catch (error) {
    console.error("Erro em getNutrition:", error);
    res.status(500).json({
      error: "Erro ao buscar dados de nutrição",
    });
  }
}


