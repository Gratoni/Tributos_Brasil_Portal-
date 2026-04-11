import { ArrowRight, Scale, FileText, AlertTriangle } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { NewsCard } from '@/components/news/NewsCard';
import type { NewsArticle } from '@/types';

interface ReformaSectionProps {
  articles: NewsArticle[];
}

export function ReformaSection({ articles }: ReformaSectionProps) {
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <section className="py-8 bg-[hsl(var(--editorial-surface))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--cat-reforma))] rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Reforma Tributária
              </h2>
              <p className="text-sm text-[hsl(var(--editorial-gray))]">
                Acompanhe todas as mudanças
              </p>
            </div>
          </div>
          <AppLink
            href="/categoria/reforma-tributaria"
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
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <AppLink
            href="/guia-reforma-tributaria"
            className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[hsl(var(--editorial-border))] hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-[hsl(var(--editorial-blue))]" />
            </div>
            <div>
              <h4 className="font-semibold text-[hsl(var(--editorial-gray-dark))] mb-1">
                Guia Completo
              </h4>
              <p className="text-sm text-[hsl(var(--editorial-gray))]">
                Entenda passo a passo todas as mudanças da reforma
              </p>
            </div>
          </AppLink>
          <AppLink
            href="/calculadora-reforma"
            className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[hsl(var(--editorial-border))] hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5 text-[hsl(var(--cat-empresarial))]" />
            </div>
            <div>
              <h4 className="font-semibold text-[hsl(var(--editorial-gray-dark))] mb-1">
                Simulador de Impacto
              </h4>
              <p className="text-sm text-[hsl(var(--editorial-gray))]">
                Calcule como a reforma afeta seu negócio
              </p>
            </div>
          </AppLink>
          <AppLink
            href="/alertas-reforma"
            className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[hsl(var(--editorial-border))] hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-[hsl(var(--cat-alertas))]" />
            </div>
            <div>
              <h4 className="font-semibold text-[hsl(var(--editorial-gray-dark))] mb-1">
                Alertas de Prazos
              </h4>
              <p className="text-sm text-[hsl(var(--editorial-gray))]">
                Não perca nenhuma data importante
              </p>
            </div>
          </AppLink>
        </div>
      </div>
    </section>
  );
}
