import { useState, useEffect } from 'react';
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
import { NewsArticlePage } from '@/pages/NewsArticlePage';
import { CategoryPage } from '@/pages/CategoryPage';
import { AboutPage } from '@/pages/AboutPage';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { NewsIndexPage } from '@/pages/NewsIndexPage';
import { ColumnistsPage } from '@/pages/ColumnistsPage';
import { ColumnistProfilePage } from '@/pages/ColumnistProfilePage';
import { ContactPage } from '@/pages/ContactPage';
import { InstitutionalPage } from '@/pages/InstitutionalPage';
import { LegalPage } from '@/pages/LegalPage';
import { TagPage } from '@/pages/TagPage';
import { ReformaGuidePage } from '@/pages/ReformaGuidePage';
import { ReformaCalculatorPage } from '@/pages/ReformaCalculatorPage';
import { ReformaAlertsPage } from '@/pages/ReformaAlertsPage';
import { SumulasPage } from '@/pages/SumulasPage';
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

// Página Home
function HomePage() {
  const featuredNews = getFeaturedNews();
  const latestNews = getLatestNews(7);
  const mostReadNews = getMostReadNews();
  const reformaNews = getNewsByCategory('reforma-tributaria').slice(0, 4);
  const jurisprudenciaNews = getNewsByCategory('jurisprudencia').slice(0, 4);
  const alertasNews = getNewsByCategory('alertas-fiscais').slice(0, 3);

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
      {showGlobalShell && <HeaderTop />}
      {showGlobalShell && <HeaderMain />}
      {showGlobalShell && <Navigation />}
      <main>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

