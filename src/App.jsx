import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 px-4 font-sans">
      <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Text Summarizer</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        rows={10}
        className="w-full box-border rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        className="mt-3 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Summarizing..." : "Submit"}
      </button>

      {error && <p className="mt-3 text-red-600">{error}</p>}

      {result && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p>{result.summary}</p>

          <h2 className="text-xl font-semibold mt-4 mb-2">Key Points</h2>
          <ul className="list-disc pl-6">
            {result.key_points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;

