import { Suspense } from 'react';
import { Metadata } from 'next';
import { getCategories, getProducts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import SignUpForm from '@/components/SignUpForm';

export const metadata: Metadata = {
  title: 'সাইন আপ | বাজার দর',
  description: 'বিনা খরচে বাজার দর অ্যাকাউন্টে সাইন আপ করুন।',
};

export default async function SignUpPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <Navbar categories={categories} />
      <PriceTicker products={products} />

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-14 flex-1 w-full flex items-center justify-center">
        <Suspense
          fallback={
            <div className="w-full max-w-md mx-auto bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6" />
              <div className="h-10 bg-gray-200 rounded-xl mb-4" />
              <div className="h-10 bg-gray-200 rounded-xl mb-4" />
              <div className="h-10 bg-gray-200 rounded-xl mb-4" />
              <div className="h-10 bg-gray-200 rounded-xl" />
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
