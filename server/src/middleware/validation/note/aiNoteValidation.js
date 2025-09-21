const { checkSchema } = require("express-validator");

const aiNoteValidation = checkSchema({
  // confirmed: {
  //   in: ["body"],
  //   isBoolean: {
  //     errorMessage: "Confirmed must be a boolean",
  //   },
  //   toBoolean: true,
  // },
  title: {
    in: ["body"],
    optional: { options: (value, { req }) => !req.body.confirmed },
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
    optional: { options: (value, { req }) => !req.body.confirmed },
    notEmpty: {
      errorMessage: "Content is required",
    },
    isLength: {
      options: { min: 50, max: 2000 },
      errorMessage: "Content must be between 50 and 2000 characters",
    },
  },
  tags: {
    in: ["body"],
    optional: { options: (value, { req }) => !req.body.confirmed },
    isArray: {
      options: { min: 1, max: 10 },
      errorMessage: "Tags must contain between 1 and 10 items",
    },
  },
  isPublic: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "isPublic must be a boolean",
    },
    toBoolean: true,
  },
});

module.exports = aiNoteValidation;
