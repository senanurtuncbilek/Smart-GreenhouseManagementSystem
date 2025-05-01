import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { createSensor, getGreenhouseSensors, getLastSensorFromCache } from '../controllers/sensor.controller';

const router = Router();

router.post('/create', authenticateToken, createSensor); // Sensor oluştur
router.get('/:greenhouseId', authenticateToken, getGreenhouseSensors); // Seranın sensörlerini getir
router.get('/last/:greenhouseId', authenticateToken, getLastSensorFromCache); // Redis'ten son veriyi getir


export default router;
