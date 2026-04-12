/**
 * Google Analytics 4 — helpers de rastreamento.
 *
 * Configuração:
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX   (no arquivo .env)
 *
 * O script do GA só é injetado se o ID estiver presente e o ambiente
 * for produção — sem poluir o console em desenvolvimento.
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? '';
const IS_PROD = import.meta.env.VITE_APP_ENV === 'production' || import.meta.env.PROD;

let initialized = false;

/** Injeta o script do GA4 e inicializa o dataLayer. Chame uma vez em main.tsx. */
export function initAnalytics(): void {
  if (!GA_ID || !IS_PROD || initialized || typeof window === 'undefined') return;

  // dataLayer global
  window.dataLayer = window.dataLayer ?? [];

  // Função gtag nativa (push arguments é intencional para o GA)
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args)
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: false, // rastreamos manualmente via trackPageView
  });

  // Injeta o script assíncrono
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  initialized = true;
}

/** Envia um page_view para o GA4. Chamar em cada mudança de rota. */
export function trackPageView(path: string, title?: string): void {
  if (!GA_ID || !window.gtag) return;
  window.gtag('config', GA_ID, {
    page_path: path,
    page_title: title ?? document.title,
  });
}

/**
 * Envia um evento customizado ao GA4.
 *
 * @example
 * trackEvent('share_article', 'engagement', 'linkedin', 1);
 * trackEvent('newsletter_signup', 'conversion');
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
): void {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}

/** Rastreia cliques em links de saída (outbound) */
export function trackOutboundLink(url: string): void {
  trackEvent('click', 'outbound_link', url);
}

/** Rastreia buscas internas */
export function trackSearch(query: string): void {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', 'search', { search_term: query });
}
