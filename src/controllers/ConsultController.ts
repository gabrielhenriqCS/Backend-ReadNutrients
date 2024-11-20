import { Request, Response } from "express";
import { prisma } from "../database";
import { CreateConsultService } from "../services/CreateConsults";
import { ConsultsRepo } from "../repositories/ConsultsRepo";

export default {
  async createConsult(req: Request, res: Response) {
    try {
      const { id, codeBar, userId } = req.body;

      const createConsult = new CreateConsultService(new ConsultsRepo()); 

      const consult = await createConsult.execute(
         id, codeBar, userId
      );

      return res.json({
        error: false,
        message: "Consulta realizada com sucesso!",
        consult,
      });
    } catch (error) {
      return res.json({
        message: error
      });
    }
  },

  async listConsult(req: Request, res: Response) {
    try {
      const consult = await prisma.consults.findMany();
      return res.json(consult);
    } catch (error) {
      return res.json({
        message: error,
      });
    }
  },
};
