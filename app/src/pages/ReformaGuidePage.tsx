import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { NewsCard } from '@/components/news/NewsCard';
import { Seo } from '@/components/common/Seo';
import { JsonLd } from '@/components/common/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { getNewsByCategory } from '@/data/mockData';

const guideSections = [
  {
    title: '1. Mapeie o impacto no seu negocio',
    points: [
      'Revise a cadeia de receitas, insumos e contratos mais sensiveis.',
      'Identifique onde a operacao depende de creditos tributarios ou regimes especificos.',
      'Liste sistemas, times e rotinas que precisam de atualizacao.',
    ],
  },
  {
    title: '2. Prepare a governanca da transicao',
    points: [
      'Defina um responsavel interno para acompanhar cronograma, riscos e comunicacao.',
      'Conecte fiscal, juridico, financeiro, comercial e tecnologia em uma mesma trilha de decisao.',
      'Crie checkpoints executivos para acompanhar impactos e priorizar ajustes.',
    ],
  },
  {
    title: '3. Transforme noticia em plano de acao',
    points: [
      'Converta mudancas normativas em tarefas com dono, prazo e criterio de conclusao.',
      'Atualize politicas internas e treine as areas operacionais.',
      'Use simulacoes periodicas para comparar cenarios antes das decisoes finais.',
    ],
  },
] as const;

export function ReformaGuidePage() {
  const reformArticles = getNewsByCategory('reforma-tributaria');

  return (
    <PageShell activeItem="/categoria/reforma-tributaria">
      <Seo
        title="Guia Prático da Reforma Tributária (IBS e CBS)"
        description="Roteiro completo para empresas se prepararem para a Reforma Tributária: impactos, governança da transição e plano de ação com IBS e CBS."
        canonical="/guia-reforma-tributaria"
      />
      <JsonLd
        id="reforma-guide-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Reforma Tributária', url: '/categoria/reforma-tributaria' },
          { name: 'Guia Completo', url: '/guia-reforma-tributaria' },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/categoria/reforma-tributaria', label: 'Reforma Tributaria' },
          { label: 'Guia Completo' },
        ]}
      />

      <section className="py-12 bg-[hsl(var(--editorial-surface))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
              Guia pratico da Reforma Tributaria
            </h1>
            <p className="mt-4 text-lg text-[hsl(var(--editorial-gray))]">
              Um roteiro objetivo para transformar o acompanhamento da reforma em preparacao real da operacao.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {guideSections.map((section) => (
              <div key={section.title} className="rounded-2xl bg-white border border-[hsl(var(--editorial-border))] p-6">
                <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">{section.title}</h2>
                <ul className="mt-4 space-y-3 text-sm text-[hsl(var(--editorial-gray))]">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <AppLink href="/calculadora-reforma" className="btn-primary">
              Abrir simulador de impacto
            </AppLink>
            <AppLink href="/alertas-reforma" className="btn-secondary">
              Ver alertas de preparo
            </AppLink>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Conteudos relacionados</h2>
            <AppLink href="/categoria/reforma-tributaria" className="section-link">
              Ver editoria completa
            </AppLink>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reformArticles.slice(0, 4).map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="default"
                showExcerpt={true}
                showAuthor={true}
              />
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
