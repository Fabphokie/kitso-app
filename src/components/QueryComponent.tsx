// src/components/QueryComponent.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the correct import path for your Next.js version
import { fetchResponse } from '../utils/queryUtils';  // Adjust the path as necessary

export default function QueryComponent() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Ensure this is in a client-side component

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fetchResponse(question);
      
      // Assuming 'result' contains 'pageUrl' and 'highlight' fields
      const highlightQuery = encodeURIComponent(question); // Encode the query for URL
      const highlightUrl = `${result.pageUrl}?highlight=${highlightQuery}`;
      
      router.push(highlightUrl); // Navigate to the page with the highlight query
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
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
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        aria-label="Submit question"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
