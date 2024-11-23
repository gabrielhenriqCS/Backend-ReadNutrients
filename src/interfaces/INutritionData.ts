import { Description, NutritionData } from "@prisma/client";

export interface IDescription {
    listData(id: number, name: string, nutritionalInfo: NutritionData): Promise<Description[]>;
}