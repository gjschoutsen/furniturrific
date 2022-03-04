const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    address:{
      street: String,
      city: String,
      state: String,
      postalcode: String,
      country: String
    },
    // favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
