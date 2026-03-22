export const buildPrompt = (text) => `
You are an assistant that converts unstructured text into a strict JSON summary.

Return ONLY valid JSON in this format:
{
  "summary": "one sentence summary",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "sentiment": "positive | neutral | negative"
}

Rules:
- Summary must be exactly ONE sentence.
- keyPoints must have EXACTLY 3 items.
- Sentiment must be only one of the allowed values.
- Do not include markdown.
- Do not include extra text.

Text to analyze:
${text}
`;
