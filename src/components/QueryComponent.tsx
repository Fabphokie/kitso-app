import { useState } from "react";
import { fetchResponse } from "../utils/queryUtils";  // Adjust the path as necessary

export default function QueryComponent() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [highlight, setHighlight] = useState(false);

  const handleSubmit = async () => {
    const result = await fetchResponse(question);
    setResponse(result);
    setHighlight(question.toLowerCase().includes('puberty')); // Example highlight condition
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="text"
        placeholder="Ask me here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 mb-4"
      />
      <button onClick={handleSubmit} className="button">
        Submit
      </button>
      {response && (
        <div
          className={`mt-4 p-2 border ${highlight ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300 bg-white'} rounded`}
        >
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
