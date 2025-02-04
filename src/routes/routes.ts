import { Router } from 'express';
import { listControl } from '../controllers/ListControl';
import { deleteControl } from '../controllers/DeleteControl';
import { createControl } from '../controllers/CreateControl';

const router = Router();

router.get('/consultadenutrientes/lists', listControl);
router.post('/consultarnutrientes/', createControl);
router.delete('/consults/deleteconsults', deleteControl);

export default router;