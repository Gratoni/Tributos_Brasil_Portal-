import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Rss,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { categories, mainMenu } from '@/data/mockData';
import { siteConfig } from '@/config/site';
import {
  buildFacebookShareUrl,
  buildLinkedInShareUrl,
  buildTwitterShareUrl,
  getPortalHomeUrl,
} from '@/lib/social';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const portalUrl = getPortalHomeUrl();

  return (
    <footer>
      <div className="footer-main py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <AppLink
                href="/"
                className="flex items-center gap-3 mb-4"
                aria-label={siteConfig.brandName}
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden p-1">
                  <img
                    src={siteConfig.logoUrl}
                    alt={siteConfig.brandName}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">{siteConfig.brandName}</h3>
                </div>
              </AppLink>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                Portal especializado em notícias tributárias e jurídicas.
                Oferecemos análises técnicas, atualizações legislativas e
                jurisprudência para profissionais e empresas.
              </p>
              <AppLink
                href={siteConfig.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                Saiba mais sobre nossos serviços
                <ChevronRight className="w-4 h-4" />
              </AppLink>
              <div className="flex items-center gap-2">
                <AppLink
                  href={buildFacebookShareUrl(portalUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </AppLink>
                <AppLink
                  href={buildTwitterShareUrl(portalUrl, 'Acompanhe o portal Tributos Brasil')}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </AppLink>
                <AppLink
                  href={buildLinkedInShareUrl(portalUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </AppLink>
                <AppLink
                  href="/colunistas"
                  className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Colunistas"
                >
                  <Instagram className="w-4 h-4" />
                </AppLink>
                <AppLink
                  href="/noticias"
                  className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="RSS"
                >
                  <Rss className="w-4 h-4" />
                </AppLink>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Editorias</h4>
              <ul className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.id}>
                    <AppLink
                      href={`/categoria/${category.slug}`}
                      className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                    >
                      <ChevronRight className="w-3 h-3 mr-1" />
                      {category.name}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {mainMenu.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <AppLink
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                    >
                      <ChevronRight className="w-3 h-3 mr-1" />
                      {item.label}
                    </AppLink>
                  </li>
                ))}
                <li>
                  <AppLink
                    href={siteConfig.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <ChevronRight className="w-3 h-3 mr-1" />
                    Saiba mais sobre nossos serviços
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/sobre"
                    className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <ChevronRight className="w-3 h-3 mr-1" />
                    Sobre Nós
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/contato"
                    className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <ChevronRight className="w-3 h-3 mr-1" />
                    Fale Conosco
                  </AppLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Contato</h4>
              <ul className="space-y-3">
                <li>
                  <AppLink
                    href={`mailto:${siteConfig.supportEmail}`}
                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{siteConfig.supportEmail}</span>
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href={`tel:${siteConfig.supportPhoneHref}`}
                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{siteConfig.supportPhone}</span>
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href={siteConfig.supportWhatsApp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>WhatsApp: {siteConfig.supportPhone}</span>
                  </AppLink>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white/70 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Av. Paulista, 1000
                      <br />
                      Bela Vista, São Paulo - SP
                      <br />
                      CEP: 01310-100
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left">
              © {currentYear} {siteConfig.brandName}. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <AppLink href="/politica-de-privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </AppLink>
              <AppLink href="/termos-de-uso" className="hover:text-white transition-colors">
                Termos de Uso
              </AppLink>
              <AppLink href="/lgpd" className="hover:text-white transition-colors">
                LGPD
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

