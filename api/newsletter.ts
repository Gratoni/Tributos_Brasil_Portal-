import { hasNewsletterProvider, subscribeToNewsletter } from './_shared/email';

interface IncomingBody {
  email?: unknown;
  name?: unknown;
  preferences?: unknown;
  source?: unknown;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Método não permitido.' }, 405);
  }

  let body: IncomingBody;
  try {
    body = (await req.json()) as IncomingBody;
  } catch {
    return json({ error: 'Corpo JSON inválido.' }, 400);
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : undefined;

  if (!isValidEmail(email)) {
    return json({ error: 'Informe um e-mail válido.' }, 400);
  }

  if (!hasNewsletterProvider()) {
    // Retorna 200 para não quebrar UX — o frontend detecta e sinaliza modo local.
    return json(
      { ok: true, mode: 'noop', message: 'Nenhum provedor configurado.' },
      200,
    );
  }

  try {
    const attributes = normalizePreferences(body.preferences);
    await subscribeToNewsletter({
      email,
      name,
      attributes: {
        ...attributes,
        SOURCE: typeof body.source === 'string' ? body.source : 'portal',
      },
    });
    return json({ ok: true, mode: 'api' }, 200);
  } catch (err) {
    console.error('[api/newsletter] erro:', err);
    return json({ error: 'Falha ao registrar inscrição.' }, 500);
  }
}

function normalizePreferences(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== 'object') return {};
  const prefs = value as Record<string, unknown>;
  return {
    DAILY_NEWS: Boolean(prefs.dailyNews),
    WEEKLY_SUMMARY: Boolean(prefs.weeklySummary),
    LEGISLATION_ALERTS: Boolean(prefs.legislationAlerts),
  };
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
