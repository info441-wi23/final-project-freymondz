import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/picture', upload.single('picture'), async (req, res) => {
    const filePath = req.file.path;
    const buffer = fs.readFileSync(filePath);
    console.log(req.file.buffer);
    console.log(req.session.account?.username);
    console.log(req.session.account?.name);
    await req.models.user.findOneAndUpdate(
        { username: req.session.account?.username, name: req.session.account?.name },
        { picture: buffer },
    );
    res.json({ status: 'success' });
});

router.post('/login', async (req, res) => {
    await req.models.user.findOneAndUpdate(
        { username: req.session.account?.username, name: req.session.account?.name },
        { username: req.session.account?.username, name: req.session.account?.name },
        { upsert: true }
    );
    res.json({ status: 'success' });
});

router.get('/identity', (req, res) => {
    if (req.session.isAuthenticated) {
        res.json({
            status: 'success',
            data: {
                user: req.session.account?.username,
                name: req.session.account?.name,
            }
        });
    } else {
        res.json({ status: 'logged out' });
    }
});

router.get('/', async (req, res) => {
    const username = req.query.username;
    const users = await req.models.user.findOne({ username: username });
    res.status(200).json({ status: 'success', data: users });
});

export default router;