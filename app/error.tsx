'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-3xl mb-4">
        ⚠️
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        তথ্য লোড করতে সমস্যা হয়েছে
      </h2>
      <p className="text-sm text-gray-600 max-w-md mb-6">
        দুঃখিত, বাজার তথ্যের সংযোগ বিঘ্নিত হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 bg-[#078A42] hover:bg-[#067337] text-white rounded-xl font-medium shadow-sm transition-all"
        >
          পুনরায় চেষ্টা করুন
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 bg-white border border-[#E2E8DE] text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
