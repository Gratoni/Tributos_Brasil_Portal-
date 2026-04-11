/**
 * Hooks React para consumo do NewsService.
 * Encapsulam loading/error/refetch para uso direto nos componentes.
 */

import { useCallback, useEffect, useState } from 'react';
import { NewsService } from '@/services/news.service';
import type { NewsArticle, Category } from '@/types';

/* ──────────────────────────────────────────────────────
   Tipo genérico de estado de recurso
────────────────────────────────────────────────────── */
interface Resource<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useResource<T>(initial: T, fetcher: () => Promise<T>): Resource<T> {
  const [data, setData]       = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await fetcher());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [fetcher]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

/* ──────────────────────────────────────────────────────
   Hooks públicos
────────────────────────────────────────────────────── */

/** Últimas notícias publicadas */
export function useLatestNews(limit?: number) {
  const fetcher = useCallback(() => NewsService.getPublished(limit), [limit]);
  return useResource<NewsArticle[]>([], fetcher);
}

/** Notícias em destaque */
export function useFeaturedNews() {
  const fetcher = useCallback(() => NewsService.getFeatured(), []);
  return useResource<NewsArticle[]>([], fetcher);
}

/** Mais lidas */
export function useMostReadNews(limit = 5) {
  const fetcher = useCallback(() => NewsService.getMostRead(limit), [limit]);
  return useResource<NewsArticle[]>([], fetcher);
}

/** Artigo único por slug */
export function useArticleBySlug(slug: string) {
  const fetcher = useCallback(() => NewsService.getBySlug(slug), [slug]);
  return useResource<NewsArticle | null>(null, fetcher);
}

/** Artigos de uma categoria */
export function useNewsByCategory(categorySlug: string, limit?: number) {
  const fetcher = useCallback(
    () => NewsService.getByCategory(categorySlug, limit),
    [categorySlug, limit],
  );
  return useResource<NewsArticle[]>([], fetcher);
}

/** Resultado de busca textual */
export function useNewsSearch(query: string) {
  const fetcher = useCallback(() => NewsService.search(query), [query]);
  return useResource<NewsArticle[]>([], fetcher);
}

/** Todas as categorias */
export function useCategories() {
  const fetcher = useCallback(() => NewsService.getCategories(), []);
  return useResource<Category[]>([], fetcher);
}
