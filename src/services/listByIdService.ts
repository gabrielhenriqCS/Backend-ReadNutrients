import { prisma } from "../database/db";


export async function listHistoricoByIdService(id: string) {
    try {
        const consultRegister = await prisma.consults.findUnique({
            where: {
                id
            },
            include: {
                consult: true,
            }
        });
        return consultRegister;
    } catch (error) {
        console.error("Erro em getNutritionById", error);
        throw new Error("Erro ao buscar registro de nutrição");
    }
}