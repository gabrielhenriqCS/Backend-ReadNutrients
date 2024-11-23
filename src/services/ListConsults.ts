import { z } from "zod";
import { IConsults } from "../interfaces/IConsults";

const schema = z.object({
    id: z.number(),
    codeBar: z.string()
})
export class ListConsultsServices {
    constructor(private ConsultsRepo: IConsults) { }

    public async execute(id: number, codeBar: string) {
        const data = schema.parse({ id, codeBar })
        const consult = await this.ConsultsRepo.createConsult(data.id, data.codeBar);
        return consult
    }
}