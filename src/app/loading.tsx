export default function HomeLoading() {
  return (
    <main
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
      className="min-h-screen animate-pulse bg-[#f7faf7]"
    >
      <div className="h-16 border-b border-emerald-100 bg-white" />
      <div className="h-10 border-b border-emerald-100 bg-white" />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-64 rounded-3xl bg-emerald-100/70 sm:h-80" />
        {[0, 1].map((section) => (
          <section key={section} className="space-y-5">
            <div className="h-8 w-56 rounded-lg bg-gray-200" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((card) => (
                <div key={card} className="h-52 rounded-2xl border border-gray-200 bg-white" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
