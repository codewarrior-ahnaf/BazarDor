"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Category, Product, SortOption } from "@/types";
import IncrementalProductGrid from "@/components/IncrementalProductGrid";
import { toBnNum } from "@/lib/bangla";
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
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "price-asc", label: "দাম: কম থেকে বেশি" },
    { value: "price-desc", label: "দাম: বেশি থেকে কম" },
  ];

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
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl sm:text-4xl shadow-xs">
            {category.icon}
          </div>
          <div className="min-w-0">
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
                {toBnNum(category.nameBn)}
              </span>
            </div>
            <h1 className="flex flex-wrap items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              <span>{toBnNum(category.nameBn)}</span>
              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                {toBnNum(sortedProducts.length)}টি পণ্য
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {toBnNum(category.nameBn)} ক্যাটাগরির আজকের বাজার মূল্য এবং পরিবর্তন
            </p>
          </div>
        </div>

        {/* Challenge C1: Sort dropdown with Chevron icon */}
        <div className="flex max-w-full flex-wrap items-center gap-2.5 rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-2 self-stretch sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
            সাজান:
          </span>
          <div
            className="relative min-w-0 flex-1 sm:flex-none"
            ref={sortMenuRef}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget;
              if (!(nextTarget instanceof Node) || !sortMenuRef.current?.contains(nextTarget)) {
                setSortMenuOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setSortMenuOpen(false);
                sortMenuRef.current
                  ?.querySelector<HTMLButtonElement>('button[aria-haspopup="menu"]')
                  ?.focus();
                return;
              }
              if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
                const items = sortMenuRef.current?.querySelectorAll<HTMLButtonElement>(
                  '[role="menuitemradio"]'
                );
                if (!items?.length) return;
                event.preventDefault();
                const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLButtonElement);
                const nextIndex = event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? items.length - 1
                    : (currentIndex + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
                items[nextIndex].focus();
              }
            }}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={sortMenuOpen}
              onClick={() => setSortMenuOpen((open) => !open)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-white py-2 pl-3 pr-3 text-left text-xs font-semibold text-gray-800 shadow-xs transition-colors hover:border-emerald-400 hover:bg-emerald-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:min-w-40 sm:text-sm"
            >
              <span>{sortOptions.find((option) => option.value === sortBy)?.label}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-emerald-700 transition-transform ${sortMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sortMenuOpen && (
              <div
                role="menu"
                aria-label="পণ্য সাজানোর পদ্ধতি"
                className="absolute right-0 top-full z-20 mt-2 w-full min-w-48 overflow-hidden rounded-2xl border border-emerald-100 bg-white p-1.5 shadow-xl shadow-emerald-950/10 ring-1 ring-black/5 sm:w-56"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={sortBy === option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortMenuOpen(false);
                      sortMenuRef.current
                        ?.querySelector<HTMLButtonElement>('button[aria-haspopup="menu"]')
                        ?.focus();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors sm:text-sm ${
                      sortBy === option.value
                        ? "bg-emerald-700 text-white"
                        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {option.label}
                    {sortBy === option.value && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
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
        <IncrementalProductGrid products={sortedProducts} />
      )}
    </div>
  );
}

