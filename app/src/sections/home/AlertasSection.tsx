import { ArrowRight, AlertTriangle, Clock } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import type { NewsArticle } from '@/types';

interface AlertasSectionProps {
  articles: NewsArticle[];
}

export function AlertasSection({ articles }: AlertasSectionProps) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--cat-alertas))] rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Alertas Fiscais
              </h2>
              <p className="text-sm text-[hsl(var(--editorial-gray))]">
                Não perca prazos importantes
              </p>
            </div>
          </div>
          <AppLink
            href="/categoria/alertas-fiscais"
            className="section-link flex items-center gap-1"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </AppLink>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <AppLink
              key={article.id}
              href={`/noticias/${article.slug}`}
              className="group bg-white rounded-lg border-l-4 border-[hsl(var(--cat-alertas))] border-y border-r border-[hsl(var(--editorial-border))] p-5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="category-tag category-tag-alertas text-[10px]">
                  {article.category.name}
                </span>
                <span className="flex items-center gap-1 text-xs text-[hsl(var(--cat-alertas))]">
                  <Clock className="w-3 h-3" />
                  Urgente
                </span>
              </div>
              <h4 className="font-semibold text-[hsl(var(--editorial-gray-dark))] mb-2 line-clamp-2 group-hover:text-[hsl(var(--cat-alertas))] transition-colors">
                {article.title}
              </h4>
              <p className="text-sm text-[hsl(var(--editorial-gray))] line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-[hsl(var(--editorial-gray))]">
                <span>{article.author.name}</span>
                <span>
                  {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              </div>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}
