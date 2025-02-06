
export interface GeminiResponse {
    choices: [{
        text: string;
        image: string;
    }]
}

export interface Nutrition {
    carboidratos?: string;
    proteinas?: string;
    gorduras?: string;
    fibra?: string;
}