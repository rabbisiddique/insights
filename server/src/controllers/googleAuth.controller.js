const { AppError } = require("../middleware/errorHandler");
const {
  generateToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const isProd = process.env.NODE_ENV === "production";

const googleSignIn = (req, res, next) => {
  const userId = req.user._id;
  if (!userId) return AppError(res, "User not found", 404);
  try {
    generateToken(res, userId);
    generateRefreshToken(res, userId);
    const frontendUrl = isProd
      ? "https://insights-k5t9.onrender.com/home"
      : "http://localhost:5173/home";

    return res.redirect(frontendUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = googleSignIn;
