"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatBnPrice, formatUnitShort, toBnNum } from "@/lib/bangla";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate items to ensure smooth infinite loop
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-white/80 backdrop-blur-xs border-y border-emerald-100/80 overflow-hidden py-2 text-xs select-none">
      <div className="flex animate-ticker whitespace-nowrap">
        {tickerItems.map((item, index) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";

          return (
            <Link
              key={`${item.id}-${index}`}
              href={`/product/${item.slug}`}
              className="inline-flex items-center gap-2 mx-5 hover:text-emerald-700 transition-colors group cursor-pointer"
            >
              <span className="text-base">{item.image || item.categoryIcon}</span>
              <span className="font-medium text-gray-800 group-hover:text-emerald-700">
                {toBnNum(item.nameBn)}
              </span>
              <span className="text-gray-600 font-semibold">
                {formatBnPrice(item.today)} টাকা/{toBnNum(formatUnitShort(item.unit))}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-medium ${
                  isUp
                    ? "bg-emerald-50 text-emerald-700"
                    : isDown
                    ? "bg-rose-50 text-rose-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {toBnNum(Math.abs(item.change?.pct || 0))}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

