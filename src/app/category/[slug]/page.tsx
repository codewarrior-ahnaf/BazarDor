import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryClient from "./CategoryClient";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/api";
import { hasAuthSessionCookie } from "@/lib/server-auth-state";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, category, allProducts, categoryProducts, initialAuthenticated] = await Promise.all([
    getCategories(),
    getCategoryBySlug(slug),
    getProducts(),
    getProducts(slug),
    hasAuthSessionCookie(),
  ]);

  if (!category) notFound();

  const products = categoryProducts;

  return (
    <div className="flex flex-col min-h-screen bg-[#f7faf7]">
      <Navbar categories={categories} tickerProducts={allProducts} initialAuthenticated={initialAuthenticated} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <CategoryClient category={category} initialProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
