import express from "express";
import { summarizeText } from "./llm.js";
import { validateInput } from "./validate.js";

const router = express.Router();

router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    validateInput(text);

    const result = await summarizeText(text);

    res.json(result);
  } catch (error) {
    console.error("Error:", error.message);

    res.status(400).json({
      error: error.message || "Failed to summarize text",
    });
  }
});

export default router;
