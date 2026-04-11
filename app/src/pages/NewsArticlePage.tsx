import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Clock,
  Calendar,
  Eye,
  Facebook,
  Twitter,
  Linkedin,
  Printer,
  Bookmark,
  Tag,
  ChevronRight,
} from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { getNewsBySlug, getRelatedNews } from '@/data/mockData';
import {
  buildFacebookShareUrl,
  buildLinkedInProfileUrl,
  buildLinkedInShareUrl,
  buildTwitterProfileUrl,
  buildTwitterShareUrl,
} from '@/lib/social';
import type { NewsArticle } from '@/types';

interface NewsArticlePageProps {
  slug?: string;
}

const storageKey = 'tributos-brasil-saved-articles';

const getInitialSavedArticles = () => {
  if (typeof window === 'undefined') {
    return [] as string[];
  }

  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? '[]') as string[];
  } catch {
    return [] as string[];
  }
};

export function NewsArticlePage({ slug: propSlug }: NewsArticlePageProps = {}) {
  const params = useParams();
  const slug = propSlug || params.slug || 'reforma-tributaria-entenda-novas-regras-ibs-cbs-2025';
  const [savedArticles, setSavedArticles] = useState<string[]>(getInitialSavedArticles);

  const article = useMemo<NewsArticle | null>(() => getNewsBySlug(slug) ?? null, [slug]);
  const relatedArticles = useMemo<NewsArticle[]>(() => {
    if (!article) {
      return [];
    }

    return getRelatedNews(article, 3);
  }, [article]);
  const isSaved = article ? savedArticles.includes(article.slug) : false;

  useEffect(() => {
    const handleStorage = () => {
      setSavedArticles(getInitialSavedArticles());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (!article) {
    return (
      <PageShell>
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))] mb-2">
              Notícia não encontrada
            </h1>
            <p className="text-[hsl(var(--editorial-gray))] mb-4">
              A matéria que você procura não está disponível.
            </p>
            <AppLink href="/" className="btn-primary">
              Voltar para Home
            </AppLink>
          </div>
        </section>
      </PageShell>
    );
  }

  const articleUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://tributosbrasil.com.br/noticias/${article.slug}`;

  const toggleSavedArticle = () => {
    setSavedArticles((currentSavedArticles) => {
      const nextSavedArticles = currentSavedArticles.includes(article.slug)
        ? currentSavedArticles.filter((item) => item !== article.slug)
        : [...currentSavedArticles, article.slug];

      window.localStorage.setItem(storageKey, JSON.stringify(nextSavedArticles));
      return nextSavedArticles;
    });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const categoryColorClass = `category-tag-${article.category.color}`;

  return (
    <PageShell activeItem={`/categoria/${article.category.slug}`}>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: `/categoria/${article.category.slug}`, label: article.category.name },
          { label: article.title },
        ]}
      />

      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <span className={`category-tag ${categoryColorClass} mb-4`}>
              {article.category.name}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))] mb-4 leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-xl text-[hsl(var(--editorial-gray))] mb-6 leading-relaxed">
                {article.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[hsl(var(--editorial-border))]">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <AppLink
                    href={`/colunistas/${article.author.slug}`}
                    className="font-medium text-[hsl(var(--editorial-gray-dark))] hover:text-[hsl(var(--editorial-blue))]"
                  >
                    {article.author.name}
                  </AppLink>
                  <p className="text-xs text-[hsl(var(--editorial-gray))]">{article.author.role}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-[hsl(var(--editorial-border))]" />

              <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--editorial-gray))]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishedAt)} às {formatTime(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min de leitura
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {article.views.toLocaleString('pt-BR')} visualizações
                </span>
              </div>
            </div>
          </header>

          {article.featuredImage && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-card">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            <div>
              <div className="prose prose-lg max-w-none editorial-prose mb-8">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tagItem) => (
                  <AppLink
                    key={tagItem.id}
                    href={`/tag/${tagItem.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[hsl(var(--editorial-surface))] text-sm text-[hsl(var(--editorial-gray-dark))] hover:bg-[hsl(var(--editorial-border))] transition-colors"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {tagItem.name}
                  </AppLink>
                ))}
              </div>

              <div className="rounded-2xl border border-[hsl(var(--editorial-border))] p-6 bg-white mb-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))]">
                      Compartilhe esta matéria
                    </h2>
                    <p className="text-sm text-[hsl(var(--editorial-gray))]">
                      Envie para colegas e acompanhe a cobertura tributária.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <AppLink
                      href={buildFacebookShareUrl(articleUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[hsl(var(--editorial-surface))] hover:bg-[hsl(var(--editorial-border))] transition-colors"
                      aria-label="Compartilhar no Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </AppLink>
                    <AppLink
                      href={buildTwitterShareUrl(articleUrl, article.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[hsl(var(--editorial-surface))] hover:bg-[hsl(var(--editorial-border))] transition-colors"
                      aria-label="Compartilhar no X"
                    >
                      <Twitter className="w-4 h-4" />
                    </AppLink>
                    <AppLink
                      href={buildLinkedInShareUrl(articleUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[hsl(var(--editorial-surface))] hover:bg-[hsl(var(--editorial-border))] transition-colors"
                      aria-label="Compartilhar no LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </AppLink>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[hsl(var(--editorial-surface))] hover:bg-[hsl(var(--editorial-border))] transition-colors"
                      aria-label="Imprimir"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={toggleSavedArticle}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                        isSaved
                          ? 'bg-[hsl(var(--editorial-blue))] text-white'
                          : 'bg-[hsl(var(--editorial-surface))] hover:bg-[hsl(var(--editorial-border))]'
                      }`}
                      aria-label={isSaved ? 'Remover dos salvos' : 'Salvar artigo'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-20 h-20 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <AppLink
                      href={`/colunistas/${article.author.slug}`}
                      className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))] hover:text-[hsl(var(--editorial-blue))]"
                    >
                      {article.author.name}
                    </AppLink>
                    <p className="text-sm text-[hsl(var(--editorial-blue))] mb-2">{article.author.role}</p>
                    <p className="text-sm text-[hsl(var(--editorial-gray))]">{article.author.bio}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {article.author.social?.twitter && (
                        <AppLink
                          href={buildTwitterProfileUrl(article.author.social.twitter)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-[hsl(var(--editorial-blue))] hover:underline"
                        >
                          X
                        </AppLink>
                      )}
                      {article.author.social?.linkedin && (
                        <AppLink
                          href={buildLinkedInProfileUrl(article.author.social.linkedin)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-[hsl(var(--editorial-blue))] hover:underline"
                        >
                          LinkedIn
                        </AppLink>
                      )}
                      {article.author.social?.email && (
                        <AppLink
                          href={`mailto:${article.author.social.email}`}
                          className="text-sm text-[hsl(var(--editorial-blue))] hover:underline"
                        >
                          E-mail
                        </AppLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-white p-6 shadow-card">
                <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">
                  Matérias relacionadas
                </h2>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <AppLink
                      key={relatedArticle.id}
                      href={`/noticias/${relatedArticle.slug}`}
                      className="group block"
                    >
                      <div className="flex gap-3">
                        <img
                          src={relatedArticle.featuredImage}
                          alt={relatedArticle.title}
                          className="w-20 h-20 rounded-lg object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-xs uppercase tracking-[0.12em] text-[hsl(var(--editorial-blue))] mb-1">
                            {relatedArticle.category.name}
                          </p>
                          <h3 className="text-sm font-semibold text-[hsl(var(--editorial-gray-dark))] group-hover:text-[hsl(var(--editorial-blue))] transition-colors line-clamp-3">
                            {relatedArticle.title}
                          </h3>
                        </div>
                      </div>
                    </AppLink>
                  ))}
                </div>
              </div>

              <NewsletterBox />

              <div className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-white p-6 shadow-card">
                <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))] mb-3">
                  Navegação rápida
                </h2>
                <div className="space-y-2 text-sm">
                  <AppLink
                    href="/noticias"
                    className="flex items-center justify-between text-[hsl(var(--editorial-gray-dark))] hover:text-[hsl(var(--editorial-blue))]"
                  >
                    Últimas notícias
                    <ChevronRight className="w-4 h-4" />
                  </AppLink>
                  <AppLink
                    href={`/categoria/${article.category.slug}`}
                    className="flex items-center justify-between text-[hsl(var(--editorial-gray-dark))] hover:text-[hsl(var(--editorial-blue))]"
                  >
                    Mais em {article.category.name}
                    <ChevronRight className="w-4 h-4" />
                  </AppLink>
                  <AppLink
                    href="/colunistas"
                    className="flex items-center justify-between text-[hsl(var(--editorial-gray-dark))] hover:text-[hsl(var(--editorial-blue))]"
                  >
                    Ver colunistas
                    <ChevronRight className="w-4 h-4" />
                  </AppLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
