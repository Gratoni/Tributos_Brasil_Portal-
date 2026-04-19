import { ArrowRight, PenTool } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { authors, getNewsByAuthor } from '@/data/mockData';
import { useSeo } from '@/hooks/useSeo';

export function ColumnistsPage() {
  useSeo({
    title: 'Colunistas',
    description: 'Especialistas que escrevem no portal: análises de tributaristas, contadores e professores de direito.',
  });
  const directory = [...authors]
    .map((author) => {
      const articles = getNewsByAuthor(author.slug);

      return {
        ...author,
        articleCount: articles.length,
        latestArticle: articles[0],
      };
    })
    .sort((a, b) => b.articleCount - a.articleCount);

  return (
    <PageShell activeItem="/colunistas">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Colunistas' },
        ]}
      />

      <section className="py-12 bg-[hsl(var(--editorial-surface))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[hsl(var(--editorial-blue))] shadow-sm">
              <PenTool className="w-4 h-4" />
              Especialistas do portal
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
              Colunistas e especialistas
            </h1>
            <p className="mt-4 text-lg text-[hsl(var(--editorial-gray))]">
              Encontre os autores por area de atuacao, acompanhe os artigos mais recentes e acesse os contatos profissionais.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {directory.map((author) => (
              <article
                key={author.id}
                className="rounded-2xl border border-[hsl(var(--editorial-border))] overflow-hidden bg-white shadow-card"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                        {author.name}
                      </h2>
                      <p className="text-sm font-medium text-[hsl(var(--editorial-blue))]">{author.role}</p>
                      <p className="mt-2 text-sm text-[hsl(var(--editorial-gray))]">
                        {author.articleCount} {author.articleCount === 1 ? 'artigo publicado' : 'artigos publicados'}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-[hsl(var(--editorial-gray))]">
                    {author.bio}
                  </p>

                  {author.latestArticle && (
                    <div className="mt-6 rounded-xl bg-[hsl(var(--editorial-surface))] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--editorial-blue))]">
                        Ultima publicacao
                      </p>
                      <AppLink
                        href={`/noticias/${author.latestArticle.slug}`}
                        className="mt-2 block font-medium text-[hsl(var(--editorial-gray-dark))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                      >
                        {author.latestArticle.title}
                      </AppLink>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <AppLink href={`/colunistas/${author.slug}`} className="btn-primary text-sm px-4 py-2 inline-flex items-center gap-2">
                      Ver perfil
                      <ArrowRight className="w-4 h-4" />
                    </AppLink>
                    {author.social?.email && (
                      <AppLink href={`mailto:${author.social.email}`} className="btn-secondary text-sm px-4 py-2 inline-flex">
                        Contatar
                      </AppLink>
                    )}
                  </div>
                </div>
              </article>
            ))}
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
