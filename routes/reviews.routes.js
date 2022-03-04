// const router = require("express").Router();
// const Reviews = require("../models/Review.Model");
// const Product = require("../models/Product.Model");
// const User = require("../models/User.model");
// const {isAuthenticated} = require ("../middleware/jwt.middleware")
// //GET ALl REVIEWS
// router.get("/", (req, res) => {
//   Reviews.find()
//     .then((reviews) => res.json(reviews))
//     .catch((err) => {
//       console.log("Error getting all the reviews", err);
//       res.status(500).json({
//         message: "Error getting all the reviews",
//         error: err,
//       });
//     });
// });
// //CREATE A REVIEW
// router.post("/:productId", isAuthenticated, (req, res) => {
//     const { productId } = req.params;
//     const body = req.body;
//     const reviewDetails = {
//       reviewer: req.payload.username,
//       score: body.score,
//       description: body.description
//     };
//     Reviews.create(reviewDetails)
//       .then((review)=>{
//         return Product.findByIdAndUpdate(productId, {
//           $push: { reviews: review._id}
//         });
//       })
//       .then((createdReview) => {
//         res.status(201).json(createdReview)
//       })
//       .catch((err) => {
//         console.log("Error creating a new review", err);
//         res.status(500).json({
//           message: "Error creating a new review",
//           error: err,
//         });
//       });
//   });

// module.exports = router;
