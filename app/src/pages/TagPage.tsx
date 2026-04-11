import { useParams } from 'react-router-dom';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { MostReadList } from '@/components/news/MostReadList';
import { NewsCard } from '@/components/news/NewsCard';
import { getMostReadNews, getNewsByTag, getTagBySlug } from '@/data/mockData';

export function TagPage() {
  const { slug = '' } = useParams();
  const tag = getTagBySlug(slug);
  const articles = getNewsByTag(slug);
  const mostRead = getMostReadNews();

  if (!tag) {
    return (
      <PageShell>
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-[hsl(var(--editorial-gray-dark))]">
              Tag nao encontrada
            </h1>
            <p className="mt-3 text-[hsl(var(--editorial-gray))]">
              Essa classificacao ainda nao possui pagina publica.
            </p>
            <AppLink href="/noticias" className="btn-primary mt-6 inline-flex">
              Ir para noticias
            </AppLink>
          </div>
        </section>
      </PageShell>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/noticias', label: 'Noticias' },
          { label: `Tag: ${tag.name}` },
        ]}
      />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full bg-[hsl(var(--editorial-surface))] px-4 py-1.5 text-sm font-medium text-[hsl(var(--editorial-blue))]">
                Tag editorial
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                {tag.name}
              </h1>
              <p className="mt-4 text-[hsl(var(--editorial-gray))]">
                {articles.length} {articles.length === 1 ? 'materia vinculada' : 'materias vinculadas'} a esta tag.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {featuredArticle ? (
                <>
                  <NewsCard
                    article={featuredArticle}
                    variant="horizontal"
                    showExcerpt={true}
                    showAuthor={true}
                    showViews={true}
                    className="mb-8"
                  />
                  {otherArticles.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {otherArticles.map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          variant="default"
                          showExcerpt={true}
                          showAuthor={true}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-[hsl(var(--editorial-border))] p-8 text-center">
                  <p className="text-[hsl(var(--editorial-gray))]">
                    Ainda nao ha conteudos publicados com esta tag.
                  </p>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <MostReadList articles={mostRead} />
              <div className="bg-[hsl(var(--editorial-surface))] rounded-lg p-5">
                <h2 className="font-bold text-[hsl(var(--editorial-gray-dark))] mb-2">
                  Precisa aprofundar o tema?
                </h2>
                <p className="text-sm text-[hsl(var(--editorial-gray))] mb-4">
                  Nossa equipe pode direcionar voce para a categoria ou consultoria mais adequada.
                </p>
                <AppLink href="/contato" className="btn-primary w-full text-center block text-sm py-2">
                  Falar com especialistas
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
