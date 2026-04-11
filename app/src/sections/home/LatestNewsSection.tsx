import { ArrowRight } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { NewsCard } from '@/components/news/NewsCard';
import { MostReadList } from '@/components/news/MostReadList';
import type { NewsArticle } from '@/types';

interface LatestNewsSectionProps {
  latestNews: NewsArticle[];
  mostReadNews: NewsArticle[];
}

export function LatestNewsSection({ latestNews, mostReadNews }: LatestNewsSectionProps) {
  const mainNews = latestNews[0];
  const gridNews = latestNews.slice(4, 7);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="section-title">Últimas Notícias</h2>
          <AppLink href="/noticias" className="section-link flex items-center gap-1">
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </AppLink>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {mainNews && (
                <div className="md:col-span-2">
                  <NewsCard
                    article={mainNews}
                    variant="horizontal"
                    showExcerpt={true}
                    showAuthor={true}
                    showViews={true}
                  />
                </div>
              )}

              {gridNews.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="default"
                  showExcerpt={false}
                  showAuthor={true}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <MostReadList articles={mostReadNews} />

            <div className="bg-[hsl(var(--editorial-surface))] rounded-lg p-5 border border-[hsl(var(--editorial-border))]">
              <h4 className="font-bold text-[hsl(var(--editorial-gray-dark))] mb-2">
                Receba alertas tributários
              </h4>
              <p className="text-sm text-[hsl(var(--editorial-gray))] mb-4">
                Cadastre-se e receba as principais notícias diretamente no seu e-mail.
              </p>
              <AppLink href="#newsletter" className="btn-primary w-full text-center block text-sm">
                Cadastrar agora
              </AppLink>
            </div>

            <div className="bg-white rounded-lg border border-[hsl(var(--editorial-border))] p-5">
              <h4 className="font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">
                Acesso Rápido
              </h4>
              <ul className="space-y-2">
                <li>
                  <AppLink
                    href="/categoria/reforma-tributaria"
                    className="text-sm text-[hsl(var(--editorial-gray))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                  >
                    Reforma Tributária
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/categoria/jurisprudencia"
                    className="text-sm text-[hsl(var(--editorial-gray))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                  >
                    Jurisprudência
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/categoria/obrigacoes-acessorias"
                    className="text-sm text-[hsl(var(--editorial-gray))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                  >
                    Obrigações Acessórias
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/colunistas"
                    className="text-sm text-[hsl(var(--editorial-gray))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                  >
                    Colunistas
                  </AppLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
