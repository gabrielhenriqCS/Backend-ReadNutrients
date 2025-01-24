import { prisma } from "../database/db";

interface ListConsults {
    id: number;
    codeBar: string;
}
export class ListConsultsServices {

    async execute({ id, codeBar }: ListConsults) {
        if(!id || !codeBar) {
            throw new Error("ID e código de barras são obrigatórios!");
        }

        const consult = await prisma.consults.findUnique({
            where: { id: Number(id) },
        });
        
        if (!consult) {
            throw new Error("Consultas não encontradas!");
        }
    }
}