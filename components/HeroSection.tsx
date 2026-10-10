import Image from 'next/image';
import BanglaDate from './BanglaDate';

export default function HeroSection() {
  return (
    <section className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-10 lg:p-12 shadow-xs mb-10 overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#078A42] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#078A42] animate-pulse" />
            <BanglaDate />
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div>
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center gap-2 bg-[#078A42] hover:bg-[#067337] text-white px-7 py-3 rounded-2xl font-bold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>সব পণ্য দেখুন</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] shrink-0 flex items-center justify-center">
          <Image
            src="/images/bazar-hero.png"
            alt="বাজার দর ঝুড়ি চিত্র"
            width={400}
            height={320}
            className="w-full h-auto object-contain drop-shadow-sm hover:scale-102 transition-transform duration-300"
            priority
          />
        </div>
      </div>
    </section>
  );
}
