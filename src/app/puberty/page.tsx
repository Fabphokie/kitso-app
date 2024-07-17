// src/app/puberty/page.tsx
import Link from 'next/link';

const PubertyPage = () => {
  return (
    <div className="p-8 bg-cream-white min-h-screen">
      <h1 className="text-soft-blue text-3xl mb-4">Understanding Puberty</h1>
      <p className="text-gray-700 mb-4">
        Puberty is a natural part of growing up. It’s the time when your body changes from a child to an adult. Learn about physical and emotional changes, and how to navigate them.
      </p>
      <Link href="/" className="text-blush-pink hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default PubertyPage;
