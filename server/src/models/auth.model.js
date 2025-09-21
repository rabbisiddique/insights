const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    avatarPublicId: {
      type: String,
      required: false,
    },
    verified: { type: Boolean, default: false },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const authModal = mongoose.model("user", schema);
module.exports = authModal;
