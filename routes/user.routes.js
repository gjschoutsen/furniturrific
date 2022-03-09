const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isCurrentUser } = require("../middleware/isCurrentUser.middleware");

//GET USER
router.get("/:userId", isAuthenticated, isCurrentUser, (req, res) => {
    const { userId } = req.params;
    
      User.findById(userId)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
          console.log("Error getting User Details", err);
          res.status(500).json({
            message: "Error getting User Details",
            error: err,
          });
        });
  });

  //Edit User
  router.put("/:userId", isAuthenticated, isCurrentUser, (req, res) => {
    const { userId } = req.params;
    const body = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const userDetails = {
        username: body.username,
        street: body.street,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country
    };
    console.log(userDetails)
    User.findByIdAndUpdate(userId, userDetails, { new: true })
      .then((updatedUser) => {
          res.json(updatedUser)})
      .catch((err) => {
        console.log("Error updating User Details", err);
        res.status(500).json({
          message: "Error updating User Details",
          error: err,
        });
      });
  });

  module.exports = router;