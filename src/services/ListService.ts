import { prisma } from '../database/db';
import { Consults } from '@prisma/client';

export class ListHistoricoService {
    async get(): Promise<Consults[]> {
        try {
            const consults = await prisma.consults.findMany();
            return consults as Consults[];
        } catch (error) {
            console.error("Erro ao buscar consultas:", error);
            throw error;
        }
    }
}