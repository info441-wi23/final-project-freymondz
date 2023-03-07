import express from 'express';
var router = express.Router();

// find all the reviews from mongodb for the show that is requested
router.get('/', async(req, res) => {
    try {
        let show = req.query.showID
        let showReivews = await req.models.Review.find({show: show})
        res.json(showReivews)
    } catch(error) {
        res.status(500).json({"status": "error", "error": error})
    }
})

// This router will add new reviews to the mongodb reviews schema
// not sure how to get showID
router.post('/', async(req, res) => {
    console.log("trying to post review to mongodb")
    try{
        console.log(req.session.account.username)
        console.log(req.body.review)
        console.log(req.body.rating)

        const newReview = new req.models.review({
            username: req.session.account.username,
            review: req.body.review,
            rating: req.body.rating
        })

        await newReview.save()

        console.log("added new review")
        res.json({status:"success"})
    } catch(error) {
        console.log(error)
        res.status(500).send({"status": "error", "error": error}) 
    }
})

export default router;
