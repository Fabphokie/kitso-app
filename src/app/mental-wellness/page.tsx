'use client';

import { useEffect, useState } from 'react';

interface KeyFeature {
  name: string;
  image: string;
  info: string;
}

interface MentalWellnessData {
  title: string;
  content: string;
  information: string[];
  Key_features: { [key: string]: KeyFeature };
  signs_and_symptoms: string[];
}

export default function MentalWellnessPage() {
  const [data, setData] = useState<MentalWellnessData>({
    title: '',
    content: '',
    information: [],
    Key_features: {},
    signs_and_symptoms: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/mental-wellness');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: MentalWellnessData = await response.json();
        // Ensure that result has the correct structure
        setData({
          title: result.title || '',
          content: result.content || '',
          information: Array.isArray(result.information) ? result.information : [],
          Key_features: result.Key_features || {},
          signs_and_symptoms: Array.isArray(result.signs_and_symptoms) ? result.signs_and_symptoms : [],
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    getData();
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="text-soft-blue">Loading...</span></div>;
  if (error) return (
    <div className="p-8 text-red-500 text-center">
      <p>Error: {error}</p>
      <button onClick={retryFetch} className="mt-4 text-soft-blue underline">
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-8 bg-cream-white min-h-screen text-center" aria-live="polite">
      <h1 className="text-soft-blue text-4xl mb-4">{data.title}</h1>
      <p className="text-gray-700 mb-6">{data.content}</p>

      <div className="text-gray-700 mb-8">
        <h2 className="text-soft-blue text-2xl mb-2">Key Information</h2>
        <ul className="list-disc list-inside">
          {data.information.map((item, index) => (
            <li key={index} className="mb-2">{item}</li>
          ))}
        </ul>
      </div>

      <div className="text-gray-700 mb-8">
        <h2 className="text-soft-blue text-2xl mb-2">Key Features</h2>
        {Object.entries(data.Key_features).map(([key, feature]) => (
          <div key={key} className="mb-6">
            <img src={feature.image} alt={feature.name} className="w-32 h-32 object-cover mx-auto mb-2" />
            <h3 className="text-soft-blue text-xl">{feature.name}</h3>
            <p>{feature.info}</p>
          </div>
        ))}
      </div>

      <div className="text-gray-700">
        <h2 className="text-soft-blue text-2xl mb-2">Signs and Symptoms</h2>
        <ul className="list-disc list-inside">
          {data.signs_and_symptoms.length > 0 ? (
            data.signs_and_symptoms.map((symptom, index) => (
              <li key={index} className="mb-2">{symptom}</li>
            ))
          ) : (
            <li>No signs and symptoms available.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
