import React from "react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function LoadingCategory() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-200" />
          <div className="space-y-2">
            <div className="h-6 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-52 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="h-10 w-32 bg-gray-100 rounded-2xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
