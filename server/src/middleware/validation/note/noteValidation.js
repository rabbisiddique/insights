const { checkSchema } = require("express-validator");

const noteSchemaValidation = checkSchema({
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Title is required",
    },
    isLength: {
      options: { min: 6, max: 80 },
      errorMessage: "Title must be between 6 and 80 characters",
    },
  },
  content: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Content is required",
    },
  },
});

module.exports = noteSchemaValidation;
