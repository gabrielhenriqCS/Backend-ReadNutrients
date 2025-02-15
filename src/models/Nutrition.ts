import { prisma } from "../database/db";
export interface GeminiResponse {
    choices: [{
        text: string;
    }]
}

export interface Nutrition {
    id?: string;
    title?: string;
    date: string;
    datas: {
        calorias: number;
        carboidratos: number;
        proteinas: number;
        gorduras: number;
        fibra: number; 
    }
}

