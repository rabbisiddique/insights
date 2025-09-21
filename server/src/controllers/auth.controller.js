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

const signUp = async (req, res, next) => {
  const { username, email, password, avatar } = req.body;
  const saltRounds = 10;
  try {
    const existingUser = await authModal.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new AppError("Email already exists!", 400);
      }
      if (existingUser.username === username) {
        throw new AppError("Username already exists!", 400);
      }
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const uploadResult = await cloudinary.uploader.upload(avatar);

    const newUser = await authModal.create({
      username,
      email,
      password: hashPassword,
      avatar: uploadResult.secure_url,
      avatarPublicId: uploadResult.public_id,
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
      throw new AppError("user not found", 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("password is wrong", 401);
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
    const user = await authModal.findById(req.userId).select("-password");
    if (!user) {
      throw new AppError("user not found", 404);
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await authModal.findOne({ email });
    if (!user) {
      throw new AppError("user not found", 404);
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
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
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
      message: "An email has been sent with password reset instructions",
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
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await authModal.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) throw new AppError("Invalid or expired token", 400);
    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { username, password, currentPassword, avatar } = req.body;
  const updateData = {};

  try {
    const user = await authModal.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent updating someone else's profile
    if (user._id.toString() !== req.userId) {
      throw new AppError("Unauthorized to update this profile", 403);
    }

    // Username update
    if (username) {
      const exists = await authModal.findOne({ username });
      if (exists && exists._id.toString() !== req.userId) {
        throw new AppError("Username already taken", 400);
      }
      updateData.username = username;
    }

    // Password update
    if (password) {
      if (!currentPassword) {
        throw new AppError("Current password is required");
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw new AppError("Current password is incorrect");
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
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
