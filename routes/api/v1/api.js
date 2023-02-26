import showsRouter from './controllers/shows.js';
import userRouter from './controllers/users.js';

import { Router } from 'express';
const router = Router();

router.use('/shows', showsRouter);
router.use('/users', userRouter);

export default router