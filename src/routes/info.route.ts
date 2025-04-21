import { Router } from 'express';
import { getInfoStatus } from '../controllers/info.controller';

const router = Router();

router.get('/info', getInfoStatus);

export default router;
