import { useState } from "react";
import { summarizeText } from "./api";
import ResultCard from "./components/ResultCard";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!text.trim()) {
      setError("Please enter some text to summarize.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const data = await summarizeText(text);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to analyze text. Make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          LLM Text Summarizer
        </h1>
        <p className="text-gray-500 mb-6">
          Convert messy text into a clean structured summary using AI.
        </p>

        <textarea
          placeholder="Paste your unstructured text here..."
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none text-gray-700 leading-relaxed"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-sm"
        >
          {loading ? "Analyzing with AI... Kindly wait!" : "Summarize Text"}
        </button>

        {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

        <ResultCard result={result} />
      </div>
    </div>
  );
}

export default App;
