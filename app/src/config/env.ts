import { z } from 'zod';

/**
 * Schema das variáveis de ambiente expostas via Vite (`import.meta.env`).
 * Todas as flags são opcionais — a aplicação tem fallback com dados mock
 * quando o CMS não está configurado. A validação roda no carregamento do módulo
 * para dar feedback cedo se algum valor fornecido estiver malformado.
 */
const EnvSchema = z.object({
  VITE_NEWS_API_URL: z
    .string()
    .url()
    .optional()
    .or(z.literal('').transform(() => undefined)),
  VITE_NEWS_API_KEY: z.string().optional(),
  VITE_NEWS_CMS_PROVIDER: z.enum(['strapi', '']).optional(),
  VITE_GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]+$/i, 'VITE_GA_MEASUREMENT_ID deve estar no formato G-XXXXXXXXXX')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  VITE_ADMIN_USER: z.string().min(1).optional(),
  VITE_ADMIN_PASSWORD: z.string().min(1).optional(),
  VITE_SITE_URL: z.string().url().optional(),
  VITE_APP_ENV: z.enum(['development', 'production', 'staging', '']).optional(),
  VITE_SUPPORT_EMAIL: z.string().email().optional().or(z.literal('').transform(() => undefined)),
  VITE_SUPPORT_PHONE: z.string().optional(),
});

type EnvRaw = Record<string, string | undefined>;

function readEnv(): EnvRaw {
  const source = import.meta.env as EnvRaw;
  return {
    VITE_NEWS_API_URL: source.VITE_NEWS_API_URL,
    VITE_NEWS_API_KEY: source.VITE_NEWS_API_KEY,
    VITE_NEWS_CMS_PROVIDER: source.VITE_NEWS_CMS_PROVIDER,
    VITE_GA_MEASUREMENT_ID: source.VITE_GA_MEASUREMENT_ID,
    VITE_ADMIN_USER: source.VITE_ADMIN_USER,
    VITE_ADMIN_PASSWORD: source.VITE_ADMIN_PASSWORD,
    VITE_SITE_URL: source.VITE_SITE_URL,
    VITE_APP_ENV: source.VITE_APP_ENV,
    VITE_SUPPORT_EMAIL: source.VITE_SUPPORT_EMAIL,
    VITE_SUPPORT_PHONE: source.VITE_SUPPORT_PHONE,
  };
}

export function validateEnv(raw: EnvRaw = readEnv()):
  | { success: true; data: z.infer<typeof EnvSchema> }
  | { success: false; errors: string[] } {
  const parsed = EnvSchema.safeParse(raw);
  if (parsed.success) return { success: true, data: parsed.data };
  const errors = parsed.error.issues.map(
    (issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`,
  );
  return { success: false, errors };
}

const result = validateEnv();
if (!result.success && import.meta.env.DEV) {
  console.warn(
    '[env] Variáveis de ambiente inválidas — usando fallback seguro:\n' +
      result.errors.map((e) => `  • ${e}`).join('\n'),
  );
}

export const env = result.success ? result.data : ({} as z.infer<typeof EnvSchema>);
