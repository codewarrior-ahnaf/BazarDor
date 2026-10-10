"use client";

export default function AppError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f7faf7] px-4 py-12">
      <section className="w-full max-w-md space-y-4 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xs">
        <h1 className="text-2xl font-bold text-gray-900">তথ্য লোড করা যায়নি</h1>
        <p className="text-sm leading-6 text-gray-600">
          বাজারদরের API-গুলো এখন সাড়া দিচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
        >
          আবার চেষ্টা করুন
        </button>
      </section>
    </main>
  );
}
