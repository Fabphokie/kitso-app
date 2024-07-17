// src/app/mental-wellness/page.tsx
import Link from 'next/link';

const MentalWellnessPage = () => {
  return (
    <div className="p-8 bg-cream-white min-h-screen">
      <h1 className="text-soft-blue text-3xl mb-4">Mental Wellness</h1>
      <p className="text-gray-700 mb-4">
        Mental wellness is crucial for a balanced life. Explore resources, strategies, and tips for maintaining mental health and well-being.
      </p>
      <Link href="/" className="text-blush-pink hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default MentalWellnessPage;
