import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListConsultsService {
    async execute() {
        // Lista todas as consultas no banco de dados
        const consults = await prisma.consults.findMany();
        return consults;
    }
}