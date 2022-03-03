const router = require("express").Router();
const Reviews = require("../models/Review.Model");
const Product = require("../models/Product.Model");
const {isAuthenticated} = require ("../middleware/jwt.middleware")
//GET ALl REVIEWS
router.get("/", (req, res) => {
  Reviews.find()
    .then((reviews) => res.json(reviews))
    .catch((err) => {
      console.log("Error getting all the reviews", err);
      res.status(500).json({
        message: "Error getting all the reviews",
        error: err,
      });
    });
});
//CREATE A REVIEW
router.post("/", isAuthenticated, (req, res) => {
    const body = req.body;
    const reviewDetails = {
      reviewer: body.reviewer,
      score: body.score,
      description: body.description
    };
    Reviews.create(reviewDetails)
      .then((review)=>{
        return Product.findByIdAndUpdate(productId, {
          $push: { reviews: review._id}
        });
      })
      .then((createdReview) => {
        res.status(201).json(createdReview)
      })
      .catch((err) => {
        console.log("Error creating a new review", err);
        res.status(500).json({
          message: "Error creating a new review",
          error: err,
        });
      });
  });

module.exports = router;
