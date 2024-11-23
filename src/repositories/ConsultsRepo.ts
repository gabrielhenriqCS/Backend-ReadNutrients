import { prisma } from "../database";
import { IConsults, Consult } from "../interfaces/IConsults";


export class ConsultsRepo implements IConsults {
    public async createConsult(id: number, codeBar: string): Promise<Consult> {
        const post = await prisma.consults.create({
            data: {
                id,
                codeBar
            }
        })
        return post
    }

}

