import { describe, it, expect } from 'vitest';
import { validateEnv } from './env';

describe('validateEnv', () => {
  it('aceita objeto vazio (todas as variáveis são opcionais)', () => {
    const out = validateEnv({});
    expect(out.success).toBe(true);
  });

  it('aceita URL válida em VITE_NEWS_API_URL', () => {
    const out = validateEnv({ VITE_NEWS_API_URL: 'https://cms.example.com/api' });
    expect(out.success).toBe(true);
  });

  it('rejeita URL inválida em VITE_NEWS_API_URL', () => {
    const out = validateEnv({ VITE_NEWS_API_URL: 'not-a-url' });
    expect(out.success).toBe(false);
    if (!out.success) {
      expect(out.errors.some((e) => e.includes('VITE_NEWS_API_URL'))).toBe(true);
    }
  });

  it('aceita string vazia em URLs como ausência', () => {
    const out = validateEnv({ VITE_NEWS_API_URL: '', VITE_GA_MEASUREMENT_ID: '' });
    expect(out.success).toBe(true);
  });

  it('valida formato do GA4 measurement id', () => {
    expect(validateEnv({ VITE_GA_MEASUREMENT_ID: 'G-ABC123' }).success).toBe(true);
    expect(validateEnv({ VITE_GA_MEASUREMENT_ID: 'UA-123' }).success).toBe(false);
  });

  it('valida provider enum', () => {
    expect(validateEnv({ VITE_NEWS_CMS_PROVIDER: 'strapi' }).success).toBe(true);
    expect(validateEnv({ VITE_NEWS_CMS_PROVIDER: 'wordpress' }).success).toBe(false);
  });

  it('valida email de suporte', () => {
    expect(validateEnv({ VITE_SUPPORT_EMAIL: 'contato@tributosbrasil.com.br' }).success).toBe(true);
    expect(validateEnv({ VITE_SUPPORT_EMAIL: 'não-email' }).success).toBe(false);
  });
});
