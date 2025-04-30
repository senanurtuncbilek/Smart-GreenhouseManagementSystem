import { Router } from 'express';
import { createAutomationRule, getRules } from '../controllers/automation.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/create', authenticateToken, createAutomationRule);
router.get('/:greenhouseId', authenticateToken, getRules);

export default router;
