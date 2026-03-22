export const validateInput = (text) => {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    throw new Error("Input text is required and must be a non-empty string.");
  }
};
