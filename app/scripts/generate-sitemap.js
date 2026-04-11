/**
 * generate-sitemap.js
 *
 * Gera public/sitemap.xml dinamicamente a partir dos slugs de artigos,
 * categorias e colunistas definidos em src/data/mockData.ts.
 *
 * Em produção com CMS: substituir os arrays abaixo por chamadas à API real.
 *
 * Uso:
 *   node scripts/generate-sitemap.js
 *   (executado automaticamente via "prebuild" no package.json)
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL  = process.env.VITE_SITE_URL ?? 'https://tributosbrasil.com.br';
const TODAY     = new Date().toISOString().split('T')[0];

/* ──────────────────────────────────────────────────────
   Dados — substituir por chamada à API quando CMS ativo
────────────────────────────────────────────────────── */
const articleSlugs = [
  'reforma-tributaria-entenda-novas-regras-ibs-cbs-2025',
  'stf-decide-icms-base-calculo-pis-cofins-inconstitucional',
  'nova-resolucao-altera-prazos-entrega-efd-reinf',
  'simples-nacional-novos-limites-regras-2025',
  'carf-publica-nova-sumula-transfer-pricing',
  'alerta-prazo-entrega-dirpf-2025-marco',
  'analise-impactos-reforma-tributaria-setor-tecnologia',
  'stj-define-tese-exclusao-icms-pis-cofins',
  'novas-regras-deducao-prejuizos-fiscais-irpj',
  'e-social-novos-layouts-versao-s-1-3',
  'tributacao-internacional-novas-regras-holdings-exterior',
  'analise-reforma-tributaria-afeta-comercio-eletronico',
];

const categorySlugs = [
  'tributos',
  'reforma-tributaria',
  'jurisprudencia',
  'empresarial',
  'leis-e-normas',
  'obrigacoes-acessorias',
  'alertas-fiscais',
];

const columnistSlugs = [
  'ricardo-mendes',
  'fernanda-costa',
  'roberto-campos',
  'juliana-martins',
];

/* ──────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────── */
const url = (loc, { priority = '0.5', freq = 'weekly', lastmod = TODAY } = {}) => `
  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

/* ──────────────────────────────────────────────────────
   Montagem do XML
────────────────────────────────────────────────────── */
const urls = [
  // Páginas estáticas principais
  url('/',                             { priority: '1.0', freq: 'daily' }),
  url('/noticias',                     { priority: '0.9', freq: 'daily' }),
  url('/destaques',                    { priority: '0.8', freq: 'daily' }),
  url('/artigos',                      { priority: '0.8', freq: 'weekly' }),
  url('/guia-reforma-tributaria',      { priority: '0.9', freq: 'weekly' }),
  url('/calculadora-reforma',          { priority: '0.8', freq: 'monthly' }),
  url('/alertas-reforma',              { priority: '0.8', freq: 'daily' }),
  url('/sumulas',                      { priority: '0.8', freq: 'weekly' }),
  url('/colunistas',                   { priority: '0.7', freq: 'weekly' }),
  url('/sobre',                        { priority: '0.6', freq: 'monthly' }),
  url('/contato',                      { priority: '0.6', freq: 'monthly' }),
  url('/anuncie',                      { priority: '0.5', freq: 'monthly' }),
  url('/trabalhe-conosco',             { priority: '0.5', freq: 'monthly' }),
  url('/politica-de-privacidade',      { priority: '0.3', freq: 'yearly'  }),
  url('/termos-de-uso',                { priority: '0.3', freq: 'yearly'  }),
  url('/lgpd',                         { priority: '0.3', freq: 'yearly'  }),

  // Categorias
  ...categorySlugs.map((s) =>
    url(`/categoria/${s}`, { priority: '0.8', freq: 'daily' }),
  ),

  // Artigos
  ...articleSlugs.map((s) =>
    url(`/noticias/${s}`, { priority: '0.7', freq: 'weekly', lastmod: TODAY }),
  ),

  // Colunistas
  ...columnistSlugs.map((s) =>
    url(`/colunistas/${s}`, { priority: '0.6', freq: 'weekly' }),
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Gerado automaticamente em ${TODAY} — não editar manualmente -->
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>
`;

const outPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`✓ sitemap.xml gerado em ${outPath} (${urls.length} URLs)`);
