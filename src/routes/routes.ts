import { Router } from 'express';
import { listConsults } from '../controllers/listConsults';
import { deleteConsult } from '../controllers/deleteConsult';
import { getNutrition } from '../controllers/getDadosNutricionais';

const router = Router();

router.get('/nutriconsults/historic/:barcode', listConsults);
router.post('/nutriconsults/', getNutrition);
router.delete('/consults/:id', deleteConsult);

export default router;