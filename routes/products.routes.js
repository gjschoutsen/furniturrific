const router = require("express").Router();
const Products = require("../models/Product.Model");
const mongoose = require("mongoose");

//GET ALL PRODUCTS
router.get("/", (req, res) => {
  Products.find()
    .populate("reviews")
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
router.post("/",(req, res) => {
    const body = req.body;
    const productDetails = {
      name: body.name,
      producttype: body.producttype,
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
  const { id } = req.params;

  // isIdValid(id, res);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Products.findById(id)
    .populate("reviews")
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
router.put("/:productId",
  (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const productDetails = {
      name: body.name,
      producttype: body.producttype,
      price: body.price,
      brand: body.brand,
      image: body.image,
      description: body.description,
    };

    Products.findByIdAndUpdate(id, productDetails, { new: true })
      .then((updatedProduct) => res.json(updatedProduct))
      .catch((err) => {
        console.log("Error updating product", err);
        res.status(500).json({
          message: "Error updating product",
          error: err,
        });
      });
  });

router.delete("/:productId",
  (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Products.findByIdAndRemove(id)
      .then()
      .catch((err) => {
        console.log("Error deleting product", err);
        res.status(500).json({
          message: "Error deleting product",
          error: err,
        });
      });
  });

module.exports = router;
