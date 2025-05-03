import { Router } from 'express';
import { createCropHistory, getCropHistoryByGreenhouse } from '../controllers/cropHistory.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/create', authenticateToken, createCropHistory);
router.get('/:greenhouseId', authenticateToken, getCropHistoryByGreenhouse);

export default router;
