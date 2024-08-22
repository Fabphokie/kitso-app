// src/app/pages/puberty/page.js

'use client';

import { useEffect, useState } from 'react';

export default function PubertyPage() {
  const [data, setData] = useState({
    title: '',
    content: '',
    information: [], // Initialize as an empty array to avoid undefined
    sign2: { description: '', image: '' },
    sign3: { description: '', image: '' },
    sign4: { description: '', image: '' },
    sign5: { description: '', image: '' },
    signs_and_symptoms: { description: '', image: '' }
  });
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
        setData(result);
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
      <div className="text-gray-700 whitespace-pre-line mb-8">
        {data.content}
      </div>
      <h2 className="text-2xl font-bold mb-4">Information</h2>
      <ul className="list-disc list-inside">
        {data.information && data.information.length > 0 ? (
          data.information.map((info, index) => (
            <li key={index} className="mb-2">{info}</li>
          ))
        ) : (
          <li>No additional information available.</li>
        )}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Signs and Symptoms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[data.signs_and_symptoms, data.sign2, data.sign3, data.sign4, data.sign5].map((sign, index) => (
          <div key={index} className="text-left">
            {sign.image && (
              <img src={sign.image} alt={`Sign ${index + 1}`} className="mb-2 w-full h-48 object-cover rounded-md" />
            )}
            <p>{sign.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
