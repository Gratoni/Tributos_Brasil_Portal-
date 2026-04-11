/**
 * Hook que rastreia automaticamente page_views no GA4
 * a cada mudança de rota do React Router.
 *
 * Uso: chamar uma vez dentro do componente raiz (App.tsx ou ScrollManager).
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

export function usePageTracking(): void {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(pathname + search, document.title);
  }, [pathname, search]);
}
