import React from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7faf7] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-12 max-w-md w-full shadow-xs space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
          <SearchX className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            ৪০৪ ত্রুটি
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight pt-2">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা লিঙ্কটি সঠিক নয়।
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-xs hover:shadow transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
