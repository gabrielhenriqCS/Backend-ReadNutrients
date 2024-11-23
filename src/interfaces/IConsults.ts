
export interface IConsults {
    createConsult(id: number, codeBar: string): Promise<Consult>;
}

export type Consult = {
    id: number;
    codeBar: string;
}
