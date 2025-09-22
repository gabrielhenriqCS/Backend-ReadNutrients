import express from "express";
import { ConsultController } from "../controllers/ConsultController";
import { ConsultService } from "../services/ConsultService";
import { ConsultRepository } from "../repositories/ConsultRepository";
import { NutritionService } from "../services/NutritionService";
import { validateBarcode } from "../middlewares/validateRequest";

const consultRepo = new ConsultRepository();
const nutritionService = new NutritionService();
const consultService = new ConsultService(consultRepo, nutritionService);
const consultController = new ConsultController(consultService);

const router = express.Router();

router.get("/nutritionconsults/historic", consultController.listConsults);
router.post("/nutritionconsults", validateBarcode, consultController.addConsult.bind(consultController));

router.delete("/nutritionconsults/:id", (req, res) => {
  res.status(501).json({ error: "Não implementado" });
});

export default router;