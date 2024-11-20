import { Consults } from "@prisma/client";
import { prisma } from "../database";
import { IConsults } from "../interfaces/IConsults";

export class ConsultsRepo implements IConsults {
    public async createConsult(id: number, codeBar: string, userId: number): Promise<Consults> {
        const post = await prisma.consults.create({
            data: {
                id,
                codeBar,
                userId
            }
        })
        return post
    }
}