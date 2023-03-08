import express from 'express';
var router = express.Router();

router.get('/', async (req, res) => {
  try {
    let showId = req.query.showId;
    let sort = req.query.sort;
    let selectedSeason = req.query.season;
    let selectedEpisode = req.query.episode;
    
    let showReviews = await req.models.review.find({ showId: showId });

    if (sort === 'ascending') {
      showReviews = showReviews.sort((a, b) => a.rating - b.rating);
    } else if (sort === 'descending') {
      showReviews = showReviews.sort((a, b) => b.rating - a.rating);
    }
    if (selectedSeason !== '') {
      showReviews = showReviews.filter(review => review.season == selectedSeason);
    }
    if (selectedSeason !== '') {
      showReviews = showReviews.filter(review => review.episode == selectedEpisode);
    }
    
    let reviews = showReviews.map(review => {
      let reviewHTML = '';
      if (review.rating) {
        let stars = '';
        for (let i = 0; i < review.rating; i++) {
          stars += '⭐️';
        }
        reviewHTML += `<h1>${stars}</h1>`;
      }
      if (review.username) {
        reviewHTML += `<p>User: ${review.username}</p>`;
      }
      if (review.season) {
        reviewHTML += `<p>Season: ${review.season}</p>`;
      }
      if (review.episode) {
        reviewHTML += `<p>Episode: ${review.episode}</p>`;
      }
      if (review.review) {
        reviewHTML += `<p>Review: ${review.review}</p>`;
      }
      return `<div class="review-item">${reviewHTML}</div>`;
    });
    
    if (reviews.length == 0) {
      res.send(`<div class="review-item"><h2>No reviews yet!</h2></div>`);
    } else {
      res.send(reviews.join(''));
    }

  } catch (error) {
    res.status(500).send({ status: 'error', error: error });
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const username = req.session.account?.name || 'Guest';
    const newReview = new req.models.review({
      username: username,
      showId: req.body.showId,
      review: req.body.review,
      season: req.body.season,
      rating: req.body.rating,
      episode: req.body.episode,
    });

    await newReview.save();
    console.log('New review added to schema');
    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', error: error });
  }
});

export default router;
