import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-gray-200/80 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-base">🛒</span>
            <span className="font-semibold text-gray-700">বাজার দর</span>
            <span className="text-gray-300">|</span>
            <span>প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
          </div>
          <div className="text-center sm:text-right text-gray-400">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </div>
        </div>
      </div>
    </footer>
  );
}

