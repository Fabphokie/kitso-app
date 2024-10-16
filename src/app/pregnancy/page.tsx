'use client';

import { useEffect, useState } from 'react';

interface PregnancyData {
  title: string;
  content: string;
  image?: string;
  information: string[];
  key_feature: {
    [key: string]: {
      name: string;
      description: string;
      image: string;
    };
  };
  Stages: {
    [key: string]: {
      description: string;
      key_developments: string[];
    };
  };
  signs_and_symptoms: string[];
}

export default function PregnancyPage() {
  const [data, setData] = useState<PregnancyData>({
    title: '',
    content: '',
    image: '',
    information: [],
    key_feature: {},
    Stages: {},
    signs_and_symptoms: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/pregnancy');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: PregnancyData = await response.json();
        if (result && typeof result === 'object' && result.title && result.content) {
          setData(result);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="text-soft-blue">Loading...</span></div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}. Please try again later.</div>;

  return (
    <div className="p-8 bg-cream-white min-h-screen text-center">
      <h1 className="text-soft-blue text-4xl mb-4">{data.title}</h1>
      <div
        className="text-gray-700 whitespace-pre-line mb-8"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      {data.image && (
        <img src={data.image} alt="Pregnancy" className="mb-8 mx-auto w-full max-w-lg rounded-lg" />
      )}
      <h2 className="text-soft-blue text-2xl font-bold mb-4">Information</h2>
      <ul className="text-gray-700 list-disc list-inside mb-8">
        {data.information.length > 0 ? (
          data.information.map((info, index) => (
            <li key={index} className="mb-2">{info}</li>
          ))
        ) : (
          <li>No additional information available.</li>
        )}
      </ul>
      <h2 className="text-soft-blue text-2xl font-bold mb-4">Key Features</h2>
      <div className="text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {Object.values(data.key_feature).map((feature, index) => (
          <div key={index} className="text-left">
            <img src={feature.image} alt={feature.name} className="mb-2 w-full h-48 object-cover rounded-md" />
            <h3 className="font-bold">{feature.name}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
      <h2 className="text-soft-blue text-2xl font-bold mb-4">Stages of Pregnancy</h2>
      <div className="text-gray-700 mb-8">
        {Object.entries(data.Stages).map(([stage, details], index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-xl">{stage.replace('_', ' ')}</h3>
            <p>{details.description}</p>
            <ul className="list-disc list-inside">
              {details.key_developments.map((development, i) => (
                <li key={i}>{development}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h2 className="text-soft-blue text-2xl font-bold mb-4">Signs and Symptoms</h2>
      <ul className="text-gray-700 list-disc list-inside">
        {data.signs_and_symptoms.length > 0 ? (
          data.signs_and_symptoms.map((symptom, index) => (
            <li key={index} className="mb-2">{symptom}</li>
          ))
        ) : (
          <li>No signs or symptoms listed.</li>
        )}
      </ul>
    </div>
  );
}
