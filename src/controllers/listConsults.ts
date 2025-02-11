import { Request, Response } from "express";
import { ListHistoricoService } from "../services/ListService";
import { Consults } from "@prisma/client";

const list_historico = new ListHistoricoService();

export const listConsults = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, data, titulo } = req.query;

    console.log("Parâmetros recebidos:", { id, data, titulo });

    // Buscar consultas reais do banco de dados
    const consults: Consults[] = await list_historico.get();

    console.log("Consultas obtidas:", consults);

    // Filtrando os resultados com base nos parâmetros da requisição
    const filterConsults: Consults[] = consults.filter((consult) => {
      const dataMatch = !data || String(consult.data) === String(data);
      const titleMatch = !titulo || consult.titulo.toLowerCase().includes(String(titulo).toLowerCase());
      return dataMatch && titleMatch;
    });

    console.log("Consultas filtradas:", filterConsults);

    res.status(200).json({
      success: true,
      data: id, filterConsults,
    });
    return;
  } catch (error) {
    console.error("Erro ao listar consultas:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao listar consultas!",
    });
    return;
  }
};
