'use client';

import { useEffect, useState } from 'react';

interface Sign {
  description: string;
  image: string;
}

interface PubertyData {
  title: string;
  content: string;
  information: string[];
  sign2: Sign;
  sign3: Sign;
  sign4: Sign;
  sign5: Sign;
  signs_and_symptoms: Sign;
}

export default function PubertyPage() {
  const [data, setData] = useState<PubertyData>({
    title: '',
    content: '',
    information: [],
    sign2: { description: '', image: '' },
    sign3: { description: '', image: '' },
    sign4: { description: '', image: '' },
    sign5: { description: '', image: '' },
    signs_and_symptoms: { description: '', image: '' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching data
    try {
      const response = await fetch('/api/puberty');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: PubertyData = await response.json();
      setData(result);
    } catch (error) {
      console.error('Fetching error:', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const retryFetch = () => {
    getData(); // Call the getData function again
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-soft-blue">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 text-center">
        <p>Error: {error}. Please try again later.</p>
        <button onClick={retryFetch} className="mt-4 text-soft-blue underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-cream-white text-gray-700 min-h-screen text-center">
      <h1 className="text-soft-blue text-4xl mb-4">{data.title}</h1>
      <div className="text-gray-700 whitespace-pre-line mb-8">{data.content}</div>
      <h2 className="text-2xl text-soft-blue font-bold mb-4">Information</h2>
      <ul className="list-disc list-inside mb-8">
        {Array.isArray(data.information) && data.information.length > 0 ? (
          data.information.map((info, index) => (
            <li key={index} className="mb-2">{info}</li>
          ))
        ) : (
          <li>No additional information available.</li>
        )}
      </ul>

      <h2 className="text-soft-blue font-bold mb-4">Signs and Symptoms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[data.signs_and_symptoms, data.sign2, data.sign3, data.sign4, data.sign5].map((sign, index) => (
          <div key={index} className="text-left">
            {sign.image && (
              <img src={sign.image} alt={`Sign ${index + 2}`} className="mb-2 w-full h-48 object-cover rounded-md" />
            )}
            <p>{sign.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
