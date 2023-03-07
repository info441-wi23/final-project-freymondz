import express from 'express';
var router = express.Router();

// get all shows stored in the MongoDB if the keyword is empty
router.get('/', async (req, res) => {
  try {
    let showId = req.query.showId;
    let showReviews = await req.models.review.find({ showId: showId });
    if (showReviews == ' ') {
      return `<div class="review-item"> No reviews for this show yet! </div>`
    }

    let reviews = showReviews.map(review => {
      let reviewHTML = '';
      if (review.username) {
        reviewHTML += `<p>Username: ${review.username}</p>`;
      }
      if (review.season) {
        reviewHTML += `<p>Season: ${review.season}</p>`;
      }
      if (review.episode) {
        reviewHTML += `<p>Episode: ${review.episode}</p>`;
      }
      if (review.rating) {
        reviewHTML += `<p>Rating: ${review.rating}</p>`;
      }
      if (review.review) {
        reviewHTML += `<p>Review: ${review.review}</p>`;
      }
      return `<div class="review-item">${reviewHTML}</div>`;
    });
    res.send(reviews.join(''));
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
