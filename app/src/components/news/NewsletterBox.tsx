import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { AppLink } from '@/components/common/AppLink';
import { siteConfig } from '@/config/site';

export function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState({
    dailyNews: true,
    weeklySummary: false,
    legislationAlerts: true,
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !acceptedTerms) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setEmail('');
    setName('');
  };

  return (
    <div id="newsletter" className="newsletter-box">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold mb-2">
          Fique por dentro das novidades tributárias
        </h3>
        <p className="text-white/80 mb-6">
          Receba análises exclusivas, alertas de legislação e as principais notícias
          do mundo tributário e jurídico diretamente no seu e-mail.
        </p>

        {status === 'success' ? (
          <div className="bg-white/20 rounded-lg p-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg mb-1">Inscrição realizada!</h4>
            <p className="text-white/80 text-sm">
              Enviamos um e-mail de confirmação. Verifique sua caixa de entrada.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Seu nome (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
            </div>

            <div className="text-left bg-white/10 rounded-lg p-4">
              <p className="text-sm font-medium mb-3">Escolha o tipo de conteúdo:</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={preferences.dailyNews}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, dailyNews: checked as boolean })
                    }
                    className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-[hsl(var(--editorial-blue))]"
                  />
                  <span className="text-sm">Notícias diárias</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={preferences.weeklySummary}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, weeklySummary: checked as boolean })
                    }
                    className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-[hsl(var(--editorial-blue))]"
                  />
                  <span className="text-sm">Resumo semanal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={preferences.legislationAlerts}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, legislationAlerts: checked as boolean })
                    }
                    className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-[hsl(var(--editorial-blue))]"
                  />
                  <span className="text-sm">Alertas de legislação</span>
                </label>
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <Checkbox
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-[hsl(var(--editorial-blue))] mt-0.5"
              />
              <span className="text-xs text-white/70">
                Concordo em receber comunicações da {siteConfig.brandName} e aceito a{' '}
                <AppLink href="/politica-de-privacidade" className="underline hover:text-white">
                  Política de Privacidade
                </AppLink>
                . Seus dados estão protegidos pela LGPD.
              </span>
            </label>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Por favor, preencha o e-mail e aceite os termos.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-white text-[hsl(var(--editorial-blue))] font-bold rounded-lg hover:bg-white/90 transition-colors"
            >
              Assinar Newsletter
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
