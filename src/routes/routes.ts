import { Router } from "express";
import { ConsultController } from "../controllers/ConsultController";
import { errorHandler } from "../middlewares/errorHandler";
import {
  validateAddNutritionConsult,
} from "../middlewares/validateRequest";

// Importe e instancie os serviços necessários
import { ConsultService } from "../services/ConsultService";
import { NutritionService } from "../services/NutritionService";
import { ConsultRepository } from "../repositories/ConsultRepository";

const consultRepo = new ConsultRepository();
const nutritionService = new NutritionService();
const consultService = new ConsultService(consultRepo, nutritionService);
const consultController = new ConsultController(consultService);

const router = Router();

router.get("/nutritionconsults/historic", (req, res) =>
  consultController.listConsults(req, res));

router.post(
  "/nutritionconsults",
  validateAddNutritionConsult,
  (req, res, next) => consultController.addConsult(req, res));

// Exemplo de rota para deletar (implemente o método no controller)
router.delete("/nutritionconsults/:id", (req, res) => {
  res.status(501).json({ error: "Não implementado" });
});

router.use(errorHandler);

export default router;
