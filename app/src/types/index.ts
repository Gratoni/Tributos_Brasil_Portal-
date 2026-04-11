// Tipos do Portal Tributos Brasil

export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar?: string;
  bio?: string;
  role: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: 'tributos' | 'reforma' | 'jurisprudencia' | 'empresarial' | 'alertas';
  icon?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: Category;
  author: Author;
  tags: Tag[];
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  views: number;
  isFeatured: boolean;
  isBreaking?: boolean;
  isPremium?: boolean;
  status: 'published' | 'draft' | 'scheduled';
  metaTitle?: string;
  metaDescription?: string;
  relatedArticles?: string[];
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  preferences: {
    dailyNews: boolean;
    weeklySummary: boolean;
    legislationAlerts: boolean;
  };
  subscribedAt: string;
  confirmedAt?: string;
  isActive: boolean;
}

export interface Columnist {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  specialty: string;
  articlesCount: number;
}

export interface BreakingNews {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
}

export interface MenuItem {
  label: string;
  href: string;
  icon?: string;
  children?: MenuItem[];
}

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface SearchResult {
  articles: NewsArticle[];
  total: number;
  page: number;
  perPage: number;
}

export type ViewMode = 'grid' | 'list';

export type SortOption = 'newest' | 'oldest' | 'most-read';



