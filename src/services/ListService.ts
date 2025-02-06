import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListHistoricoService {
    async get() {
        // Lista todas as consultas no banco de dados
        const consults = await prisma.consults.findMany();
        return consults;
    }
}