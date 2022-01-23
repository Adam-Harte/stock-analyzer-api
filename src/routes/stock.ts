import express from 'express';

import { getStock } from '../controllers/stock';

const router = express.Router();

router.get('/:symbol', getStock);

export default router;
