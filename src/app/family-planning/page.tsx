// src/app/family-planning/page.tsx
import Link from 'next/link';

const FamilyPlanningPage = () => {
  return (
    <div className="p-8 bg-cream-white min-h-screen">
      <h1 className="text-soft-blue text-3xl mb-4">Family Planning</h1>
      <p className="text-gray-700 mb-4">
        Family planning is important for a healthy family. Learn about different methods of contraception, family planning strategies, and resources available.
      </p>
      <Link href="/" className="text-blush-pink hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default FamilyPlanningPage;
