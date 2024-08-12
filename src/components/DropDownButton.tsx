// src/components/DropDownButton.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface DropdownButtonProps {
  topics: string[];
}

const DropDownButton: React.FC<DropdownButtonProps> = ({ topics }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="bg-blush-pink text-cream-white px-4 py-2 rounded hover:bg-soft-blue"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="dropdown-menu"
        aria-haspopup="true"
      >
        Topics
      </button>
      {open && (
        <ul
          id="dropdown-menu"
          className={`absolute right-0 bg-cream-white text-center text-soft-blue mt-2 rounded shadow-lg border border-blue-300 transition-opacity duration-300 ease-in-out ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <li className="flex justify-end">
            <button
              className="text-soft-blue px-2 py-1 hover:bg-soft-blue hover:text-cream-white"
              onClick={() => setOpen(false)}
              aria-label="Close dropdown"
            >
              X
            </button>
          </li>
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
