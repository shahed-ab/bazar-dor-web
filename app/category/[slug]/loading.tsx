import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <div className="w-full bg-[#F1F5EE] border-b border-[#E2E8DE]/80 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="h-10 w-36 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-10 w-44 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full space-y-6">
        <div className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-8 animate-pulse flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-32 bg-gray-200 rounded-lg" />
            <div className="h-4 w-48 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-4 flex items-center justify-between animate-pulse">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-8 w-28 bg-gray-200 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={`cat-skel-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
