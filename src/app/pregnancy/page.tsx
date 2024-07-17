// src/app/pregnancy/page.tsx
import Link from 'next/link';

const PregnancyPage = () => {
  return (
    <div className="p-8 bg-cream-white min-h-screen">
      <h1 className="text-soft-blue text-3xl mb-4">Understanding Pregnancy</h1>
      <p className="text-gray-700 mb-4">
        Pregnancy is an exciting and transformative time. Discover information about prenatal care, health tips, and what to expect during pregnancy.
      </p>
      <Link href="/" className="text-blush-pink hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default PregnancyPage;
