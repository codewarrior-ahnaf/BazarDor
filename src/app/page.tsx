import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/api";
import { TrendingUp, TrendingDown, LayoutGrid } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  // Section A: Top 6 Risers (দাম বেড়েছে)
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Section B: Top 6 Fallers (দাম কমেছে)
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7faf7]">
      <Navbar categories={categories} tickerProducts={products} />

      <main className="flex-1">
        <ScrollProgress />
        {/* Hero Section */}
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
          {/* Section A — আজ দাম বেড়েছে ▲ */}
          {risers.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-emerald-100/80 text-emerald-700">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                      <span>আজ দাম বেড়েছে</span>
                      <span className="text-emerald-600">▲</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      গতকালের তুলনায় আজকের ঊর্ধ্বমুখী মূল্যের শীর্ষ পণ্যসমূহ
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
                {risers.map((product) => (
                  <ProductCard key={`riser-${product.id}`} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Section B — আজ দাম কমেছে ▼ */}
          {fallers.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-rose-100">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-rose-100/80 text-rose-700">
                    <TrendingDown className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                      <span>আজ দাম কমেছে</span>
                      <span className="text-rose-600">▼</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      গতকালের তুলনায় আজকের নিম্নমুখী মূল্যের শীর্ষ পণ্যসমূহ
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
                {fallers.map((product) => (
                  <ProductCard key={`faller-${product.id}`} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Section C — সব পণ্য with subtitle */}
          <section id="সব-পণ্য" className="space-y-6 pt-4 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-gray-100 text-gray-700">
                  <LayoutGrid className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    সব পণ্য
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    আজকের বাজারের সকল নিত্যপণ্যের বিস্তারিত হালনাগাদ দর তালিকা
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                মোট {products.length}টি পণ্য
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={`product-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
