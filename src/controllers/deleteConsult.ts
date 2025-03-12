import { Request, Response } from "express";
import { prisma } from "../database/db";

export async function deleteConsult(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await prisma.consults.delete({
      where: { id },
    });

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Erro no controlador ao excluir consulta:", error);
    res.status(500).json({ error: "Erro ao processar a requisição." });
  }
}