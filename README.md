# Tributos Brasil

Portal editorial estatico em React, TypeScript e Vite.

## Como rodar

1. Entre em `app`
2. Instale dependencias com `npm install`
3. Rode `npm run dev`
4. Acesse `http://localhost:5173`
5. Admin em `http://localhost:5173/admin`

## Build para producao

1. Entre em `app`
2. Rode `npm run build`
3. Publique todo o conteudo de `app/dist`

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

## Hospedagem

- Esta entrega foi preparada para dominio raiz em Apache
- O build final inclui `.htaccess` para manter as rotas do React
- Publique `index.html`, pasta `assets` e `.htaccess` juntos

## Admin

Rotas principais do painel:
- `/admin`
- `/admin/artigos`
- `/admin/artigos/novo`
- `/admin/autores`
- `/admin/categorias`
- `/admin/configuracoes`

Importante:
- O painel esta pronto para navegacao e revisao visual
- O conteudo publico ainda vem de `app/src/data/mockData.ts`
- Nao ha backend/CMS persistente nesta versao

## Validacoes executadas

- `npm run lint`
- `npm run build`
- conferida a geracao de `app/dist`
- conferida a presenca do `.htaccess` no build final