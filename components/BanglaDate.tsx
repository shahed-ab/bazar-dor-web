'use client';

import { useSyncExternalStore } from 'react';
import { getBengaliDate } from '@/lib/bengali';

const subscribe = () => () => {};

export default function BanglaDate() {
  const dateText = useSyncExternalStore(
    subscribe,
    () => getBengaliDate(new Date()),
    () => 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬'
  );

  return (
    <span className="text-xs text-gray-500 block leading-tight" suppressHydrationWarning>
      {dateText}
    </span>
  );
}
