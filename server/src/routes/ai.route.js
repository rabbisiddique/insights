const app = require("express");
const {
  summarizeNote,
  suggestTags,
  questionAnswer,
  improveWriting,
  createNoteWithAI,
  chatOrCreateNote,
  aiReadNote,
} = require("../controllers/ai.controller");
const { verifyToken } = require("../middleware/verifyToken");
const aiNoteValidation = require("../middleware/validation/note/aiNoteValidation");
const router = app.Router();

router.post("/summarize", verifyToken, summarizeNote);
router.post("/suggest-tags", verifyToken, suggestTags);
router.post("/ask", verifyToken, questionAnswer);
router.post("/improve-writing", verifyToken, improveWriting);
router.post("/create-ai-note", aiNoteValidation, verifyToken, chatOrCreateNote);
router.post("/read-ai-note", verifyToken, aiReadNote);

module.exports = router;
