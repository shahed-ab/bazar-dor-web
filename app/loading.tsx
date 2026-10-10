import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <div className="w-full bg-[#F1F5EE] border-b border-[#E2E8DE]/80 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="h-10 w-36 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-10 w-44 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full space-y-12">
        <div className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-12 animate-pulse flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 space-y-4 w-full">
            <div className="h-6 w-36 bg-gray-200 rounded-full" />
            <div className="h-10 w-3/4 bg-gray-200 rounded-xl" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-12 w-40 bg-gray-200 rounded-2xl pt-2" />
          </div>
          <div className="w-64 h-52 bg-gray-200 rounded-2xl shrink-0" />
        </div>

        <div className="space-y-4">
          <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={`skel-a-${i}`} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={`skel-b-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
