# Tributos Brasil

Portal editorial em React 19 + TypeScript + Vite, preparado para venda como produto a escritórios de consultoria tributária.

## Como rodar

1. Entre em `app`
2. Instale dependências com `npm install`
3. Rode `npm run dev`
4. Acesse `http://localhost:5173`
5. Admin em `http://localhost:5173/admin`

## Build para produção

1. Entre em `app`
2. Rode `npm run build`
3. Publique todo o conteúdo de `app/dist`

## Integração com API / CMS

Este projeto já suporta conexão com um serviço de API de conteúdo a partir de:

- `VITE_NEWS_API_URL`
- `VITE_NEWS_API_KEY`
- `VITE_NEWS_CMS_PROVIDER` (opcional, use `strapi` para backends Strapi v5)

O cliente HTTP está em `app/src/services/api.ts`, o serviço de notícias em `app/src/services/news.service.ts` e o adaptador de Strapi em `app/src/services/strapi.adapter.ts`.

### Como configurar

1. Crie um arquivo `app/.env.local` a partir de `app/.env.example`
2. Preencha `VITE_NEWS_API_URL` com a URL base da sua API
3. Preencha `VITE_NEWS_API_KEY` se o backend precisar de autenticação Bearer

### Endpoints esperados

Os serviços fazem chamadas para:

- `/articles`
- `/articles/:slug`
- `/categories`
- `/authors`
- `/tags`
- `/articles/search?q=...`

Se a API não estiver configurada ou a conexão falhar, o app continuará usando os dados de `app/src/data/mockData.ts`.

## SEO dinâmico & Schema.org

Todas as páginas principais configuram meta tags dinamicamente (title, description, canonical, OpenGraph, Twitter Card) por meio de `<Seo />` (`app/src/components/common/Seo.tsx`) e do hook `useSeo` (`app/src/hooks/useSeo.ts`). Dados estruturados JSON-LD são injetados com `<JsonLd />` (`app/src/components/common/JsonLd.tsx`), usando os helpers de `app/src/lib/jsonld.ts`:

- `NewsMediaOrganization` e `WebSite` na home e na página Sobre
- `NewsArticle` em cada artigo (`/noticias/:slug`)
- `BreadcrumbList` em todas as páginas internas
- `CollectionPage` em índices, categorias e tags
- `Person` em cada perfil de colunista

O `robots` é definido dinamicamente (`noindex` em 404, busca e páginas administrativas).

## Formulários (Newsletter + Contato)

### Frontend

`app/src/services/forms.service.ts` centraliza as chamadas. Se `VITE_FORMS_API_URL` estiver em branco, o frontend assume que o endpoint é o próprio domínio (`/api/*`). Quando o backend não está disponível (ex: dev local sem Vercel CLI), há fallback elegante:

- Newsletter → aceita a inscrição localmente e emite warning no console
- Contato → abre o cliente de e-mail (mailto) com os campos pré-preenchidos

### Backend (Vercel Functions)

Funções em `api/newsletter.ts` e `api/contact.ts`. Runtime Node 20, sem SDKs — chamam diretamente as APIs REST do provedor escolhido.

Provedores suportados (detectados automaticamente por env var):

- **Brevo** (`BREVO_API_KEY`): newsletter (contatos em lista) + transacional
- **Resend** (`RESEND_API_KEY`): apenas transacional (contato)

Copie `.env.example` (na raiz do repo) para o dashboard do Vercel em "Environment Variables". Veja o arquivo para a lista completa.

## Admin

Rotas principais do painel:
- `/admin`
- `/admin/artigos`
- `/admin/artigos/novo`
- `/admin/autores`
- `/admin/categorias`
- `/admin/configuracoes`

### Segurança do admin

- `VITE_ADMIN_USER` — usuário
- `VITE_ADMIN_PASSWORD_HASH` — **hash SHA-256** da senha (recomendado em produção)
- `VITE_ADMIN_PASSWORD` — senha em texto, aceita **apenas em dev**

Em produção, o login é bloqueado se `VITE_ADMIN_PASSWORD_HASH` não estiver definido, e a tela exibe um aviso ao operador. A comparação é timing-safe.

Para gerar o hash:

```bash
node -e "crypto.subtle.digest('SHA-256', new TextEncoder().encode('SUA_SENHA')).then(h => console.log(Buffer.from(h).toString('hex')))"
```

## Hospedagem

O projeto foi preparado para **Vercel** (ver `vercel.json`). O build empacota o SPA em `app/dist` e as Vercel Functions em `api/`.

Para domínio raiz em Apache sem backend, ainda há `.htaccess` para manter as rotas do React; nesse cenário, desabilite os formulários de backend (deixe `VITE_FORMS_API_URL` em branco — o fallback mailto cobre o contato).

## WhatsApp flutuante

Botão configurável em `app/src/components/common/WhatsAppFloat.tsx`, usando `siteConfig.supportPhoneHref`. Exibe tooltip na primeira visita, esconde por 24h quando o usuário fecha, e não aparece em rotas `/admin/*`.

## Validações executadas

- `npm run lint`
- `npm run build`
- `npm run test`
- Conferida a geração de `app/dist`
