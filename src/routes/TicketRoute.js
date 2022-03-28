import { Router } from 'express';
const router = Router();
import { get } from '../controllers/TicketController.js';

router.get('/:codBoleto', get);

export default router;