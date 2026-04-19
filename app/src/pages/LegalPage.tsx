import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { useSeo } from '@/hooks/useSeo';

interface LegalPageProps {
  variant: 'privacy' | 'terms' | 'lgpd';
}

const legalContent = {
  privacy: {
    title: 'Politica de Privacidade',
    updatedAt: 'Atualizada para a versao editorial vigente do portal.',
    sections: [
      {
        title: 'Coleta de dados',
        paragraphs: [
          'Coletamos os dados informados por voce em formularios, newsletter e canais de contato para viabilizar atendimento, envio de comunicacoes e melhoria da experiencia.',
          'Tambem podemos registrar informacoes tecnicas basicas de navegacao, como pagina acessada, data e dispositivo, sempre com foco operacional e analitico.',
        ],
      },
      {
        title: 'Uso das informacoes',
        paragraphs: [
          'Os dados sao utilizados para responder solicitacoes, enviar conteudo solicitado, personalizar a navegacao e manter a seguranca do ambiente digital.',
          'Nao comercializamos bases de dados pessoais e limitamos o tratamento ao necessario para a finalidade apresentada ao usuario.',
        ],
      },
      {
        title: 'Compartilhamento e seguranca',
        paragraphs: [
          'Podemos compartilhar informacoes com fornecedores operacionais que apoiam o funcionamento do portal, sempre sob obrigacao de confidencialidade e protecao adequada.',
          'Adotamos medidas administrativas e tecnicas para reduzir riscos de acesso indevido, perda ou uso nao autorizado.',
        ],
      },
    ],
  },
  terms: {
    title: 'Termos de Uso',
    updatedAt: 'Condicoes de uso aplicaveis ao ambiente editorial e institucional.',
    sections: [
      {
        title: 'Uso permitido',
        paragraphs: [
          'O conteudo do portal deve ser utilizado para informacao e apoio a tomada de decisao, sem substituir analise tecnica individualizada ou parecer profissional especifico.',
          'E vedado utilizar o site para fins ilicitos, tentativas de violacao, raspagem abusiva ou reproducoes que infrinjam direitos autorais e de marca.',
        ],
      },
      {
        title: 'Responsabilidades',
        paragraphs: [
          'Nos esforcamos para manter o portal atualizado e funcional, mas nao garantimos disponibilidade ininterrupta nem ausencia absoluta de erros.',
          'Cabe ao usuario validar a aplicacao pratica das informacoes antes de adotar medidas fiscais, juridicas ou empresariais.',
        ],
      },
      {
        title: 'Propriedade intelectual',
        paragraphs: [
          'Textos, identidade visual, estrutura editorial e demais materiais do portal sao protegidos por direitos autorais e demais normas aplicaveis.',
          'Qualquer reutilizacao relevante depende de autorizacao previa, salvo hipoteses legais expressamente permitidas.',
        ],
      },
    ],
  },
  lgpd: {
    title: 'Compromisso com a LGPD',
    updatedAt: 'Diretrizes de privacidade alinhadas ao tratamento responsavel de dados.',
    sections: [
      {
        title: 'Direitos do titular',
        paragraphs: [
          'Voce pode solicitar confirmacao de tratamento, acesso, correcao, atualizacao, eliminacao de dados desnecessarios e informacoes sobre compartilhamento, quando cabivel.',
          'As solicitacoes sao avaliadas conforme a legislacao aplicavel e a natureza da relacao mantida com o portal.',
        ],
      },
      {
        title: 'Bases legais e governanca',
        paragraphs: [
          'Tratamos dados com base em hipoteses legais adequadas, como consentimento, execucao de procedimentos preliminares, cumprimento de obrigacao legal e legitimo interesse.',
          'Mantemos processos internos para revisar acessos, registrar fluxos de dados e orientar equipes sobre boas praticas de privacidade.',
        ],
      },
      {
        title: 'Canal do titular',
        paragraphs: [
          'Para exercer direitos previstos na LGPD, utilize nosso canal de contato institucional com o assunto "Privacidade e LGPD".',
          'Nossa equipe responde solicitacoes com linguagem clara e foco em resolucao pratica.',
        ],
      },
    ],
  },
} as const;

export function LegalPage({ variant }: LegalPageProps) {
  const content = legalContent[variant];

  useSeo({
    title: content.title,
    description: `${content.title} do portal Tributos Brasil.`,
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
              {content.title}
            </h1>
            <p className="mt-4 text-[hsl(var(--editorial-gray))]">{content.updatedAt}</p>
          </header>

          <div className="space-y-8">
            {content.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-white p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[hsl(var(--editorial-gray))] leading-7">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[hsl(var(--editorial-surface))] p-6">
            <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
              Precisa tratar um tema especifico?
            </h2>
            <p className="mt-3 text-[hsl(var(--editorial-gray))]">
              Entre em contato com a equipe institucional para demandas de privacidade, uso de conteudo, atualizacoes cadastrais ou esclarecimentos legais.
            </p>
            <AppLink href="/contato?assunto=Privacidade%20e%20LGPD" className="btn-primary mt-5 inline-flex">
              Falar com a equipe
            </AppLink>
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
