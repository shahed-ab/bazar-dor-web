import Link from 'next/link';
import { Product } from '@/types';
import { toBengaliDigits, formatUnit, formatPrice } from '@/lib/bengali';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const absPct = Math.abs(product.change?.pct || 0).toFixed(1);
  const formattedPct = toBengaliDigits(absPct);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#F0F4EC] border border-[#E2E8DE]/60 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform duration-200">
          <span>{product.image || product.categoryIcon || '🌾'}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-gray-900 text-base group-hover:text-[#078A42] transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between pt-2 border-t border-[#F0F4EC]">
        <div>
          <span className="block text-xs text-gray-400 font-medium">আজকের দাম</span>
          <span className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
            {formatPrice(product.today)}
          </span>
        </div>

        <div className="pb-0.5">
          {isUp ? (
            <span className="inline-flex items-center gap-1 text-[#E11D48] bg-[#FEE2E2] px-2.5 py-1 rounded-full text-xs font-bold">
              <span>▲</span>
              <span>{formattedPct}%</span>
            </span>
          ) : isDown ? (
            <span className="inline-flex items-center gap-1 text-[#078A42] bg-[#E8F5E9] px-2.5 py-1 rounded-full text-xs font-bold">
              <span>▼</span>
              <span>{formattedPct}%</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-semibold">
              <span>—</span>
              <span>০.০%</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
