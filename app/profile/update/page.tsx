import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getCategories, getProducts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import UpdateProfileForm from '@/components/UpdateProfileForm';

export const metadata: Metadata = {
  title: 'প্রোফাইল আপডেট | বাজার দর',
  description: 'আপনার বাজার দর প্রোফাইলের তথ্য আপডেট করুন।',
};

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin?callbackURL=/profile/update&reason=login-required');
  }

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <Navbar categories={categories} />
      <PriceTicker products={products} />

      <main className="max-w-md mx-auto px-4 py-10 sm:py-14 flex-1 w-full space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1 text-center">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
          </p>
        </div>

        <UpdateProfileForm initialName={session.user.name || ''} />
      </main>

      <Footer />
    </div>
  );
}
