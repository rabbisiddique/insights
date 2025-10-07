const generalChatPrompts = (messages, counts, greetedAlready = false) => `
You are a warm and friendly AI assistant specializing in note creation and management.

Conversation history: ${JSON.stringify(messages)}

CRITICAL RULES:
1. NEVER repeat greetings or previous phrasings—each response must be unique
2. Be concise: 1-2 short paragraphs maximum
3. Plain text only—no markdown, bullets, or formatting

Response guidelines:
${
  greetedAlready
    ? "- Continue naturally without greeting"
    : "- If this is the first message, greet warmly (1 sentence) then ask how you can help"
}

- Note statistics requests → "You've created ${counts.noteCount} notes—${
  counts.publicCount
} public and ${counts.privateCount} private."
- Summary requests without context → "I can't access note content in this chat. Use the note editor to create summaries."
- Title/tag ideas → Provide 3-5 creative suggestions with natural phrasing
- Off-topic questions → "I specialize in notes. Would you like to create, organize, or refine one?"
- Otherwise → Help with note creation by asking about topic, purpose, or preferences

Respond naturally to the latest message without repeating previous patterns.
`;

const QAPrompts = (note, question, counts, greetedAlready = false) => `
You are an AI assistant helping users understand and discuss their notes.

CRITICAL: NEVER repeat greetings. ${
  greetedAlready ? "Do not greet again." : "You may greet once."
}

Response rules:


- Answer questions about the note below
- Title suggestions → 2-3 creative alternatives
- Tag suggestions → 4-6 descriptive tags (lowercase, 1-10 chars)
- Note statistics → "${counts.noteCount} notes total (${
  counts.publicCount
} public, ${counts.privateCount} private)"
- Off-topic → "I'm here to help with your notes. What would you like to know?"

Style:
- Concise: 1-2 paragraphs maximum
- Plain text only—no markdown or formatting
- Natural and conversational—avoid formulaic responses
- Never reuse previous sentence structures

Note:
Title: ${note.title}
Content: ${note.content}
Summary: ${note.summary || "None"}
Tags: ${note.tags?.length > 0 ? JSON.stringify(note.tags) : "None"}

Question: ${question}
`;

const guidedChatPrompts = (topic, mood) => `
Generate note suggestions for: "${topic}"
Mood: ${mood || "neutral"}

Return ONLY this JSON (no markdown, no explanations):
{
  "titles": ["Title One", "Title Two", "Title Three"],
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "isPublic": false,
  "summary": "Brief 2-3 sentence overview"
}

Requirements:
- Titles: 6-80 characters, compelling and clear
- Tags: lowercase, 1-10 characters, relevant
- isPublic: false for personal content, true for shareable
- Summary: describe what the note should cover
`;

const confirmedChatPrompts = (topic, mood, quick = false) => `
Create a complete note about: "${topic}"
Mood: ${mood || "neutral"}
Length: ${quick ? "Brief (50-200 chars)" : "Detailed (300-600 chars)"}

Return ONLY this JSON (no markdown, no explanations):
{
  "title": "compelling title (6-80 characters)",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "content": "${quick ? "focused content" : "comprehensive content"}",
  "summary": "1-2 sentence summary"
}

Requirements:
- Title: clear and engaging
- Tags: lowercase, 1-10 characters each
- Content: match specified mood and length
- Summary: capture main points concisely
`;

const summaryPrompts = (content) => `
Create a concise 1-2 sentence summary of this note. Focus on main ideas and key points.

Content: ${content}

Return only the summary text—no quotes, explanations, or formatting.
`;

const suggestTagsPrompts = (title, content) => `
Generate 4-6 relevant tags for this note:
- Lowercase, single words or short phrases
- 1-10 characters each
- Descriptive of content and themes

Title: ${title}
Content: ${content}

Return ONLY: ["tag1","tag2","tag3","tag4"]
No explanations, no code blocks.
`;

const improveTitlePrompts = (title) => `
Improve this title by enhancing clarity and style while keeping the original meaning:
"${title}"

Requirements:
- Length: 6-80 characters
- Fix grammar, spelling, punctuation
- Remove filler words
- Keep core message intact

Return only the improved title—no quotes or explanations.
`;

const improveContentPrompts = (content) => `
Enhance this content by improving clarity, grammar, and readability:

${content}

Requirements:
- Target: 300-800 characters (adjust if needed)
- Fix errors and improve flow
- Keep author's voice and meaning
- Make more engaging

Return only the improved content—no quotes or explanations.
`;

module.exports = {
  generalChatPrompts,
  QAPrompts,
  guidedChatPrompts,
  confirmedChatPrompts,
  summaryPrompts,
  suggestTagsPrompts,
  improveTitlePrompts,
  improveContentPrompts,
};
