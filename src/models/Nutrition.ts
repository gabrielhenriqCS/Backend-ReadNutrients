
export interface GeminiResponse {
    choices: [{
        text: string;
    }]
}

export interface Nutrition {
    carboidratos?: string;
    proteinas?: string;
    gorduras?: string;
    fibra?: string;
}

export interface Consults {
    id: number;
    date: Date;
    titulo: string;
    dados: Nutrition;
}