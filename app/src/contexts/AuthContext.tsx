/**
 * AuthContext — autenticação simples para o painel admin.
 *
 * Em produção real: substituir validateCredentials() por
 * uma chamada à API com JWT assinado pelo servidor.
 *
 * Credenciais padrão (alterar no .env):
 *   VITE_ADMIN_USER     = admin
 *   VITE_ADMIN_PASSWORD = tributos2025
 */

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

/* Credenciais configuráveis via .env */
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER     ?? 'admin';
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD ?? 'tributos2025';

/** Token simples: base64(user:timestamp) — suficiente para SPA demo */
function generateToken(user: string): string {
  return btoa(`${user}:${Date.now()}`);
}

function validateCredentials(user: string, pass: string): boolean {
  return user === ADMIN_USER && pass === ADMIN_PASS;
}

/* ──────────────────────────────────────────────────────
   Tipos
────────────────────────────────────────────────────── */
interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

/* ──────────────────────────────────────────────────────
   Context
────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY),
  );

  /* Decodifica usuário do token */
  const user = useMemo<string | null>(() => {
    if (!token) return null;
    try {
      return atob(token).split(':')[0] ?? null;
    } catch {
      return null;
    }
  }, [token]);

  const isAuthenticated = Boolean(token && user);

  /* Sincroniza com localStorage */
  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [token]);

  const login = useCallback(async (inputUser: string, inputPass: string): Promise<boolean> => {
    /* Simula latência de rede */
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!validateCredentials(inputUser, inputPass)) return false;

    setToken(generateToken(inputUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({ isAuthenticated, user, login, logout }),
    [isAuthenticated, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
