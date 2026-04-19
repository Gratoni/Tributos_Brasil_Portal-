import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, MessageCircle, Loader2 } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageShell } from '@/components/layout/PageShell';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { Seo } from '@/components/common/Seo';
import { JsonLd } from '@/components/common/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { sendContactMessage } from '@/services/forms.service';
import { siteConfig } from '@/config/site';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('assunto') ?? '';
  const [subject, setSubject] = useState(initialSubject);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    setSubject(initialSubject);
  }, [initialSubject]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setStatusMessage('Preencha nome, e-mail e mensagem para enviarmos o contato.');
      return;
    }

    const finalSubject = subject.trim() || 'Contato pelo portal Tributos Brasil';

    setStatus('loading');
    setStatusMessage('');

    const result = await sendContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      subject: finalSubject,
      message: message.trim(),
    });

    if (result.ok) {
      setStatus('success');
      setStatusMessage(
        result.mode === 'api'
          ? 'Mensagem enviada! Nossa equipe responderá em até 1 dia útil.'
          : 'Seu cliente de e-mail foi acionado com os dados preenchidos.',
      );
      if (result.mode === 'mailto' && result.mailtoUrl) {
        window.location.href = result.mailtoUrl;
      } else {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } else {
      setStatus('error');
      setStatusMessage(result.error ?? 'Não foi possível enviar agora. Tente novamente em instantes.');
    }
  };

  return (
    <PageShell activeItem="/contato">
      <Seo
        title="Fale com o Tributos Brasil"
        description="Canal direto para leitores, empresas e profissionais. Envie sua mensagem, fale pelo WhatsApp ou por telefone com nossa equipe."
        canonical="/contato"
      />
      <JsonLd
        id="contact-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Contato', url: '/contato' },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Contato' },
        ]}
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8">
            <div>
              <span className="inline-flex rounded-full bg-[hsl(var(--editorial-surface))] px-4 py-1.5 text-sm font-medium text-[hsl(var(--editorial-blue))]">
                Fale com a nossa equipe
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Contato rapido e direcionado
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--editorial-gray))]">
                Use o formulario para abrir seu e-mail com a mensagem pronta ou fale conosco pelos canais diretos abaixo.
              </p>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <AppLink
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="rounded-2xl border border-[hsl(var(--editorial-border))] p-5 bg-white hover:shadow-card transition-shadow"
                >
                  <Mail className="w-6 h-6 text-[hsl(var(--editorial-blue))]" />
                  <h2 className="mt-4 font-bold text-[hsl(var(--editorial-gray-dark))]">E-mail institucional</h2>
                  <p className="mt-2 text-sm text-[hsl(var(--editorial-gray))]">{siteConfig.supportEmail}</p>
                </AppLink>

                <AppLink
                  href={`tel:${siteConfig.supportPhoneHref}`}
                  className="rounded-2xl border border-[hsl(var(--editorial-border))] p-5 bg-white hover:shadow-card transition-shadow"
                >
                  <Phone className="w-6 h-6 text-[hsl(var(--editorial-blue))]" />
                  <h2 className="mt-4 font-bold text-[hsl(var(--editorial-gray-dark))]">Atendimento comercial</h2>
                  <p className="mt-2 text-sm text-[hsl(var(--editorial-gray))]">{siteConfig.supportPhone}</p>
                </AppLink>

                <AppLink
                  href={siteConfig.supportWhatsApp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-green-200 p-5 bg-green-50 hover:shadow-card transition-shadow"
                >
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <h2 className="mt-4 font-bold text-[hsl(var(--editorial-gray-dark))]">WhatsApp</h2>
                  <p className="mt-2 text-sm text-green-700">{siteConfig.supportPhone}</p>
                </AppLink>
              </div>

              <div className="mt-6 rounded-2xl bg-[hsl(var(--editorial-surface))] p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[hsl(var(--editorial-blue))] mt-1" />
                  <div>
                    <h2 className="font-bold text-[hsl(var(--editorial-gray-dark))]">Base de atendimento</h2>
                    <p className="mt-2 text-[hsl(var(--editorial-gray))]">
                      Av. Paulista, 1000, Bela Vista
                      <br />
                      Sao Paulo - SP, CEP 01310-100
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <AppLink href="/anuncie" className="btn-secondary text-sm">
                  Quero anunciar
                </AppLink>
                <AppLink href="/trabalhe-conosco" className="btn-secondary text-sm">
                  Trabalhe conosco
                </AppLink>
              </div>
            </div>

            <div className="rounded-3xl border border-[hsl(var(--editorial-border))] bg-white p-6 md:p-8 shadow-card">
              <h2 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Envie sua mensagem
              </h2>
              <p className="mt-2 text-sm text-[hsl(var(--editorial-gray))]">
                Ao enviar, abriremos seu cliente de e-mail com tudo preenchido para acelerar o contato.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome"
                  className="form-input"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Seu e-mail"
                  className="form-input"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Telefone (opcional)"
                  className="form-input"
                />
                <input
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="Assunto"
                  className="form-input"
                />
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Como podemos ajudar?"
                  rows={6}
                  className="form-input resize-none"
                />

                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    {statusMessage}
                  </p>
                )}

                {status === 'success' && (
                  <p className="text-sm text-green-600">
                    {statusMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar mensagem
                    </>
                  )}
                </button>
              </form>
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

