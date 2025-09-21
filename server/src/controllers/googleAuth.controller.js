const { AppError } = require("../middleware/errorHandler");
const {generateToken, generateRefreshToken} = require("../utils/generateToken");

const googleSignIn = (req, res, next) => {
  const userId = req.user._id;
  if (!userId) throw new AppError("User not found", 404);
  try {
    const token = generateToken(res, userId);
    const refreshToken = generateRefreshToken(res, userId);
    const payload = {
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
      createAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    };
    return res.json({ success: true, token, refreshToken, user: payload });
  } catch (err) {
    next(err);
  }
};

module.exports = googleSignIn;
