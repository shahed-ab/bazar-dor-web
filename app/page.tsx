import { getCategories, getProducts } from '@/lib/api';
import { toBengaliDigits } from '@/lib/bengali';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const risingProducts = products
    .filter((p) => p.change?.dir === 'up' || (p.change?.pct || 0) > 0)
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  const fallingProducts = products
    .filter((p) => p.change?.dir === 'down' || (p.change?.pct || 0) < 0)
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  const totalCountBn = toBengaliDigits(products.length);

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <Navbar categories={categories} />
      <PriceTicker products={products} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full space-y-12 sm:space-y-14">
        <HeroSection />

        {risingProducts.length > 0 && (
          <section aria-labelledby="rising-heading" className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg text-[#E11D48] font-black">▲</span>
              <h2
                id="rising-heading"
                className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight"
              >
                আজ দাম বেড়েছে
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {risingProducts.map((product) => (
                <ProductCard key={`rising-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {fallingProducts.length > 0 && (
          <section aria-labelledby="falling-heading" className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg text-[#078A42] font-black">▼</span>
              <h2
                id="falling-heading"
                className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight"
              >
                আজ দাম কমেছে
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {fallingProducts.map((product) => (
                <ProductCard key={`falling-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        <section id="সব-পণ্য" aria-labelledby="all-products-heading" className="space-y-4 pt-4">
          <div>
            <h2
              id="all-products-heading"
              className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight"
            >
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              মোট {totalCountBn}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
