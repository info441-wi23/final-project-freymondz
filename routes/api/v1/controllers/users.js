import { Router } from 'express';
const router = Router();

router.get('/identity', (req, res) => {
    if (req.session.isAuthenticated) {
        res.json({
            status: 'success',
            data: {
                user: req.session.account?.name,
                name: req.session.account?.name,
            }
        });
    } else {
        res.json({ status: 'logged out' });
    }
});

export default router;