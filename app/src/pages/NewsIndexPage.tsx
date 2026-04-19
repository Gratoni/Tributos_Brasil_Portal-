import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon, Search } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { NewsCard } from '@/components/news/NewsCard';
import { MostReadList } from '@/components/news/MostReadList';
import { AppLink } from '@/components/common/AppLink';
import {
  categories,
  getFeaturedNews,
  getMostReadNews,
  getPublishedNews,
  searchNews,
} from '@/data/mockData';
import { useSeo } from '@/hooks/useSeo';

interface NewsIndexPageProps {
  mode?: 'all' | 'featured' | 'articles';
}

const pageCopy = {
  all: {
    title: 'Central de Notícias',
    description:
      'Acompanhe todas as publicações do portal com filtros práticos e acesso rápido aos temas mais importantes.',
    eyebrow: 'Atualizações do portal',
    activeItem: undefined,
  },
  featured: {
    title: 'Destaques do Portal',
    description:
      'Reunimos as matérias de maior impacto para que você acesse primeiro o que pede leitura imediata.',
    eyebrow: 'Seleção editorial',
    activeItem: undefined,
  },
  articles: {
    title: 'Artigos e Análises',
    description:
      'Conteúdo aprofundado para quem precisa transformar notícia em decisão técnica e estratégia tributária.',
    eyebrow: 'Leitura aprofundada',
    activeItem: '/artigos',
  },
} as const;

const ITEMS_PER_PAGE = 9; // 1 headline + 8 cards na grade

export function NewsIndexPage({ mode = 'all' }: NewsIndexPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query       = searchParams.get('busca')?.trim() ?? '';
  const currentPage = Math.max(1, Number(searchParams.get('pagina') ?? '1'));
  const copy        = pageCopy[mode];
  const mostRead    = getMostReadNews();

  useSeo({
    title: copy.title,
    description: copy.description,
  });

  let baseArticles = getPublishedNews();

  if (mode === 'featured') {
    baseArticles = [...getFeaturedNews()].sort((a, b) => b.views - a.views);
  }

  if (mode === 'articles') {
    baseArticles = [...getPublishedNews()].sort((a, b) => {
      if (b.readTime !== a.readTime) return b.readTime - a.readTime;
      return b.views - a.views;
    });
  }

  const allowedIds     = new Set(baseArticles.map((a) => a.id));
  const filteredArticles = query
    ? searchNews(query).filter((a) => allowedIds.has(a.id))
    : baseArticles;

  const totalPages   = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const safePage     = Math.min(currentPage, totalPages);
  const pageArticles = filteredArticles.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const headlineArticle  = pageArticles[0];
  const remainingArticles = pageArticles.slice(1);

  // Volta para página 1 quando a busca muda
  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('pagina');
      return next;
    }, { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const goToPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (page === 1) {
        next.delete('pagina');
      } else {
        next.set('pagina', String(page));
      }
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageShell activeItem={copy.activeItem}>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: copy.title },
        ]}
      />

      <section className="py-10 bg-gradient-to-br from-[hsl(var(--editorial-blue))] to-[hsl(var(--editorial-blue-dark))] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            {copy.eyebrow}
          </span>
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-end">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">{copy.title}</h1>
              <p className="mt-4 max-w-3xl text-white/80 text-lg">{copy.description}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Search className="w-4 h-4" />
                <span>{query ? `Busca ativa por "${query}"` : 'Explore por assunto, autor ou categoria'}</span>
              </div>
              <p className="mt-3 text-3xl font-bold">{filteredArticles.length}</p>
              <p className="text-sm text-white/70">
                {filteredArticles.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                {totalPages > 1 && (
                  <span className="ml-2 opacity-80">
                    — página {safePage} de {totalPages}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {headlineArticle ? (
                <>
                  <NewsCard
                    article={headlineArticle}
                    variant="horizontal"
                    showExcerpt={true}
                    showAuthor={true}
                    showViews={true}
                    className="mb-8"
                  />

                  {remainingArticles.length > 0 ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        {remainingArticles.map((article) => (
                          <NewsCard
                            key={article.id}
                            article={article}
                            variant="default"
                            showExcerpt={true}
                            showAuthor={true}
                          />
                        ))}
                      </div>

                      {/* Paginação */}
                      {totalPages > 1 && (
                        <nav
                          className="mt-10 flex items-center justify-between gap-4"
                          aria-label="Paginação de notícias"
                        >
                          <button
                            type="button"
                            onClick={() => goToPage(safePage - 1)}
                            disabled={safePage === 1}
                            className="pagination-btn pagination-btn-inactive flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Anterior
                          </button>

                          <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                              .filter(
                                (p) =>
                                  p === 1 ||
                                  p === totalPages ||
                                  Math.abs(p - safePage) <= 1,
                              )
                              .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                                if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) {
                                  acc.push('...');
                                }
                                acc.push(p);
                                return acc;
                              }, [])
                              .map((item, idx) =>
                                item === '...' ? (
                                  <span key={`ellipsis-${idx}`} className="px-2 text-[hsl(var(--editorial-gray))]">…</span>
                                ) : (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => goToPage(item as number)}
                                    className={`pagination-btn w-10 text-center ${
                                      safePage === item
                                        ? 'pagination-btn-active'
                                        : 'pagination-btn-inactive'
                                    }`}
                                    aria-current={safePage === item ? 'page' : undefined}
                                  >
                                    {item}
                                  </button>
                                ),
                              )}
                          </div>

                          <button
                            type="button"
                            onClick={() => goToPage(safePage + 1)}
                            disabled={safePage === totalPages}
                            className="pagination-btn pagination-btn-inactive flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Próxima
                            <ChevronRightIcon className="w-4 h-4" />
                          </button>
                        </nav>
                      )}
                    </>
                  ) : (
                    <div className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] p-6">
                      <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                        Resultado único encontrado
                      </h2>
                      <p className="mt-2 text-[hsl(var(--editorial-gray))]">
                        Ajuste a busca no topo do site para ampliar os resultados ou navegue pelas editorias ao lado.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-[hsl(var(--editorial-border))] p-10 text-center">
                  <h2 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                    Nenhum conteúdo encontrado
                  </h2>
                  <p className="mt-3 text-[hsl(var(--editorial-gray))]">
                    Tente buscar por outro termo ou volte para a página inicial para navegar pelas áreas do portal.
                  </p>
                  <AppLink href="/" className="btn-primary mt-6 inline-flex">
                    Voltar para Home
                  </AppLink>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <MostReadList articles={mostRead} />

              <div className="bg-white rounded-lg border border-[hsl(var(--editorial-border))] p-5">
                <h3 className="font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">
                  Navegue por editorias
                </h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <AppLink
                        href={`/categoria/${category.slug}`}
                        className="flex items-center justify-between text-sm text-[hsl(var(--editorial-gray))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                      >
                        <span>{category.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[hsl(var(--editorial-surface))] rounded-lg p-5">
                <h3 className="font-bold text-[hsl(var(--editorial-gray-dark))] mb-2">
                  Precisa de um atalho?
                </h3>
                <p className="text-sm text-[hsl(var(--editorial-gray))] mb-4">
                  Use a busca do topo para localizar notícias por tema, autor, categoria ou palavra-chave.
                </p>
                <AppLink href="/contato" className="btn-primary w-full text-center block text-sm py-2">
                  Falar com a redação
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
