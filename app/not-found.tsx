import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24 flex-1 w-full flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-3xl bg-[#F0F4EC] border border-[#E2E8DE] flex items-center justify-center text-5xl mb-6 shadow-xs animate-bounce duration-1000">
          🛒
        </div>

        <span className="text-sm font-bold text-[#078A42] bg-[#E8F5E9] px-3.5 py-1 rounded-full mb-3">
          ৪০৪ — পেজ পাওয়া যায়নি
        </span>

        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
          দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="text-gray-600 text-sm sm:text-base max-w-md mb-8">
          আপনি যে ঠিকানাটি খুঁজছেন তা বিদ্যমান নেই, সরানো হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ।
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#078A42] hover:bg-[#067337] text-white px-7 py-3 rounded-2xl font-bold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <span>হোম পেজে ফিরে যান</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
