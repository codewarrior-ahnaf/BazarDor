"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Category, Product, SortOption } from "@/types";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, ArrowUpDown, ChevronDown, ShoppingBag } from "lucide-react";

interface CategoryClientProps {
  category: Category;
  initialProducts: Product[];
}

export default function CategoryClient({
  category,
  initialProducts,
}: CategoryClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Sort by numeric price value (Challenge C1)
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  }, [initialProducts, sortBy]);

  return (
    <div className="space-y-8">
      {/* Category Header & Sort Controls */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl sm:text-4xl shadow-xs">
            {category.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/"
                className="text-xs text-gray-500 hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                হোম
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-xs font-medium text-emerald-800">
                {category.nameBn}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <span>{category.nameBn}</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {sortedProducts.length}টি পণ্য
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {category.nameBn} ক্যাটাগরির আজকের বাজার মূল্য এবং পরিবর্তন
            </p>
          </div>
        </div>

        {/* Challenge C1: Sort dropdown with Chevron icon */}
        <div className="flex items-center gap-2.5 bg-gray-50/80 px-4 py-2 rounded-2xl border border-gray-200 self-start sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <label
            htmlFor="sort-select"
            className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
          >
            সাজান:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white text-gray-800 font-medium text-xs sm:text-sm py-1.5 pl-3 pr-8 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-xs"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center text-2xl">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            অন্য কোনো ক্যাটাগরি দেখতে পারেন অথবা মূল পাতায় ফিরে যান।
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
