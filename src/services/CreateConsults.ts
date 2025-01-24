import { prisma } from "../database/db";
import { Request, Response } from "express";

export class CreateConsultService {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { codeBar } = req.params;

      if (!codeBar) {
        return res.status(400).json({
          message: "Código inválido",
        });
      }

      const consult = await prisma.consults.create({
        data: {
          codeBar: codeBar,
        },
      });

      res.status(201).json({
        consult,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao realizar consulta!",
      });
    }
    
  }
}
