'use client';

import { useEffect, useState } from 'react';

interface Method {
  name: string;
  image: string;
}

interface FamilyPlanningData {
  title: string;
  content: string;
  image: string;
  methods: { [key: string]: Method };
  information: string[];
}

export default function FamilyPlanningPage() {
  const [data, setData] = useState<FamilyPlanningData>({
    title: '',
    content: '',
    image: '',
    methods: {},
    information: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedContent, setHighlightedContent] = useState<string>('');

  const getData = async () => {  // Move getData outside of useEffect
    try {
      const response = await fetch('/api/family-planning');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: FamilyPlanningData = await response.json();
      if (result && typeof result === 'object' && result.title && result.content) {
        setData(result);
        setHighlightedContent(result.content);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(); // Call getData on mount
  }, []);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    getData(); // Now getData is accessible here
  };

  if (loading) return <div className="loader">Loading...</div>; // Add a spinner or loader
  if (error) return (
    <div>
      <p>Error: {error}</p>
      <button onClick={retryFetch} className="text-soft-blue underline">
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-8 bg-cream-white min-h-screen text-center" aria-live="polite">
      <h1 className="text-soft-blue text-4xl mb-4">{data.title}</h1>
      {data.image && <img src={data.image} alt={data.title} className="w-100 h-24 mx-auto" />}
      <div
        className="text-gray-700 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      />

      <h2 className="text-soft-blue text-2xl mb-2">Methods:</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(data.methods).map(([key, method]) => (
          <div key={key} className="flex flex-col items-center text-gray-700">
            <img src={method.image} alt={method.name} className="w-24 h-24 object-cover mb-2" />
            <p className="text-center">{method.name}</p>
          </div>
        ))}
      </div>

      <h2 className="text-soft-blue text-2xl mb-2">Information on Methods</h2>
      <ol className="text-gray-700 whitespace-pre-line">
        {data.information && data.information.length > 0 ? (
          data.information.map((info, index) => (
            <li key={index}>- {info}</li>
          ))
        ) : (
          <li>No information available</li>
        )}
      </ol>
    </div>
  );
}
