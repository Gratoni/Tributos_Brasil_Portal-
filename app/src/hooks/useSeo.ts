import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

export interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  structuredData?: object | null;
}

const DEFAULT_DESCRIPTION =
  'Portal especializado em notícias tributárias, contábeis e jurídicas. Acompanhe a Reforma Tributária, jurisprudência do STF e STJ, ICMS, IBS, CBS e análises para profissionais e empresas.';
const DEFAULT_IMAGE = `${siteConfig.officialUrl}assets/images/onlywhitelogo.png`;

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name'): void {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

const STRUCTURED_DATA_ID = 'tb-page-structured-data';

function setStructuredData(data: object | null): void {
  const existing = document.getElementById(STRUCTURED_DATA_ID);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = STRUCTURED_DATA_ID;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Atualiza title, meta description, tags Open Graph / Twitter e canonical
 * dinamicamente por página. Restaura os valores anteriores no unmount.
 */
export function useSeo(options: SeoOptions): void {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url,
    type = 'website',
    noIndex = false,
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
    structuredData = null,
  } = options;

  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = title
      ? `${title} | ${siteConfig.brandName}`
      : `${siteConfig.brandName} | Portal de Notícias Tributárias e Jurídicas`;
    document.title = fullTitle;

    const canonical =
      url ??
      (typeof window !== 'undefined'
        ? `${siteConfig.officialUrl.replace(/\/$/, '')}${window.location.pathname}`
        : siteConfig.officialUrl);

    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:type', type, 'property');

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    if (type === 'article') {
      if (publishedTime) setMeta('article:published_time', publishedTime, 'property');
      if (modifiedTime) setMeta('article:modified_time', modifiedTime, 'property');
      if (author) setMeta('article:author', author, 'property');
      if (section) setMeta('article:section', section, 'property');
      if (tags?.length) {
        tags.forEach((tag) => setMeta('article:tag', tag, 'property'));
      }
    }

    setCanonical(canonical);
    setStructuredData(structuredData);

    return () => {
      document.title = previousTitle;
      setStructuredData(null);
    };
  }, [title, description, image, url, type, noIndex, publishedTime, modifiedTime, author, section, tags, structuredData]);
}
