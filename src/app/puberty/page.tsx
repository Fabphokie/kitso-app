'use client'

import { useEffect, useState } from 'react';
import { fetchPuberty } from '../../utils/data/fetchPuberty';

export default function PubertyPage() {
  const [data, setData] = useState({ title: '', content: '' });

  useEffect(() => {
    const getData = async () => {
      const result = await fetchPuberty();
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
}
