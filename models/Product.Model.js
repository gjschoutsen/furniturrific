const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  productType: {
    type: String,

    required: true,
    enum: ["couch", "chair", "table", "light", "accessories"],
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  image: String,
  description: String,
  // reviews: [{
  //   reviewer: {
  //    type: String,
  //    required: true
  //   },
  // score: {
  //  type: Number,
  //  required: true,
  //  min: 1,
  //  max: 5
  // },
  // description: String,
  // }]
});

const Product = model("Product", userSchema);

module.exports = Product;
