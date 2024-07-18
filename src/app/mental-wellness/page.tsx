'use client'

import { useEffect, useState } from 'react';
import { fetchMentalWellness } from '../../utils/data/fetchMentalWellness';

const MentalWellnessPage = () => {
  const [data, setData] = useState({ title: '', content: '' });

  useEffect(() => {
    const getData = async () => {
      const result = await fetchMentalWellness();
      setData(result);
    };

    getData();
  }, []);

  return (
    <div className="p-8 bg-cream-white min-h-screen text-center">
      <h1 className="text-soft-blue text-4xl mb-4">{data.title}</h1>
      <div
        className="text-gray-700 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};

export default MentalWellnessPage;
