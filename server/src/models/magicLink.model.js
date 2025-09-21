const mongoose = require("mongoose");

const magicLinkTokenSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const MagicLinkToken = mongoose.model("MagicLinkToken", magicLinkTokenSchema);
module.exports = MagicLinkToken;
