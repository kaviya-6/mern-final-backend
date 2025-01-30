import express from 'express';
import { getBudgets, addBudget } from '../controllers/budgetController.js';

const router = express.Router();

router.get('/', getBudgets);
router.post('/', addBudget);

export default router;
