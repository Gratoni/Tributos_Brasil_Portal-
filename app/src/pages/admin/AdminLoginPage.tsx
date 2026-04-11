import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { siteConfig } from '@/config/site';

export function AdminLoginPage() {
  const { login } = useAuth();
  const navigate   = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Preencha usuário e senha.');
      return;
    }

    setLoading(true);
    setError('');

    const ok = await login(username.trim(), password);

    if (ok) {
      navigate('/admin', { replace: true });
    } else {
      setError('Usuário ou senha incorretos.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--editorial-surface))] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[hsl(var(--editorial-blue))] rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden p-2">
            <img
              src={siteConfig.logoUrl}
              alt={siteConfig.brandName}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">
            {siteConfig.brandName}
          </h1>
          <p className="text-sm text-[hsl(var(--editorial-gray))] mt-1">
            Painel Administrativo
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[hsl(var(--editorial-border))] shadow-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[hsl(var(--editorial-blue))]/10 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-[hsl(var(--editorial-blue))]" />
            </div>
            <div>
              <h2 className="font-bold text-[hsl(var(--editorial-gray-dark))]">Acesso restrito</h2>
              <p className="text-xs text-[hsl(var(--editorial-gray))]">Somente usuários autorizados</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[hsl(var(--editorial-gray-dark))] mb-1.5">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu nome de usuário"
                autoComplete="username"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[hsl(var(--editorial-gray-dark))] mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  className="form-input pr-11"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--editorial-gray))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                  aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? 'Verificando...' : 'Entrar no painel'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[hsl(var(--editorial-gray))] mt-6">
          <a href="/" className="hover:underline hover:text-[hsl(var(--editorial-blue))]">
            ← Voltar ao portal
          </a>
        </p>
      </div>
    </div>
  );
}
