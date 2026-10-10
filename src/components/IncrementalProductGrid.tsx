"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

interface IncrementalProductGridProps {
  products: Product[];
  initialCount?: number;
  batchSize?: number;
  gridClassName?: string;
}

export default function IncrementalProductGrid({
  products,
  initialCount = 8,
  batchSize = 8,
  gridClassName = "grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4",
}: IncrementalProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(initialCount, products.length)
  );
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const hasMore = visibleCount < products.length;

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => Math.min(count + batchSize, products.length));
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [batchSize, hasMore, products.length, visibleCount]);

  return (
    <>
      <div className={`grid ${gridClassName}`}>
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div
          ref={loadMoreRef}
          role="status"
          aria-live="polite"
          className="flex min-h-12 items-center justify-center text-sm text-gray-500"
        >
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700" />
          আরও পণ্য লোড হচ্ছে…
        </div>
      )}
    </>
  );
}
