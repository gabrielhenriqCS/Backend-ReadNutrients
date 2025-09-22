import { ConsultService } from "@/services/ConsultService";
import { Request, Response } from "express";

interface AddConsultBody {
    barcode: string
}

export class ConsultController {
    constructor(private consultService: ConsultService) {}

    async addConsult(req: Request<{}, {}, AddConsultBody>, res: Response) {
        const { barcode } = req.body;
        try {
            const result = await this.consultService.addConsult(barcode);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(500).json({ error: "Erro ao processar requisição" });
        }
    }

    async listConsults(req: Request, res: Response) {
        try {
            const consults = await this.consultService.listConsults();
            res.status(200).json(consults);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar consultas" });
        }
    }
}