import { Router } from 'express';
import { createCropHistory, getCropHistoryByGreenhouse, exportCropHistoryAsPDF , exportCropHistoryExcel} from '../controllers/cropHistory.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getCropHistoryReport } from '../controllers/cropHistory.controller';


const router = Router();

router.post('/create', authenticateToken, createCropHistory);
router.get('/:greenhouseId', authenticateToken, getCropHistoryByGreenhouse);
router.get('/report/:greenhouseId', authenticateToken, getCropHistoryReport);
router.get('/export/pdf/:greenhouseId', authenticateToken, exportCropHistoryAsPDF);
router.get('/export/excel/:greenhouseId', authenticateToken, exportCropHistoryExcel);


export default router;
