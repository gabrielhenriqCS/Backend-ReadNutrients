import { Request, Response } from "express";
import { ListConsultsService } from "../services/ListConsults";

const ListConsults = new ListConsultsService();

export const listControl = async (req: Request, res: Response): Promise<void> => {
        const { data, titulo } = req.query;

        try {
            const consults = [
                {
                    data: "03-02-2025",
                    titulo: 'Consulta 1',
                    dados: {
                        calorias: 2000,
                        proteinas: 100,
                        carboidratos: 200,
                        gorduras: 50
                    }
                },
                {
                    data: "03-02-2025",
                    titulo: 'Consulta 2',
                    dados: {
                        calorias: 2000,
                        proteinas: 100,
                        carboidratos: 200,
                        gorduras: 50
                    }
                },
            ];    
        
            const filterConsults = consults.filter(consult => {
                return (
                    (!data || consult.data === data) &&
                    (!titulo || consult.titulo === titulo)
                );
            });
    
            res.status(200).json({
                success: true,
                data: filterConsults,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Erro ao listar consultas!",
            });
        }
}