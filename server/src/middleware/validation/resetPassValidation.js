const { check } = require("express-validator");

const resetPasswordValidation = [
  check("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])/)
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special character"
    ),
];

module.exports = resetPasswordValidation;
