import { Category, Product } from "@/types";
import fallbackCategories from "@/data/categories.json";
import fallbackProducts from "@/data/products.json";

const MAIN_API_URL = "https://openapi.programming-hero.com/api/bazardor";
const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";
const API_BASE_URLS = [MAIN_API_URL, BASE_URL_1, BASE_URL_2];

async function fetchFromEndpoints<T>(endpoint: string): Promise<T | null> {
  for (const baseUrl of API_BASE_URLS) {
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch {
      // Try the next API base URL.
    }
  }

  return null;
}

export async function getCategories(): Promise<Category[]> {
  const remote = await fetchFromEndpoints<Category[]>("/categories");
  if (remote && Array.isArray(remote) && remote.length > 0) {
    return remote;
  }
  return fallbackCategories as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const remote = await fetchFromEndpoints<Category>(`/categories/${slug}`);
  if (remote && remote.slug) {
    return remote;
  }
  const match = (fallbackCategories as Category[]).find(
    (c) => c.slug === slug || c.id === slug
  );
  return match || null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const remote = await fetchFromEndpoints<Product[]>(`/products${query}`);
  if (remote && Array.isArray(remote) && remote.length > 0) {
    return remote;
  }

  const all = fallbackProducts as unknown as Product[];
  if (category) {
    return all.filter((p) => p.category === category);
  }
  return all;
}

export async function getProductBySlugOrId(
  slugOrId: string | number
): Promise<Product | null> {
  const isNumeric = !isNaN(Number(slugOrId));
  if (isNumeric) {
    const remote = await fetchFromEndpoints<Product>(`/products/${slugOrId}`);
    if (remote && remote.id) {
      return remote;
    }
  }

  // If slug or numeric lookup in all products
  const all = await getProducts();
  const found = all.find(
    (p) =>
      p.slug === String(slugOrId) ||
      String(p.id) === String(slugOrId)
  );

  return found || null;
}

