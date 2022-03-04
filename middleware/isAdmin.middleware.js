const User = require("../models/User.model");

function isAdmin(req, res, next) {
  User.findById(req.payload._id).then((user) => {
    if ((role = user.role !== "admin")) {
      return res.status(403).json({
        message: "Access denied, must be administrator",
      });
    } else {
      next();
    }
  });
}

module.exports = { isAdmin };
