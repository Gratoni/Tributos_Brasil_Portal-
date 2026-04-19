/**
 * AuthContext — autenticação simples para o painel admin.
 *
 * Em produção real: substituir validateCredentials() por
 * uma chamada à API com JWT assinado pelo servidor.
 *
 * Credenciais (via .env):
 *   VITE_ADMIN_USER          — usuário
 *   VITE_ADMIN_PASSWORD_HASH — hash SHA-256 da senha (preferido)
 *   VITE_ADMIN_PASSWORD      — senha em texto (apenas em dev; ignorado em produção)
 *
 * Para gerar o hash:
 *   echo -n "minhaSenhaForte" | shasum -a 256
 *   ou via DevTools:
 *   crypto.subtle.digest('SHA-256', new TextEncoder().encode('minhaSenha'))
 */

/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'tb_admin_token';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 horas

const IS_PROD = import.meta.env.PROD;
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER ?? (IS_PROD ? '' : 'admin');
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
const ADMIN_PASS_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH;

/** true = credenciais estão configuradas; false = login bloqueado com aviso */
function isAdminConfigured(): boolean {
  if (!ADMIN_USER) return false;
  return Boolean(ADMIN_PASS_HASH || (!IS_PROD && ADMIN_PASS));
}

/** Token simples: base64(user:timestamp) — suficiente para SPA demo */
function generateToken(user: string): string {
  return btoa(`${user}:${Date.now()}`);
}

/** Retorna false se o token não puder ser decodificado ou já tiver expirado */
function isTokenValid(token: string): boolean {
  try {
    const parts = atob(token).split(':');
    const timestamp = Number(parts[1]);
    if (!timestamp || isNaN(timestamp)) return false;
    return Date.now() - timestamp < SESSION_TTL_MS;
  } catch {
    return false;
  }
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function validateCredentials(user: string, pass: string): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  if (user !== ADMIN_USER) return false;

  if (ADMIN_PASS_HASH) {
    const hashed = await sha256Hex(pass);
    return timingSafeEqual(hashed, String(ADMIN_PASS_HASH).toLowerCase());
  }

  // Fallback apenas em dev, após warning nos logs.
  if (!IS_PROD && ADMIN_PASS) {
    return pass === ADMIN_PASS;
  }

  return false;
}

/** Comparação em tempo constante para reduzir ataque de timing */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/* ──────────────────────────────────────────────────────
   Tipos
────────────────────────────────────────────────────── */
interface AuthState {
  isAuthenticated: boolean;
  isConfigured: boolean;
  user: string | null;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

/* ──────────────────────────────────────────────────────
   Context
────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && !isTokenValid(stored)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return stored;
  });

  useEffect(() => {
    if (IS_PROD && !isAdminConfigured()) {
      console.error(
        '[AuthContext] Credenciais admin não configuradas em produção. ' +
          'Defina VITE_ADMIN_USER e VITE_ADMIN_PASSWORD_HASH no deploy.',
      );
    }
    if (!IS_PROD && ADMIN_PASS && !ADMIN_PASS_HASH) {
      console.warn(
        '[AuthContext] Usando VITE_ADMIN_PASSWORD em texto puro (dev). ' +
          'Em produção, defina VITE_ADMIN_PASSWORD_HASH com o hash SHA-256 da senha.',
      );
    }
  }, []);

  const user = useMemo<string | null>(() => {
    if (!token) return null;
    try {
      return atob(token).split(':')[0] ?? null;
    } catch {
      return null;
    }
  }, [token]);

  const isAuthenticated = Boolean(token && user && isTokenValid(token));

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [token]);

  const login = useCallback(async (inputUser: string, inputPass: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const ok = await validateCredentials(inputUser, inputPass);
    if (!ok) return false;

    setToken(generateToken(inputUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated,
      isConfigured: isAdminConfigured(),
      user,
      login,
      logout,
    }),
    [isAuthenticated, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
