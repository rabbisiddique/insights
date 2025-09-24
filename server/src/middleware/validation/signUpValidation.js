const { checkSchema } = require("express-validator");

const signUpValidation = checkSchema({
  username: {
    in: ["body"],

    isLength: {
      options: { min: 3 },
      errorMessage: "Username must be at least 3 characters",
    },
    trim: true,
    escape: true,
  },
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
    matches: {
      options: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])/,
      errorMessage:
        "Password must contain uppercase, lowercase, number, and special character",
    },
  },
  // avatar: {
  //   in: ["body"],
  //   optional: false,
  //   isURL: {
  //     errorMessage: "Avatar must be a valid URL",
  //   },
  // },
});

module.exports = signUpValidation;
