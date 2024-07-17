// src/components/DropDownButton.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DropdownButtonProps {
  topics: string[];
}

const DropDownButton: React.FC<DropdownButtonProps> = ({ topics }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-blush-pink text-cream-white px-4 py-2 rounded hover:bg-soft-blue"
        onClick={() => setOpen(!open)}
      >
        Topics
      </button>
      {open && (
        <ul className="absolute right-0 bg-cream-white text-soft-blue mt-2 rounded shadow-lg border border-gray-300">
          {topics.map((topic) => (
            <li key={topic} className="px-4 py-2 hover:bg-soft-blue hover:text-cream-white">
              <Link href={`/${topic.toLowerCase().replace(/ /g, '-')}`}>
                {topic}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownButton;
