const authModal = require("../models/auth.model");
const MagicLinkToken = require("../models/magicLink.model");
const { generateToken } = require("../utils/generateToken");
const { AppError } = require("./errorHandler");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new AppError("Unauthorized - Please login!");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new AppError("Unauthorized - invalid token");
    }
    const user = await authModal.findById(decoded.userId).select("-password");
    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError("Unauthorized - No token provided token");
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    if (!decoded) {
      throw new AppError("Unauthorized - invalid token");
    }
    const user = await authModal.findById(decoded.userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const newAccessToken = generateToken(res, decoded.userId);
    return res.json({
      success: true,
      accessToken: newAccessToken,
      verified: user.verified,
    });
  } catch (err) {
    next(err);
  }
};

const verifyMagicLink = async (req, res, next) => {
  const { token } = req.params;
  try {
    const magicToken = await MagicLinkToken.findOne({ token });
    if (!magicToken) return next(new AppError("Invalid or expired link", 400));

    if (magicToken.used) return next(new AppError("Link already used", 400));

    if (magicToken.expiresAt < Date.now())
      return next(new AppError("Link expired", 400));

    const user = await authModal.findOne({ email: magicToken.email });
    if (!user) return next(new AppError("User not found", 404));

    // Mark user verified
    if (!user.verified) {
      user.verified = true;
      await user.save();
    }

    // Mark token as used
    magicToken.used = true;
    await magicToken.save();

    return res.json({
      success: true,
      message: "Account verified successfully!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyToken, verifyRefreshToken, verifyMagicLink };
