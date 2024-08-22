'use client';

import { useEffect, useState } from 'react';

export default function FamilyPlanningPage() {
  const [data, setData] = useState<{
    title: string;
    content: string;
    image: string;
    methods: { [key: string]: { name: string; image: string } };
    information: string[];
  }>({
    title: '',
    content: '',
    image: '',
    methods: {},
    information: [], // Ensure this is an array initially
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedContent, setHighlightedContent] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/family-planning');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result && typeof result === 'object' && result.title && result.content) {
          setData(result);
          setHighlightedContent(result.content); // Initial content without highlighting
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

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-cream-white min-h-screen text-center">
      <h1 className="text-soft-blue text-4xl mb-4">{data.title}</h1>
      {data.image && <img src={data.image} alt={data.title} className="w-100 h-24 text-center" />}
      <div
        className="text-gray-700 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      />

      <h2 className="text-soft-blue text-2xl mb-2">Methods :</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(data.methods).map(([key, method]) => (
          <div key={key} className="flex flex-col items-center text-gray-700">
            <img src={method.image} alt={method.name} className="w-24 h-24 object-cover mb-2" />
            <p>{method.name}</p>
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
