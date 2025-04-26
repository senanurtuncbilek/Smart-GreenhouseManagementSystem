import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { createSensor, getGreenhouseSensors } from '../controllers/sensor.controller';

const router = Router();

router.post('/create', authenticateToken, createSensor); // Sensor oluştur
router.get('/:greenhouseId', authenticateToken, getGreenhouseSensors); // Seranın sensörlerini getir

export default router;
