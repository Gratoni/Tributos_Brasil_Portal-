import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

export interface SeoOptions {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
  section?: string;
  tags?: string[];
}

const MANAGED_ATTR = 'data-tb-seo';

function upsertMeta(selector: string, createAttrs: Record<string, string>, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(createAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][${MANAGED_ATTR}]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeMeta(selector: string) {
  const el = document.head.querySelector(`${selector}[${MANAGED_ATTR}]`);
  if (el) el.remove();
}

function toAbsoluteUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const base = siteConfig.officialUrl.replace(/\/$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${base}${path}`;
}

export function useSeo(options: SeoOptions): void {
  const {
    title,
    description,
    canonical,
    image,
    type = 'website',
    noindex = false,
    publishedAt,
    updatedAt,
    authorName,
    section,
    tags,
  } = options;

  // Chave estável para o array de tags (evita reexecuções desnecessárias
  // quando o caller recria o array a cada render com conteúdo idêntico).
  const tagsKey = tags?.join('|') ?? '';

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${siteConfig.brandName}`
      : `${siteConfig.brandName} | Portal de Notícias Tributárias e Jurídicas`;

    document.title = fullTitle;

    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description' }, description);
    }

    const canonicalUrl = toAbsoluteUrl(canonical) ??
      (typeof window !== 'undefined' ? window.location.href.split('#')[0] : siteConfig.officialUrl);
    upsertLink('canonical', canonicalUrl);

    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, type);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle);
    if (description) {
      upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description);
    }
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, siteConfig.brandName);
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, 'pt_BR');

    const resolvedImage = toAbsoluteUrl(image) ?? toAbsoluteUrl(siteConfig.logoUrl);
    if (resolvedImage) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image' }, resolvedImage);
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, resolvedImage);
    }

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle);
    if (description) {
      upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
    }

    upsertMeta(
      'meta[name="robots"]',
      { name: 'robots' },
      noindex ? 'noindex, nofollow' : 'index, follow',
    );

    if (type === 'article') {
      if (publishedAt) {
        upsertMeta(
          'meta[property="article:published_time"]',
          { property: 'article:published_time' },
          publishedAt,
        );
      }
      if (updatedAt) {
        upsertMeta(
          'meta[property="article:modified_time"]',
          { property: 'article:modified_time' },
          updatedAt,
        );
      }
      if (authorName) {
        upsertMeta('meta[property="article:author"]', { property: 'article:author' }, authorName);
      }
      if (section) {
        upsertMeta('meta[property="article:section"]', { property: 'article:section' }, section);
      }
      if (tags?.length) {
        document.head
          .querySelectorAll(`meta[property="article:tag"][${MANAGED_ATTR}]`)
          .forEach((node) => node.remove());
        tags.forEach((tag) => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'article:tag');
          meta.setAttribute('content', tag);
          meta.setAttribute(MANAGED_ATTR, 'true');
          document.head.appendChild(meta);
        });
      }
    } else {
      removeMeta('meta[property="article:published_time"]');
      removeMeta('meta[property="article:modified_time"]');
      removeMeta('meta[property="article:author"]');
      removeMeta('meta[property="article:section"]');
      document.head
        .querySelectorAll(`meta[property="article:tag"][${MANAGED_ATTR}]`)
        .forEach((node) => node.remove());
    }
    // `tags` é lido dentro do effect, mas `tagsKey` já captura qualquer
    // mudança no seu conteúdo — por isso omitimos `tags` da lista.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    description,
    canonical,
    image,
    type,
    noindex,
    publishedAt,
    updatedAt,
    authorName,
    section,
    tagsKey,
  ]);
}
