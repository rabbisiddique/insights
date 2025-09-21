const chatPrompts = (message) => {
  `
  - If the user greets you (hi, hello, etc.), reply normally in a friendly short way AND then ask about their note. 
  You are a friendly assistant that ONLY helps users create notes.
  Respond in **plain text**, concisely, in one short paragraph.
  If the user wants to create a note, ask for the topic or title.
  If the user asks about anything else, reply exactly: "Sorry! I can only assist you with notes."
  Do NOT use bullets, markdown, or extra newlines.
  
  
  User: "${message}"
  `;
};

const summaryPrompts = (note) => `
      Summarize the following note briefly and eloquently:
      Content: ${note.content}
    `;
const suggestTagsPrompts = (note) => `
Suggest 4–6 short tags (1–10 characters each, no sentences) 
based on the following note.
Title: ${note.title}
Content: ${note.content}
Return ONLY a raw JSON array of strings, no code block, no explanation.
Example: ["tag1", "tag2", "tag3"]
`;

const QAPrompts = (note, question) => `
You are an assistant that ONLY helps with user notes. 
Rules:
- If the user greets you (hi, hello, etc.), reply normally in a friendly short way AND then ask about their note. 
- If the user asks about anything unrelated to notes, reply exactly: "Sorry! I can only assist you with notes."
- Otherwise, answer the question based ONLY on the note provided below.

Rules for generating tags:
- Return ONLY a JSON array of 3–6 tags, like ["life","learning","philosophy"].
- Each tag must be 1–10 characters, lowercase, 1–2 words.
- Tags must be relevant to the note's title, content, and summary.
- Do NOT include sentences, explanations, markdown, or extra characters.
- Return ONLY a JSON array, do NOT include quotes around the array.



Rules for generating note titles:
- Return ONLY a JSON array of 2–3 titles, like ["My First Note","Life Lessons"].
// - Each title must be 6–80 characters.
_ Each title must be 50 to 60 characters.
- Titles must be relevant to the note's content and summary.
- Do NOT include sentences, markdown, bullet points, quotes outside JSON, or extra newlines.
Note Title: ${note.title}
Note Content: ${note.content}
Note summary: ${note.summary}
Note Tags: ${JSON.stringify(note.tags)}
User Question: ${question}
Return ONLY a JSON array, do NOT include quotes around the array.
Reply in plain text, one short paragraph, no markdown, no bullets, no extra newlines.
make your respond concise
`;

const ImproveTitlePrompts = (title) => `
You are an assistant that improves note titles.
Rules:
- Correct grammar, spelling, and style.
- Keep it concise (6–80 characters).
- Do not add extra words or change meaning.
- Return only the improved title as plain text, one line, no quotes, no explanations.

Original Title: ${title}
`;
const ImproveContentPrompts = (content) => `
You are an assistant that improves note contents.
Rules:
- Correct grammar, spelling, and style.
- Keep it concise (1000-1200 characters).
- Do not add extra words or change meaning.
- Return only the improved content as plain text, one line, no quotes, no explanations.

Original content: ${content}
`;

const generalChatPrompts = (message) => `
- If the user greets you (hi, hello, etc.), reply normally in a friendly short way AND then ask about their note. 
You are a friendly assistant that ONLY helps users create notes.
Respond in **plain text**, concisely, in one short paragraph.
If the user wants to create a note, ask for the topic or title.
If the user asks about anything else, reply exactly: "Sorry! I can only assist you with notes."
Do NOT use bullets, markdown, or extra newlines.


User: "${message}"
`;
const guidedChatPrompts = (topic) => `
Suggest 2–3 possible note titles, 4–6 short tags (1–10 characters each),
and whether the note should be public or private for this topic:
"${topic}"

Return ONLY a JSON object, NO explanations, NO code blocks:
Example: {"titles":["Title 1","Title 2"],"tags":["tag1","tag2"],"isPublic":false}
  `;
const confirmedChatPrompts = (topic) => `
You are an AI that generates notes. Output ONLY a single-line JSON object.
Write a note about: "${topic}"

Required JSON keys:
{
  "title": "string (6-80 characters)",
  "tags": ["string"],       // 3-6 tags
  "content": "string",      // 50-500 characters
  "summary": "string"       // 1-2 sentences
}

Do NOT include markdown, bullets, or explanations.
`;

const readChatPrompts = (note, question) => `
You are an assistant that ONLY talks about user notes.
- If the user greets you (hi, hello, etc.), reply normally in a friendly short way AND then ask about their note. 
If the user asks about anything else, reply exactly: "Sorry! I can only assist you with notes."      
Note Title: ${note.title}
Tags: ${note.tags.join(", ")}
Summary: ${note.summary}
Content: ${note.content}

User Question: ${question}
Reply in plain text, concise, no markdown, no bullets, no newlines.
make your respond concise.
`;

module.exports = {
  chatPrompts,
  readChatPrompts,
  ImproveTitlePrompts,
  summaryPrompts,
  guidedChatPrompts,
  QAPrompts,
  suggestTagsPrompts,
  ImproveContentPrompts,
  generalChatPrompts,
  confirmedChatPrompts,
};
