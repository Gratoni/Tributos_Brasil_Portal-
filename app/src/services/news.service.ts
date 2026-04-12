/**
 * NewsService — abstrai a fonte de dados (CMS ou mock local).
 *
 * Quando VITE_NEWS_API_URL estiver configurado, consome a API remota.
 * Caso contrário (ou em caso de falha), faz fallback automático para
 * os dados mock em /data/mockData.ts.
 *
 * Integração com CMS suportada:
 * - Strapi v5 (recomendado)
 * - Backends REST compatíveis com os endpoints usados
 */

import { api } from './api'
import { strapi } from './strapi.adapter'
import * as mock from '@/data/mockData'
import type { NewsArticle, Category, Author, Tag } from '@/types'

const CMS_ACTIVE = Boolean(import.meta.env.VITE_NEWS_API_URL)
const CMS_PROVIDER = (import.meta.env.VITE_NEWS_CMS_PROVIDER ?? 'generic').toLowerCase()
const USE_STRAPI = CMS_ACTIVE && CMS_PROVIDER === 'strapi'

export const NewsService = {
  /** Todos os artigos publicados, ordenados por data */
  async getPublished(limit?: number): Promise<NewsArticle[]> {
    if (!CMS_ACTIVE) {
      const all = mock.getPublishedNews()
      return limit ? all.slice(0, limit) : all
    }

    if (USE_STRAPI) {
      try {
        return await strapi.getPublished(limit)
      } catch {
        const all = mock.getPublishedNews()
        return limit ? all.slice(0, limit) : all
      }
    }

    try {
      const data = await api.get<NewsArticle[]>(
        `/articles?status=published&sort=publishedAt:desc${limit ? `&limit=${limit}` : ''}`,
      )
      return data
    } catch {
      const all = mock.getPublishedNews()
      return limit ? all.slice(0, limit) : all
    }
  },

  /** Artigos em destaque (isFeatured) */
  async getFeatured(): Promise<NewsArticle[]> {
    if (!CMS_ACTIVE) return mock.getFeaturedNews()
    if (USE_STRAPI) {
      try {
        return await strapi.getFeatured()
      } catch {
        return mock.getFeaturedNews()
      }
    }

    try {
      return await api.get<NewsArticle[]>('/articles?featured=true&sort=publishedAt:desc')
    } catch {
      return mock.getFeaturedNews()
    }
  },

  /** Artigo por slug */
  async getBySlug(slug: string): Promise<NewsArticle | null> {
    if (!CMS_ACTIVE) return mock.getNewsBySlug(slug) ?? null
    if (USE_STRAPI) {
      try {
        return await strapi.getBySlug(slug)
      } catch {
        return mock.getNewsBySlug(slug) ?? null
      }
    }

    try {
      return await api.get<NewsArticle>(`/articles/${slug}`)
    } catch {
      return mock.getNewsBySlug(slug) ?? null
    }
  },

  /** Artigos por categoria */
  async getByCategory(categorySlug: string, limit?: number): Promise<NewsArticle[]> {
    if (!CMS_ACTIVE) {
      const all = mock.getNewsByCategory(categorySlug)
      return limit ? all.slice(0, limit) : all
    }
    if (USE_STRAPI) {
      try {
        return await strapi.getByCategory(categorySlug, limit)
      } catch {
        return mock.getNewsByCategory(categorySlug).slice(0, limit)
      }
    }

    try {
      return await api.get<NewsArticle[]>(
        `/articles?category=${categorySlug}${limit ? `&limit=${limit}` : ''}`,
      )
    } catch {
      return mock.getNewsByCategory(categorySlug).slice(0, limit)
    }
  },

  /** Artigos por tag */
  async getByTag(tagSlug: string): Promise<NewsArticle[]> {
    if (!CMS_ACTIVE) return mock.getNewsByTag(tagSlug)
    if (USE_STRAPI) {
      try {
        return await strapi.getByTag(tagSlug)
      } catch {
        return mock.getNewsByTag(tagSlug)
      }
    }

    try {
      return await api.get<NewsArticle[]>(`/articles?tag=${tagSlug}`)
    } catch {
      return mock.getNewsByTag(tagSlug)
    }
  },

  /** Mais lidas */
  async getMostRead(limit = 5): Promise<NewsArticle[]> {
    if (!CMS_ACTIVE) return mock.getMostReadNews().slice(0, limit)
    if (USE_STRAPI) {
      try {
        return await strapi.getMostRead(limit)
      } catch {
        return mock.getMostReadNews().slice(0, limit)
      }
    }

    try {
      return await api.get<NewsArticle[]>(`/articles?sort=views:desc&limit=${limit}`)
    } catch {
      return mock.getMostReadNews().slice(0, limit)
    }
  },

  /** Artigos relacionados */
  async getRelated(article: NewsArticle, limit = 3): Promise<NewsArticle[]> {
    if (!CMS_ACTIVE) return mock.getRelatedNews(article, limit)
    if (USE_STRAPI) {
      try {
        return await strapi.getRelated(article, limit)
      } catch {
        return mock.getRelatedNews(article, limit)
      }
    }

    try {
      return await api.get<NewsArticle[]>(
        `/articles?category=${article.category.slug}&exclude=${article.id}&limit=${limit}`,
      )
    } catch {
      return mock.getRelatedNews(article, limit)
    }
  },

  /** Busca textual */
  async search(query: string): Promise<NewsArticle[]> {
    if (!CMS_ACTIVE) return mock.searchNews(query)
    if (USE_STRAPI) {
      try {
        return await strapi.search(query)
      } catch {
        return mock.searchNews(query)
      }
    }

    try {
      return await api.get<NewsArticle[]>(`/articles/search?q=${encodeURIComponent(query)}`)
    } catch {
      return mock.searchNews(query)
    }
  },

  /** Últimas notícias */
  async getLatest(limit = 6): Promise<NewsArticle[]> {
    if (!CMS_ACTIVE) return mock.getLatestNews(limit)
    if (USE_STRAPI) {
      try {
        return await strapi.getLatest(limit)
      } catch {
        return mock.getLatestNews(limit)
      }
    }

    try {
      return await api.get<NewsArticle[]>(`/articles?sort=publishedAt:desc&limit=${limit}`)
    } catch {
      return mock.getLatestNews(limit)
    }
  },

  /** Todas as categorias */
  async getCategories(): Promise<Category[]> {
    if (!CMS_ACTIVE) return mock.categories
    if (USE_STRAPI) {
      try {
        return await strapi.getCategories()
      } catch {
        return mock.categories
      }
    }

    try {
      return await api.get<Category[]>('/categories')
    } catch {
      return mock.categories
    }
  },

  /** Todos os autores */
  async getAuthors(): Promise<Author[]> {
    if (!CMS_ACTIVE) return mock.authors
    if (USE_STRAPI) {
      try {
        return await strapi.getAuthors()
      } catch {
        return mock.authors
      }
    }

    try {
      return await api.get<Author[]>('/authors')
    } catch {
      return mock.authors
    }
  },

  /** Todas as tags */
  async getTags(): Promise<Tag[]> {
    if (!CMS_ACTIVE) return mock.tags
    if (USE_STRAPI) {
      try {
        return await strapi.getTags()
      } catch {
        return mock.tags
      }
    }

    try {
      return await api.get<Tag[]>('/tags')
    } catch {
      return mock.tags
    }
  },
}
