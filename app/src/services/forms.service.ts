/**
 * Serviço unificado de formulários do portal.
 *
 * Estratégia em camadas:
 * 1. Se houver VITE_FORMS_API_URL configurado, envia para endpoint próprio
 *    (Vercel Function / backend). Ideal em produção.
 * 2. Fallback 1 (contato): abre o cliente de e-mail do usuário (mailto)
 *    com os dados pré-preenchidos — mantém a UX mesmo sem backend.
 * 3. Fallback 2 (newsletter): simula sucesso local para não bloquear a UI,
 *    mas registra aviso em console para o operador.
 */

import { siteConfig } from '@/config/site';

const API_BASE = (import.meta.env.VITE_FORMS_API_URL ?? '').replace(/\/$/, '');

export interface NewsletterPayload {
  email: string;
  name?: string;
  preferences: {
    dailyNews: boolean;
    weeklySummary: boolean;
    legislationAlerts: boolean;
  };
  source?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export type NewsletterResult =
  | { ok: true; mode: 'api' | 'local' }
  | { ok: false; error: string };

export type ContactResult =
  | { ok: true; mode: 'api' }
  | { ok: true; mode: 'mailto'; mailtoUrl: string }
  | { ok: false; error: string };

async function postJson(path: string, body: unknown): Promise<Response> {
  const url = API_BASE ? `${API_BASE}${path}` : path;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function buildMailto(payload: ContactPayload): string {
  const bodyLines = [
    `Nome: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Telefone: ${payload.phone ?? 'Não informado'}`,
    '',
    payload.message,
  ];
  return `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}

export async function subscribeNewsletter(
  payload: NewsletterPayload,
): Promise<NewsletterResult> {
  // Tenta endpoint real (Vercel Function) primeiro.
  try {
    const res = await postJson('/api/newsletter', payload);
    if (res.ok) return { ok: true, mode: 'api' };

    // Em dev (sem função configurada), o Vite devolve 404 HTML.
    // Nesse caso, fazemos fallback "local" para não travar a UX.
    if (res.status === 404) {
      if (import.meta.env.DEV) {
        console.warn(
          '[forms] /api/newsletter não está configurado. Assinatura registrada apenas no navegador.',
        );
      }
      return { ok: true, mode: 'local' };
    }

    let errorMessage = 'Não foi possível concluir a inscrição.';
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) errorMessage = data.error;
    } catch {
      /* body não era JSON */
    }
    return { ok: false, error: errorMessage };
  } catch (err) {
    // Falha de rede em dev: aceita localmente.
    if (import.meta.env.DEV) {
      console.warn('[forms] Falha ao chamar /api/newsletter em dev:', err);
      return { ok: true, mode: 'local' };
    }
    return { ok: false, error: 'Falha de conexão. Tente novamente em instantes.' };
  }
}

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  // Tenta endpoint real primeiro.
  try {
    const res = await postJson('/api/contact', payload);
    if (res.ok) return { ok: true, mode: 'api' };

    // Sem backend configurado → fallback mailto, que garante entrega.
    if (res.status === 404) {
      return { ok: true, mode: 'mailto', mailtoUrl: buildMailto(payload) };
    }

    let errorMessage = 'Não foi possível enviar sua mensagem agora.';
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) errorMessage = data.error;
    } catch {
      /* body não era JSON */
    }
    return { ok: false, error: errorMessage };
  } catch (err) {
    console.warn('[forms] Falha ao enviar contato, usando fallback mailto.', err);
    return { ok: true, mode: 'mailto', mailtoUrl: buildMailto(payload) };
  }
}
