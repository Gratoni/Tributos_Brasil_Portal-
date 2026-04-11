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