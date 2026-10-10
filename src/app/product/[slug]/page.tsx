import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsClient from "./ProductDetailsClient";
import { getCategories, getProductBySlugOrId, getProducts } from "@/lib/api";
import { AlertCircle } from "lucide-react";

export const revalidate = 60;
export const dynamicParams = true;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  const paths: { slug: string }[] = [];
  products.forEach((p) => {
    if (p.slug) paths.push({ slug: p.slug });
    if (p.id) paths.push({ slug: String(p.id) });
  });
  return paths;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [categories, product, allProducts] = await Promise.all([
    getCategories(),
    getProductBySlugOrId(slug),
    getProducts(),
  ]);

  // If product not found
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f7faf7]">
        <Navbar categories={categories} tickerProducts={allProducts} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center max-w-md w-full shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              পণ্যটি পাওয়া যায়নি
            </h1>
            <p className="text-sm text-gray-500">
              অনুরোধকৃত &quot;{slug}&quot; পণ্যটি আমাদের তালিকাভুক্ত নয় বা সরানো হয়েছে।
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

  return (
    <div className="flex flex-col min-h-screen bg-[#f7faf7]">
      <Navbar categories={categories} tickerProducts={allProducts} />
      <main className="flex-1">
        <ProductDetailsClient product={product} />
      </main>
      <Footer />
    </div>
  );
}
