import { prisma } from '../database/db';

export async function listHistoricoService() {
    try {
        const consults = await prisma.consults.findMany({
            orderBy: {
                date: 'desc'
            },
            include: {
                consult: true,
            }
        });
        return consults;
    } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        throw new Error("Erro ao buscar consultas!");
    }
}