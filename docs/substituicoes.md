# Substituição por fontes oficiais

Bryan autorizou remover as entradas com ressalvas na auditoria e substituí-las por alternativas oficiais. O conjunto resultante tem 17 skills e 114 arquivos originais, todos incluídos no repositório, além dos arquivos de licença de empacotamento. Não há obtenção complementar de fontes externas.

| Retirada | Alternativa selecionada | Fonte e cobertura |
| --- | --- | --- |
| `good-design` | `frontend-design` + `web-design-guidelines`, já presentes | [Anthropic](https://github.com/anthropics/skills/tree/main/skills/frontend-design) e [Vercel](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines): direção visual, interface, UX e acessibilidade |
| `grill-me` | `grilling`, já presente; `grill-with-docs` para registrar decisões | [Matt Pocock, autor original](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling): entrevista e questionamento das decisões |
| `vercel-react-best-practices` | `vercel-composition-patterns` | [Vercel](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/composition-patterns): composição, contratos de componentes e estado |
| `webapp-testing` | `playwright-cli` | [Microsoft](https://github.com/microsoft/playwright-cli/tree/b85c7a736bb473bf55b584e54a09ffa698d6d871/skills/playwright-cli): automação de navegador e testes Playwright |

## Motivos e limites

As duas entradas da Kipper não tinham licença explícita de redistribuição. A skill anterior de React tinha três links relativos quebrados em seu documento compilado. O helper Python de testes deixava servidores filhos ativos no Windows. Essas quatro pastas não fazem mais parte da seleção; o script de obtenção externa também foi removido.

As alternativas preservam os casos principais de uso, mas não são cópias funcionais idênticas. A combinação de design não reproduz o material de estratégia de produto, ativação e retenção da Kipper. `vercel-composition-patterns` não substitui todas as regras de desempenho da skill retirada; o [guia de frontend](frontend.md) mantém práticas e referências oficiais de React e Next.js para essa parte. Não há promessa de equivalência regra a regra.

O Playwright CLI gerencia sessões de navegador. O servidor da aplicação deve ser iniciado e encerrado pelo projeto. Consulte os [pré-requisitos e comandos](instalacao.md). As instruções oficiais podem apresentar exemplos Bash ou operações de publicação; as permissões da tarefa continuam prevalecendo.

## Preservação e manutenção

As duas novas pastas foram copiadas integralmente de blobs Git: 14 arquivos de composição e 11 arquivos do Playwright CLI. Nenhuma instrução original foi editada. Commits, hashes, modos Git e licenças estão em [sources.lock.json](../sources.lock.json). `grilling`, `frontend-design` e `web-design-guidelines` foram reaproveitadas sem duplicação nem alteração de conteúdo.

A [auditoria anterior](verificacao-2026-10-07.md) permanece como registro histórico. Instalações existentes em outros projetos não são atualizadas ou removidas por este PR; migre as cópias selecionadas pelo mecanismo do agente. Antes do merge, teste pelo clone ou pela branch do PR. Depois do merge, os comandos de instalação pelo GitHub passam a usar esta seleção.

## Validação da substituição

- As 17 pastas e os 114 arquivos originais foram comparados diretamente com as árvores e blobs das fontes fixadas; os hashes, modos e inventários conferem.
- Frontmatter YAML e referências Markdown locais fora de exemplos passaram na conferência das fontes selecionadas.
- Instalação isolada pelo `skills@1.7.1` para Codex, Cursor e Claude Code: 17 skills, 34 cópias verificadas nos diretórios compartilhados/específicos, sem as quatro retiradas. `metadata.json` é omitido pelo instalador, conforme documentado no guia de instalação.
- Teste real de `@playwright/cli@0.1.22` no Windows com Chromium headless: navegação, snapshot, clique, resultado JavaScript, encerramento da sessão e término do processo confirmados. O servidor local da fixture também foi encerrado pelo teste.
- Validador, Ruff e 10 testes de regressão aprovados. Os testes da antiga obtenção externa foram retirados junto do recurso.

Os testes verificam empacotamento, instalação e o fluxo de navegador descrito. Não representam execução completa de todas as instruções por todos os modelos de IA nem certificação de segurança de projetos futuros.
