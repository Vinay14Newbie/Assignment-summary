import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import { buildPrompt } from "./prompt.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const summarizeText = async (text) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in environment variables.");
  }

  const prompt = buildPrompt(text);

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  const content = completion.choices[0]?.message?.content;

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error("Raw LLM Output:", content);
    throw new Error("Model returned invalid JSON format.");
  }
};
