// src/components/DropDownButton.tsx

"use client"; // Marking this component as a Client Component

import { useState } from 'react';

interface DropDownButtonProps {
  topics: string[];
}

const DropDownButton: React.FC<DropDownButtonProps> = ({ topics }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center rounded-lg border border-gray-300 bg-creamWhite px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleDropdown}
      >
        Topics
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {topics.map((topic) => (
              <a
                key={topic}
                href={`/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {topic}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
