"use client";

import Link from "next/link";

export default function ProductError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f7faf7] px-4 py-12">
      <section
        role="alert"
        className="w-full max-w-md space-y-5 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xs"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-3xl">
          🧺
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            পণ্যের তথ্য এখন লোড করা যাচ্ছে না
          </h1>
          <p className="text-sm leading-6 text-gray-600">
            সাময়িক সংযোগ সমস্যার কারণে এই পণ্যের বিস্তারিত দেখানো যাচ্ছে না। আবার চেষ্টা করুন, অথবা বাজারদরের তালিকায় ফিরে যান।
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            আবার চেষ্টা করুন
          </button>
          <Link
            href="/"
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            বাজারদরে ফিরুন
          </Link>
        </div>
      </section>
    </main>
  );
}
