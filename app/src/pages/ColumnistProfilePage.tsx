import { useParams } from 'react-router-dom';
import { Linkedin, Mail, Twitter } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { NewsCard } from '@/components/news/NewsCard';
import { getAuthorBySlug, getColumnistBySlug, getNewsByAuthor } from '@/data/mockData';
import { buildLinkedInProfileUrl, buildTwitterProfileUrl } from '@/lib/social';

export function ColumnistProfilePage() {
  const { slug = '' } = useParams();
  const author = getAuthorBySlug(slug);
  const columnist = getColumnistBySlug(slug);
  const articles = getNewsByAuthor(slug);

  if (!author) {
    return (
      <PageShell activeItem="/colunistas">
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-[hsl(var(--editorial-gray-dark))]">
              Colunista nao encontrado
            </h1>
            <p className="mt-4 text-[hsl(var(--editorial-gray))]">
              O perfil solicitado nao esta disponivel no momento.
            </p>
            <AppLink href="/colunistas" className="btn-primary mt-6 inline-flex">
              Ver diretorio de colunistas
            </AppLink>
          </div>
        </section>
      </PageShell>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <PageShell activeItem="/colunistas">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/colunistas', label: 'Colunistas' },
          { label: author.name },
        ]}
      />

      <section className="py-12 bg-gradient-to-br from-[hsl(var(--editorial-blue))] to-[hsl(var(--editorial-blue-dark))] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-8 items-center">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-48 h-48 md:w-56 md:h-56 rounded-3xl object-cover border-4 border-white/20"
              loading="lazy"
            />
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">{author.role}</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold">{author.name}</h1>
              {columnist?.specialty && (
                <p className="mt-3 text-lg text-white/85">{columnist.specialty}</p>
              )}
              <p className="mt-4 max-w-3xl text-white/80 leading-7">{author.bio}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {author.social?.email && (
                  <AppLink
                    href={`mailto:${author.social.email}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[hsl(var(--editorial-blue))]"
                  >
                    <Mail className="w-4 h-4" />
                    Enviar e-mail
                  </AppLink>
                )}
                {author.social?.twitter && (
                  <AppLink
                    href={buildTwitterProfileUrl(author.social.twitter)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Ver perfil no X
                  </AppLink>
                )}
                {author.social?.linkedin && (
                  <AppLink
                    href={buildLinkedInProfileUrl(author.social.linkedin)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </AppLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Publicacoes do autor
              </h2>
              <p className="text-[hsl(var(--editorial-gray))]">
                {articles.length} {articles.length === 1 ? 'conteudo encontrado' : 'conteudos encontrados'}
              </p>
            </div>
            <AppLink href="/contato" className="btn-secondary text-sm">
              Solicitar consultoria
            </AppLink>
          </div>

          {featuredArticle ? (
            <>
              <NewsCard
                article={featuredArticle}
                variant="horizontal"
                showExcerpt={true}
                showAuthor={false}
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
                      showAuthor={false}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[hsl(var(--editorial-border))] p-8 text-center">
              <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Ainda nao ha publicacoes vinculadas a este perfil
              </h2>
              <p className="mt-3 text-[hsl(var(--editorial-gray))]">
                Enquanto isso, voce pode falar com a equipe ou navegar pelas editorias principais do portal.
              </p>
            </div>
          )}
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
