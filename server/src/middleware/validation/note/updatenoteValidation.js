const { checkSchema } = require("express-validator");

const updateNoteValidation = checkSchema({
  title: {
    in: ["body"],
    optional: true, // allow skipping
    notEmpty: {
      errorMessage: "Title cannot be empty if provided",
    },
    isLength: {
      options: { min: 6, max: 80 },
      errorMessage: "Title must be between 6 and 80 characters",
    },
  },
  content: {
    in: ["body"],
    optional: true,
    notEmpty: {
      errorMessage: "Content cannot be empty if provided",
    },
    isLength: {
      options: { min: 50, max: 1200 },
      errorMessage: "Content must be between 50 and 1200 characters",
    },
  },
  tags: {
    in: ["body"],
    optional: true,
    isArray: {
      errorMessage: "Tags must be an array",
    },
    isLength: {
      options: { min: 1, max: 10 },
      errorMessage: "Tags must contain between 1 and 10 items",
    },
  },
});

module.exports = updateNoteValidation;
