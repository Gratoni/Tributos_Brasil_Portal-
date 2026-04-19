import { describe, it, expect } from 'vitest';
import {
  buildTwitterProfileUrl,
  buildLinkedInProfileUrl,
  buildFacebookShareUrl,
  buildTwitterShareUrl,
  buildLinkedInShareUrl,
  buildWhatsAppUrl,
} from './social';

describe('social helpers', () => {
  it('normaliza @ em handle do Twitter/X', () => {
    expect(buildTwitterProfileUrl('@fulano')).toBe('https://x.com/fulano');
    expect(buildTwitterProfileUrl('fulano')).toBe('https://x.com/fulano');
  });

  it('monta URL do perfil LinkedIn', () => {
    expect(buildLinkedInProfileUrl('ricardo-mendes')).toBe(
      'https://www.linkedin.com/in/ricardo-mendes',
    );
  });

  it('codifica URL no share do Facebook', () => {
    const url = 'https://ex.com/a?b=1&c=2';
    expect(buildFacebookShareUrl(url)).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    );
  });

  it('codifica URL e texto no share do Twitter/X', () => {
    const out = buildTwitterShareUrl('https://ex.com', 'Reforma & Cia');
    expect(out).toContain(`url=${encodeURIComponent('https://ex.com')}`);
    expect(out).toContain(`text=${encodeURIComponent('Reforma & Cia')}`);
  });

  it('codifica URL no share do LinkedIn', () => {
    const url = 'https://ex.com/artigo';
    expect(buildLinkedInShareUrl(url)).toBe(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    );
  });

  it('monta wa.me sem e com mensagem', () => {
    expect(buildWhatsAppUrl()).toMatch(/^https:\/\/wa\.me\/\d+$/);
    expect(buildWhatsAppUrl('oi')).toContain('?text=oi');
  });
});
