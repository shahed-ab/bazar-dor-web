'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { updateUser } from '@/lib/auth-client';

interface UpdateProfileFormProps {
  initialName: string;
}

export default function UpdateProfileForm({ initialName }: UpdateProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('নাম ফাঁকা রাখা যাবে না');
      return;
    }

    setLoading(true);

    try {
      const res = await updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || 'তথ্য আপডেট করতে সমস্যা হয়েছে');
      } else {
        toast.success('প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে');
        router.push('/profile');
        router.refresh();
      }
    } catch {
      toast.error('তথ্য আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-8 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            নাম
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            required
            className="w-full px-4 py-2.5 bg-white border border-[#E2E8DE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#078A42]/20 focus:border-[#078A42] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#078A42] hover:bg-[#067337] disabled:opacity-75 text-white font-bold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'আপডেট'
          )}
        </button>

        <div className="pt-2 text-center">
          <Link
            href="/profile"
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 transition-colors inline-block"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </form>
    </div>
  );
}
