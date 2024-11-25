import { Request, Response } from "express";
import { prisma } from "../database";

export class ListConsultController {
  async listConsult(req: Request, res: Response) {
    try {
      const { id } = req.params; // Captura o ID dos parâmetros da URL

      // Validação básica para garantir que 'id' seja fornecido e seja um número
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          message: "ID inválido ou ausente.",
        });
      }

      // Busca o registro com base no ID
      const consult = await prisma.consults.findUnique({
        where: { id: Number(id) }, // Garantindo que o ID seja numérico
      });

      if (!consult) {
        return res.status(404).json({
          message: "Consulta não encontrada!",
        });
      }

      return res.status(200).json({ error: false, consult });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar consultas!"
      });
    }
  }
}
