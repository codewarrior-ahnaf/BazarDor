import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-transparent py-10 sm:py-16 border-b border-emerald-100/60"
    >
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
              সঠিক সিদ্ধান্ত নিতে প্রতিদিনের নির্ভরযোগ্য বাজার মূল্যের আপডেট
              পান। বিভিন্ন পাইকারি ও খুচরা বাজারের দাম তুলনা করুন এক নিমিষেই।
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
            <div className="relative flex w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-amber-50/50 p-4 text-center shadow-sm sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-emerald-100/60 blur-3xl" />
              <Image
                src="/bazar-illustration.svg"
                alt="তাজা শাকসবজিতে ভরা বাজারের ঝুড়ি"
                width={560}
                height={380}
                priority
                className="relative h-auto w-full max-w-105"
              />

              <div className="relative -mt-1 rounded-xl border border-emerald-100 bg-white/90 px-4 py-2 shadow-xs backdrop-blur-xs sm:-mt-2">
                <p className="text-xs sm:text-sm font-semibold text-emerald-800 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  নিত্যপণ্যের বাজারদর এক নজরে
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

