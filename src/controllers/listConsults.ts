import { Request, Response } from "express";
import { listHistoricoService } from "../services/ListService";
import { listHistoricoByIdService } from "../services/listByIdService";

export async function listConsults(req: Request, res: Response) {
  try {
    const listHistorico = await listHistoricoService();
    res.status(200).json({
      listHistorico,
    });
  } catch (error) {
    console.error("Erro ao listar consultas:", error);
    res.status(500).json({
      error: "Erro ao listar consultas!",
    });
  }
}


export async function listConsultById(req: Request, res: Response) {
  try {
    const listHistoricoById = await listHistoricoByIdService(req.params.id);
    res.status(200).json({
      listHistoricoById,
    });
  } catch (error) {
    console.error("Erro em getNutritionById", error);
    res.status(500).json({
      error: "Erro ao buscar registro de nutrição",
    });
  }
}
