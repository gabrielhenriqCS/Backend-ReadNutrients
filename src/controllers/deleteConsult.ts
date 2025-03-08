import { Request, Response } from "express";
import { deleteConsultService } from "../services/deleteService";

export async function deleteConsult(
  req: Request,
  res: Response
) {
  try {
    const { id, barcode } = req.params;

    if (!id || !barcode) {
      res.status(400).json({ error: "Consulta não fornecida." });
    }

    // Chame seu serviço para deletar a consulta com o ID
    await deleteConsultService(id, barcode);

    res.status(204).send({message: "ID deletado!"}); 
  } catch (error) {
    console.error("Erro ao deletar consulta:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
