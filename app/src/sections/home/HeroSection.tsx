import { AppLink } from '@/components/common/AppLink';
import { NewsCard } from '@/components/news/NewsCard';
import type { NewsArticle } from '@/types';

interface HeroSectionProps {
  featuredNews: NewsArticle[];
}

export function HeroSection({ featuredNews }: HeroSectionProps) {
  const mainFeatured = featuredNews[0];
  const otherFeatured = featuredNews.slice(1, 3);

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {mainFeatured && <NewsCard article={mainFeatured} variant="featured" />}
          </div>

          <div className="space-y-4">
            {otherFeatured.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="compact"
                showExcerpt={false}
                showAuthor={false}
              />
            ))}

            <AppLink
              href="/destaques"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[hsl(var(--editorial-surface))] text-[hsl(var(--editorial-blue))] font-medium rounded-lg hover:bg-[hsl(var(--editorial-border))] transition-colors"
            >
              Ver todos os destaques
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
