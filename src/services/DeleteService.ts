import { prisma } from "../database/db";


export async function deleteConsultService(id: string, barcode: string) {
    try {
        await prisma.consults.delete({
            where: {
                id: id,
                barcode: barcode
            }
        });
    } catch (error) {
        console.error("Erro ao deletar consulta:", error);
        throw new Error("Erro ao deletar consulta!");
    }
}