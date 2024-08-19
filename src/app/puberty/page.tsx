// src/app/pages/puberty/page.js

'use client';

import { useEffect, useState } from 'react';

export default function PubertyPage() {
  const [data, setData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/puberty');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result && typeof result === 'object' && result.title && result.content) {
          setData(result);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
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
      <div
        className="text-gray-700 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      <h2>{data.methods}</h2>
    </div>
  );
}
