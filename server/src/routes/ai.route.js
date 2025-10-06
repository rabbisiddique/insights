const app = require("express");
const {
  summarizeNote,
  suggestTags,
  questionAnswer,
  improveWriting,
  createNoteWithAI,
  chatOrCreateNote,
  aiReadNote,
  getAiMessages,
  aiInteract,
} = require("../controllers/ai.controller");
const { verifyToken } = require("../middleware/verifyToken");
const aiNoteValidation = require("../middleware/validation/note/aiNoteValidation");
const { aiLimiter } = require("../middleware/rateLimit");
const router = app.Router();

router.post("/summarize", verifyToken, aiLimiter, summarizeNote);
router.post("/suggest-tags", verifyToken, aiLimiter, suggestTags);
router.post("/improve-writing", verifyToken, improveWriting);
router.post("/ai-interact", verifyToken, aiInteract);
router.get("/get-messages/:noteId", verifyToken, getAiMessages);

module.exports = router;
