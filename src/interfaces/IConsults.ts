import { Consults } from "@prisma/client";

export interface IConsults {
    createConsult(id: number, codeBar: string, userId: number): Promise<Consults>;
}