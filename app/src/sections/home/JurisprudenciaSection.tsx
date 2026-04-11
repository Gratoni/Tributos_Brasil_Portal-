import { ArrowRight, Gavel, BookOpen } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { NewsCard } from '@/components/news/NewsCard';
import type { NewsArticle } from '@/types';

interface JurisprudenciaSectionProps {
  articles: NewsArticle[];
}

export function JurisprudenciaSection({ articles }: JurisprudenciaSectionProps) {
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--cat-jurisprudencia))] rounded-lg flex items-center justify-center">
              <Gavel className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Jurisprudência e Decisões
              </h2>
              <p className="text-sm text-[hsl(var(--editorial-gray))]">
                Entendimentos dos tribunais superiores
              </p>
            </div>
          </div>
          <AppLink
            href="/categoria/jurisprudencia"
            className="section-link flex items-center gap-1"
          >
            Ver mais
            <ArrowRight className="w-4 h-4" />
          </AppLink>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {mainArticle && (
              <NewsCard
                article={mainArticle}
                variant="horizontal"
                showExcerpt={true}
                showAuthor={true}
                showViews={true}
              />
            )}
          </div>

          <div className="space-y-4">
            {sideArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="compact"
                showExcerpt={false}
                showAuthor={false}
              />
            ))}

            <AppLink
              href="/sumulas"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-[hsl(var(--cat-jurisprudencia))] to-purple-700 text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-0.5">Banco de Súmulas</h4>
                <p className="text-sm text-white/80">
                  Consulte as súmulas do STF, STJ e CARF
                </p>
              </div>
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
