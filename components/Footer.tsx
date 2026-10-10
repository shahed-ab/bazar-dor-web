export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8DE] bg-[#F1F5EE] py-6 sm:py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
        <div>
          <span className="font-semibold text-gray-700">বাজার দর</span>
          <span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        </div>
        <div className="text-gray-400 sm:text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}
