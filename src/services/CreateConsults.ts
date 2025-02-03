import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CreateConsultService {
    async execute(data: { titulo: string; dados: any }) {
        // Cria uma nova consulta no banco de dados
        const consult = await prisma.consults.create({
            data: {
                titulo: data.titulo,
                dados: data.dados,
            },
        });
        return consult;
    }
}