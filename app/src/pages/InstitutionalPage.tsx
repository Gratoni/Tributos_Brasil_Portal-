import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { useSeo } from '@/hooks/useSeo';

interface InstitutionalPageProps {
  variant: 'advertise' | 'careers';
}

const pageContent = {
  advertise: {
    title: 'Anuncie no portal',
    description:
      'Apresente sua marca para um publico qualificado de advogados, contadores, consultores e liderancas empresariais.',
    primaryHref: '/contato?assunto=Midia%20e%20parcerias',
    primaryLabel: 'Solicitar proposta comercial',
    highlights: [
      'Formatos institucionais e patrocinados com distribuicao editorial.',
      'Acoes sob medida para lancamentos, eventos e campanhas de educacao tributaria.',
      'Acompanhamento comercial com definicao de objetivo, publico e prazo.',
    ],
    checklist: [
      'Objetivo da campanha e periodo desejado.',
      'Tema, segmento ou categoria de interesse.',
      'Necessidade de apoio editorial, branded content ou banner.',
    ],
  },
  careers: {
    title: 'Trabalhe conosco',
    description:
      'Estamos sempre abertos a profissionais que somem profundidade tecnica, clareza editorial e foco em servico.',
    primaryHref: 'mailto:contato@tributosbrasil.com.br?subject=Banco%20de%20talentos%20-%20Info%20Tributos',
    primaryLabel: 'Enviar curriculo por e-mail',
    highlights: [
      'Oportunidades para redacao, analise tributaria, marketing e operacao comercial.',
      'Ambiente orientado a conteudo tecnico, agilidade e colaboracao.',
      'Recebimento continuo de curriculos para banco de talentos.',
    ],
    checklist: [
      'Curriculo atualizado em PDF.',
      'Breve apresentacao com area de especialidade.',
      'Links para portfolio, artigos ou perfis profissionais.',
    ],
  },
} as const;

export function InstitutionalPage({ variant }: InstitutionalPageProps) {
  const content = pageContent[variant];

  useSeo({
    title: content.title,
    description: content.description,
  });

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: content.title },
        ]}
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                {content.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-[hsl(var(--editorial-gray))]">
                {content.description}
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-4">
                {content.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-white p-5"
                  >
                    <p className="text-sm leading-6 text-[hsl(var(--editorial-gray-dark))]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[hsl(var(--editorial-surface))] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Como agilizar o atendimento
              </h2>
              <ul className="mt-5 space-y-3">
                {content.checklist.map((item) => (
                  <li key={item} className="rounded-xl bg-white px-4 py-3 text-sm text-[hsl(var(--editorial-gray-dark))]">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <AppLink href={content.primaryHref} className="btn-primary text-center">
                  {content.primaryLabel}
                </AppLink>
                <AppLink href="/contato" className="btn-secondary text-center">
                  Falar com a equipe
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
