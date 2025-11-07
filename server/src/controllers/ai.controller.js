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
  generalChatPrompts,
  guidedChatPrompts,
  confirmedChatPrompts,
  improveTitlePrompts,
  improveContentPrompts,
} = require("../prompts/ai.prompts");

const summarizeNote = async (req, res, next) => {
  const { noteId, title, content } = req.body;
  const userId = req.userId;

  try {
    if (!title && !content && !noteId) {
      return AppError(res, "Title or content is required to summarize", 400);
    }

    let note;
    let noteData = { title, content };

    if (noteId) {
      // Existing note → fetch and update it
      note = await noteModel.findOne({ _id: noteId, user: userId });
      if (!note) return AppError(res, "Note not found", 404);

      noteData = {
        title: title || note.title,
        content: content || note.content,
      };
    }
    // ❌ REMOVE THE ELSE BLOCK - Don't create a temporary note

    // Generate summary
    let summary = await generateContent(summaryPrompts(content));
    summary = cleanAIContent(summary);

    // Only save if editing existing note
    if (noteId && note) {
      note.summary = summary;
      await note.save();

      // Log AI action
      await aiModel.create({
        note: note._id,
        user: userId,
        action: "summary",
        answer: summary,
      });
    }

    // Return summary without creating a note
    return res.status(200).json({
      summary,
      noteId: noteId || null, // null if new note
    });
  } catch (err) {
    next(err);
  }
};

const improveWriting = async (req, res, next) => {
  const { noteId, title, content } = req.body;
  const userId = req.userId;

  try {
    let improvedTitle = title;
    let improvedContent = content;
    const target = [];

    if (title) {
      const titlePrompt = improveTitlePrompts(title);
      improvedTitle = await generateContent(titlePrompt);
      target.push("title");
    }

    if (content) {
      const contentPrompt = improveContentPrompts(content);
      improvedContent = await generateContent(contentPrompt);
      target.push("content");
    }

    // If noteId is provided → update DB
    if (noteId) {
      const note = await noteModel.findOne({ _id: noteId, user: userId });
      if (!note) return AppError(res, "Note not found", 404);

      if (improvedTitle) note.title = improvedTitle;
      if (improvedContent) note.content = improvedContent;
      await note.save();

      await aiModel.create({
        note: note._id,
        user: userId,
        action: "improve-writing",
        target,
        answer: JSON.stringify({
          title: improvedTitle,
          content: improvedContent,
        }),
      });
    }

    return res.status(200).json({
      message: "Improvement complete",
      note: {
        title: improvedTitle,
        content: improvedContent,
      },
    });
  } catch (error) {
    next(error);
  }
};

const suggestTags = async (req, res, next) => {
  const { noteId, title, content } = req.body;
  const userId = req.userId;

  const user = await authModal.findById(userId);
  if (!user) return AppError(res, "User not found", 404);

  try {
    let noteData = null;

    if (noteId) {
      // Fetch existing note
      const note = await noteModel.findOne({ _id: noteId, user: userId });
      if (!note) return AppError(res, "Note not found", 404);
      noteData = note;
    } else if (title || content) {
      // Use draft data
      noteData = { title, content, tags: [] };
    } else {
      return AppError(res, "No note data provided", 400);
    }

    // Generate AI output
    const prompt = suggestTagsPrompts(noteData);
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

    const uniqueTags = Array.from(new Set(suggestedTags));

    // If it's an existing note → save tags + log AI history
    if (noteId) {
      noteData.tags = Array.from(new Set([...noteData.tags, ...uniqueTags]));
      await noteData.save();

      await aiModel.create({
        note: noteData._id,
        user: userId,
        action: "tags",
        answer: uniqueTags.length ? uniqueTags.join(", ") : "No tags generated",
      });
    }

    return res.status(200).json({ suggestedTags: uniqueTags });
  } catch (err) {
    next(err);
  }
};

const aiInteract = async (req, res, next) => {
  const { noteId, messages, topic, confirmed, question, isPublic, mood } =
    req.body;

  const userId = req.userId;
  const greetedAlready = messages?.some(
    (msg) =>
      msg.role === "assistant" &&
      /\b(hello|hi|hey|greetings|welcome)\b/i.test(msg.content)
  );
  try {
    // Validate user
    if (!userId) return AppError(res, "User not found", 400);
    const user = await authModal.findById(userId);
    if (!user) return AppError(res, "User not found", 404);
    const counts = {
      noteCount: await noteModel.countDocuments({ user: userId }),
      publicCount: await noteModel.countDocuments({
        user: userId,
        isPublic: true,
      }),
      privateCount: await noteModel.countDocuments({
        user: userId,
        isPublic: false,
      }),
    };
    // -----------------------------
    // 1️⃣ General chat (no note/topic)
    // -----------------------------

    if (messages && !topic && !question) {
      const chatPrompt = generalChatPrompts(messages, counts, greetedAlready);

      let response = await generateContent(chatPrompt);
      response = cleanAIContent(response);

      await aiModel.create({
        user: userId,
        action: "qa",
        question: messages[messages.length - 1]?.content || "General chat", // Store last message only
        answer: response,
        target: [],
        model: "gemini-2.0-flash-001",
      });

      return res.status(200).json({ type: "chat", response });
    }

    // -----------------------------
    // 2️⃣ QA for an existing note
    // -----------------------------
    if (noteId && question) {
      const note = await noteModel.findOne({ _id: noteId, user: userId });
      if (!note) return AppError(res, "Note not found", 404);

      const aiPrompt = QAPrompts(note, question, counts, greetedAlready);
      let answer = await generateContent(aiPrompt);
      answer = cleanAIContent(answer);

      await aiModel.create({
        note: note._id,
        user: userId,
        action: "qa",
        question,
        answer,
      });

      return res.status(200).json({ type: "qa", answer });
    }

    // -----------------------------
    // 3️⃣ Guided suggestions (topic + unconfirmed)
    // -----------------------------
    if (topic && !confirmed) {
      let aiResponse = await generateContent(guidedChatPrompts(topic));
      aiResponse = cleanAIContent(aiResponse);

      let suggestions = {
        title: "",
        tags: [],
        isPublic: false,
        mood: "happy",
        summary: "",
      };
      try {
        const match = aiResponse.match(/\{.*\}/s);
        if (match) suggestions = JSON.parse(match[0]);
      } catch (err) {
        console.log("Failed to parse suggestions:", aiResponse);
      }

      await aiModel.create({
        user: userId,
        action: "suggestions",
        question: topic,
        answer: JSON.stringify(suggestions),
        target: ["title", "tags", "isPublic", "mood", "summary"],
        model: "gemini-2.0-flash-001",
      });

      return res.status(200).json({ type: "suggestions", suggestions });
    }

    // -----------------------------
    // 4️⃣ Quick AI note creation (topic + confirmed)
    // -----------------------------
    if (topic && confirmed) {
      let aiResponse = await generateContent(confirmedChatPrompts(topic));
      aiResponse = cleanAIContent(aiResponse);

      let noteData = {
        title: "Untitled Note",
        tags: [],
        content: "No content generated",
        mood,
        summary: "",
      };

      try {
        const match = aiResponse.match(/\{.*\}/s);
        if (match) noteData = JSON.parse(match[0]);
      } catch (err) {
        console.log("Failed to parse note JSON:", aiResponse);
      }

      const newNote = await noteModel.create({
        user: userId,
        title: noteData.title || "Untitled Note",
        content: noteData.content || "No content generated",
        tags: Array.isArray(noteData.tags) ? noteData.tags : [],
        isPublic:
          typeof isPublic === "boolean" ? isPublic : noteData.isPublic || false,
        isArchived: false,
        mood: (mood || noteData.mood || "Happy").toLowerCase(),
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

      return res.status(201).json({ type: "note", note: newNote });
    }

    return AppError(
      res,
      "Invalid request: provide messages, question, or topic",
      400
    );
  } catch (err) {
    next(err);
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

const getAiMessages = async (req, res, next) => {
  const { noteId } = req.params;
  const userId = req.userId;

  try {
    let query = { user: userId, action: "qa" };

    if (noteId && noteId !== "general") {
      // For specific notes, only get messages for THIS note
      query.note = noteId;
    } else {
      // For general chat, only get messages WITHOUT a note
      query.note = { $exists: false }; // ✅ This is the key change!
    }

    const messages = await aiModel.find(query).sort({ createdAt: 1 });

    const noteInfo =
      noteId && noteId !== "general" && messages.length > 0
        ? messages[0].note
        : null;

    return res.status(200).json({
      messages: messages || [],
      note: noteInfo || null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  summarizeNote,
  suggestTags,
  improveWriting,
  getAiMessages,
  aiInteract,
};
