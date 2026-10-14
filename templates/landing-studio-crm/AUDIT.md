# Auditoria do Landing Studio CRM

**Status geral: PARCIAL (CI automatizado aprovado; revisão humana visual e preview Vercel pendentes).**

## Evidências da branch `feat/landing-studio-guided-workflow`

- Commit implementado e testado: `6cf34a02d68dfccd0015c5775f8864e5b4ddd20b`.
- [Landing Studio CRM tests](https://github.com/BryanZefB/skills-bryan/actions/runs/38633301571) — **SUCCESS**: lint sintático (Node), regressões de domínio, execução Chromium Playwright.
- [Validar acervo](https://github.com/BryanZefB/skills-bryan/actions/runs/38633301420) — **SUCCESS**: integridade das skills e scripts próprios em CI.
- [Artefato de screenshots: 6 larguras, dashboard e roteiro](https://github.com/BryanZefB/skills-bryan/actions/runs/38632232393) — artefato `landing-studio-browser-evidence` disponível temporariamente no run (capturado, **não inspecionado visualmente por pessoa nesta execução**).

## Matriz
| Exigência | Teste executado | Resultado |
| --- | --- | --- |
| Cadastrar e encontrar empresa | Playwright: form, salvar, buscar por cidade/nome | Passou |
| Persistência por navegador | Playwright: checklist e reload | Passou |
| Checklist individual de 7 etapas | Playwright: marcar, reabrir e conferir 1/7 | Passou |
| Prompt contextualizado | Playwright: clipboard de `brief` | Passou |
| Funil comercial | Playwright: mudar etapa e conferir | Passou |
| Backup JSON | Playwright: baixar, alterar registro, importar e recuperar valor original; unit tests: exportar/restaurar | Passou |
| Compatibilidade com backups anteriores | Unit test normalizando registro antigo | Passou |
| Filtrar e evitar fórmulas em CSV | Unit tests | Passou no escopo testado |
| Viewports mobile e desktop | Playwright: 320, 375, 414, 768, 1024, 1440, sem overflow de documento/diálogo | Passou no escopo automatizado |
| Screenshots avaliadas visualmente por designer | Inspeção humana de tipografia, espaçamento, layout | Não verificado |
| Acessibilidade automática e teclado básico | axe-core (dashboard e diálogo), teclado Enter/Escape em Chromium | Passou no escopo automático |
| Auditoria WCAG 2.2 AA completa | Teclado extenso, leitor de tela, inspeção manual | Não verificado |
| Importação JSON pelo seletor de arquivo | E2E: backup exportado, alteração da etapa, reimportação e restauração do estado anterior | Passou |
| Infraestrutura e autenticação compartilhada | App permanece em localStorage sem conta | Não implementado nesta versão |
| Publicação na Vercel | Preview/site publicado e smoke test | Não realizado |

## Observações importantes
- O CRM é local-first: dados persistem por **origem e navegador**, não por conta ou dispositivo. Há exportação de backup; não subir exportações com dados comerciais ao GitHub público.
- Um checklist marcado não constitui comprovação de auditoria ou autorização para deploy. O relatório `AUDIT.md` de cada landing page deve conter evidências.
- Os testes no Chromium confirmam fluxos fundamentais, ausência de violações sérias/críticas de axe nas duas telas verificadas e navegação básica por teclado. Isso não garante usabilidade, acessibilidade total, segurança ou qualidade estética.
- Nenhum lead de empresa real foi inserido ou publicado nesta entrega. Nenhum contrato, mensagem externa ou deploy de produção foi executado.

## Próximo gate
Revisar screenshots e fazer auditoria manual aprofundada de teclado, foco, leitor de tela e conteúdo. Após autorização e conexão de Vercel com permissão apropriada, criar um preview protegido para validação em dispositivo real.
