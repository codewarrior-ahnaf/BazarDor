import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs animate-pulse">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gray-200" />
        <div className="w-12 h-5 rounded-md bg-gray-100" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/3 bg-gray-100 rounded" />
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
        <div className="space-y-1">
          <div className="h-3 w-14 bg-gray-100 rounded" />
          <div className="h-6 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-14 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

