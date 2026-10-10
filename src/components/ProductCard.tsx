import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatBnPrice, formatUnit, toBnNum } from "@/lib/bangla";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = Math.abs(product.change?.pct || 0);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block min-w-0 bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/80 hover:shadow-md sm:p-5"
    >
      {/* Top Header: Emoji + Category Tag */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        <span className="inline-flex max-w-[55%] truncate items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100">
          {product.categoryNameBn || "পণ্য"}
        </span>
      </div>

      {/* Product Name & Unit */}
      <div className="space-y-1 mb-4">
        <h3 className="break-words font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-base sm:text-lg line-clamp-2">
          {product.nameBn}
        </h3>
        <p className="text-xs text-gray-500 font-medium">
          {formatUnit(product.unit)}
        </p>
      </div>

      {/* Price Row: label আজকের দাম + value + change badge */}
      <div className="pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
        <div>
          <span className="block text-[11px] text-gray-400 font-medium leading-none mb-1">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
            {formatBnPrice(product.today)}{" "}
            <span className="text-xs font-semibold text-gray-600">টাকা</span>
          </span>
        </div>

        {/* Change Badge */}
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
            isUp
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : isDown
              ? "bg-rose-50 text-rose-700 border-rose-200"
              : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{toBnNum(pct.toFixed(1))}%</span>
        </div>
      </div>
    </Link>
  );
}

