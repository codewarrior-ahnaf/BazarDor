"use client";

import Link from "next/link";

export default function AppError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f7faf7] px-4 py-12">
      <section className="w-full max-w-md space-y-5 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
          🛒
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">এই মুহূর্তে তথ্য দেখানো যাচ্ছে না</h1>
          <p className="text-sm leading-6 text-gray-600">
            সাময়িক সংযোগ সমস্যার কারণে অনুরোধটি সম্পন্ন হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
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
            হোম পেজে ফিরুন
          </Link>
        </div>
      </section>
    </main>
  );
}
