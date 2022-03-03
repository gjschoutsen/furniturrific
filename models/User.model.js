const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    email: {
      type: String,
      unique: true,
      require: true
    },
    address:{
      street: String,
      city: String,
      state: String,
      postalcode: {
        num: Number,
        letters: String,
      },
      country: String
    },
    favorites: Array,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }]

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
