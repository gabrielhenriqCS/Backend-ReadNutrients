import { Request, Response } from "express";
import { prisma } from "../database";
import { ConsultsRepo } from "../repositories/ConsultsRepo";
import { ListConsultsServices } from "../services/ListConsults";

const ConsultRepo = new ConsultsRepo();
const ListConsults = new ListConsultsServices(ConsultRepo);
export class ConsultaController {
  async createConsult(req: Request, res: Response) {
    try {
      const { id, codeBar } = req.body;

      const consults = await ListConsults.execute(id, codeBar);
      // Validação básica
      if (!consults) {
        return res.status(400).json({
          message: "O campo é obrigatório.",
        });
      }

      return res.status(201).json({
         consults
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao realizar consulta!",
      });
    }
  }

  async deleteConsult(req: Request, res: Response) {
    try {
      const { id, codeBar } = req.body;
  
      // Validação básica de entrada
      if (!id || !codeBar) {
        return res.status(400).json({
          message: "ID e código de barras são obrigatórios!",
        });
      }
  
      // Verifica se a consulta existe antes de deletar
      const consult = await prisma.consults.findUnique({
        where: { id: Number(id) },
      });
  
      if (!consult) {
        return res.status(404).json({
          message: "Consulta não encontrada!",
        });
      }
  
      // Verifica se o código de barras coincide
      if (consult.codeBar !== codeBar) {
        return res.status(400).json({
          message: "Código de barras não coincide!",
        });
      }
  
      // Exclui a consulta
      await prisma.consults.delete({
        where: { id: Number(id) },
      });
  
      return res.json({
        message: "Consulta excluída com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao excluir consulta!"
      });
    }
  }  
}
