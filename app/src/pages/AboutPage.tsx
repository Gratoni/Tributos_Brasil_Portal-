import {
  ChevronRight,
  Target,
  Eye,
  Award,
  Users,
  BookOpen,
  TrendingUp,
  Shield,
  Clock,
} from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { HeaderTop } from '@/components/layout/HeaderTop';
import { HeaderMain } from '@/components/layout/HeaderMain';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { NewsletterBox } from '@/components/news/NewsletterBox';
import { columnists } from '@/data/mockData';
import { siteConfig } from '@/config/site';

export function AboutPage() {
  const stats = [
    { number: '15+', label: 'Anos de experiência', icon: Clock },
    { number: '500+', label: 'Empresas atendidas', icon: Users },
    { number: '10K+', label: 'Artigos publicados', icon: BookOpen },
    { number: '50+', label: 'Especialistas', icon: Award },
  ];

  const values = [
    {
      icon: Target,
      title: 'Missão',
      description:
        'Democratizar o acesso à informação tributária de qualidade, contribuindo para um sistema fiscal mais transparente e justo no Brasil.',
    },
    {
      icon: Eye,
      title: 'Visão',
      description:
        'Ser referência nacional em conteúdo tributário e jurídico, reconhecida pela excelência e atualidade de nossas análises.',
    },
    {
      icon: Shield,
      title: 'Valores',
      description:
        'Compromisso com a verdade, excelência técnica, ética profissional e responsabilidade social na disseminação do conhecimento.',
    },
  ];

  const differential = [
    {
      icon: TrendingUp,
      title: 'Conteúdo Atualizado',
      description: 'Notícias e análises publicadas diariamente por nossa equipe de especialistas.',
    },
    {
      icon: Award,
      title: 'Equipe Qualificada',
      description: 'Advogados, contadores e economistas com vasta experiência prática.',
    },
    {
      icon: Shield,
      title: 'Credibilidade',
      description: 'Fonte confiável para profissionais e empresas de todo o Brasil.',
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Mais de 100 mil profissionais acompanham nosso conteúdo mensalmente.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeaderTop />
      <HeaderMain />
      <Navigation activeItem="/sobre" />

      <main>
        <div className="bg-[hsl(var(--editorial-surface))] border-b border-[hsl(var(--editorial-border))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="breadcrumb">
              <AppLink href="/">Home</AppLink>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[hsl(var(--editorial-gray-dark))]">Sobre</span>
            </nav>
          </div>
        </div>

        <section className="py-16 bg-gradient-to-br from-[hsl(var(--editorial-blue))] to-[hsl(var(--editorial-blue-dark))] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold">{siteConfig.brandShortName}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{siteConfig.brandName}</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              O portal de referência em notícias tributárias e jurídicas do Brasil.
              Desde 2025, levamos informação de qualidade para profissionais e empresas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AppLink href="/contato" className="px-6 py-3 bg-white text-[hsl(var(--editorial-blue))] font-bold rounded-lg hover:bg-white/90 transition-colors">
                Fale Conosco
              </AppLink>
              <AppLink href="#equipe" className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors">
                Conheça Nossa Equipe
              </AppLink>
            </div>
          </div>
        </section>

        <section className="py-12 -mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-[hsl(var(--editorial-border))] shadow-lg text-center"
                >
                  <div className="w-12 h-12 bg-[hsl(var(--editorial-surface))] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-[hsl(var(--editorial-blue))]" />
                  </div>
                  <div className="text-3xl font-bold text-[hsl(var(--editorial-blue))] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[hsl(var(--editorial-gray))]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">
                Nossa Essência
              </h2>
              <p className="text-[hsl(var(--editorial-gray))] max-w-2xl mx-auto">
                Conheça os princípios que guiam nosso trabalho diário de levar informação tributária de qualidade.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((item, index) => (
                <div key={index} className="bg-[hsl(var(--editorial-surface))] rounded-xl p-8 text-center">
                  <div className="w-14 h-14 bg-[hsl(var(--editorial-blue))] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[hsl(var(--editorial-gray))]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-[hsl(var(--editorial-surface))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">
                Por que escolher o {siteConfig.brandName}?
              </h2>
              <p className="text-[hsl(var(--editorial-gray))] max-w-2xl mx-auto">
                Somos reconhecidos pela excelência e compromisso com a qualidade da informação tributária.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {differential.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-[hsl(var(--editorial-border))]">
                  <div className="w-10 h-10 bg-[hsl(var(--editorial-blue))]/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-[hsl(var(--editorial-blue))]" />
                  </div>
                  <h3 className="font-bold text-[hsl(var(--editorial-gray-dark))] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--editorial-gray))]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="equipe" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">
                Nossa Equipe
              </h2>
              <p className="text-[hsl(var(--editorial-gray))] max-w-2xl mx-auto">
                Conheça os especialistas que produzem nosso conteúdo e compartilham seu conhecimento diariamente.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {columnists.map((columnist) => (
                <AppLink
                  key={columnist.id}
                  href={`/colunistas/${columnist.slug}`}
                  className="group bg-white rounded-xl border border-[hsl(var(--editorial-border))] overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={columnist.avatar}
                      alt={columnist.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[hsl(var(--editorial-gray-dark))] group-hover:text-[hsl(var(--editorial-blue))] transition-colors">
                      {columnist.name}
                    </h3>
                    <p className="text-sm text-[hsl(var(--editorial-blue))] mb-2">{columnist.specialty}</p>
                    <p className="text-sm text-[hsl(var(--editorial-gray))] line-clamp-2">{columnist.bio}</p>
                  </div>
                </AppLink>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[hsl(var(--editorial-blue))] to-[hsl(var(--editorial-blue-dark))] rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Faça parte da nossa comunidade</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Receba as principais notícias tributárias e jurídicas diretamente no seu e-mail.
                Mais de 100 mil profissionais já confiam em nosso conteúdo.
              </p>
              <AppLink
                href="#newsletter"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[hsl(var(--editorial-blue))] font-bold rounded-lg hover:bg-white/90 transition-colors"
              >
                Assinar Newsletter
                <ChevronRight className="w-5 h-5" />
              </AppLink>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[hsl(var(--editorial-surface))]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterBox />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
