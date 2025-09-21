const { checkSchema } = require("express-validator");

const signInValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid email",
    },
    normalizeEmail: true,
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters",
    },
  },
});

module.exports = signInValidation;
