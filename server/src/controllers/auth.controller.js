const cloudinary = require("../config/cloudinary");
const { AppError } = require("../middleware/errorHandler");
const authModal = require("../models/auth.model");
const bcrypt = require("bcrypt");
const {
  generateToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { validationResult } = require("express-validator");

const signUp = async (req, res, next) => {
  const { username, email, password, avatar } = req.body;
  const saltRounds = 10;
  let avatarUrl = "";
  let avatarPublicId = "";
  try {
    const existingUser = await authModal.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return AppError(res, "Email already exists!", 400);
      }
      if (existingUser.username === username) {
        return AppError(res, "Username already exists!", 400);
      }
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    if (avatar) {
      const uploadResult = await cloudinary.uploader.upload(avatar);
      avatarUrl = uploadResult.secure_url;
      avatarPublicId = uploadResult.public_id;
    }

    const newUser = await authModal.create({
      username,
      email,
      password: hashPassword,
      avatar: avatarUrl,
      avatarPublicId,
      verified: false,
    });
    generateToken(res, newUser._id);
    generateRefreshToken(res, newUser._id);

    return res.status(201).json({
      success: true,
      message: "user register",
      user: {
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        verified: newUser.verified,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authModal.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return AppError(res, "user not found", 401);
    }

    if (!user.password) {
      return AppError(res, "password not set for user", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return AppError(res, "password is wrong", 401);
    }

    generateToken(res, user._id);
    generateRefreshToken(res, user._id);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Signed out successfully" });
  } catch (err) {
    next(err);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated. Kindly log in!" });

    const user = await authModal.findById(userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const user = await authModal.findOne({ email });
    if (!user) {
      return AppError(res, "user not found", 404);
    }
    // generate rest token;

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins for expires
    await user.save();

    const isProd = process.env.NODE_ENV === "production";

    const FRONTEND_URL = isProd
      ? process.env.FRONTEND_URL
      : "http://localhost:5173";
    const resetUrl = `${FRONTEND_URL}/reset-password/${resetToken}?email=${encodeURIComponent(
      user.email
    )}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
    <p>Hello ${user.username},</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>If you didn't request this, ignore this email.</p>
  `,
    });
    return res.status(200).json({
      success: true,
      message:
        "Almost there! Check your email and follow the instructions to reset your password.",
      resetUrl,
    });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await authModal.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return AppError(res, "Invalid or expired token", 400);
    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Success! Your password has been reset.",
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { username, newPassword, currentPassword, avatar } = req.body;
  const updateData = {};

  try {
    const user = await authModal.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent updating someone else's profile
    if (user._id.toString() !== req.userId) {
      return AppError(res, "Unauthorized to update this profile", 403);
    }

    // Username update
    if (username) {
      const exists = await authModal.findOne({ username });
      if (exists && exists._id.toString() !== req.userId) {
        return AppError(res, "Username already token!", 403);
      }
      updateData.username = username;
    }

    // Password update
    if (newPassword) {
      if (!currentPassword) {
        return AppError(res, "current password is required", 403);
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return AppError(res, "currentPassword is wrong!", 401);
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    if (avatar) {
      // Delete old avatar if exists
      if (user.avatarPublicId) {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      }

      // Upload new avatar
      const result = await cloudinary.uploader.upload(avatar, {
        allowed_formats: ["jpg", "png"],
      });

      updateData.avatar = result.secure_url;
      updateData.avatarPublicId = result.public_id;
    }

    const updatedUser = await authModal.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        username: updatedUser.username,
        avatar: updatedUser.avatar,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  checkAuth,
  resetPassword,
  forgotPassword,
  updateProfile,
};
