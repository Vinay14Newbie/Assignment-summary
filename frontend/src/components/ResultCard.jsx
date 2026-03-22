function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Summary</h2>
      <p className="text-gray-600 mb-4 leading-relaxed">{result.summary}</p>

      <h3 className="text-lg font-semibold mb-2 text-gray-800">Key Points</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-5">
        {result.keyPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2 text-gray-800">Sentiment</h3>
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize
        ${
          result.sentiment === "positive"
            ? "bg-green-100 text-green-700"
            : result.sentiment === "negative"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {result.sentiment}
      </span>
    </div>
  );
}

export default ResultCard;
