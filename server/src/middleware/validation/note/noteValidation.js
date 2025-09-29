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
    isLength: {
      options: { min: 50, max: 1200 },
      errorMessage: "Content must be between 50 and 1200 characters",
    },
  },
  tags: {
    in: ["body"],
    isArray: {
      options: { min: 1, max: 10 },
      errorMessage: "Tags must be between 1 and 10",
    },
  },
});

module.exports = noteSchemaValidation;
