import { useEffect, useId } from 'react';

const MANAGED_ATTR = 'data-tb-jsonld';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}

export function JsonLd({ data, id }: JsonLdProps) {
  const generatedId = useId();
  const scriptId = id ?? `jsonld-${generatedId.replace(/[:]/g, '')}`;

  useEffect(() => {
    let script = document.head.querySelector<HTMLScriptElement>(
      `script[${MANAGED_ATTR}="${scriptId}"]`,
    );
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(MANAGED_ATTR, scriptId);
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      const existing = document.head.querySelector(`script[${MANAGED_ATTR}="${scriptId}"]`);
      existing?.remove();
    };
  }, [data, scriptId]);

  return null;
}
