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
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
