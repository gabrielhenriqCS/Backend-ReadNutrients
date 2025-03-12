import { Request, Response } from "express";
import { listHistoricoService } from "../services/listService";
import { listHistoricoByIdService } from "../services/listByIdService";

export async function listHistorico(req: Request, res: Response) {
  try {
    const consults = await listHistoricoService();
    res.status(200).json(consults);
  } catch (error) {
    console.error("Erro no controlador ao buscar consultas:", error);
    res.status(500).json({ error: "Erro ao processar a requisição." });
  }
}

export async function listConsultById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const consult = await listHistoricoByIdService(id);

    if (!consult) {
      res.status(404).json({ error: "Consulta não encontrada." });
    }

    res.status(200).json(consult);
  } catch (error) {
    console.error("Erro no controlador ao buscar consulta por ID:", error);
    res.status(500).json({ error: "Erro ao processar a requisição." });
  }
}