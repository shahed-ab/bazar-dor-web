import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getCategories, getProducts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import ProfileSignOutButton from '@/components/ProfileSignOutButton';

export const metadata: Metadata = {
  title: 'আমার প্রোফাইল | বাজার দর',
  description: 'আপনার বাজার দর অ্যাকাউন্টের বিস্তারিত তথ্য।',
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin?callbackURL=/profile&reason=login-required');
  }

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const user = session.user;
  const initial = user.name ? user.name.charAt(0) : 'U';

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <Navbar categories={categories} />
      <PriceTicker products={products} />

      <main className="max-w-2xl mx-auto px-4 py-10 sm:py-14 flex-1 w-full space-y-6">
        <div className="mb-2">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#078A42]/10 border border-[#078A42]/20 text-[#078A42] font-black text-2xl sm:text-3xl flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'User'}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{initial}</span>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 truncate mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <ProfileSignOutButton />
        </div>

        <div className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-7 shadow-xs">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
            তথ্য
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                নাম
              </label>
              <input
                type="text"
                readOnly
                value={user.name || ''}
                className="w-full px-4 py-2.5 bg-gray-50/80 border border-[#E2E8DE] rounded-xl text-sm text-gray-700 cursor-not-allowed select-none"
              />
            </div>

            <Link
              href="/profile/update"
              className="w-full bg-[#078A42] hover:bg-[#067337] text-white font-bold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              আপডেট
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
