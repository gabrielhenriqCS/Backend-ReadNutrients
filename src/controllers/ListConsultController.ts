import { prisma } from "../database";
import { Request, Response } from "express";

export class ListConsultController {
    async listConsult(req: Request, res: Response) {
        try {
          const { id, codeBar } = req.body;
    
          const consult = await prisma.consults.findMany({
            where: { id: Number(id), codeBar },
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