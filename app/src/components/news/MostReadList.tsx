import { TrendingUp } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import type { NewsArticle } from '@/types';

interface MostReadListProps {
  articles: NewsArticle[];
  className?: string;
}

export function MostReadList({ articles, className = '' }: MostReadListProps) {
  return (
    <div className={`bg-white rounded-lg border border-[hsl(var(--editorial-border))] p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-5 h-5 text-[hsl(var(--editorial-blue))]" />
        <h3 className="font-bold text-[hsl(var(--editorial-gray-dark))]">Mais Lidas</h3>
      </div>
      <ul className="space-y-0">
        {articles.map((article, index) => (
          <li key={article.id} className="most-read-item">
            <span className="most-read-number">{index + 1}</span>
            <AppLink href={`/noticias/${article.slug}`} className="flex-1 group">
              <h4 className="text-sm font-medium text-[hsl(var(--editorial-gray-dark))] line-clamp-2 group-hover:text-[hsl(var(--editorial-blue))] transition-colors">
                {article.title}
              </h4>
              <span className="text-xs text-[hsl(var(--editorial-gray))] mt-1">
                {article.views.toLocaleString('pt-BR')} leituras
              </span>
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
