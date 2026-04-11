# Documentacao Operacional

## Arquivos importantes

- Conteudo publico: `app/src/data/mockData.ts`
- Marca e contatos: `app/src/config/site.ts`
- Build final: `app/dist`

## Como publicar

1. Rode `npm run build` em `app`
2. Copie todo o conteudo de `app/dist` para a raiz do dominio
3. Garanta que o arquivo `.htaccess` subiu junto
4. Teste `/`, `/noticias`, `/admin` e uma pagina interna

## Observacao sobre o admin

O admin desta entrega nao grava em banco. Ele serve para organizacao, revisao e navegacao interna. A persistencia editorial continua em arquivo local ate uma futura integracao com backend ou CMS.