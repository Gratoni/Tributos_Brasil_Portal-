import { ArrowRight, Phone, CheckCircle, MessageCircle } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { siteConfig } from '@/config/site';

export function InstitutionalCTA() {
  const benefits = [
    'Consultoria tributária especializada',
    'Análise de impacto da Reforma Tributária',
    'Contencioso administrativo e judicial',
    'Planejamento tributário estratégico',
    'Suporte em obrigações acessórias',
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[hsl(var(--editorial-blue))] to-[hsl(var(--editorial-blue-dark))] rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm text-white mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Consultoria Disponivel
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Precisa de orientação tributária especializada?
              </h2>
              <p className="text-white/80 text-lg mb-6">
                A {siteConfig.brandName} oferece consultoria completa para empresas e
                profissionais. Nossa equipe de especialistas está pronta para
                ajudar você a navegar pelas complexidades do sistema tributário brasileiro.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <AppLink
                  href="/contato"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[hsl(var(--editorial-blue))] font-bold rounded-lg hover:bg-white/90 transition-colors"
                >
                  Solicitar Consultoria
                  <ArrowRight className="w-4 h-4" />
                </AppLink>
                <AppLink
                  href={siteConfig.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-medium rounded-lg hover:bg-white/25 transition-colors"
                >
                  Saiba mais sobre nossos serviços
                  <ArrowRight className="w-4 h-4" />
                </AppLink>
                <AppLink
                  href={`tel:${siteConfig.supportPhoneHref}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.supportPhone}
                </AppLink>
                <AppLink
                  href={siteConfig.supportWhatsApp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/80 text-white font-medium rounded-lg hover:bg-green-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </AppLink>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center p-12">
              <div className="relative">
                <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-white">{siteConfig.brandShortName}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[hsl(var(--editorial-gray-dark))]">
                        +500 empresas
                      </p>
                      <p className="text-sm text-[hsl(var(--editorial-gray))]">
                        ja atendidas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
