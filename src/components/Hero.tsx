import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-transparent py-10 sm:py-16 border-b border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide">
              <span>🛒</span>
              <span>নিত্যপ্রয়োজনীয় পণ্যের বাজার দর</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              নিত্যপণ্যের প্রতিদিনের <br className="hidden sm:inline" />
              <span className="text-emerald-700">বাজার দর</span> জানুন সহজে
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl leading-relaxed">
              সঠিক সিদ্ধান্ত নিতে প্রতিদিনের নির্ভরযোগ্য বাজার মূল্যের আপডেট পান।
              বিভিন্ন পাইকারি ও খুচরা বাজারের দাম তুলনা করুন এক নিমিষেই।
            </p>

            <div className="pt-2 sm:pt-4">
              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>বাজার দর দেখুন</span>
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
              </Link>
            </div>
          </div>

          {/* Right Banner / Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md p-6 sm:p-8 bg-gradient-to-br from-emerald-100/50 via-emerald-50/30 to-amber-50/40 rounded-3xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center text-center">
              {/* Decorative Basket & Fresh Produce */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-2xl" />
                <div className="relative text-7xl sm:text-8xl select-none filter drop-shadow-md">
                  🧺
                </div>
                {/* Floating Produce icons */}
                <span className="absolute -top-2 left-6 text-3xl sm:text-4xl animate-pulse">
                  🥦
                </span>
                <span className="absolute top-2 right-4 text-3xl sm:text-4xl animate-bounce delay-150">
                  🍎
                </span>
                <span className="absolute bottom-4 -left-2 text-3xl sm:text-4xl animate-pulse delay-300">
                  🥕
                </span>
                <span className="absolute -bottom-2 right-6 text-3xl sm:text-4xl animate-bounce delay-75">
                  🌽
                </span>
              </div>

              <div className="mt-4 px-4 py-2 bg-white/90 backdrop-blur-xs rounded-xl border border-emerald-100 shadow-xs">
                <p className="text-xs sm:text-sm font-semibold text-emerald-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  আজকের তাজা বাজারদর সরাসরি আপডেট
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

