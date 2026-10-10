export default function ProductLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5EE]">
      <div className="w-full bg-[#F1F5EE] border-b border-[#E2E8DE]/80 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="h-11 w-36 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-10 w-44 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full space-y-8 animate-pulse">
        <div className="h-4 w-48 bg-gray-200 rounded" />

        <div className="bg-[#FBFDFA] rounded-3xl border border-[#E2E8DE] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-200 shrink-0" />
            <div className="space-y-2">
              <div className="h-8 w-44 bg-gray-200 rounded-xl" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-52 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="w-48 h-24 bg-gray-200 rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-5 h-28" />
          <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-5 h-28" />
          <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-5 h-28" />
        </div>

        <div className="bg-[#FBFDFA] rounded-2xl border border-[#E2E8DE] p-6 h-64" />
      </div>
    </div>
  );
}
