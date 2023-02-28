import showsRouter from './controllers/shows.js';
import reviewsRouter from './controllers/reviews.js';
import userRouter from './controllers/info.js';

import { Router } from 'express';
const router = Router();

router.use('/shows', showsRouter);
router.use('/reviews', reviewsRouter);
router.use('/user', userRouter);

export default router