# Assignment Summarizer (React + Node + Groq)

A full-stack app that takes messy text, sends it to an LLM, and returns structured JSON: one sentence summary, 3 key points, and sentiment.

## What is Included

- Frontend: React + Vite + Tailwind (simple textarea, submit button, result card)
- Backend: Express + dotenv + cors + GROQ SDK (single `/api/summarize` POST endpoint)
- LLM prompt enforces strict JSON shape and known sentiment values
- Input validation, loading state, error handling, and invalid model output safety

## Project Structure

- `backend/` (Express server)
  - `src/index.js` - app setup
  - `src/routes.js` - `/api/summarize`
  - `src/validate.js` - input check
  - `src/prompt.js` - prompt builder
  - `src/llm.js` - Groq AI call and JSON parsing
  - `.env.example` - keys

- `frontend/` (React UI)
  - `src/App.jsx` - UI flow
  - `src/api.js` - axios request to backend
  - `src/components/ResultCard.jsx` - rendering results

## Setup

### 1. Backend

```
cd backend
npm install
copy .env.example .env
# add your key
# PORT=5000 (optional)
# GROQ_API_KEY=your_groq_api_key
npm start
```

### 2. Frontend

```
cd frontend
npm install
npm run dev
```

- Default frontend config points to hosted endpoint `https://assignment-summary.onrender.com/api`.
- For local backend use, edit `frontend/src/api.js`:
  - `baseURL: "http://localhost:5000/api"`

## API Contract

- POST `/api/summarize`
- Body: `{ "text": "..." }`
- Success: `{ summary, keyPoints: [..3], sentiment }`
- Error: `{ error: "message" }`

## Prompt Logic

The prompt is in `backend/src/prompt.js` and is designed as:

- strict JSON only
- `summary` one sentence
- `keyPoints` exactly 3 strings
- `sentiment`: positive | neutral | negative
- no markdown, no extra keys

## Validation / errors covered

- empty/non-string input: 400
- missing `GROQ_API_KEY`: error thrown
- malformed model output: throws parse error
- frontend network failure: user-facing alert

## Example Output

Input: "The meeting was productive; we decided the rollout timeline, saw budget risk, and agreed to next steps."

Output:

```
{
  "summary": "The meeting confirmed rollout timeline, identified a budget risk, and defined next steps.",
  "keyPoints": [
    "Agreed release schedule and deliverables",
    "Highlighted pending budget uncertainty",
    "Confirmed follow-up tasks and owner responsibilities"
  ],
  "sentiment": "neutral"
}
```
