/**
 * Cliente HTTP genérico para integração com CMS externo.
 * Quando VITE_NEWS_API_URL não estiver configurado, os serviços
 * fazem fallback automático para os dados mock locais.
 */

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const BASE_URL = import.meta.env.VITE_NEWS_API_URL ?? '';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY ?? '';

function resolveUrl(path: string): string {
  try {
    return new URL(path, BASE_URL).toString();
  } catch {
    return `${BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!BASE_URL) {
    throw new ApiError(0, 'VITE_NEWS_API_URL não configurado — usando dados locais');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
    ...(options?.headers ?? {}),
  };

  const response = await fetch(resolveUrl(path), { ...options, headers });

  if (!response.ok) {
    throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
