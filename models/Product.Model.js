const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  producttype: {
    type: String,
    required: ["couch", "chair", "table", "lights", "Accessories"],
  },
  price: Number,
  brand: String,
  image: String,
  description: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

const Product = model("Product", userSchema);

module.exports = Product;
