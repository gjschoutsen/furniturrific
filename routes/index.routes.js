const router = require("express").Router();
const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const reviewsRoutes = require("./reviews.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/reviews", reviewsRoutes);


module.exports = router;
