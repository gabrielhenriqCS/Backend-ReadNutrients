import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteConsultService {
    async delete(id: number) {
        const consult = await prisma.consults.delete({
            where: { id },
        });
        return consult;
    }
}