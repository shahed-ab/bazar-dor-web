import { Category, Product } from '@/types';

const BASE_URL_1 = 'https://api.api-store.workers.dev/api/bazardor';
const BASE_URL_2 = 'https://api.abcz.workers.dev/api/bazardor';


async function fetchWithFallback<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    const res = await fetch(`${BASE_URL_1}${cleanEndpoint}`, {
      ...init,
      next: { revalidate: 60, ...init?.next },
    });
    if (res.ok) {
      return (await res.json()) as T;
    }
  } catch {
  }

  try {
    const res = await fetch(`${BASE_URL_2}${cleanEndpoint}`, {
      ...init,
      next: { revalidate: 60, ...init?.next },
    });
    if (res.ok) {
      return (await res.json()) as T;
    }
    throw new Error(`API status ${res.status}`);
  } catch (fallbackErr) {
    throw fallbackErr;
  }
}


export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchWithFallback<Category[]>('/categories');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}


export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await fetchWithFallback<Category>(`/categories/${encodeURIComponent(slug)}`);
    if (data && data.slug) return data;
  } catch {
    try {
      const all = await getCategories();
      const found = all.find((c) => c.slug === slug || c.id === slug);
      if (found) return found;
    } catch {
    }
  }
  return null;
}


export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const endpoint = categorySlug
      ? `/products?category=${encodeURIComponent(categorySlug)}`
      : '/products';
    const data = await fetchWithFallback<Product[]>(endpoint);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}


export async function getProduct(slugOrId: string | number): Promise<Product | null> {
  const isNumeric = typeof slugOrId === 'number' || /^\d+$/.test(String(slugOrId));

  if (isNumeric) {
    try {
      const item = await fetchWithFallback<Product>(`/products/${slugOrId}`);
      if (item && item.id) return item;
    } catch {
    }
  } else {
    try {
      const res = await fetchWithFallback<Product[]>(`/products?slug=${encodeURIComponent(String(slugOrId))}`);
      if (Array.isArray(res) && res.length > 0 && res[0].id) {
        return res[0];
      }
    } catch {
    }
  }

  try {
    const all = await getProducts();
    const strQuery = String(slugOrId).toLowerCase();
    const found = all.find(
      (p) =>
        String(p.id) === strQuery ||
        p.slug.toLowerCase() === strQuery
    );
    if (found) return found;
  } catch {
  }

  return null;
}
