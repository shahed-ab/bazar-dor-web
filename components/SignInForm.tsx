'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn, useSession } from '@/lib/auth-client';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL') || '/';
  const reason = searchParams.get('reason');

  const { data: session, isPending: isSessionLoading } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (reason === 'login-required') {
      toast.error('এই পেজ দেখতে প্রথমে সাইন ইন করুন');
    }
  }, [reason]);

  useEffect(() => {
    if (!isSessionLoading && session?.user) {
      router.push(callbackURL);
    }
  }, [session, isSessionLoading, router, callbackURL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      const msg = 'অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);

    try {
      const res = await signIn.email({
        email: email.trim(),
        password,
      });

      if (res.error) {
        const errorText = res.error.message || 'ভুল ইমেইল বা পাসওয়ার্ড';
        setErrorMessage(errorText);
        toast.error(errorText);
      } else {
        toast.success('সফলভাবে সাইন ইন হয়েছে!');
        router.push(callbackURL);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'সাইন ইন করতে সমস্যা হয়েছে';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    try {
      const target = callbackURL.startsWith('http')
        ? callbackURL
        : `${window.location.origin}${callbackURL.startsWith('/') ? '' : '/'}${callbackURL}`;

      const res = await signIn.social({
        provider,
        callbackURL: target,
      });

      if (res?.error) {
        toast.error(res.error.message || `${provider === 'google' ? 'Google' : 'GitHub'} সাইন ইন ব্যর্থ হয়েছে`);
        setSocialLoading(null);
      } else if (res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch {
      toast.error(`${provider === 'google' ? 'Google' : 'GitHub'} সাইন ইন ব্যর্থ হয়েছে`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
          সাইন ইন
        </h1>
        <p className="text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-8 shadow-xs">
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8DE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#078A42]/20 focus:border-[#078A42] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8DE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#078A42]/20 focus:border-[#078A42] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#078A42] hover:bg-[#067337] disabled:opacity-70 text-white font-bold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'সাইন ইন'
            )}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E2E8DE]" />
          </div>
          <span className="relative bg-[#FBFDFA] px-3 text-xs text-gray-500 font-medium">
            অথবা
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!!socialLoading || loading}
            onClick={() => handleSocialSignIn('google')}
            className="flex items-center justify-center gap-2 px-3 py-2.5 border border-[#E2E8DE] rounded-xl bg-white hover:bg-gray-50 disabled:opacity-60 text-xs sm:text-sm font-medium text-gray-700 transition-colors cursor-pointer"
          >
            {socialLoading === 'google' ? (
              <span className="inline-block w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span className="truncate">Google দিয়ে চালান</span>
          </button>

          <button
            type="button"
            disabled={!!socialLoading || loading}
            onClick={() => handleSocialSignIn('github')}
            className="flex items-center justify-center gap-2 px-3 py-2.5 border border-[#E2E8DE] rounded-xl bg-white hover:bg-gray-50 disabled:opacity-60 text-xs sm:text-sm font-medium text-gray-700 transition-colors cursor-pointer"
          >
            {socialLoading === 'github' ? (
              <span className="inline-block w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 shrink-0 fill-current text-gray-800" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            )}
            <span className="truncate">GitHub দিয়ে চালান</span>
          </button>
        </div>

        <div className="mt-6 text-center text-xs sm:text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{' '}
          <Link
            href={`/signup${callbackURL !== '/' ? `?callbackURL=${encodeURIComponent(callbackURL)}` : ''}`}
            className="text-[#078A42] font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
