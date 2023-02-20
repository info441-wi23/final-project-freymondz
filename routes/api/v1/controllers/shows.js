import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.get('/', async (req, res) => {
    const shows = await req.models.show.find({});
    console.log(shows)
    const previews = shows.map(show =>
        `<li>
            <img src="${show.img}" alt="${show.title}" />
            <h2>${show.title}</h2>
        <li>`
    );

    res.status(200).json(previews);
});

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
    
        `<li><img src="${show.image.url}"><h2>${show.title}</h2></li>`
    
    );
    console.log(previews)
  
    res.status(200).json(previews);
});
  


export default router;