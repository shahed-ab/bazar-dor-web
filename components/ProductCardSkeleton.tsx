export default function ProductCardSkeleton() {
  return (
    <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-4 sm:p-5 shadow-xs animate-pulse">
      <div className="flex items-start gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
      </div>

      <div className="flex items-end justify-between pt-2 border-t border-[#F0F4EC]">
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-200 rounded w-14" />
          <div className="h-5 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-16" />
      </div>
    </div>
  );
}
