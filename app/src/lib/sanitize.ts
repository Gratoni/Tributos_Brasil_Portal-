/**
 * HTML sanitizer com allowlist — protege o `dangerouslySetInnerHTML` contra XSS.
 *
 * O conteúdo editorial é autorado internamente ou via CMS (Strapi), mas o sanitizer
 * adiciona defesa-em-profundidade removendo: tags perigosas (script, style, iframe,
 * object, embed, link), handlers inline (on*) e URLs javascript:/data: em href/src.
 */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'hr', 'span', 'div',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'small', 'sub', 'sup',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'blockquote', 'q', 'cite', 'code', 'pre', 'kbd', 'samp',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
]);

const STRIPPED_TAGS = new Set([
  'script', 'style', 'iframe', 'object', 'embed', 'link', 'meta',
  'noscript', 'template', 'base', 'form', 'input', 'button', 'textarea', 'select',
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title', 'target', 'rel']),
  img: new Set(['src', 'alt', 'title', 'width', 'height', 'loading']),
  '*': new Set(['class', 'id']),
};

const SAFE_URL = /^(?:https?:|mailto:|tel:|\/|#)/i;

function isAttrAllowed(tag: string, attr: string): boolean {
  return ALLOWED_ATTRS[tag]?.has(attr) || ALLOWED_ATTRS['*'].has(attr);
}

function sanitizeUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return SAFE_URL.test(trimmed) ? trimmed : null;
}

function sanitizeElement(el: Element): void {
  const tag = el.tagName.toLowerCase();

  if (STRIPPED_TAGS.has(tag)) {
    el.remove();
    return;
  }

  if (!ALLOWED_TAGS.has(tag)) {
    const parent = el.parentNode;
    if (!parent) {
      el.remove();
      return;
    }
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
    return;
  }

  for (const attr of Array.from(el.attributes)) {
    const name = attr.name.toLowerCase();

    if (name.startsWith('on') || name === 'style') {
      el.removeAttribute(attr.name);
      continue;
    }

    if (!isAttrAllowed(tag, name)) {
      el.removeAttribute(attr.name);
      continue;
    }

    if (name === 'href' || name === 'src') {
      const safe = sanitizeUrl(attr.value);
      if (!safe) {
        el.removeAttribute(attr.name);
      } else {
        el.setAttribute(attr.name, safe);
      }
    }
  }

  if (tag === 'a' && el.getAttribute('target') === '_blank') {
    const rel = (el.getAttribute('rel') ?? '').split(/\s+/).filter(Boolean);
    if (!rel.includes('noopener')) rel.push('noopener');
    if (!rel.includes('noreferrer')) rel.push('noreferrer');
    el.setAttribute('rel', rel.join(' '));
  }

  for (const child of Array.from(el.children)) sanitizeElement(child);
}

/**
 * Sanitiza HTML usando DOMParser, aplicando uma allowlist de tags/atributos.
 * Retorna string segura para uso com `dangerouslySetInnerHTML`.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return html.replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
      .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
      .replace(/javascript:/gi, '');
  }

  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild;
  if (!root) return '';

  for (const child of Array.from(root.children)) sanitizeElement(child);
  return root.innerHTML;
}
