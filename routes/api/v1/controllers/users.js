import { Router } from 'express';
const router = Router();

router.post('/login', async (req, res) => {
    await req.models.user.findOneAndUpdate(
        { username: req.session.account?.username, name: req.session.account?.name },
        { username: req.session.account?.username, name: req.session.account?.name, picture: null },
        { upsert: true }
    );
    res.json({ status: 'success' });
});

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