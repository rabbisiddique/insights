const { AppError } = require("../middleware/errorHandler");
const {
  generateToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const googleSignIn = (req, res, next) => {
  const userId = req.user._id;
  if (!userId) return AppError(res, "User not found", 404);
  try {
    generateToken(res, userId);
    generateRefreshToken(res, userId);

    res.redirect("http://localhost:5173/home");
  } catch (err) {
    next(err);
  }
};

module.exports = googleSignIn;
