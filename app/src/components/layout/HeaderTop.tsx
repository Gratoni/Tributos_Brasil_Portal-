import { Calendar, Mail, Facebook, Twitter, Linkedin, Instagram, Rss } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { institutionalMenu } from '@/data/mockData';
import { siteConfig } from '@/config/site';
import {
  buildFacebookShareUrl,
  buildLinkedInShareUrl,
  buildTwitterShareUrl,
  getPortalHomeUrl,
} from '@/lib/social';

export function HeaderTop() {
  const portalUrl = getPortalHomeUrl();
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="header-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-white/90">
              <Calendar className="w-3.5 h-3.5" />
              <span className="capitalize">{today}</span>
            </span>
            <nav className="hidden md:flex items-center gap-3">
              {institutionalMenu.map((item) => (
                <AppLink
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </AppLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <AppLink
              href={`mailto:${siteConfig.supportEmail}`}
              className="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{siteConfig.supportEmail}</span>
            </AppLink>
            <div className="flex items-center gap-2">
              <AppLink
                href={buildFacebookShareUrl(portalUrl)}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </AppLink>
              <AppLink
                href={buildTwitterShareUrl(portalUrl, 'Acompanhe o portal Tributos Brasil')}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </AppLink>
              <AppLink
                href={buildLinkedInShareUrl(portalUrl)}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </AppLink>
              <AppLink
                href="/colunistas"
                className="w-7 h-7 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Colunistas"
              >
                <Instagram className="w-3.5 h-3.5" />
              </AppLink>
              <AppLink
                href="/noticias"
                className="w-7 h-7 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="RSS"
              >
                <Rss className="w-3.5 h-3.5" />
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

