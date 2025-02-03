import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteConsultService {
    async execute(id: number) {
        // Exclui uma consulta do banco de dados
        const consult = await prisma.consults.delete({
            where: { id },
        });
        return consult;
    }
}