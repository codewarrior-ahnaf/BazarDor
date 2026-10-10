import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryClient from "./CategoryClient";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/api";
import { AlertCircle } from "lucide-react";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, category, allProducts] = await Promise.all([
    getCategories(),
    getCategoryBySlug(slug),
    getProducts(),
  ]);

  // If category does not exist, show friendly 404 state
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f7faf7]">
        <Navbar categories={categories} tickerProducts={allProducts} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center max-w-md w-full shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              ক্যাটাগরি পাওয়া যায়নি
            </h1>
            <p className="text-sm text-gray-500">
              অনুরোধকৃত &quot;{slug}&quot; ক্যাটাগরিটি আমাদের তালিকায় নেই বা সরানো হয়েছে।
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-xs"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter products for this category
  const products = allProducts.filter(
    (p) =>
      p.category === category.slug ||
      p.category === category.id ||
      p.categoryNameBn === category.nameBn
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f7faf7]">
      <Navbar categories={categories} tickerProducts={allProducts} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <CategoryClient category={category} initialProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
