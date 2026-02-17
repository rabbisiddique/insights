const axios = require("axios");
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const generateContent = async (content) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b:free",
        messages: [{ role: "user", content }],
        max_tokens: 600,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("AI generation failed");
  }
};

module.exports = generateContent;
