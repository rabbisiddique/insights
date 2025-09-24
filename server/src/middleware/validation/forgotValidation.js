const { check } = require("express-validator");

const forgotValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),
];

module.exports = forgotValidation;
