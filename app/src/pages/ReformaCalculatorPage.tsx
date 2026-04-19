import { useState } from 'react';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { Seo } from '@/components/common/Seo';
import { JsonLd } from '@/components/common/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function ReformaCalculatorPage() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(250000);
  const [currentRate, setCurrentRate] = useState(16);
  const [estimatedRate, setEstimatedRate] = useState(18);
  const [creditRate, setCreditRate] = useState(4);

  const currentBurden = monthlyRevenue * (currentRate / 100);
  const projectedGross = monthlyRevenue * (estimatedRate / 100);
  const projectedCredits = monthlyRevenue * (creditRate / 100);
  const projectedNet = Math.max(projectedGross - projectedCredits, 0);
  const difference = projectedNet - currentBurden;

  return (
    <PageShell activeItem="/categoria/reforma-tributaria">
      <Seo
        title="Calculadora de Impacto da Reforma Tributária"
        description="Simule o impacto da Reforma Tributária no faturamento da sua empresa: compare alíquota atual, alíquota projetada e créditos estimados."
        canonical="/calculadora-reforma"
      />
      <JsonLd
        id="reforma-calc-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Reforma Tributária', url: '/categoria/reforma-tributaria' },
          { name: 'Calculadora', url: '/calculadora-reforma' },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/categoria/reforma-tributaria', label: 'Reforma Tributaria' },
          { label: 'Calculadora de Impacto' },
        ]}
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] gap-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Simulador de impacto
              </h1>
              <p className="mt-4 text-lg text-[hsl(var(--editorial-gray))]">
                Use uma simulacao indicativa para comparar carga atual, carga estimada e efeito dos creditos esperados.
              </p>

              <div className="mt-8 space-y-5">
                <label className="block">
                  <span className="block mb-2 font-medium text-[hsl(var(--editorial-gray-dark))]">
                    Faturamento mensal
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={monthlyRevenue}
                    onChange={(event) => setMonthlyRevenue(Number(event.target.value))}
                    className="form-input"
                  />
                </label>

                <label className="block">
                  <span className="block mb-2 font-medium text-[hsl(var(--editorial-gray-dark))]">
                    Carga tributaria atual (%)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={currentRate}
                    onChange={(event) => setCurrentRate(Number(event.target.value))}
                    className="form-input"
                  />
                </label>

                <label className="block">
                  <span className="block mb-2 font-medium text-[hsl(var(--editorial-gray-dark))]">
                    Aliquota estimada no novo cenario (%)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={estimatedRate}
                    onChange={(event) => setEstimatedRate(Number(event.target.value))}
                    className="form-input"
                  />
                </label>

                <label className="block">
                  <span className="block mb-2 font-medium text-[hsl(var(--editorial-gray-dark))]">
                    Percentual de creditos aproveitaveis (%)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={creditRate}
                    onChange={(event) => setCreditRate(Number(event.target.value))}
                    className="form-input"
                  />
                </label>
              </div>

              <p className="mt-6 text-sm text-[hsl(var(--editorial-gray))]">
                Esta ferramenta e indicativa e serve como apoio inicial de conversa. Para calculos definitivos, considere regras especificas, regime, cadeia de creditos e validacao tecnica.
              </p>
            </div>

            <div className="rounded-3xl bg-[hsl(var(--editorial-surface))] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Resultado estimado
              </h2>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 border border-[hsl(var(--editorial-border))]">
                  <p className="text-sm text-[hsl(var(--editorial-gray))]">Carga atual</p>
                  <p className="mt-2 text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                    {currency.format(currentBurden)}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-[hsl(var(--editorial-border))]">
                  <p className="text-sm text-[hsl(var(--editorial-gray))]">Carga projetada bruta</p>
                  <p className="mt-2 text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                    {currency.format(projectedGross)}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-[hsl(var(--editorial-border))]">
                  <p className="text-sm text-[hsl(var(--editorial-gray))]">Creditos estimados</p>
                  <p className="mt-2 text-2xl font-bold text-[hsl(var(--cat-empresarial))]">
                    {currency.format(projectedCredits)}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-[hsl(var(--editorial-border))]">
                  <p className="text-sm text-[hsl(var(--editorial-gray))]">Carga liquida simulada</p>
                  <p className="mt-2 text-2xl font-bold text-[hsl(var(--editorial-blue))]">
                    {currency.format(projectedNet)}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white p-6 border border-[hsl(var(--editorial-border))]">
                <p className="text-sm text-[hsl(var(--editorial-gray))]">Variacao estimada</p>
                <p
                  className={`mt-2 text-3xl font-bold ${
                    difference > 0 ? 'text-[hsl(var(--cat-alertas))]' : 'text-[hsl(var(--cat-empresarial))]'
                  }`}
                >
                  {difference >= 0 ? '+' : '-'}
                  {currency.format(Math.abs(difference))}
                </p>
                <p className="mt-3 text-sm text-[hsl(var(--editorial-gray))]">
                  Use este numero para priorizar revisao de contratos, precificacao e agenda de transicao.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <AppLink href="/contato?assunto=Simulacao%20de%20impacto%20tributario" className="btn-primary">
                  Validar com especialista
                </AppLink>
                <AppLink href="/guia-reforma-tributaria" className="btn-secondary">
                  Voltar ao guia
                </AppLink>
              </div>
            </div>
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
