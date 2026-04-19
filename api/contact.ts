import { hasEmailProvider, notifyContactTeam } from './_shared/email';

interface IncomingBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
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

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined;
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !isValidEmail(email) || !subject || !message) {
    return json({ error: 'Preencha nome, e-mail válido, assunto e mensagem.' }, 400);
  }

  if (message.length > 5000) {
    return json({ error: 'Mensagem muito longa (limite 5000 caracteres).' }, 400);
  }

  if (!hasEmailProvider()) {
    return json(
      { ok: false, error: 'Canal de contato ainda não configurado — use o e-mail direto.' },
      503,
    );
  }

  try {
    await notifyContactTeam({ name, email, phone, subject, message });
    return json({ ok: true, mode: 'api' }, 200);
  } catch (err) {
    console.error('[api/contact] erro:', err);
    return json({ error: 'Falha ao enviar mensagem.' }, 500);
  }
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
