import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getCategories, getProduct, getProducts } from '@/lib/api';
import { toBengaliDigits, formatUnit, formatPrice, formatTickerUnit } from '@/lib/bengali';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'পণ্য পাওয়া যায়নি | বাজার দর',
    };
  }

  return {
    title: `${product.nameBn} এর আজকের বাজার দর | বাজার দর`,
    description: `${product.nameBn} এর আজকের সর্বনিম্ন, সর্বোচ্চ ও গড় বাজার দর এবং বাজারভিত্তিক বিস্তারিত তথ্য।`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}&reason=login-required`);
  }

  const [categories, product, allProducts] = await Promise.all([
    getCategories(),
    getProduct(slug),
    getProducts(),
  ]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
        <Navbar categories={categories} />
        <PriceTicker products={allProducts} />

        <main className="max-w-6xl mx-auto px-4 py-16 flex-1 w-full flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center text-4xl mb-4 border border-amber-200">
            🔍
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            দুঃখিত, পণ্যটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mb-8">
            আপনার অনুরোধকৃত পণ্যটির কোনো তথ্য আমাদের ডাটাবেজে পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#078A42] hover:bg-[#067337] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  const priceDiff = Math.abs((product.today || 0) - (product.yesterday || product.today || 0));
  const priceDiffBn = toBengaliDigits(priceDiff);
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const absPct = Math.abs(product.change?.pct || 0).toFixed(1);
  const formattedPct = toBengaliDigits(absPct);

  const markets = product.markets || [];
  const minPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice =
    markets.length > 0
      ? Math.round(
        markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
      )
      : product.today;

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <Navbar categories={categories} />
      <PriceTicker products={allProducts} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full space-y-8">
        <nav aria-label="ব্রেডক্রাম্ব" className="text-sm font-medium text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#078A42] transition-colors">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#078A42] transition-colors"
          >
            {product.categoryNameBn || product.category}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-semibold">{product.nameBn}</span>
        </nav>

        <div className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F0F4EC] border border-[#E2E8DE]/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                <span>{product.image || product.categoryIcon || '🌾'}</span>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {product.nameBn}
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  {formatUnit(product.unit)} · {product.categoryNameBn || product.category}
                </p>
                <div className="pt-1 text-xs sm:text-sm font-medium">
                  {isUp ? (
                    <span className="text-[#E11D48] flex items-center gap-1">
                      <span>▲</span>
                      <span>গতকালের তুলনায় আজ দাম বেড়েছে · {priceDiffBn} টাকা</span>
                    </span>
                  ) : isDown ? (
                    <span className="text-[#078A42] flex items-center gap-1">
                      <span>▼</span>
                      <span>গতকালের তুলনায় আজ দাম কমেছে · {priceDiffBn} টাকা</span>
                    </span>
                  ) : (
                    <span className="text-gray-500 flex items-center gap-1">
                      <span>—</span>
                      <span>গতকালের তুলনায় আজ দাম অপরিবর্তিত</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#F0F4EC]/60 border border-[#E2E8DE] rounded-2xl p-4 sm:p-5 text-right min-w-[200px] flex flex-col justify-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                আজকের দাম
              </span>
              <div className="font-black text-3xl sm:text-4xl text-gray-900 my-1">
                {toBengaliDigits(product.today, true)} টাকা
              </div>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  {formatTickerUnit(product.unit)}
                </span>
                {isUp ? (
                  <span className="inline-flex items-center gap-0.5 text-[#E11D48] bg-[#FEE2E2] px-2 py-0.5 rounded-full text-xs font-bold">
                    <span>▲</span>
                    <span>{formattedPct}%</span>
                  </span>
                ) : isDown ? (
                  <span className="inline-flex items-center gap-0.5 text-[#078A42] bg-[#E8F5E9] px-2 py-0.5 rounded-full text-xs font-bold">
                    <span>▼</span>
                    <span>{formattedPct}%</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                    <span>—</span>
                    <span>০.০%</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <section aria-labelledby="price-summary-heading" className="space-y-4">
          <h2 id="price-summary-heading" className="text-lg sm:text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-5 shadow-xs">
              <span className="text-xs font-semibold text-gray-500 block">
                সর্বনিম্ন দাম
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#078A42] my-2">
                {formatPrice(minPrice)}
              </div>
              <p className="text-xs text-gray-400">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-5 shadow-xs">
              <span className="text-xs font-semibold text-gray-500 block">
                সর্বোচ্চ দাম
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#E11D48] my-2">
                {formatPrice(maxPrice)}
              </div>
              <p className="text-xs text-gray-400">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-5 shadow-xs">
              <span className="text-xs font-semibold text-gray-500 block">
                গড় দাম
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#078A42] my-2">
                {formatPrice(avgPrice)}
              </div>
              <p className="text-xs text-gray-400">
                প্রতি কেজির এই হিসাবে
              </p>
            </div>
          </div>
        </section>

        {markets.length > 0 && (
          <section aria-labelledby="markets-table-heading" className="space-y-4">
            <h2 id="markets-table-heading" className="text-lg sm:text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#F0F4EC] border-b border-[#E2E8DE] text-gray-700 font-semibold">
                      <th className="py-3.5 px-4 sm:px-6">বাজার</th>
                      <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">সর্বনিম্ন</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">সর্বোচ্চ</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">গড়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8DE]/60">
                    {markets.map((m, idx) => {
                      const marketAvg = Math.round((m.min + m.max) / 2);
                      return (
                        <tr
                          key={`${m.market}-${idx}`}
                          className={`hover:bg-white transition-colors ${idx % 2 === 1 ? 'bg-[#F9FAF8]' : 'bg-[#FBFDFA]'
                            }`}
                        >
                          <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">
                            {m.market}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                            {m.division}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right text-gray-700">
                            {toBengaliDigits(m.min, true)} টাকা
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right text-gray-700">
                            {toBengaliDigits(m.max, true)} টাকা
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-[#078A42]">
                            {toBengaliDigits(marketAvg, true)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
