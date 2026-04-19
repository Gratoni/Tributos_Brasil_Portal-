/**
 * Camada de abstração para envio de e-mails transacionais e inscrição
 * em newsletter. Suporta dois provedores, selecionados por env vars:
 *
 * - Brevo (Sendinblue): BREVO_API_KEY + opcional BREVO_LIST_ID
 * - Resend:             RESEND_API_KEY
 *
 * Usa fetch nativo do runtime Node 20 das Vercel Functions — sem SDKs.
 */

export interface EmailMessage {
  to: string;
  from?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
}

export interface ContactFields {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const BREVO_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID;
const RESEND_KEY = process.env.RESEND_API_KEY;
const SEND_FROM = process.env.MAIL_FROM ?? 'Tributos Brasil <noreply@tributosbrasil.com.br>';
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? 'contato@tributosbrasil.com.br';

export function hasEmailProvider(): boolean {
  return Boolean(BREVO_KEY || RESEND_KEY);
}

export function hasNewsletterProvider(): boolean {
  return Boolean(BREVO_KEY);
}

export async function sendEmail(msg: EmailMessage): Promise<void> {
  const from = msg.from ?? SEND_FROM;

  if (BREVO_KEY) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_KEY,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: parseAddress(from),
        to: [parseAddress(msg.to)],
        replyTo: msg.replyTo ? parseAddress(msg.replyTo) : undefined,
        subject: msg.subject,
        htmlContent: msg.html,
        textContent: msg.text,
      }),
    });
    if (!res.ok) {
      throw new Error(`Brevo sendEmail falhou: ${res.status} ${await res.text()}`);
    }
    return;
  }

  if (RESEND_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [msg.to],
        reply_to: msg.replyTo,
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend sendEmail falhou: ${res.status} ${await res.text()}`);
    }
    return;
  }

  throw new Error('Nenhum provedor de e-mail configurado (BREVO_API_KEY ou RESEND_API_KEY).');
}

export async function subscribeToNewsletter(params: {
  email: string;
  name?: string;
  attributes?: Record<string, unknown>;
}): Promise<void> {
  if (!BREVO_KEY) {
    throw new Error('BREVO_API_KEY ausente — inscrição em newsletter indisponível.');
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': BREVO_KEY,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      attributes: {
        FIRSTNAME: params.name,
        ...params.attributes,
      },
      listIds: BREVO_LIST_ID ? [Number(BREVO_LIST_ID)] : undefined,
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    // Brevo devolve 400 com código duplicate_parameter se já inscrito — tratamos como ok.
    if (res.status === 400 && body.includes('duplicate_parameter')) return;
    throw new Error(`Brevo subscribe falhou: ${res.status} ${body}`);
  }
}

export async function notifyContactTeam(payload: ContactFields): Promise<void> {
  const html = `
    <h2 style="font-family:system-ui,-apple-system,sans-serif;color:#1a3a6b">
      Nova mensagem pelo portal
    </h2>
    <table style="font-family:system-ui,-apple-system,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:6px 12px;color:#666">Nome</td><td style="padding:6px 12px"><strong>${escapeHtml(payload.name)}</strong></td></tr>
      <tr><td style="padding:6px 12px;color:#666">E-mail</td><td style="padding:6px 12px">${escapeHtml(payload.email)}</td></tr>
      <tr><td style="padding:6px 12px;color:#666">Telefone</td><td style="padding:6px 12px">${escapeHtml(payload.phone ?? '—')}</td></tr>
      <tr><td style="padding:6px 12px;color:#666">Assunto</td><td style="padding:6px 12px">${escapeHtml(payload.subject)}</td></tr>
    </table>
    <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
    <p style="font-family:system-ui,-apple-system,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
  `;
  const text = [
    `Nome: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Telefone: ${payload.phone ?? '—'}`,
    `Assunto: ${payload.subject}`,
    '',
    payload.message,
  ].join('\n');

  await sendEmail({
    to: SUPPORT_EMAIL,
    replyTo: payload.email,
    subject: `[Portal] ${payload.subject}`,
    html,
    text,
  });
}

function parseAddress(address: string): { email: string; name?: string } {
  const match = address.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  if (match) return { name: match[1] || undefined, email: match[2] };
  return { email: address.trim() };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
