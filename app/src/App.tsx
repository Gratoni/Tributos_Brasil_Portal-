import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HeaderTop } from '@/components/layout/HeaderTop';
import { HeaderMain } from '@/components/layout/HeaderMain';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BreakingNewsTicker } from '@/components/news/BreakingNewsTicker';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { HeroSection } from '@/sections/home/HeroSection';
import { LatestNewsSection } from '@/sections/home/LatestNewsSection';
import { ReformaSection } from '@/sections/home/ReformaSection';
import { JurisprudenciaSection } from '@/sections/home/JurisprudenciaSection';
import { ColumnistsSection } from '@/sections/home/ColumnistsSection';
import { AlertasSection } from '@/sections/home/AlertasSection';
import { InstitutionalCTA } from '@/sections/home/InstitutionalCTA';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';

const NewsArticlePage = lazy(() =>
  import('@/pages/NewsArticlePage').then((m) => ({ default: m.NewsArticlePage })),
);
const CategoryPage = lazy(() =>
  import('@/pages/CategoryPage').then((m) => ({ default: m.CategoryPage })),
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
);
const AdminDashboard = lazy(() =>
  import('@/pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
);
const AdminLoginPage = lazy(() =>
  import('@/pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })),
);
const NewsIndexPage = lazy(() =>
  import('@/pages/NewsIndexPage').then((m) => ({ default: m.NewsIndexPage })),
);
const ColumnistsPage = lazy(() =>
  import('@/pages/ColumnistsPage').then((m) => ({ default: m.ColumnistsPage })),
);
const ColumnistProfilePage = lazy(() =>
  import('@/pages/ColumnistProfilePage').then((m) => ({ default: m.ColumnistProfilePage })),
);
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const InstitutionalPage = lazy(() =>
  import('@/pages/InstitutionalPage').then((m) => ({ default: m.InstitutionalPage })),
);
const LegalPage = lazy(() =>
  import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })),
);
const TagPage = lazy(() =>
  import('@/pages/TagPage').then((m) => ({ default: m.TagPage })),
);
const ReformaGuidePage = lazy(() =>
  import('@/pages/ReformaGuidePage').then((m) => ({ default: m.ReformaGuidePage })),
);
const ReformaCalculatorPage = lazy(() =>
  import('@/pages/ReformaCalculatorPage').then((m) => ({ default: m.ReformaCalculatorPage })),
);
const ReformaAlertsPage = lazy(() =>
  import('@/pages/ReformaAlertsPage').then((m) => ({ default: m.ReformaAlertsPage })),
);
const SumulasPage = lazy(() =>
  import('@/pages/SumulasPage').then((m) => ({ default: m.SumulasPage })),
);
import { 
  getFeaturedNews, 
  getLatestNews, 
  getMostReadNews, 
  getNewsByCategory,
  columnists 
} from '@/data/mockData';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/config/site';
import { usePageTracking } from '@/hooks/usePageTracking';
import { useSeo } from '@/hooks/useSeo';

// Página Home
function HomePage() {
  const featuredNews = getFeaturedNews();
  const latestNews = getLatestNews(7);
  const mostReadNews = getMostReadNews();
  const reformaNews = getNewsByCategory('reforma-tributaria').slice(0, 4);
  const jurisprudenciaNews = getNewsByCategory('jurisprudencia').slice(0, 4);
  const alertasNews = getNewsByCategory('alertas-fiscais').slice(0, 3);

  useSeo({
    title: undefined,
    description:
      'Portal especializado em notícias tributárias, contábeis e jurídicas. Acompanhe a Reforma Tributária, jurisprudência do STF e STJ, ICMS, IBS, CBS e análises para profissionais e empresas.',
    url: siteConfig.officialUrl,
  });

  return (
    <>
      <BreakingNewsTicker />
      <HeroSection featuredNews={featuredNews} />
      <LatestNewsSection latestNews={latestNews} mostReadNews={mostReadNews} />
      {reformaNews.length > 0 && <ReformaSection articles={reformaNews} />}
      {jurisprudenciaNews.length > 0 && <JurisprudenciaSection articles={jurisprudenciaNews} />}
      <ColumnistsSection columnists={columnists} />
      {alertasNews.length > 0 && <AlertasSection articles={alertasNews} />}
      <InstitutionalCTA />
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterBox />
        </div>
      </section>
    </>
  );
}

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center py-16" role="status" aria-live="polite">
      <div className="flex items-center gap-3 text-[hsl(var(--editorial-gray))]">
        <span className="inline-block w-3 h-3 rounded-full bg-[hsl(var(--editorial-blue))] animate-pulse" aria-hidden="true" />
        <span>Carregando…</span>
      </div>
    </div>
  );
}

function ScrollManager() {
  const { hash, pathname, search } = useLocation();

  // Rastreamento automático de page views no GA4
  usePageTracking();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [hash, pathname, search]);

  return null;
}

// Layout principal
function MainLayout() {
  const { pathname } = useLocation();
  const showGlobalShell = pathname === '/';

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[hsl(var(--editorial-blue))] focus:text-white focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>
      {showGlobalShell && <HeaderTop />}
      {showGlobalShell && <HeaderMain />}
      {showGlobalShell && <Navigation />}
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/noticias" element={<NewsIndexPage />} />
          <Route path="/destaques" element={<NewsIndexPage mode="featured" />} />
          <Route path="/artigos" element={<NewsIndexPage mode="articles" />} />
          <Route path="/noticias/:slug" element={<NewsArticlePage />} />
          <Route path="/categoria/:slug" element={<CategoryPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/colunistas" element={<ColumnistsPage />} />
          <Route path="/colunistas/:slug" element={<ColumnistProfilePage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/anuncie" element={<InstitutionalPage variant="advertise" />} />
          <Route path="/trabalhe-conosco" element={<InstitutionalPage variant="careers" />} />
          <Route path="/politica-de-privacidade" element={<LegalPage variant="privacy" />} />
          <Route path="/termos-de-uso" element={<LegalPage variant="terms" />} />
          <Route path="/lgpd" element={<LegalPage variant="lgpd" />} />
          <Route path="/tag/:slug" element={<TagPage />} />
          <Route path="/guia-reforma-tributaria" element={<ReformaGuidePage />} />
          <Route path="/calculadora-reforma" element={<ReformaCalculatorPage />} />
          <Route path="/alertas-reforma" element={<ReformaAlertsPage />} />
          <Route path="/sumulas" element={<SumulasPage />} />
          <Route path="*" element={
            <div className="min-h-[60vh] flex items-center justify-center py-20">
              <div className="text-center px-4">
                <p className="text-7xl font-bold text-[hsl(var(--editorial-blue))] mb-4">404</p>
                <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))] mb-2">
                  Página não encontrada
                </h1>
                <p className="text-[hsl(var(--editorial-gray))] mb-6">
                  O endereço que você acessou não existe ou foi removido.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[hsl(var(--editorial-blue))] text-white font-medium rounded-lg hover:bg-[hsl(var(--editorial-blue-dark))] transition-colors"
                >
                  Voltar para Home
                </a>
              </div>
            </div>
          } />
        </Routes>
        </Suspense>
      </main>
      {showGlobalShell && <Footer />}
      <Toaster />
    </div>
  );
}

// App principal
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--editorial-surface))]">
        <div className="text-center">
          <div className="w-16 h-16 bg-[hsl(var(--editorial-blue))] rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">{siteConfig.brandShortName}</span>
          </div>
          <p className="text-[hsl(var(--editorial-gray))]">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollManager />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

