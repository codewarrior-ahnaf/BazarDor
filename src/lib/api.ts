import { Category, Product } from "@/types";

const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

async function fetchFromMainApi<T>(endpoint: string): Promise<T | null> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, { cache: "no-store" });
  } catch {
    throw new Error(`Could not reach the BazarDor API: ${endpoint}`);
  }

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`BazarDor API returned HTTP ${response.status}: ${endpoint}`);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error(`BazarDor API returned invalid JSON: ${endpoint}`);
  }
}

export async function getCategories(): Promise<Category[]> {
  const categories = await fetchFromMainApi<Category[]>("/categories");
  if (!Array.isArray(categories)) throw new Error("Invalid categories API response");
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = await fetchFromMainApi<Category>(
    `/categories/${encodeURIComponent(slug)}`
  );
  return category && typeof category === "object" ? category : null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const products = await fetchFromMainApi<Product[]>(`/products${query}`);
  if (!Array.isArray(products)) throw new Error("Invalid products API response");
  return products;
}

export async function getProductBySlugOrId(
  slugOrId: string | number
): Promise<Product | null> {
  const value = String(slugOrId);
  if (/^\d+$/.test(value)) {
    const product = await fetchFromMainApi<Product>(
      `/products/${encodeURIComponent(value)}`
    );
    return product && typeof product === "object" ? product : null;
  }

  const products = await getProducts();
  return products.find((product) => product.slug === value) ?? null;
}
