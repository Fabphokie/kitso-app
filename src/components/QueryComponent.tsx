'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Adjust import as per your Next.js version
import { fetchResponse } from '../utils/queryUtils';  // Adjust path as necessary

export default function QueryComponent() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await fetchResponse(question);

      // Assuming 'result' contains 'pageUrl' and 'highlight' fields
      const highlightQuery = encodeURIComponent(question); // Encode the query for URL
      const highlightUrl = `${result.pageUrl}?highlight=${highlightQuery}`;
      
      router.push(highlightUrl); // Navigate to the page with the highlight query
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-lg mx-auto">
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Ask me here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border border-gray-300 p-2 rounded-l w-full"
        />
        <button
          onClick={handleSubmit}
          className={`bg-blush-pink text-white px-4 py-2 rounded-r hover:bg-blue-700 transition ease-in-out duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Submit question"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
    </div>
  );
}
