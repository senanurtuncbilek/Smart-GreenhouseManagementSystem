import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { createZone, getZonesByGreenhouse } from '../controllers/zone.controller';

const router = Router();

router.post('/create', authenticateToken, createZone);
router.get('/:greenhouseId', authenticateToken, getZonesByGreenhouse);

export default router;
