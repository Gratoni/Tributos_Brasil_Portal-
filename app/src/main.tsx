import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { initAnalytics } from '@/lib/analytics';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import '@/config/env';

// Inicializa Google Analytics (só injeta se VITE_GA_MEASUREMENT_ID estiver configurado)
initAnalytics();

// Registra Service Worker para PWA (apenas em produção)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((err) => console.warn('SW registration failed:', err));
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
