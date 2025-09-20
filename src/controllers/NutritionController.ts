
import { NutritionService } from "../services/NutritionService";
import { Request, Response } from "express";

const nutritionService = new NutritionService();

export class NutritionController {
    async getNutrition(req: Request, res: Response) {
        const { barcode } = req.params;

        if (!barcode) {
            return res.status(400).send({ message: "Código de barras não fornecido." });
        }

        try {
            const nutritionalInfo = await nutritionService.getNutritionalInfo(barcode);
            
            return res.status(200).send({
                message: "Dados nutricionais encontrados e processados com sucesso.",
                data: nutritionalInfo
            });
        } catch (error) {
            console.error("Erro na requisição:", error);
            let errorMessage = "Ocorreu um erro interno ao buscar os dados.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            if (errorMessage.includes("não encontrado")) {
                return res.status(404).send({ message: errorMessage });
            }
            
            return res.status(500).send({ message: errorMessage });
        }
    }
}