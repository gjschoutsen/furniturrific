const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  reviewer: String,
  score: Number,
  description: String,
});

const Review = model("Review", userSchema);

module.exports = Review;
