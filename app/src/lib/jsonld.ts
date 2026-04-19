import { siteConfig } from '@/config/site';
import type { NewsArticle } from '@/types';

const BASE = siteConfig.officialUrl.replace(/\/$/, '');

function abs(path?: string): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: siteConfig.brandName,
    url: `${BASE}/`,
    logo: abs(siteConfig.logoUrl),
    description:
      'Portal especializado em notícias tributárias, contábeis e jurídicas para profissionais e empresas.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${siteConfig.supportPhoneHref.replace(/\D/g, '')}`,
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
      email: siteConfig.supportEmail,
    },
  } as const;
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.brandName,
    url: `${BASE}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE}/noticias?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  } as const;
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: abs(item.url) } : {}),
    })),
  };
}

export function newsArticleJsonLd(article: NewsArticle) {
  const articleUrl = `${BASE}/noticias/${article.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.metaDescription ?? article.excerpt ?? article.subtitle,
    image: article.featuredImage ? [article.featuredImage] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: abs(`/colunistas/${article.author.slug}`),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      logo: {
        '@type': 'ImageObject',
        url: abs(siteConfig.logoUrl),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: article.category.name,
    keywords: article.tags.map((t) => t.name).join(', '),
  };
}

export function collectionPageJsonLd(params: {
  name: string;
  description?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: params.name,
    description: params.description,
    url: abs(params.url),
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.brandName,
      url: `${BASE}/`,
    },
  };
}

export function personJsonLd(params: {
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  jobTitle?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: params.name,
    jobTitle: params.jobTitle,
    description: params.bio,
    image: params.avatar,
    url: abs(`/colunistas/${params.slug}`),
  };
}
