import { Clock, ShieldCheck } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { getNewsByCategory } from '@/data/mockData';

const checkpoints = [
  {
    title: 'Mapeamento de contratos e precificacao',
    priority: 'Alta',
    description:
      'Revise clausulas de repasse, composicao de preco e indicadores de margem antes da virada operacional.',
  },
  {
    title: 'Revisao de cadastro e regras fiscais no ERP',
    priority: 'Alta',
    description:
      'Garanta que NCM, regras de credito, CFOP e parametrizacoes estejam alinhados ao cenario que voce pretende simular.',
  },
  {
    title: 'Treinamento das areas impactadas',
    priority: 'Media',
    description:
      'Fiscal, controladoria, comercial e compras precisam entender o fluxo da transicao e as mudancas nos documentos.',
  },
  {
    title: 'Comunicacao executiva e com fornecedores',
    priority: 'Media',
    description:
      'Defina um rito de comunicacao para manter liderancas e parceiros atentos a dependencias e prazos criticos.',
  },
] as const;

export function ReformaAlertsPage() {
  const reformArticles = getNewsByCategory('reforma-tributaria');

  return (
    <PageShell activeItem="/categoria/reforma-tributaria">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/categoria/reforma-tributaria', label: 'Reforma Tributaria' },
          { label: 'Alertas de Preparo' },
        ]}
      />

      <section className="py-12 bg-[hsl(var(--editorial-surface))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
              Alertas e frentes de preparacao
            </h1>
            <p className="mt-4 text-lg text-[hsl(var(--editorial-gray))]">
              Organize a transicao em uma fila clara de prioridades para nao deixar contratos, sistema e governanca para a ultima hora.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {checkpoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">{item.title}</h2>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--cat-alertas))]">
                    {item.priority}
                  </span>
                </div>
                <p className="mt-4 text-[hsl(var(--editorial-gray))] leading-7">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-white border border-[hsl(var(--editorial-border))] p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 text-[hsl(var(--editorial-blue))]">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-semibold">Proxima acao sugerida</span>
            </div>
            <p className="mt-3 text-[hsl(var(--editorial-gray))]">
              Se voce ainda nao abriu uma frente formal de transicao, comece pela simulacao de impacto e, na sequencia, transforme os achados em uma agenda semanal com responsaveis.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <AppLink href="/calculadora-reforma" className="btn-primary">
                Rodar simulacao
              </AppLink>
              <AppLink href="/contato?assunto=Plano%20de%20transicao%20tributaria" className="btn-secondary">
                Montar plano com a equipe
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Leituras para acompanhar</h2>
            <span className="text-sm text-[hsl(var(--editorial-gray))] inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Atualize sua fila de acompanhamento
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reformArticles.slice(0, 4).map((article) => (
              <AppLink
                key={article.id}
                href={`/noticias/${article.slug}`}
                className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-white p-6 hover:shadow-card transition-shadow"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--cat-reforma))]">
                  {article.category.name}
                </p>
                <h3 className="mt-3 text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm text-[hsl(var(--editorial-gray))] line-clamp-3">
                  {article.excerpt}
                </p>
              </AppLink>
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
