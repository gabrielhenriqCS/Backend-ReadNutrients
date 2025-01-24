import { Request, Response } from "express";
import { prisma } from "../database/db";
import { ListConsultsServices } from "../services/ListConsults";

const ListConsults = new ListConsultsServices();

export class Controller {
  
  async listConsult(req: Request, res: Response): Promise<void> {
    const { id, codeBar } = req.params;

    try {
      const consults = await ListConsults({ id: Number(id), codeBar: String(codeBar) });

      if (!consults) {
        res.status(404).json({
          success: false,
          message: "Consultas não encontradas!"
        });
      }

      res.status(200).json({
        success: true,
        data: consults
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao listar consultas!",
        error: error.message // Optionally include the error message
      });
    }
  }

  async createConsult(req: Request, res: Response): Promise<void> {
    const { id, codeBar } = req.body;

    try {
      // Validação básica
      if (!id || !codeBar) {
        res.status(400).json({
          success: false,
          message: "ID e código de barras são obrigatórios.",
        });
      }

      const consults = await ListConsults.execute({ id: Number(id), codeBar: String(codeBar) });

      res.status(201).json({
        success: true,
        data: consults
      });
    } catch (error) {
       res.status(500).json({
        success: false,
        message: "Erro ao realizar consulta!",
        error: error.message 
      });
    }
  }

  async deleteConsult(req: Request, res: Response): Promise<void> {
    const { id, codeBar } = req.body;

    try {
      // Validação básica de entrada
      if (!id || !codeBar) {
         res.status(400).json({
          success: false,
          message: "ID e código de barras são obrigatórios!",
        });
      }

      // Verifica se a consulta existe antes de deletar
      const consult = await prisma.consults.findUnique({
        where: { id: Number(id) },
      });

      if (!consult) {
         res.status(404).json({
          success: false,
          message: "Consulta não encontrada!",
        });
      }

      // Verifica se o código de barras coincide
      if (consult.codeBar !== codeBar) {
         res.status(400).json({
          success: false,
          message: "Código de barras não coincide!",
        });
      }

      // Exclui a consulta
      await prisma.consults.delete({
        where: { id: Number(id) },
      });

       res.json({
        success: true,
        message: "Consulta excluída com sucesso!",
      });
    } catch (error) {
       res.status(500).json({
        success: false,
        message: "Erro ao excluir consulta!",
        error: error.message // Optionally include the error message
      });
    }
  }
}