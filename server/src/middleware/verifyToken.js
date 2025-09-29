const authModal = require("../models/auth.model");
const MagicLinkToken = require("../models/magicLink.model");
const { generateToken } = require("../utils/generateToken");
const { AppError } = require("./errorHandler");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return AppError(
      res,
      "Unauthorized - may be your token has been expired! Please log in again.",
      401
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return AppError(res, "Unauthorized - invalid token", 401);
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
    return AppError(res, "Unauthorized - No token provided", 401);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    // double-check decoded object
    if (!decoded?.userId) {
      return AppError(res, "Unauthorized - Invalid token", 401);
    }

    const user = await authModal.findById(decoded.userId);

    if (!user) {
      return AppError(res, "User not found", 404);
    }

    // Generate new access token
    // Generate both new access and refresh tokens
    const newAccessToken = generateToken(res, user._id);
    const newRefreshToken = generateRefreshToken(res, user._id);

    return res.json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      verified: user.verified,
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return AppError(res, "Unauthorized - Token expired or invalid", 401);
  }
};

const verifyMagicLink = async (req, res, next) => {
  const { token } = req.params;
  try {
    const magicToken = await MagicLinkToken.findOne({ token });
    if (!magicToken) return AppError(res, "Invalid or expired link", 400);

    if (magicToken.used) return AppError(res, "Link already used", 400);

    if (magicToken.expiresAt < Date.now())
      return AppError(res, "Link expired", 400);

    const user = await authModal.findOne({ email: magicToken.email });
    if (!user) return AppError(res, "User not found", 404);

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
