import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatBnPrice, formatUnit, toBnNum } from "@/lib/bangla";
import {
  ArrowLeft,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  // Compute market-based statistics
  const stats = (() => {
    if (!product.markets || product.markets.length === 0) {
      return {
        minPrice: product.today,
        maxPrice: product.today,
        avgPrice: product.today,
      };
    }

    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    let count = 0;

    product.markets.forEach((m) => {
      if (m.min < min) min = m.min;
      if (m.max > max) max = m.max;
      sum += (m.min + m.max) / 2;
      count += 1;
    });

    return {
      minPrice: min === Infinity ? product.today : min,
      maxPrice: max === -Infinity ? product.today : max,
      avgPrice: count > 0 ? Math.round(sum / count) : product.today,
    };
  })();

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link
          href="/"
          className="hover:text-emerald-700 transition-colors flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700 transition-colors font-medium"
        >
          {toBnNum(product.categoryNameBn)}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-semibold truncate">
          {toBnNum(product.nameBn)}
        </span>
      </nav>

      {/* Top — Summary Card */}
      <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex min-w-0 items-start gap-3 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl sm:text-4xl shadow-xs shrink-0">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {toBnNum(product.categoryNameBn)}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                  {toBnNum(formatUnit(product.unit))}
                </span>
              </div>
              <h1 className="break-words text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                {toBnNum(product.nameBn)}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
                আজকের সামগ্রিক বাজার বিশ্লেষণ, দেশের প্রধান বাজারসমূহের সর্বনিম্ন
                ও সর্বোচ্চ মূল্যের তুলনা।
              </p>
            </div>
          </div>

          {/* Current Today's Average Price & Change badge */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 sm:p-5 text-left sm:text-right shrink-0">
            <span className="block text-xs text-gray-500 font-medium">
              আজকের জাতীয় গড় দর
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 my-1">
              {formatBnPrice(product.today)}{" "}
              <span className="text-sm font-bold text-gray-600">টাকা</span>
            </div>
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                isUp
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : isDown
                  ? "bg-rose-100 text-rose-800 border-rose-300"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
              <span>
                {isUp ? "দাম বেড়েছে" : isDown ? "দাম কমেছে" : "অপরিবর্তিত"}{" "}
                {toBnNum(Math.abs(product.change?.pct || 0))}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary — 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Minimum Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="block text-xs font-semibold text-gray-400 mb-1">
              সর্বনিম্ন দাম
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              {formatBnPrice(stats.minPrice)}{" "}
              <span className="text-xs font-bold text-gray-500">টাকা</span>
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
                {toBnNum(formatUnit(product.unit))}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        {/* Average Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="block text-xs font-semibold text-gray-400 mb-1">
              গড় দাম
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">
              {formatBnPrice(stats.avgPrice)}{" "}
              <span className="text-xs font-bold text-gray-500">টাকা</span>
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {toBnNum(formatUnit(product.unit))}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Store className="w-6 h-6" />
          </div>
        </div>

        {/* Maximum Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="block text-xs font-semibold text-gray-400 mb-1">
              সর্বোচ্চ দাম
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-700">
              {formatBnPrice(stats.maxPrice)}{" "}
              <span className="text-xs font-bold text-gray-500">টাকা</span>
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {toBnNum(formatUnit(product.unit))}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market-wise Today's Price Table) */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-700" />
              <span>বাজারভিত্তিক আজকের দাম</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              দেশের বিভিন্ন বিভাগ ও পাইকারি/খুচরা বাজারের মূল্যের বিস্তারিত তথ্য
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 self-start sm:self-auto">
              {new Intl.NumberFormat("bn-BD", { useGrouping: false }).format(
                product.markets?.length || 0
              )}টি বাজার অন্তর্ভুক্ত
          </span>
        </div>

        <p className="px-4 pt-3 text-[11px] text-gray-500 sm:hidden">
          বাজারের সব তথ্য দেখতে টেবিলটি আড়াআড়ি স্ক্রল করুন
        </p>
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[620px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                <th className="py-3.5 px-4 sm:px-6">মার্কেট</th>
                <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">সর্বনিম্ন দাম</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">সর্বোচ্চ দাম</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">গড় দাম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {product.markets && product.markets.length > 0 ? (
                product.markets.map((m, idx) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={`${m.market}-${idx}`}
                      className="hover:bg-emerald-50/30 transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">
                        <span className="inline-flex items-center gap-2">
                          <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{toBnNum(m.market)}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {toBnNum(m.division)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-emerald-700">
                        {formatBnPrice(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-rose-700">
                        {formatBnPrice(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-gray-900">
                        {formatBnPrice(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-gray-400 text-sm"
                  >
                    কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

