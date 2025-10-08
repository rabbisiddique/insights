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
    const isProd = process.env.NODE_ENV === "production";

    const frontendUrl = isProd
      ? `https://insights-k5t9.onrender.com/verify-email/${token}`
      : `http://localhost:5173/verify-email/${token}`;
    // Build link
    const link = frontendUrl;

    // Send email
    await sendEmail({
      to: user.email,
      subject: "Verify your account",
      html: `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Verify Your Account</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f9fafb; color: #111827; }
        .container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .btn {
          display: inline-block;
          padding: 12px 20px;
          margin-top: 20px;
          background: #2563eb;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>🔒 Verify your account</h2>
        <p>Hello,</p>
        <p>We just need to confirm your email address to activate your <b>InsightHub</b> account.</p>
        <p>Click the button below to verify:</p>
        <a href="${link}" class="btn">Verify My Account</a>
        <p>If the button doesn’t work, copy and paste this link into your browser:</p>
        <p><a href="${link}">${link}</a></p>
        <div class="footer">
          <p>If you didn’t request this, you can safely ignore this email.</p>
          <p>© ${new Date().getFullYear()} InsightHub</p>
        </div>
      </div>
    </body>
  </html>
  `,
    });
    return res.json({
      success: true,
      message:
        "Almost there! Check your email for the magic link to activate your account.",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = sendMagicLink;
