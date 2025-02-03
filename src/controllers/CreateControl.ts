import { Request, Response } from "express";
import { CreateConsultService } from "../services/CreateConsults";

export const createControl = async (req: Request, res: Response): Promise<void> =>{
        const { titulo, dados } = req.body;

        try {

            const createService = new CreateConsultService();
            const consults = await createService.execute({titulo, dados});

            res.status(201).json({
                success: true,
                message: "Consulta realizada com sucesso!",
                data: consults,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Erro ao realizar consulta!"
            });
        }
    }