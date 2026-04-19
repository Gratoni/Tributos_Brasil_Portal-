import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

const DISMISS_KEY = 'tb_whatsapp_dismissed';
const DISMISS_TTL = 24 * 60 * 60 * 1000; // 24h

interface WhatsAppFloatProps {
  message?: string;
  hideOnPaths?: string[];
}

/**
 * Botão flutuante de WhatsApp com mensagem pré-preenchida.
 * - Esconde por 24h quando o usuário fecha o tooltip
 * - Evita aparecer em rotas administrativas (reage a mudanças de rota SPA)
 */
export function WhatsAppFloat({
  message = 'Olá! Vim pelo portal Tributos Brasil e gostaria de falar com a equipe.',
  hideOnPaths = ['/admin'],
}: WhatsAppFloatProps) {
  const { pathname } = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const dismissedAt = Number(raw);
        if (Date.now() - dismissedAt < DISMISS_TTL) return;
        localStorage.removeItem(DISMISS_KEY);
      }
    } catch {
      /* ignora falhas de storage (modo privado) */
    }

    const timer = window.setTimeout(() => setShowTooltip(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  if (hideOnPaths.some((p) => pathname.startsWith(p))) return null;

  const phoneDigits = siteConfig.supportPhoneHref.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;

  const handleDismiss = () => {
    setShowTooltip(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignora */
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 print:hidden">
      {showTooltip && (
        <div className="relative max-w-[260px] rounded-2xl bg-white px-4 py-3 pr-8 text-sm text-[hsl(var(--editorial-gray-dark))] shadow-xl ring-1 ring-black/10 animate-in fade-in slide-in-from-bottom-2">
          <p className="font-semibold">Fale com a equipe no WhatsApp</p>
          <p className="mt-1 text-xs text-[hsl(var(--editorial-gray))]">
            Tire dúvidas sobre Reforma Tributária, artigos do portal ou consultoria.
          </p>
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[hsl(var(--editorial-gray))] hover:bg-[hsl(var(--editorial-surface))]"
            aria-label="Fechar sugestão"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        aria-label="Abrir conversa no WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        <span
          className="absolute inset-0 inline-flex rounded-full bg-[#25D366]/40 animate-ping"
          aria-hidden="true"
        />
        <MessageCircle className="relative h-7 w-7" />
      </a>
    </div>
  );
}
