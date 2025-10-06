const { validationResult } = require("express-validator");
const { AppError } = require("../middleware/errorHandler");
const authModal = require("../models/auth.model");
const noteModel = require("../models/note.model");

const createNote = async (req, res, next) => {
  try {
    const { title, content, tags, isPublic, isArchived, mood, summary } =
      req.body;
    const userId = req.userId;

    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Check user
    const user = await authModal.findById(userId);
    if (!user) {
      return AppError(res, "User not found", 404);
    }

    // ✅ Create the note safely
    const note = await noteModel.create({
      user: userId,
      title,
      content,
      tags,
      mood,
      isPublic,
      isArchived,
      summary: summary || "",
    });

    return res.status(201).json({ message: "Note created successfully", note });
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
// Single note
const getSingleUserNote = async (req, res, next) => {
  const userId = req.userId;
  const { noteId } = req.params;

  try {
    const user = await authModal.findById(userId);
    if (!user) return AppError(res, "User not found", 404);

    // First, try to find note owned by user
    let getNote = await noteModel
      .findOne({
        _id: noteId,
        user: userId,
      })
      .populate("user", "username email");

    // If not found and user is logged in, check if it's a public note
    if (!getNote) {
      getNote = await noteModel
        .findOne({
          _id: noteId,
          isPublic: true,
        })
        .populate("user", "username email");

      if (!getNote) {
        return AppError(res, "Note not found", 404);
      }
    }

    return res.status(200).json({
      message: "Note found successfully",
      getNote,
    });
  } catch (error) {
    next(error);
  }
};

// All notes
const getAllUserNote = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await authModal.findById(userId);
    if (!user) return AppError(res, "User not found", 404);

    const notes = await noteModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    if (!notes.length) return AppError(res, "No notes found");

    return res.status(200).json({
      message: `Notes found successfully: ${notes.length}`,
      notes,
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

// notesController.js
const getNotesStats = async (req, res, next) => {
  const userId = req.userId;

  try {
    const total = await noteModel.countDocuments({ user: userId });
    const publicNotes = await noteModel.countDocuments({
      user: userId,
      isPublic: true,
    });
    const privateNotes = await noteModel.countDocuments({
      user: userId,
      isPublic: false,
    });

    const archiveNotes = await noteModel.countDocuments({
      user: userId,
      isArchived: true,
    });

    return res
      .status(200)
      .json({ total, publicNotes, privateNotes, archiveNotes });
  } catch (err) {
    next(err);
  }
};

// Get all public notes (from all users)
const getAllPublicNotes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const notes = await noteModel
      .find({ isPublic: true, isArchived: false })
      .populate("user", "username email avatar") // Include user info
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await noteModel.countDocuments({
      isPublic: true,
      isArchived: false,
    });

    return res.status(200).json({
      message: `Public notes found: ${notes.length}`,
      notes,
      totalPages: Math.ceil(count / limit),
      count,
      currentPage: page,
    });
  } catch (error) {
    next(error);
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
  getNotesStats,
  getAllPublicNotes,
};
