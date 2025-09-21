const { validationResult } = require("express-validator");
const generateContent = require("../config/ai");
const { AppError } = require("../middleware/errorHandler");
const aiModel = require("../models/ai.model");
const authModal = require("../models/auth.model");
const noteModel = require("../models/note.model");
const {
  summaryPrompts,
  suggestTagsPrompts,
  QAPrompts,
  ImproveWritingPrompts,
  ImproveContentPrompts,
  generalChatPrompts,
  guidedChatPrompts,
  confirmedChatPrompts,
  ImproveTitlePrompts,
  readChatPrompts,
} = require("../prompts/ai.prompts");

const summarizeNote = async (req, res, next) => {
  const { noteId } = req.body;
  const userId = req.userId;

  try {
    const user = await authModal.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    const note = await noteModel.findOne({ _id: noteId, user: userId });
    if (!note) throw new AppError("Note not found", 404);

    const prompt = summaryPrompts(note);
    let summary = await generateContent(prompt);
    summary = cleanAIContent(summary);
    note.summary = summary;
    await note.save();

    await aiModel.create({
      note: note._id,
      user: userId,
      action: "summary",
      answer: summary,
    });

    res.status(200).json({ summary });
  } catch (err) {
    next(err);
  }
};

const suggestTags = async (req, res, next) => {
  const { noteId } = req.body;
  const userId = req.userId;
  const user = await authModal.findById(userId);
  if (!user) throw new AppError("User not found", 404);
  try {
    const note = await noteModel.findOne({ _id: noteId, user: userId });
    if (!note) throw new AppError("Note not found", 404);

    // Generate AI output
    const prompt = suggestTagsPrompts(note);

    let aiResponse = await generateContent(prompt);

    aiResponse = aiResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let suggestedTags = [];
    try {
      suggestedTags = JSON.parse(aiResponse);
    } catch (e) {
      suggestedTags = aiResponse
        .split(/[\n,]/)
        .map((t) => t.replace(/\*\*|[0-9.]/g, "").trim())
        .filter((t) => t.length >= 1 && t.length <= 10);
    }

    // Remove duplicates
    const uniqueTags = Array.from(new Set(suggestedTags));

    // Merge with existing note tags
    note.tags = Array.from(new Set([...note.tags, ...uniqueTags]));
    await note.save();

    // Log in AI history
    await aiModel.create({
      note: note._id,
      user: userId,
      action: "tags",
      answer: uniqueTags.length ? uniqueTags.join(", ") : "No tags generated",
    });

    return res.status(200).json({ suggestedTags: uniqueTags });
  } catch (err) {
    next(err);
  }
};

const questionAnswer = async (req, res, next) => {
  const { noteId, question } = req.body;
  const userId = req.userId;

  try {
    if (!question || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    // If no noteId provided
    if (!noteId) {
      return res.status(400).json({
        answer: "Please create or select a note to ask questions.",
      });
    }

    // Find user and note
    const user = await authModal.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    const note = await noteModel.findOne({ _id: noteId, user: userId });
    if (!note) {
      throw new AppError("Note not found.", 404);
    }

    // Simple prompt for AI
    const aiPrompt = QAPrompts(note, question);
    let answer = await generateContent(aiPrompt);
    answer = cleanAIContent(answer);

    // Save as string
    await aiModel.create({
      note: note._id,
      user: userId,
      action: "qa",
      question,
      answer,
    });

    return res.status(200).json({ answer });
  } catch (error) {
    next(error);
  }
};

const improveWriting = async (req, res, next) => {
  const { noteId, title, content } = req.body;
  const userId = req.userId;
  try {
    const note = await noteModel.findOne({ _id: noteId, user: userId });
    if (!note) throw new AppError("Note not found", 404);
    const target = [];

    let improvedTitle = title;
    let improvedContent = content;

    if (title) {
      const titlePrompt = ImproveTitlePrompts(title);

      improvedTitle = await generateContent(titlePrompt);
      note.title = improvedTitle;
      target.push("title");
    }

    if (content) {
      const contentPrompt = ImproveContentPrompts(content);
      improvedContent = await generateContent(contentPrompt);
      note.content = improvedContent;
      target.push("content");
    }
    await note.save();
    await aiModel.create({
      note: note._id,
      user: userId,
      action: "improve-writing",
      target,
      answer: JSON.stringify({
        title: improvedTitle || null,
        content: improvedContent || null,
      }),
    });

    // 5. Respond with updated note
    return res.status(200).json({
      message: "Note improved successfully",
      note: {
        title: note.title,
        content: note.content,
      },
    });
  } catch (error) {
    next(error);
  }
};

const chatOrCreateNote = async (req, res, next) => {
  const { message, topic, confirmed, title, tags, isPublic } = req.body;
  const userId = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  if (!userId) return next(new AppError("User not found", 400));

  try {
    // ---------------------
    // 1️⃣ Chat mode (greetings or general chat)
    // ---------------------
    if (message && !topic) {
      const chatPrompt = generalChatPrompts(message);
      const chatResponse = await generateContent(chatPrompt);
      await aiModel.create({
        user: userId,
        action: "qa",
        answer: chatPrompt.trim(),
        target: [],
        model: "gemini-2.0-flash-001",
        question: message,
      });

      return res.status(200).json({
        type: "chat",
        response: chatResponse.trim(),
      });
    }

    // ---------------------
    // 2️⃣ Guided mode (ask for suggestions if topic provided but not confirmed)
    // ---------------------
    if (topic && !confirmed) {
      const prompt = guidedChatPrompts(topic);

      let aiResponse = await generateContent(prompt);
      aiResponse = cleanAIContent(aiResponse);

      let suggestions = { titles: [], tags: [], isPublic: false };
      try {
        // ✅ Proper JSON extraction
        const match = aiResponse.match(/\{.*\}/s);
        if (match) suggestions = JSON.parse(match[0]);
      } catch (err) {
        console.log("Failed to parse suggestions:", aiResponse);
      }

      // ✅ Save in AI history (make sure schema allows "suggestions")
      await aiModel.create({
        user: userId,
        action: "suggestions", // <-- Add this to your schema enum
        question: topic,
        answer: JSON.stringify(suggestions),
        target: ["title", "tags", "isPublic"],
        model: "gemini-2.0-flash-001",
      });

      return res.status(200).json({
        type: "suggestions",
        suggestions,
      });
    }

    // ---------------------
    // 3️⃣ Quick / Confirmed note creation
    // ---------------------
    if (topic && confirmed) {
      const notePrompt = confirmedChatPrompts(topic);
      let noteResponse = await generateContent(notePrompt);

      // Clean and parse AI output
      let noteData = {
        title: "Untitled Note",
        tags: [],
        content: "No content generated",
        summary: "",
      };
      try {
        const cleaned = cleanAIContent(noteResponse);
        const match = cleaned.match(/\{.*\}/s);
        if (match) noteData = JSON.parse(match[0]);
      } catch (err) {
        console.log("Failed to parse note JSON:", noteResponse);
      }

      const newNote = await noteModel.create({
        user: userId,
        title: noteData.title || "Untitled Note",
        content: noteData.content || "No content generated",
        tags: Array.isArray(noteData.tags) ? noteData.tags : [],
        isPublic:
          typeof isPublic === "boolean" ? isPublic : noteData.isPublic || false,
        isArchived: false,
        summary: noteData.summary || "",
      });

      await aiModel.create({
        user: userId,
        note: newNote._id,
        action: "create-note",
        question: topic,
        answer: JSON.stringify(noteData),
        target: ["title", "tags", "content", "summary"],
        model: "gemini-2.0-flash-001",
      });

      return res.status(201).json({
        type: "note",
        success: true,
        note: newNote,
      });
    }

    // ---------------------
    // 4️⃣ Fallback if no input
    // ---------------------
    return next(
      new AppError("Invalid request: provide either message or topic", 400)
    );
  } catch (error) {
    next(error);
  }
};

const aiReadNote = async (req, res, next) => {
  const { noteId, question } = req.body;
  const userId = req.userId;

  try {
    if (!question || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Fetch note
    const note = await noteModel.findOne({ _id: noteId, user: userId });
    if (!note) throw new AppError("Note not found", 404);

    // AI prompt
    const aiPrompt = readChatPrompts(note, question);

    let answer = await generateContent(aiPrompt);
    answer = cleanAIContent(answer);
    // Save AI response
    await aiModel.create({
      note: note._id,
      user: userId,
      action: "qa",
      question,
      answer: answer.trim(),
    });

    return res.status(200).json({ answer: answer.trim() });
  } catch (error) {
    next(error);
  }
};

function cleanAIContent(aiContent) {
  if (!aiContent || typeof aiContent !== "string") return "";

  return aiContent
    .replace(/\\n/g, " ") // replace literal "\n" with space
    .replace(/\n/g, " ") // replace actual newlines with space
    .replace(/[*_#>-]/g, "") // remove Markdown characters like *, _, #, >, -
    .replace(/\s+/g, " ") // collapse multiple spaces into one
    .trim(); // remove leading/trailing spaces
}

module.exports = {
  summarizeNote,
  suggestTags,
  questionAnswer,
  improveWriting,
  chatOrCreateNote,
  aiReadNote,
};
