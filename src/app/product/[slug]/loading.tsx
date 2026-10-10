import React from "react";

export default function LoadingProduct() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded" />
      <div className="bg-white rounded-3xl p-8 border border-gray-200 space-y-4">
        <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-96 bg-gray-100 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-white rounded-2xl border border-gray-200" />
        <div className="h-32 bg-white rounded-2xl border border-gray-200" />
        <div className="h-32 bg-white rounded-2xl border border-gray-200" />
      </div>
      <div className="h-64 bg-white rounded-3xl border border-gray-200" />
    </div>
  );
}
