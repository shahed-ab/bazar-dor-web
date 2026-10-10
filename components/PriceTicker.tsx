import Link from 'next/link';
import { Product } from '@/types';
import { toBengaliDigits, formatTickerUnit } from '@/lib/bengali';

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  const marqueeItems = [...products, ...products];

  return (
    <div
      aria-label="বাজার দর লাইভ টিকার"
      className="w-full bg-[#FBFDFA] border-y border-[#E2E8DE] py-2 overflow-hidden shadow-xs"
    >
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
        {marqueeItems.map((p, idx) => {
          const isUp = p.change.dir === 'up';
          const isDown = p.change.dir === 'down';
          const absPct = Math.abs(p.change.pct || 0).toFixed(1);
          const formattedPct = toBengaliDigits(absPct);
          const priceText = `${toBengaliDigits(p.today, true)} ${formatTickerUnit(p.unit)}`;

          return (
            <Link
              key={`${p.id}-${p.slug}-${idx}`}
              href={`/product/${p.slug}`}
              className="inline-flex items-center gap-2 hover:opacity-81 transition-opacity text-xs sm:text-sm text-gray-800"
            >
              <span className="text-sm shrink-0">{p.image || p.categoryIcon || '🌾'}</span>
              <span className="font-semibold text-gray-900">{p.nameBn}</span>
              <span className="text-gray-600 font-medium">{priceText}</span>

              {isUp ? (
                <span className="inline-flex items-center gap-0.5 text-[#E11D48] bg-[#FEE2E2] px-1.5 py-0.5 rounded-full text-xs font-semibold">
                  <span>▲</span>
                  <span>{formattedPct}%</span>
                </span>
              ) : isDown ? (
                <span className="inline-flex items-center gap-0.5 text-[#078A42] bg-[#E8F5E9] px-1.5 py-0.5 rounded-full text-xs font-semibold">
                  <span>▼</span>
                  <span>{formattedPct}%</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full text-xs font-semibold">
                  <span>—</span>
                  <span>০.০%</span>
                </span>
              )}

              <span className="text-gray-300 ml-4">|</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
