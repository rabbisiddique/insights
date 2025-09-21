const mongoose = require("mongoose");

const aiSchema = new mongoose.Schema(
  {
    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "note",
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    action: {
      type: String,
      enum: [
        "summary",
        "tags",
        "qa",
        "improve-writing",
        "suggestions",
        "create-note",
      ],
      required: true,
    },
    target: {
      type: [String], // e.g., ["title"], ["content"], ["title","content"]
      default: [],
    },
    model: {
      type: String,
      default: "gemini-2.0-flash-001",
    },
    question: {
      type: String, // Only for QA
    },
    answer: {
      type: String, // Summary, tags, QA response, or improved text
      required: true,
    },
  },
  { timestamps: true }
);

const aiModel = mongoose.model("aiHistory", aiSchema);
module.exports = aiModel;
