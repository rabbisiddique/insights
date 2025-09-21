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

  password: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters",
    },
    matches: {
      options: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])/,
      errorMessage:
        "Password must contain uppercase, lowercase, number, and special character",
    },
  },
});

module.exports = updateProfileValidation;
