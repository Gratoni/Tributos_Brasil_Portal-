import { api } from './api'
import type { Author, Category, NewsArticle, Tag } from '@/types'

type StrapiEntity<T = unknown> = {
    id?: number | string
    attributes?: T
}

type StrapiSingleRelation<T = unknown> = {
    data?: StrapiEntity<T> | null
}

type StrapiManyRelation<T = unknown> = {
    data?: StrapiEntity<T>[]
}

type StrapiCollectionResponse<T = unknown> = {
    data?: StrapiEntity<T>[]
}

const STRAPI_BASE_URL = import.meta.env.VITE_NEWS_API_URL ?? ''
const STRAPI_POPULATE = [
    'featuredImage',
    'category',
    'author',
    'tags',
]
    .map((field) => `populate[${field}]=*`)
    .join('&')

function toAbsoluteUrl(url?: string): string | undefined {
    if (!url) return undefined
    if (/^https?:\/\//i.test(url)) return url
    if (!STRAPI_BASE_URL) return url
    return new URL(url.replace(/^\/+/, ''), STRAPI_BASE_URL).toString()
}

function getSingleEntityData<T>(relation: StrapiSingleRelation<T> | undefined): StrapiEntity<T> | null {
    if (!relation || !relation.data) return null
    return relation.data as StrapiEntity<T>
}

function getManyEntityData<T>(relation: StrapiManyRelation<T> | undefined): StrapiEntity<T>[] {
    if (!relation || !Array.isArray(relation.data)) return []
    return relation.data
}

function normalizeCategory(raw: StrapiEntity<{ name?: string; slug?: string; description?: string; color?: Category['color']; icon?: string }> | null): Category {
    const data = raw
    const attributes = data?.attributes ?? {}

    return {
        id: String(data?.id ?? attributes.slug ?? 'category-unknown'),
        name: attributes.name ?? '',
        slug: attributes.slug ?? '',
        description: attributes.description,
        color: attributes.color ?? 'tributos',
        icon: attributes.icon,
    }
}

function normalizeAuthor(raw: StrapiEntity<{ name?: string; slug?: string; avatar?: StrapiSingleRelation<{ url?: string }>; bio?: string; role?: string; social?: Author['social'] }> | null): Author {
    const data = raw
    const attributes = data?.attributes ?? {}

    return {
        id: String(data?.id ?? attributes.slug ?? 'author-unknown'),
        name: attributes.name ?? '',
        slug: attributes.slug ?? '',
        avatar: toAbsoluteUrl(getSingleEntityData(attributes.avatar)?.attributes?.url),
        bio: attributes.bio,
        role: attributes.role ?? '',
        social: attributes.social,
    }
}

function normalizeTag(raw: StrapiEntity<{ name?: string; slug?: string }> | null): Tag {
    const data = raw
    const attributes = data?.attributes ?? {}

    return {
        id: String(data?.id ?? attributes.slug ?? 'tag-unknown'),
        name: attributes.name ?? '',
        slug: attributes.slug ?? '',
    }
}

interface StrapiArticleAttributes {
    title?: string
    slug?: string
    subtitle?: string
    excerpt?: string
    content?: string
    featuredImage?: StrapiSingleRelation<{ url?: string }>
    category?: StrapiSingleRelation<{ name?: string; slug?: string; description?: string; color?: Category['color']; icon?: string }>
    author?: StrapiSingleRelation<{ name?: string; slug?: string; avatar?: StrapiSingleRelation<{ url?: string }>; bio?: string; role?: string; social?: Author['social'] }>
    tags?: StrapiManyRelation<{ name?: string; slug?: string }>
    publishedAt?: string
    updatedAt?: string
    readTime?: number
    views?: number
    isFeatured?: boolean
    isBreaking?: boolean
    status?: NewsArticle['status']
    metaTitle?: string
    metaDescription?: string
    relatedArticles?: StrapiManyRelation<{ id?: number | string }>
}

export function normalizeStrapiArticle(raw: StrapiEntity<StrapiArticleAttributes> | null): NewsArticle {
    const id = String(raw?.id ?? raw?.attributes?.slug ?? 'article-unknown')
    const attributes = raw?.attributes ?? {}
    const featuredImageData = getSingleEntityData(attributes.featuredImage)
    const categoryData = getSingleEntityData(attributes.category)
    const authorData = getSingleEntityData(attributes.author)
    const tagsData = getManyEntityData(attributes.tags)
    const relatedArticlesData = getManyEntityData(attributes.relatedArticles)

    return {
        id,
        title: attributes.title ?? '',
        slug: attributes.slug ?? '',
        subtitle: attributes.subtitle,
        excerpt: attributes.excerpt ?? '',
        content: attributes.content ?? '',
        featuredImage: toAbsoluteUrl(featuredImageData?.attributes?.url),
        category: normalizeCategory(categoryData),
        author: normalizeAuthor(authorData),
        tags: tagsData.map(normalizeTag),
        publishedAt: attributes.publishedAt ?? new Date().toISOString(),
        updatedAt: attributes.updatedAt,
        readTime: Number(attributes.readTime ?? 0),
        views: Number(attributes.views ?? 0),
        isFeatured: Boolean(attributes.isFeatured),
        isBreaking: Boolean(attributes.isBreaking),
        status: attributes.status ?? 'published',
        metaTitle: attributes.metaTitle,
        metaDescription: attributes.metaDescription,
        relatedArticles: relatedArticlesData.length
            ? relatedArticlesData.map((item) => String(item.id))
            : undefined,
    }
}

function normalizeCollection<T, R>(payload: StrapiCollectionResponse<T>, normalizeFn: (item: StrapiEntity<T> | null) => R): R[] {
    if (!payload || !Array.isArray(payload.data)) return []
    return payload.data.map((item) => normalizeFn(item ?? null))
}

async function fetchArticles(path: string): Promise<NewsArticle[]> {
    const response = await api.get<StrapiCollectionResponse<StrapiArticleAttributes>>(path)
    return normalizeCollection(response, normalizeStrapiArticle)
}

async function fetchSingleArticle(path: string): Promise<NewsArticle | null> {
    const list = await fetchArticles(path)
    return list.length ? list[0] : null
}

export const strapi = {
    async getPublished(limit?: number): Promise<NewsArticle[]> {
        const pageSize = limit ?? 100
        return fetchArticles(
            `/articles?filters[status][$eq]=published&sort[publishedAt]:desc&pagination[pageSize]=${pageSize}&${STRAPI_POPULATE}`,
        )
    },

    async getFeatured(): Promise<NewsArticle[]> {
        return fetchArticles(
            `/articles?filters[status][$eq]=published&filters[isFeatured][$eq]=true&sort[publishedAt]:desc&pagination[pageSize]=100&${STRAPI_POPULATE}`,
        )
    },

    async getBySlug(slug: string): Promise<NewsArticle | null> {
        return fetchSingleArticle(
            `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1&${STRAPI_POPULATE}`,
        )
    },

    async getByCategory(categorySlug: string, limit?: number): Promise<NewsArticle[]> {
        const pageSize = limit ?? 100
        return fetchArticles(
            `/articles?filters[status][$eq]=published&filters[category][slug][$eq]=${encodeURIComponent(
                categorySlug,
            )}&sort[publishedAt]:desc&pagination[pageSize]=${pageSize}&${STRAPI_POPULATE}`,
        )
    },

    async getByTag(tagSlug: string): Promise<NewsArticle[]> {
        return fetchArticles(
            `/articles?filters[status][$eq]=published&filters[tags][slug][$eq]=${encodeURIComponent(tagSlug)}&sort[publishedAt]:desc&pagination[pageSize]=100&${STRAPI_POPULATE}`,
        )
    },

    async getMostRead(limit = 5): Promise<NewsArticle[]> {
        return fetchArticles(
            `/articles?filters[status][$eq]=published&sort[views]:desc&pagination[pageSize]=${limit}&${STRAPI_POPULATE}`,
        )
    },

    async getRelated(article: NewsArticle, limit = 3): Promise<NewsArticle[]> {
        return fetchArticles(
            `/articles?filters[status][$eq]=published&filters[category][slug][$eq]=${encodeURIComponent(
                article.category.slug,
            )}&filters[id][$notIn]=${encodeURIComponent(article.id)}&sort[publishedAt]:desc&pagination[pageSize]=${limit}&${STRAPI_POPULATE}`,
        )
    },

    async search(query: string): Promise<NewsArticle[]> {
        return fetchArticles(
            `/articles?filters[$or][0][title][$containsi]=${encodeURIComponent(query)}&filters[$or][1][excerpt][$containsi]=${encodeURIComponent(
                query,
            )}&filters[$or][2][content][$containsi]=${encodeURIComponent(query)}&filters[status][$eq]=published&pagination[pageSize]=100&${STRAPI_POPULATE}`,
        )
    },

    async getLatest(limit = 6): Promise<NewsArticle[]> {
        return fetchArticles(
            `/articles?filters[status][$eq]=published&sort[publishedAt]:desc&pagination[pageSize]=${limit}&${STRAPI_POPULATE}`,
        )
    },

    async getCategories(): Promise<Category[]> {
        const response = await api.get<StrapiCollectionResponse<{ name?: string; slug?: string; description?: string; color?: Category['color']; icon?: string }>>(`/categories?pagination[pageSize]=100`)
        return normalizeCollection(response, normalizeCategory)
    },

    async getAuthors(): Promise<Author[]> {
        const response = await api.get<StrapiCollectionResponse<{ name?: string; slug?: string; avatar?: StrapiSingleRelation<{ url?: string }>; bio?: string; role?: string; social?: Author['social'] }>>(`/authors?pagination[pageSize]=100`)
        return normalizeCollection(response, normalizeAuthor)
    },

    async getTags(): Promise<Tag[]> {
        const response = await api.get<StrapiCollectionResponse<{ name?: string; slug?: string }>>(`/tags?pagination[pageSize]=100`)
        return normalizeCollection(response, normalizeTag)
    },
}
