import { Category, Product, ApiOverview } from '@/types';

export const PRIMARY_API_URL = 'https://openapi.programming-hero.com/api/bazardor';


export const FALLBACK_API_URLS = [
  'https://api.abcz.workers.dev/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
];


export function getApiBaseUrls(): string[] {
  const customUrl =
    process.env.NEXT_PUBLIC_BAZARDOR_API_BASE_URL ||
    process.env.BAZARDOR_API_BASE_URL;

  const urls: string[] = [];

  if (customUrl && customUrl.trim()) {
    urls.push(customUrl.trim().replace(/\/+$/, ''));
  }

  urls.push(PRIMARY_API_URL);
  urls.push(...FALLBACK_API_URLS);

  return Array.from(new Set(urls));
}

const REQUEST_TIMEOUT_MS = 8000;


async function fetchWithFallback<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const cleanEndpoint = endpoint ? (endpoint.startsWith('/') ? endpoint : `/${endpoint}`) : '';
  const baseUrls = getApiBaseUrls();

  let lastError: unknown = null;

  for (let i = 0; i < baseUrls.length; i++) {
    const baseUrl = baseUrls[i];
    const fullUrl = `${baseUrl}${cleanEndpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const res = await fetch(fullUrl, {
        ...init,
        signal: init?.signal ?? controller.signal,
        next: { revalidate: 60, ...init?.next },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 429 || res.status >= 500) {
          lastError = new Error(`Endpoint ${baseUrl} returned HTTP ${res.status}`);
          continue;
        }

        if (i < baseUrls.length - 1) {
          lastError = new Error(`Endpoint ${baseUrl} status ${res.status}`);
          continue;
        }

        throw new Error(`API status ${res.status}`);
      }

      const json = await res.json();
      return json as T;
    } catch (err: unknown) {
      lastError = err;
      continue;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('All API endpoints failed');
}


export async function getApiOverview(): Promise<ApiOverview | null> {
  try {
    return await fetchWithFallback<ApiOverview>('');
  } catch {
    return null;
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
  if (!slug) return null;
  const cleanSlug = encodeURIComponent(slug.trim());

  try {
    const data = await fetchWithFallback<Category>(`/categories/${cleanSlug}`);
    if (data && (data.slug || data.id)) return data;
  } catch {
  }

  try {
    const res = await fetchWithFallback<Category[]>(`/categories?slug=${cleanSlug}`);
    if (Array.isArray(res) && res.length > 0 && (res[0].slug || res[0].id)) {
      return res[0];
    }
  } catch {
  }

  try {
    const all = await getCategories();
    const target = slug.toLowerCase().trim();
    const found = all.find(
      (c) => c.slug.toLowerCase() === target || c.id.toLowerCase() === target
    );
    if (found) return found;
  } catch {
  }

  return null;
}


export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const endpoint = categorySlug
      ? `/products?category=${encodeURIComponent(categorySlug.trim())}`
      : '/products';
    const data = await fetchWithFallback<Product[]>(endpoint);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch {
  }

  if (categorySlug) {
    try {
      const all = await fetchWithFallback<Product[]>('/products');
      if (Array.isArray(all)) {
        const target = categorySlug.toLowerCase().trim();
        return all.filter((p) => p.category?.toLowerCase() === target);
      }
    } catch {
      return [];
    }
  }

  return [];
}


export async function getProduct(slugOrId: string | number): Promise<Product | null> {
  if (!slugOrId) return null;
  const isNumeric = typeof slugOrId === 'number' || /^\d+$/.test(String(slugOrId).trim());

  if (isNumeric) {
    try {
      const item = await fetchWithFallback<Product>(`/products/${slugOrId}`);
      if (item && item.id) return item;
    } catch {
    }
  } else {
    try {
      const res = await fetchWithFallback<Product[]>(
        `/products?slug=${encodeURIComponent(String(slugOrId).trim())}`
      );
      if (Array.isArray(res) && res.length > 0 && res[0].id) {
        return res[0];
      }
    } catch {
    }
  }

  try {
    const all = await getProducts();
    const strQuery = String(slugOrId).toLowerCase().trim();
    const found = all.find(
      (p) =>
        String(p.id) === strQuery ||
        p.slug?.toLowerCase() === strQuery
    );
    if (found) return found;
  } catch {
  }

  return null;
}
