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
  },
});

module.exports = updateNoteValidation;
