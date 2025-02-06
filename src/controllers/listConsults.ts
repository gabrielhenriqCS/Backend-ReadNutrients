import { Request, Response } from "express";
import { ListHistoricoService } from "../services/ListService";

const list_historico = new ListHistoricoService();

export const listConsults = async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, titulo } = req.query;

        // Buscar consultas reais do banco de dados
        const consults = await list_historico.get();

        // Filtrando os resultados com base nos parâmetros da requisição
        const filterConsults = consults.filter(consult => {
            return (
                (!data || String(consult.data) === String(data)) &&
                (!titulo || consult.titulo.toLowerCase().includes(String(titulo).toLowerCase()))
            );
        });

        res.status(200).json({
            success: true,
            data: filterConsults,
        });
    } catch (error) {
        console.error("Erro ao listar consultas:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao listar consultas!",
        });
    }
};
