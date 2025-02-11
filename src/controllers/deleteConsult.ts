import { Request, Response } from 'express';
import { DeleteConsultService } from '../services/DeleteService';

const deleteConsultService = new DeleteConsultService();

export const deleteConsult = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID da consulta não fornecido.' });
    }

    // Chame seu serviço para deletar a consulta com o ID
    await deleteConsultService.delete(Number(id));

    res.status(204).end(); // 204 No Content (sucesso, sem conteúdo na resposta)
    return;
  } catch (error) {
    console.error("Erro ao deletar consulta:", error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
    return;
  }
};