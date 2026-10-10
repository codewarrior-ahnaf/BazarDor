"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingMoreRef = useRef(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMore = visibleCount < products.length;

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || isLoadingMoreRef.current) return;

        isLoadingMoreRef.current = true;
        setIsLoadingMore(true);
        loadTimerRef.current = setTimeout(() => {
          setVisibleCount((count) => Math.min(count + batchSize, products.length));
          setIsLoadingMore(false);
          isLoadingMoreRef.current = false;
        }, 350);
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (loadTimerRef.current) clearTimeout(loadTimerRef.current);
    };
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
          aria-busy={isLoadingMore}
          className="pt-5"
        >
          {isLoadingMore ? (
            <>
              <span className="sr-only">আরও পণ্য লোড হচ্ছে</span>
              <div className={`grid ${gridClassName}`}>
                {Array.from({ length: Math.min(batchSize, products.length - visibleCount) }).map((_, index) => (
                  <ProductCardSkeleton key={`loading-${visibleCount}-${index}`} />
                ))}
              </div>
            </>
          ) : (
            <span className="block py-2 text-center text-xs text-gray-400">
              নিচে স্ক্রল করলে আরও পণ্য দেখানো হবে
            </span>
          )}
        </div>
      )}
    </>
  );
}
