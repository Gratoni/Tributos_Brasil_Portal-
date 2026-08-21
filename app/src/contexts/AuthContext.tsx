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

/* Credenciais configuráveis via .env */
// Removed VITE_ variables to prevent credentials exposure in frontend bundle.
// Should be implemented via secure backend validation.
const ADMIN_USER = '';
const ADMIN_PASS = '';

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
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Descarta token inválido ou expirado na inicialização
    if (stored && !isTokenValid(stored)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return stored;
  });

  /* Decodifica usuário do token */
  const user = useMemo<string | null>(() => {
    if (!token) return null;
    try {
      return atob(token).split(':')[0] ?? null;
    } catch {
      return null;
    }
  }, [token]);

  const isAuthenticated = Boolean(token && user && isTokenValid(token));

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
