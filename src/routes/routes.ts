import { Router } from 'express';
import { Controller } from '../controllers/Controller';

const router = Router();
const controller = new Controller();

router.get('/consults/:id', controller.listConsult);
router.post('/consults/:id', controller.createConsult);
router.delete('/consults/:id', controller.deleteConsult);

export default router;