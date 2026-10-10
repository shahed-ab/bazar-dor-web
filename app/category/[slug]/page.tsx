import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getCategoryBySlug, getProducts } from '@/lib/api';
import { toBengaliDigits } from '@/lib/bengali';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import CategoryProductList from '@/components/CategoryProductList';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'ক্যাটেগরি পাওয়া যায়নি | বাজার দর',
    };
  }

  return {
    title: `${category.nameBn} এর বাজার দর | বাজার দর`,
    description: `${category.nameBn} এর সকল নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর ও মূল্যের পরিবর্তন।`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [categories, category, allProducts, categoryProducts] = await Promise.all([
    getCategories(),
    getCategoryBySlug(slug),
    getProducts(),
    getProducts(slug),
  ]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
        <Navbar categories={categories} />
        <PriceTicker products={allProducts} />

        <main className="max-w-6xl mx-auto px-4 py-16 flex-1 w-full flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center text-4xl mb-4 border border-amber-200">
            🔍
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            দুঃখিত, ক্যাটেগরিটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mb-8">
            আপনার অনুরোধকৃত ক্যাটেগরিটি আমাদের ডাটাবেজে নেই অথবা মুছে ফেলা হয়েছে।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#078A42] hover:bg-[#067337] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  const countBn = toBengaliDigits(categoryProducts.length);

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <Navbar categories={categories} />
      <PriceTicker products={allProducts} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full">
        <section className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F0F4EC] border border-[#E2E8DE]/60 flex items-center justify-center text-3xl shrink-0">
              {category.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {category.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {countBn}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        <CategoryProductList initialProducts={categoryProducts} />
      </main>

      <Footer />
    </div>
  );
}
