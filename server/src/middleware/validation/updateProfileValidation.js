const { checkSchema } = require("express-validator");

const updateProfileValidation = checkSchema({
  username: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Username must be at least 3 characters",
    },
  },
  currentPassword: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "Current password must be at least 6 characters",
    },
  },
  newPassword: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "New password must be at least 6 characters",
    },
    matches: {
      options: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])/,
      errorMessage:
        "New password must contain uppercase, lowercase, number, and special character",
    },
  },
});

module.exports = updateProfileValidation;
