import { prisma } from "../database/db";

type ConsultWithNutrition = {
  id: string;
  barcode: string;
  date: Date;
  nutrition: {
    calorias: number;
    carboidratos: number;
    proteinas: number;
    gorduras: number;
    fibra: number;
  } | null;
} | null;

export async function listHistoricoByIdService(id: string): Promise<ConsultWithNutrition> {
  // Validação do ID
  if (!id || typeof id !== "string") {
    throw new Error("ID inválido.");
  }

  try {
    // Busca o registro de consulta pelo ID
    const consultRegister = await prisma.consults.findUnique({
      where: { id },
      include: { nutrition: true },
    });

    // Se o registro não for encontrado, retorna null
    if (!consultRegister) {
      return null;
    }

    // Retorna o registro formatado
    return {
      id: consultRegister.id,
      barcode: consultRegister.barcode,
      date: consultRegister.date,
      nutrition: consultRegister.nutrition
        ? {
            calorias: consultRegister.nutrition.calorias,
            carboidratos: consultRegister.nutrition.carboidratos,
            proteinas: consultRegister.nutrition.proteinas,
            gorduras: consultRegister.nutrition.gorduras,
            fibra: consultRegister.nutrition.fibras,
          }
        : null,
    };
  } catch (error) {
    console.error(`Erro ao buscar registro de nutrição pelo ID ${id}:`, error);
    throw new Error("Erro ao buscar registro de nutrição.");
  }
}