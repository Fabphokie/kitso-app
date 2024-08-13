// src/app/family-planning/page.tsx
'use client'; // Ensure this component is rendered client-side

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for client components

export default function FamilyPlanningPage() {
  const [data, setData] = useState({ title: '', content: '' });
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
          setError("An unknown error occured");
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Highlight text based on query parameters
  useEffect(() => {
    // Ensure router.query and router.query.highlight are defined
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
    </div>
  );
}
