import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.get('/', async (req, res) => {
    const shows = await req.models.show.find({});
    console.log(shows)
    const previews = shows.map(show =>
        `<a href="/shows/${show.showId}" class="show-item" target="_blank">
            <img src="${show.img}" alt="${show.title}" />
            <h3>Show ID: ${show.showId}</h3>
            <h2>${show.title}</h2>
        </a>`
    );

    res.status(200).json(previews);
});

//post a new show to mongodb when user clicks on the show using imdbid?
router.post('/', async(req, res) => {
    let allShows = req.models.show.find();
    let filteredShows = allShows.filter(show => show.imdbid == req.query.imdbid)
    if (filteredShows.length == 0) {
        try{
            const newShow = new req.models.show({
                imdbid: req.query.imdbid,
                title: req.body.title,
                img: req.body.img
            })
            await newShow.save()
            console.log("New show added to front page")
            res.json({"status":"success"})
        } catch(error) {
            console.log(error)
            res.status(500).send({"status": "error", "error": error}) 
        }
    } 
})

router.get('/explore', async (req, res) => {
    const keywords = req.query.keywords;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c18f8ecb7cmsh5f78abec4c98e1ep1c2eadjsnd919dec0f9b8',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };
    const response = await fetch(`https://imdb8.p.rapidapi.com/title/v2/find?title=${keywords}&titleType=tvSeries&limit=20&sortArg=moviemeter%2Casc`, options);
    const data = await response.json();
    console.log(data)
  
    const previews = data.results.map(show => 
        `<a href="/shows/${show.id.split("tt")[1].slice(0, -1)}" class="show-item" target="_blank">
            <li>
                <img src="${show.image.url}">
                <h3>Show ID: ${show.id.split("tt")[1].slice(0, -1)}</h3>
                <h2>${show.title}</h2>
            </li>
        </a>`
    );

    console.log(previews)
  
    res.status(200).json(previews);
});
  


export default router;