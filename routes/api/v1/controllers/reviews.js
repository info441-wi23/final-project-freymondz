import express from 'express';
var router = express.Router();

// get all shows stored in the MongoDB if the keyword is empty
router.get('/', async (req, res) => {
    try {
      let showId = req.query.showId;
      let showReviews = await req.models.review.find({ showId: showId });
      let reviews = showReviews.map(review => 
        `<div class="review-item">
          <p>Username: ${review.username}</p>
          <p>Season: ${review.season}</p>
          <p>Episode: ${review.episode}</p>
          <p>Rating: ${review.rating}</p>
          <p>Review: ${review.review}</p>
        </div>`
      );
      res.send(reviews.join(''));
    } catch (error) {
      res.status(500).send({ status: 'error', error: error });
    }
  });

// This router will add new reviews to the mongodb reviews schema
// not sure how to get showID
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
      const newReview = new req.models.review({
        username: req.session.account?.username,
        showId: req.body.showId,
        review: req.body.review,
        season: parseInt(req.body.season),
        episode: parseInt(req.body.episode),
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
