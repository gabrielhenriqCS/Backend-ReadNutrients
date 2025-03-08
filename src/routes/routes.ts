import { Router } from "express";
import { listConsultById, listConsults } from "../controllers/listConsults";
import { deleteConsult } from "../controllers/deleteConsult";
import { getNutrition } from "../controllers/getNutritionData";

const router = Router();

router.get("/nutritionconsults/historic", listConsults);
router.get("/nutritionconsults/:id", listConsultById);
router.post("/nutritionconsults", getNutrition);
router.delete("/nutritionconsults/:id", deleteConsult);

export default router;
