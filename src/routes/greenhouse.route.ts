import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { createGreenhouse, getUserGreenhouses, updateGreenhouse, deleteGreenhouse } from '../controllers/greenhouse.controller';
const router = Router();

router.post('/create', authenticateToken, createGreenhouse); //  sera oluştur
router.get('/list', authenticateToken, getUserGreenhouses);  //  kullanıcının seralarını getir
router.put('/:id', authenticateToken, updateGreenhouse); // sera güncelle
router.delete('/:id', authenticateToken, deleteGreenhouse);// Sera sil

export default router;
