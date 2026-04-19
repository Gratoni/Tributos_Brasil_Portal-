import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitize';

describe('sanitizeHtml', () => {
  it('retorna string vazia quando HTML é vazio', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  it('preserva tags editoriais de texto', () => {
    const input = '<p>Olá <strong>mundo</strong></p><ul><li>Item</li></ul>';
    const out = sanitizeHtml(input);
    expect(out).toContain('<p>');
    expect(out).toContain('<strong>mundo</strong>');
    expect(out).toContain('<ul>');
    expect(out).toContain('<li>Item</li>');
  });

  it('remove tags <script>', () => {
    const out = sanitizeHtml('<p>oi</p><script>alert(1)</script>');
    expect(out).not.toContain('<script');
    expect(out).not.toContain('alert(1)');
    expect(out).toContain('<p>oi</p>');
  });

  it('remove atributos de evento inline (onclick)', () => {
    const out = sanitizeHtml('<p onclick="alert(1)">oi</p>');
    expect(out).not.toContain('onclick');
    expect(out).toContain('<p>oi</p>');
  });

  it('remove href com javascript:', () => {
    const out = sanitizeHtml('<a href="javascript:alert(1)">x</a>');
    expect(out).not.toContain('javascript:');
  });

  it('aceita href http(s), mailto, tel e fragmentos', () => {
    const out = sanitizeHtml(
      '<a href="https://ex.com">a</a><a href="mailto:a@b.com">b</a><a href="tel:+11">c</a><a href="#sec">d</a>',
    );
    expect(out).toContain('href="https://ex.com"');
    expect(out).toContain('href="mailto:a@b.com"');
    expect(out).toContain('href="tel:+11"');
    expect(out).toContain('href="#sec"');
  });

  it('adiciona rel noopener noreferrer em links target="_blank"', () => {
    const out = sanitizeHtml('<a href="https://ex.com" target="_blank">x</a>');
    expect(out).toContain('rel="noopener noreferrer"');
  });

  it('remove atributo style', () => {
    const out = sanitizeHtml('<p style="color:red">oi</p>');
    expect(out).not.toContain('style');
  });

  it('desembrulha tags não permitidas preservando texto', () => {
    const out = sanitizeHtml('<marquee>texto</marquee>');
    expect(out).not.toContain('<marquee');
    expect(out).toContain('texto');
  });

  it('mantém imagens com src seguro e remove com javascript:', () => {
    const safe = sanitizeHtml('<img src="https://cdn/x.jpg" alt="foto" />');
    expect(safe).toContain('src="https://cdn/x.jpg"');

    const unsafe = sanitizeHtml('<img src="javascript:alert(1)" alt="x" />');
    expect(unsafe).not.toContain('javascript:');
    expect(unsafe).not.toContain('src=');
  });
});
