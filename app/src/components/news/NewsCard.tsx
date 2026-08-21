import { Clock, Eye, User } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import type { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showViews?: boolean;
  className?: string;
}

export function NewsCard({
  article,
  variant = 'default',
  showExcerpt = true,
  showAuthor = true,
  showViews = false,
  className = '',
}: NewsCardProps) {
  const categoryColorClass = `category-tag-${article.category.color}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (variant === 'featured') {
    return (
      <article className={`news-card-featured group ${className}`}>
        <AppLink href={`/noticias/${article.slug}`} className="block">
          <div className="relative aspect-[16/9] lg:aspect-[21/9]">
            {article.featuredImage && (
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <span className={`category-tag ${categoryColorClass} mb-3`}>
                {article.category.name}
              </span>
              <h2 className="text-xl lg:text-3xl font-bold text-white mb-3 leading-tight group-hover:underline">
                {article.title}
              </h2>
              {article.subtitle && (
                <p className="text-white/80 text-sm lg:text-base mb-4 line-clamp-2">
                  {article.subtitle}
                </p>
              )}
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {article.author.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDate(article.publishedAt)}
                </span>
                <span>{article.readTime} min de leitura</span>
              </div>
            </div>
          </div>
        </AppLink>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={`group ${className}`}>
        <AppLink href={`/noticias/${article.slug}`} className="flex gap-3">
          {article.featuredImage && (
            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className={`inline-block category-tag ${categoryColorClass} text-[10px] px-2 py-0.5 mb-1.5`}>
              {article.category.name}
            </span>
            <h3 className="text-sm font-semibold text-[hsl(var(--editorial-gray-dark))] line-clamp-2 group-hover:text-[hsl(var(--editorial-blue))] transition-colors">
              {article.title}
            </h3>
            <span className="text-xs text-[hsl(var(--editorial-gray))] mt-1">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </AppLink>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className={`news-card group ${className}`}>
        <AppLink href={`/noticias/${article.slug}`} className="flex flex-col sm:flex-row">
          {article.featuredImage && (
            <div className="sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <div className="flex-1 p-4">
            <span className={`category-tag ${categoryColorClass} mb-2`}>
              {article.category.name}
            </span>
            <h3 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))] mb-2 line-clamp-2 group-hover:text-[hsl(var(--editorial-blue))] transition-colors">
              {article.title}
            </h3>
            {showExcerpt && (
              <p className="text-sm text-[hsl(var(--editorial-gray))] line-clamp-2 mb-3">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-[hsl(var(--editorial-gray))]">
              {showAuthor && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {article.author.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(article.publishedAt)}
              </span>
              {showViews && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views.toLocaleString('pt-BR')}
                </span>
              )}
            </div>
          </div>
        </AppLink>
      </article>
    );
  }

  return (
    <article className={`news-card group ${className}`}>
      <AppLink href={`/noticias/${article.slug}`} className="block">
        {article.featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        <div className="p-4">
          <span className={`category-tag ${categoryColorClass} mb-2`}>
            {article.category.name}
          </span>
          <h3 className="text-base font-bold text-[hsl(var(--editorial-gray-dark))] mb-2 line-clamp-2 group-hover:text-[hsl(var(--editorial-blue))] transition-colors">
            {article.title}
          </h3>
          {showExcerpt && (
            <p className="text-sm text-[hsl(var(--editorial-gray))] line-clamp-2 mb-3">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-[hsl(var(--editorial-gray))]">
            {showAuthor && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {article.author.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(article.publishedAt)}
            </span>
            {showViews && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.views.toLocaleString('pt-BR')}
              </span>
            )}
          </div>
        </div>
      </AppLink>
    </article>
  );
}
