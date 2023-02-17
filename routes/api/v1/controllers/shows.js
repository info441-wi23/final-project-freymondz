import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const shows = await req.models.show.find({});
    console.log(shows)
    const previews = shows.map(show =>
        `<div class="show-preview">
            <img src="${show.img}" alt="${show.title}" />
            <h3>${show.title}</h3>
        </div>`
    );

    res.status(200)
        .json(previews);
});

export default router;