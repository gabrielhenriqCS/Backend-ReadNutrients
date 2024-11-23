import { Description, NutritionData } from "@prisma/client";
import { prisma } from "../database";
import { IDescription } from "../interfaces/INutritionData";

export class ListDataNutrition implements IDescription {
    public async listData(id: number, name: string, nutritionalInfo: NutritionData): Promise<Description[]> {
        const list = await prisma.description.findMany({
            where: {
                id,
                name,
                nutritionalInfo
            }
        });
        return list
    }
}