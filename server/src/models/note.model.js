const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    mood: {
      type: String,
      mood: {
        type: String,
        enum: ["happy", "over the moon", "sad", "heartbreaking"],
        default: "happy",
      },
    },
    isPublic: {
      type: Boolean,
      default: false, // false = private, true = public
    },
    isArchived: {
      type: Boolean,
      default: false, // true = note is archived
    },
    summary: { type: String, default: "" },
  },
  { timestamps: true }
);

noteSchema.plugin(mongoosePaginate);

const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
