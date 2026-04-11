import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, Grid3X3, List, ArrowUpDown } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsCard } from '@/components/news/NewsCard';
import { MostReadList } from '@/components/news/MostReadList';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { categories, getNewsByCategory, getMostReadNews } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategoryPageProps {
  slug?: string;
}

export function CategoryPage({ slug: propSlug }: CategoryPageProps = {}) {
  const params = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const slug = propSlug || params.slug || 'tributos';
  const category = categories.find((item) => item.slug === slug) || categories[0];
  const articles = getNewsByCategory(category.slug);
  const mostRead = getMostReadNews();

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    }
    return b.views - a.views;
  });

  const featuredArticle = sortedArticles[0];
  const otherArticles = sortedArticles.slice(1);

  return (
    <PageShell activeItem={`/categoria/${category.slug}`}>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: category.name },
        ]}
      />

      <section className="py-8 bg-gradient-to-br from-[hsl(var(--editorial-blue))] to-[hsl(var(--editorial-blue-dark))] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-white/80 max-w-2xl">{category.description}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>{articles.length} artigos publicados</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {featuredArticle && (
                <div className="mb-8">
                  <NewsCard
                    article={featuredArticle}
                    variant="horizontal"
                    showExcerpt={true}
                    showAuthor={true}
                    showViews={true}
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[hsl(var(--editorial-border))] mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[hsl(var(--editorial-gray))]">
                    {otherArticles.length} resultados adicionais
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mais recentes</SelectItem>
                      <SelectItem value="oldest">Mais antigos</SelectItem>
                      <SelectItem value="most-read">Mais lidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-[hsl(var(--editorial-blue))]' : ''}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-[hsl(var(--editorial-blue))]' : ''}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {otherArticles.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
                  {otherArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      variant={viewMode === 'grid' ? 'default' : 'horizontal'}
                      showExcerpt={true}
                      showAuthor={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-dashed border-[hsl(var(--editorial-border))]">
                  <p className="text-[hsl(var(--editorial-gray))]">
                    Nenhum artigo adicional encontrado nesta categoria.
                  </p>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <MostReadList articles={mostRead} />

              <div className="bg-white rounded-lg border border-[hsl(var(--editorial-border))] p-5">
                <h4 className="font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">
                  Outras Editorias
                </h4>
                <ul className="space-y-2">
                  {categories
                    .filter((item) => item.slug !== category.slug)
                    .map((item) => (
                      <li key={item.id}>
                        <AppLink
                          href={`/categoria/${item.slug}`}
                          className="flex items-center justify-between text-sm text-[hsl(var(--editorial-gray))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </AppLink>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="bg-[hsl(var(--editorial-surface))] rounded-lg p-5">
                <h4 className="font-bold text-[hsl(var(--editorial-gray-dark))] mb-2">
                  Receba alertas
                </h4>
                <p className="text-sm text-[hsl(var(--editorial-gray))] mb-4">
                  Fique por dentro das novidades de {category.name}.
                </p>
                <AppLink href="#newsletter" className="btn-primary w-full text-center block text-sm py-2">
                  Assinar
                </AppLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[hsl(var(--editorial-surface))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterBox />
        </div>
      </section>
    </PageShell>
  );
}
