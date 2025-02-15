import { Router } from 'express';
import { listConsults } from '../controllers/listConsults';
import { deleteConsult } from '../controllers/deleteConsult';
import { getNutrition } from '../controllers/getDadosNutricionais';

const router = Router();

router.get('/nutritionconsults/historic/', listConsults);
router.post('/nutritionconsults/', getNutrition);
router.delete('/nutritionconsults/:id', deleteConsult);

export default router;