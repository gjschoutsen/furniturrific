const User = require("../models/User.model");

function isCurrentUser(req, res, next) {
  User.findById(req.payload._id)
    .then((user) => {
      if ((req.payload.username !== user.username)) {
      return res.status(403).json({
          message: "Access denied",
        });
      
    } else {
      next();
    }
  });
}

module.exports = { isCurrentUser };