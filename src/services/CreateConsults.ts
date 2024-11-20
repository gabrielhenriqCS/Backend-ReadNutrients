import { IConsults } from "../interfaces/IConsults";

export class CreateConsultService {
    constructor(private ConsultsRepo: IConsults) { }

    public async execute(id: number, codeBar: string, userId: number) {
        const consult = await this.ConsultsRepo.createConsult(id, codeBar, userId);
        return consult
    }
}