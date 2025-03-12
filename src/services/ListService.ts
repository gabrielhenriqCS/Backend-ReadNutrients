import { prisma } from '../database/db';

type ConsultWithNutrition = {
    id: string;
    barcode: string;
    date: Date;
    nutrition: {
      calorias: number;
      carboidratos: number;
      proteinas: number;
      gorduras: number;
      fibras: number;
    } | null;
  };
  
  export async function listHistoricoService(): Promise<ConsultWithNutrition[]> {
    try {
      // Busca todas as consultas, ordenadas por data (mais recente primeiro)
      const consults = await prisma.consults.findMany({
        orderBy: {
          date: "desc", // Ordena por data em ordem decrescente
        },
        include: {
          nutrition: true, // Inclui os dados nutricionais associados
        },
      });
  
      // Formata a resposta para incluir apenas os campos necessários
      const formattedConsults = consults.map((consult) => ({
        id: consult.id,
        barcode: consult.barcode,
        date: consult.date,
        nutrition: consult.nutrition
          ? {
              calorias: consult.nutrition.calorias,
              carboidratos: consult.nutrition.carboidratos,
              proteinas: consult.nutrition.proteinas,
              gorduras: consult.nutrition.gorduras,
              fibras: consult.nutrition.fibras,
            }
          : null,
      }));
  
      return formattedConsults;
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
      throw new Error("Erro ao buscar consultas!");
    }
  }