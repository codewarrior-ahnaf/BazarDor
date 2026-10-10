import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function HomeLoading() {
  return (
    <main
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
      className="min-h-screen animate-pulse bg-[#f7faf7]"
    >
      <div className="border-b border-emerald-100 bg-white px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="h-8 w-36 rounded-lg bg-emerald-100" />
          <div className="hidden h-8 w-56 rounded-lg bg-gray-100 sm:block" />
          <div className="h-8 w-20 rounded-lg bg-gray-100" />
        </div>
      </div>
      <div className="h-11 border-b border-emerald-100 bg-white" />
      <div className="h-9 border-b border-emerald-100 bg-emerald-50/50" />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid min-h-64 items-center gap-8 rounded-3xl bg-emerald-100/60 p-6 sm:min-h-80 sm:grid-cols-2 sm:p-10">
          <div className="space-y-4">
            <div className="h-4 w-32 rounded bg-emerald-200" />
            <div className="h-9 w-4/5 rounded-lg bg-emerald-200 sm:h-12" />
            <div className="h-4 w-full max-w-sm rounded bg-emerald-100" />
            <div className="h-11 w-36 rounded-xl bg-emerald-300" />
          </div>
          <div className="hidden h-52 rounded-2xl bg-white/60 sm:block" />
        </div>

        {[0, 1].map((section) => (
          <section key={section} className="space-y-5">
            <div className="space-y-2 border-b border-gray-200 pb-4">
              <div className="h-7 w-56 rounded-lg bg-gray-200" />
              <div className="h-4 w-72 max-w-full rounded bg-gray-100" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, card) => (
                <ProductCardSkeleton key={card} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
