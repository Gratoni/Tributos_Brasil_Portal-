import { siteConfig } from '@/config/site';

const normalizeHandle = (value: string) => value.replace(/^@/, '').trim();

export const buildTwitterProfileUrl = (handle: string) =>
  `https://x.com/${normalizeHandle(handle)}`;

export const buildLinkedInProfileUrl = (slug: string) =>
  `https://www.linkedin.com/in/${slug.trim()}`;

export const buildFacebookShareUrl = (url: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

export const buildTwitterShareUrl = (url: string, text: string) =>
  `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

export const buildLinkedInShareUrl = (url: string) =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

export const buildWhatsAppUrl = (message?: string) => {
  const phone = siteConfig.supportPhoneHref.replace('+', '');
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const getPortalHomeUrl = () => siteConfig.officialUrl;
