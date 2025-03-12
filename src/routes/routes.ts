import { Router } from "express";
import { listConsultById, listHistorico } from "../controllers/listConsults";
import { deleteConsult } from "../controllers/deleteConsult";
import { addNutritionConsult } from "../controllers/createConsult";
import { errorHandler } from "../middlewares/errorHandler";
import { validateAddNutritionConsult, validateGetConsultById } from "../middlewares/validateRequest";

const router = Router();

router.get("/nutritionconsults/historic", listHistorico);
router.get("/nutritionconsults/:id", validateGetConsultById, listConsultById);
router.post("/nutritionconsults", validateAddNutritionConsult, addNutritionConsult);
router.delete("/nutritionconsults/:id", deleteConsult);

router.use(errorHandler)

export default router;
