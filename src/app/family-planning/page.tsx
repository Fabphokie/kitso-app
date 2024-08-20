'use client'; // Ensure this component is rendered client-side

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for client components

export default function FamilyPlanningPage() {
  const [data, setData] = useState<{ title: string; content: string; image: string; methods: { [key: string]: { name: string; image: string } }; information: string[] }>({
    title: '',
    content: '',
    image: '',
    methods: {},
    information: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedContent, setHighlightedContent] = useState<string>('');
  const router = useRouter(); // UseRouter for client-side navigation

  // Fetch data on component mount
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

  // Highlight text based on query parameters
  useEffect(() => {
    if (router.query && router.query.highlight) {
      const highlightText = decodeURIComponent(router.query.highlight as string);
      console.log('Highlighting:', highlightText); // Debug: check highlight text
      if (highlightText) {
        const regex = new RegExp(`(${highlightText})`, 'gi');
        const newHighlightedContent = data.content.replace(regex, '<mark>$1</mark>');
        setHighlightedContent(newHighlightedContent);
      }
    }
  }, [router.query, data.content]); // Watch for changes in both router.query and data.content

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-cream-white min-h-screen text-center">
      <h1 className="text-soft-blue text-4xl mb-4">{data.title}</h1>
      <div
        className="text-gray-700 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      />
      
      {data.image && <img src={data.image} alt={data.title} className='w-10% h-auto mx-auto' />}

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
        {data.information.map((info, index) => (
          <li key={index}>- {info}</li>
        ))}
      </ol>
    </div>
  );
}
