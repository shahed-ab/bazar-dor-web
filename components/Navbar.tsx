'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Category } from '@/types';
import { useSession, signOut } from '@/lib/auth-client';
import BanglaDate from './BanglaDate';

interface NavbarProps {
  categories?: Category[];
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

export default function Navbar({ categories = DEFAULT_CATEGORIES }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    try {
      await signOut();
      toast.success('সফলভাবে সাইন আউট করা হয়েছে');
      router.push('/');
      router.refresh();
    } catch {
      toast.error('সাইন আউট করতে সমস্যা হয়েছে');
    }
  };

  const navCategories = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  const fullName = session?.user?.name || 'ব্যবহারকারী';
  const firstName = fullName.split(' ')[0] || fullName;
  const userEmail = session?.user?.email || '';
  const userImage = session?.user?.image;

  return (
    <header className="w-full bg-[#F1F5EE] border-b border-[#E2E8DE]/80 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3.5 border-b border-[#E2E8DE]/60">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#078A42] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/logo-icon.png"
                alt="বাজার দর লোগো"
                width={32}
                height={32}
                className="w-7 h-7 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-[#078A42] transition-colors">
                বাজার দর
              </span>
              <BanglaDate />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="flex items-center gap-2 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-gray-200" />
                <div className="w-20 h-4 rounded bg-gray-200 hidden sm:block" />
              </div>
            ) : session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  id="user-menu-button"
                  aria-label="ব্যবহারকারী মেনু"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-2.5 rounded-full hover:bg-white/80 border border-transparent hover:border-[#E2E8DE] transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-[#078A42]/10 border border-[#078A42]/20 text-[#078A42] font-semibold flex items-center justify-center overflow-hidden">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt={fullName}
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                        unoptimized
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{firstName.charAt(0)}</span>
                    )}
                  </div>
                  <span className="font-medium text-sm text-gray-800 hidden sm:inline-block max-w-[120px] truncate">
                    {firstName}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div
                    id="user-dropdown-card"
                    className="absolute right-0 mt-2 w-64 bg-[#FBFDFA] rounded-2xl shadow-xl border border-[#E2E8DE] py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-4 py-2 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#078A42]/10 border border-[#078A42]/20 text-[#078A42] font-bold flex items-center justify-center shrink-0">
                        {userImage ? (
                          <Image
                            src={userImage}
                            alt={fullName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover rounded-full"
                            unoptimized
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span>{firstName.charAt(0)}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm truncate">{fullName}</p>
                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                      </div>
                    </div>

                    <div className="h-px bg-[#E2E8DE] my-2" />

                    <div className="px-2">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:text-[#078A42] hover:bg-gray-50 rounded-xl transition-colors font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        আমার প্রোফাইল
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors font-medium text-left cursor-pointer mt-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        সাইন আউট
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (


              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/signin"
                  className="px-3.5 py-1.5 text-sm sm:text-base font-medium text-gray-700 hover:text-[#078A42] transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base font-semibold text-white bg-[#078A42] hover:bg-[#067337] rounded-xl shadow-sm hover:shadow transition-all duration-150"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        <nav aria-label="ক্যাটেগরি তালিকা" className="py-2.5 overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-2 sm:gap-3">
          {navCategories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 shrink-0 ${isActive
                    ? 'bg-[#078A42] text-white shadow-sm font-semibold'
                    : 'text-gray-700 hover:text-[#078A42] hover:bg-white/80'
                  }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
