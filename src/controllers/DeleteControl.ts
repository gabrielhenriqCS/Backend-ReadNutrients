import { Request, Response } from "express";
import { DeleteConsultService } from "../services/DeleteService";

export const deleteControl = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deleteConsultService = new DeleteConsultService();
        await deleteConsultService.execute(Number(id));

        res.status(200).json({
            success: true,
            message: `Consulta com ID ${id} excluída com sucesso!`,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Erro ao excluir consulta!",
        });
    }
};