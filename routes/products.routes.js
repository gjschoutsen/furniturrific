const router = require("express").Router();
const Products = require("../models/Product.Model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

//GET ALL PRODUCTS
router.get("/", (req, res) => {
  Products.find()
    .then((products) => res.json(products))
    .catch((err) => {
      console.log("Error getting all the products", err);
      res.status(500).json({
        message: "Error getting all the products",
        error: err,
      });
    });
});
//CREATE NEW PRODUCT
router.post("/", isAuthenticated, isAdmin, (req, res) => {
  
  const body = req.body;
  const productDetails = {
    name: body.name,
    productType: body.productType,
    price: body.price,
    brand: body.brand,
    image: body.image,
    description: body.description,
    reviews: [],
  };
  Products.create(productDetails)
    .then((createdProduct) => res.status(201).json(createdProduct))
    .catch((err) => {
      console.log("Error creating a new product", err);
      res.status(500).json({
        message: "Error creating a new product",
        error: err,
      });
    });
});
//GET ONE PRODUCT
router.get("/:productId", (req, res) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Products.findById(productId)
    .then((product) => res.status(200).json(product))
    .catch((err) => {
      console.log("Error getting product", err);
      res.status(500).json({
        message: "Error getting product",
        error: err,
      });
    });
});
// UPDATE PRODUCT
router.put("/:productId", isAuthenticated, isAdmin, (req, res) => {
  const { productId } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const productDetails = {
    name: body.name,
    productType: body.productType,
    price: body.price,
    brand: body.brand,
    image: body.image,
    description: body.description,
  };

  Products.findByIdAndUpdate(productId, productDetails, { new: true })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((err) => {
      console.log("Error updating product", err);
      res.status(500).json({
        message: "Error updating product",
        error: err,
      });
    });
});

router.delete("/:productId", isAuthenticated, isAdmin, (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Products.findByIdAndRemove(productId)
    .then(() =>
      res.json({
        message: `Project with ${productId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("Error deleting product", err);
      res.status(500).json({
        message: "Error deleting product",
        error: err,
      });
    });
});

module.exports = router;
