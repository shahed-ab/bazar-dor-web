'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types';
import { toBengaliDigits } from '@/lib/bengali';
import ProductCard from './ProductCard';

interface CategoryProductListProps {
  initialProducts: Product[];
}

export default function CategoryProductList({ initialProducts }: CategoryProductListProps) {
  const [sortOption, setSortOption] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortOption === 'price-asc') {
      return list.sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sortOption === 'price-desc') {
      return list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  }, [initialProducts, sortOption]);

  const countBn = toBengaliDigits(sortedProducts.length);

  return (
    <div className="space-y-6">
      <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            মোট <span className="text-[#078A42] font-bold">{countBn}টি</span> পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-600 whitespace-nowrap">
            সাজান:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as 'default' | 'price-asc' | 'price-desc')}
              className="appearance-none bg-white border border-[#E2E8DE] text-gray-800 text-sm rounded-xl pl-3.5 pr-9 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#078A42]/20 focus:border-[#078A42] shadow-2xs cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-12 text-center">
          <p className="text-gray-500 font-medium">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
