import showsRouter from './controllers/shows.js';

import { Router } from 'express';
const router = Router();

router.use('/shows', showsRouter);

export default router