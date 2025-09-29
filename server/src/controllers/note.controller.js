const { validationResult } = require("express-validator");
const { AppError } = require("../middleware/errorHandler");
const authModal = require("../models/auth.model");
const noteModel = require("../models/note.model");

const createNote = async (req, res, next) => {
  const { title, content, tags, isPublic, isArchived, mood } = req.body;
  const userId = req.userId;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const user = await authModal.findById(userId);
    if (!user) {
      return AppError(res, "User not found", 404);
    }
    const note = await noteModel.create({
      user: userId,
      title,
      content,
      tags,
      mood,
      isPublic,
      isArchived,
    });
    return res.status(201).json({ message: "note created successfully", note });
  } catch (error) {
    next(error);
  }
};

const updateUserNote = async (req, res, next) => {
  const { title, content, isPublic, tags, isArchived, mood } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { noteId } = req.params;
  const userId = req.userId;
  const updatedNoteData = {};

  try {
    const user = await authModal.findById(userId);
    if (!user) {
      return AppError(res, "User not found", 404);
    }

    if (title !== undefined) updatedNoteData.title = title;
    if (content !== undefined) updatedNoteData.content = content;
    if (mood !== undefined) updatedNoteData.mood = mood;
    if (isPublic !== undefined) updatedNoteData.isPublic = isPublic;
    if (tags !== undefined) updatedNoteData.tags = tags;
    if (isArchived !== undefined) updatedNoteData.isArchived = isArchived;

    const updatedNote = await noteModel.findOneAndUpdate(
      { _id: noteId, user: userId },
      updatedNoteData,
      { new: true }
    );

    if (!updatedNote) return AppError(res, "Note not found or not yours", 404);

    return res
      .status(200)
      .json({ message: "Updated successfully", updatedNote });
  } catch (error) {
    next(error);
  }
};

const getSingleUserNote = async (req, res, next) => {
  const userId = req.userId;
  const { noteId } = req.params;
  console.log(noteId);

  try {
    const user = await authModal.findById(userId);
    if (!user) {
      return AppError(res, "User not found", 404);
    }
    const getNote = await noteModel.findOne({ _id: noteId, user: userId });
    if (!getNote) {
      return AppError(res, "note not found");
    }
    return res.status(200).json({
      message: "note found successfully",
      getNote,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUserNote = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await authModal.findById(userId);
    if (!user) {
      return AppError(res, "User not found", 404);
    }
    const getNote = await noteModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
    if (!getNote) {
      return AppError(res, "note not found");
    }
    return res.status(200).json({
      message: `note found successfully. ${getNote.length}`,
      notes: getNote,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserNote = async (req, res, next) => {
  const { deleteId } = req.params;
  const userId = req.userId;
  try {
    const user = await authModal.findById(userId);
    if (!user) {
      return AppError(res, "User not found", 404);
    }
    const getNote = await noteModel.findByIdAndDelete({
      _id: deleteId,
      user: userId,
    });
    if (!getNote) {
      return AppError(res, "note not found", 404);
    }
    return res.status(200).json({
      message: "note deleted successfully",
      getNote,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAllUserNote = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await authModal.findById(userId);
    if (!user) {
      return AppError(res, "User not found", 404);
    }
    const result = await noteModel.deleteMany({ user: userId });

    return res.status(200).json({
      message: `Deleted ${result.deletedCount} notes.`,
    });
  } catch (error) {
    next(error);
  }
};

const filterNotes = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, tags } = req.body || {};
    const { page = 1, limit = 6 } = req.query;

    const user = await authModal.findById(userId);
    if (!user) return AppError(res, "User not found", 404);

    const conditions = { user: userId };
    const orConditions = [];

    if (title) orConditions.push({ title: { $regex: title, $options: "i" } });
    if (tags?.length) orConditions.push({ tags: { $in: tags } });

    if (orConditions.length) conditions.$or = orConditions;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const result = await noteModel.paginate(conditions, options);

    return res.status(200).json(result); // ⬅️ return the whole paginate object
  } catch (error) {
    next(error);
  }
};

const archiveNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const note = await noteModel.findById(noteId);

    if (!note) return res.status(404).json({ message: "Note not found" });

    // toggle archive status
    note.isArchived = !note.isArchived;
    await note.save();

    res
      .status(200)
      .json({ message: note.isArchived ? "Archived" : "Unarchived", note });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNote,
  updateUserNote,
  getSingleUserNote,
  getAllUserNote,
  deleteUserNote,
  deleteAllUserNote,
  filterNotes,
  archiveNote,
};
