import { Category, Product } from "@/types";

const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchFromEndpoints<T>(endpoint: string): Promise<T> {
  const failures: string[] = [];

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        failures.push(`${baseUrl}: HTTP ${response.status}`);
        continue;
      }

      return (await response.json()) as T;
    } catch (error) {
      failures.push(`${baseUrl}: ${error instanceof Error ? error.message : "request failed"}`);
    }
  }

  throw new Error(`All BazarDor APIs failed for ${endpoint}. ${failures.join("; ")}`);
}

export async function getCategories(): Promise<Category[]> {
  const categories = await fetchFromEndpoints<Category[]>("/categories");
  if (!Array.isArray(categories)) throw new Error("Invalid categories API response");
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = await fetchFromEndpoints<Category>(`/categories/${encodeURIComponent(slug)}`);
  return category && typeof category === "object" ? category : null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const products = await fetchFromEndpoints<Product[]>(`/products${query}`);
  if (!Array.isArray(products)) throw new Error("Invalid products API response");
  return products;
}

export async function getProductBySlugOrId(
  slugOrId: string | number
): Promise<Product | null> {
  const value = String(slugOrId);
  if (/^\d+$/.test(value)) {
    const product = await fetchFromEndpoints<Product>(`/products/${encodeURIComponent(value)}`);
    return product && typeof product === "object" ? product : null;
  }

  const products = await getProducts();
  return products.find((product) => product.slug === value) ?? null;
}
