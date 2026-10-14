# Verificação inicial do starter CRM

**Estado atual:** PARCIAL — código preparado, mas inspeção visual e E2E em navegador **ainda não executados nesta entrega**. Não usar este arquivo como certificado de qualidade ou segurança.

## Checklist
| Requisito | Método | Situação |
| --- | --- | --- |
| Dados permanecem locais, sem backend | Revisão da arquitetura | Implementado; persistência real ainda não testada em navegador |
| CRUD, filtros e etapas | Testes E2E: criar/editar/excluir/alterar etapa | Não verificado |
| Backup JSON/importação/CSV | Testes unitários da lógica + download/import real | Lógica coberta por testes no repo; browser não verificado |
| Acesso mobile 320/375/414/768/1024/1440 | Playwright screenshots e inspeção manual | Não verificado |
| Acessibilidade por teclado, foco e diálogo | Teste manual + axe | Não verificado |
| Fontes externas e sem rede | Teste com rede offline | Não verificado |
| GitHub Actions | Aguardar execução de `Landing Studio CRM tests` no PR | Verificar no PR |
| Deployment Vercel | Smoke test da URL publicada | Não publicado |

Quando houver ambiente com navegador e/ou CI executado, atualizar com data, comandos reais, evidências e resultado.
