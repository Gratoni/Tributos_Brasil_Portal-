import { useState } from 'react';
import { Search } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';

const summaries = [
  {
    id: '1',
    tribunal: 'STF',
    topic: 'ICMS na base do PIS/COFINS',
    thesis:
      'O ICMS destacado nao integra a base de calculo do PIS e da COFINS para fins de apuracao das contribuicoes.',
    impact: 'Revisao de calculos, recuperacao de credito e ajuste de processos internos.',
    href: '/noticias/stf-decide-icms-base-calculo-pis-cofins-inconstitucional',
  },
  {
    id: '2',
    tribunal: 'STJ',
    topic: 'Exclusao do ICMS do PIS/COFINS',
    thesis:
      'A tese consolidada reforca limites de composicao da receita tributavel e orienta litigios similares.',
    impact: 'Apoia analise de contencioso e revisao de estrategia em recuperacao tributaria.',
    href: '/noticias/stj-define-tese-exclusao-icms-pis-cofins',
  },
  {
    id: '3',
    tribunal: 'CARF',
    topic: 'Transfer pricing',
    thesis:
      'Entendimento sumulado busca uniformizar a leitura administrativa sobre precos de transferencia em operacoes especificas.',
    impact: 'Influencia defesa administrativa e documentacao de suporte.',
    href: '/noticias/carf-publica-nova-sumula-transfer-pricing',
  },
] as const;

export function SumulasPage() {
  const [query, setQuery] = useState('');
  const [tribunal, setTribunal] = useState<'Todos' | 'STF' | 'STJ' | 'CARF'>('Todos');

  const visibleSummaries = summaries.filter((item) => {
    const matchesTribunal = tribunal === 'Todos' || item.tribunal === tribunal;
    const haystack = `${item.topic} ${item.thesis} ${item.impact}`.toLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLowerCase());

    return matchesTribunal && matchesQuery;
  });

  return (
    <PageShell activeItem="/categoria/jurisprudencia">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/categoria/jurisprudencia', label: 'Jurisprudencia' },
          { label: 'Banco de Sumulas' },
        ]}
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
              Banco de sumulas e entendimentos
            </h1>
            <p className="mt-4 text-lg text-[hsl(var(--editorial-gray))]">
              Consulte rapidamente precedentes relevantes, filtre por tribunal e avance para a leitura da materia relacionada.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-[minmax(0,1fr)_220px] gap-4">
            <label className="relative block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--editorial-gray))]" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por tema, tese ou impacto"
                className="form-input pl-11"
              />
            </label>
            <select
              value={tribunal}
              onChange={(event) => setTribunal(event.target.value as 'Todos' | 'STF' | 'STJ' | 'CARF')}
              className="form-input"
            >
              <option value="Todos">Todos os tribunais</option>
              <option value="STF">STF</option>
              <option value="STJ">STJ</option>
              <option value="CARF">CARF</option>
            </select>
          </div>

          <div className="mt-8 space-y-4">
            {visibleSummaries.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-white p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[hsl(var(--editorial-surface))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--editorial-blue))]">
                    {item.tribunal}
                  </span>
                  <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">{item.topic}</h2>
                </div>
                <p className="mt-4 text-[hsl(var(--editorial-gray-dark))] leading-7">{item.thesis}</p>
                <p className="mt-3 text-sm text-[hsl(var(--editorial-gray))]">
                  Impacto pratico: {item.impact}
                </p>
                <AppLink href={item.href} className="section-link inline-flex mt-5">
                  Abrir materia relacionada
                </AppLink>
              </article>
            ))}

            {visibleSummaries.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[hsl(var(--editorial-border))] p-8 text-center text-[hsl(var(--editorial-gray))]">
                Nenhum entendimento encontrado com os filtros atuais.
              </div>
            )}
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
