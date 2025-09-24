const crypto = require("crypto");
const MagicLinkToken = require("../models/magicLink.model");
const { AppError } = require("../middleware/errorHandler");
const authModal = require("../models/auth.model");
const sendEmail = require("../utils/sendEmail");

const sendMagicLink = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return AppError(res, "Invalid userId");
    }
    const user = await authModal.findById(userId);
    if (!user) return AppError(res, "User not found", 404);

    if (user.verified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Save to DB
    const magicToken = new MagicLinkToken({
      email: user.email,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expires in 15 min
    });
    await magicToken.save();

    // Build link
    const link = `http://localhost:5000/api/verify-email/${token}`;

    // Send email
    await sendEmail({
      to: user.email,
      subject: "Verify your account",
      html: `<p>Click below to verify your account:</p><a href="${link}">${link}</a>`,
    });

    return res.json({ success: true, message: "Magic link sent!" });
  } catch (err) {
    next(err);
  }
};

module.exports = sendMagicLink;
