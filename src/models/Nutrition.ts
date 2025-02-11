
export interface GeminiResponse {
    choices: [{
        text: string;
    }]
}

export interface Nutrition {
    id?: number;
    title?: string;
    date?: Date;
    datas?: {
        carboidratos?: string;
        proteinas?: string;
        gorduras?: string;
        fibra?: string; 
    }
    carboidratos?: string;
    proteinas?: string;
    gorduras?: string;
    fibra?: string;
}

