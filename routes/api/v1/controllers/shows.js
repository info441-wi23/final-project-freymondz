import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

// get all shows stored in the MongoDB if the keyword is empty
router.get('/', async (req, res) => {
    const shows = await req.models.show.find({});
    const previews = shows.map(show =>
        `<a href="/showDetail.html?showId=${show.showId}" class="show-item">
            <img src="${show.img}" alt="${show.title}" />
            <h3>Show ID: ${show.showId}</h3>
            <h2>${show.title}</h2>
        </a>`
    );
    res.status(200).json(previews);
});

// when user posts a review for the show, this post router checks to see if the show is already in the show schema
// if it is not then it adds the show to the database
router.post('/', async(req, res) => {
    let show = await req.models.show.find({ showId: req.body.showId })
    if (show.length == 0) {
        try{
            const newShow = new req.models.show({
                showId: req.body.showId,
                title: req.body.title,
                img: req.body.img
            })
            await newShow.save()
            console.log("New show added to schema (front page)")
            res.json({"status":"success"})
        } catch(error) {
            console.log(error)
            res.status(500).send({"status": "error", "error": error}) 
        }
    }
    res.json({"status": "success"}) 
})

router.get('/explore', async (req, res) => {
    const keywords = req.query.keywords;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1ff98af9f2msh445a87cab3946fbp186727jsnad50d7cfcceb',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };
    const response = await fetch(`https://imdb8.p.rapidapi.com/title/v2/find?title=${keywords}&titleType=tvSeries&limit=20&sortArg=moviemeter%2Casc`, options);
    const data = await response.json();
    const previews = data.results.map(show => {
        const showId = show.id.split("tt")[1].slice(0, -1);
        const imageUrl = show.image?.url ?? 'https://via.placeholder.com/400x600.png?text=No+Image+Available'
        return `<a href="/showDetail.html?showId=${showId}" class="show-item fetched">
                    <img src="${imageUrl}" alt="${show.title}">
                    <h3>Show ID: ${showId}</h3>
                    <h2>${show.title}</h2>
                </a>`;
    });

    res.status(200).json(previews);
});

router.get('/find', async (req, res) => {
    const showId = req.query.showId;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1ff98af9f2msh445a87cab3946fbp186727jsnad50d7cfcceb',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };
    const response = await fetch(`https://imdb8.p.rapidapi.com/title/get-details?tconst=tt${showId}`, options);
    const data = await response.json();
    res.status(200).json(data);
});

// get show detail when user clicks on a show
router.get('/:showId', async (req, res) => {
    const showId = req.params.showId;
    const show = await req.models.show.find({ showId: showId });
    res.status(200).json(show);
});

export default router;