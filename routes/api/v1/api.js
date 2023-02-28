import showsRouter from './controllers/shows.js';

import reviewsRouter from './controllers/reviews.js';
import infoRouter from './controllers/info.js';
import userRouter from './controllers/users.js';

import { Router } from 'express';
const router = Router();

router.use('/shows', showsRouter);
router.use('/reviews', reviewsRouter);
router.use('/info', infoRouter);
router.use('/users', userRouter);

export default router