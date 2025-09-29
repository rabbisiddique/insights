const app = require("express");
const {
  createNote,
  updateUserNote,
  getSingleUserNote,
  getAllUserNote,
  deleteUserNote,
  deleteAllUserNote,
  filterNotes,
  archiveNote,
} = require("../controllers/note.controller");
const { verifyToken } = require("../middleware/verifyToken");
const noteSchemaValidation = require("../middleware/validation/note/noteValidation");
const updateNoteValidation = require("../middleware/validation/note/updatenoteValidation");
const router = app.Router();

router.post("/create-note", noteSchemaValidation, verifyToken, createNote);
router.post("/get-filtered-note", verifyToken, filterNotes);
router.put(
  "/update-note/:noteId",
  updateNoteValidation,
  verifyToken,
  updateUserNote
);
router.get("/get-single-note/:noteId", verifyToken, getSingleUserNote);
router.get("/get-all-note", verifyToken, getAllUserNote);
router.patch("/archive-note/:id", verifyToken, archiveNote);

router.delete("/delete-note/:deleteId", verifyToken, deleteUserNote);
router.delete("/delete-all-note", verifyToken, deleteAllUserNote);

module.exports = router;
