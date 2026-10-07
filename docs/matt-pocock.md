# Matt Pocock: dependências e configuração

O acervo inclui dez skills do Matt Pocock na mesma revisão upstream, com as instruções, metadados, templates e licenças originais. A recomendação do [autor](https://github.com/mattpocock/skills) é instalar a skill de setup e executá-la uma vez em cada repositório onde as skills de engenharia serão usadas.

## Instalar o conjunto completo selecionado

Depois do merge deste PR, execute na raiz do projeto consumidor:

```bash
npx skills@1.7.1 add BryanZefB/skills-bryan --skill setup-matt-pocock-skills grilling grill-with-docs domain-modeling codebase-design tdd diagnosing-bugs code-review to-spec to-tickets -a codex claude-code cursor --copy
```

Durante a revisão, pode usar o clone local no lugar de `BryanZefB/skills-bryan`. Esses comandos instalam só o conjunto selecionado, não todo o repositório do autor. Evite instalar o plugin completo do autor e essas cópias ao mesmo tempo, pois isso pode duplicar skills e criar conflito de nomes; o `grill-me` deste acervo é o da Kipper.

## Executar o setup no projeto, não globalmente

Invoque `setup-matt-pocock-skills` pela interface do agente. Em hosts que usam comandos de skills, normalmente `/setup-matt-pocock-skills`; no Codex, pode pedir explicitamente para usar `$setup-matt-pocock-skills`.

A skill original:

1. Inspeciona remote, instruções existentes, docs e estrutura do projeto.
2. Pergunta onde registrar specs/tarefas: GitHub, GitLab, arquivos Markdown locais ou outro tracker.
3. Usa um único `GLOSSARY.md` e `docs/adr/` para projetos simples; confirma alternativas quando há múltiplos contextos reais.
4. Mostra o bloco de instruções e os documentos propostos para você conferir antes de escrever.
5. Integra `## Agent skills` ao arquivo existente escolhido pelo protocolo e grava `docs/agents/issue-tracker.md` e `docs/agents/domain.md`.

`triage` não faz parte desta seleção. Portanto a seção de rótulos de triagem e `docs/agents/triage-labels.md` são omitidos pelo setup. `to-spec` e `to-tickets` ainda usam `ready-for-agent` para tarefas aprovadas: registre essa convenção no tracker escolhido e confirme o rótulo quando houver publicação no GitHub/GitLab. Nenhum rótulo ou issue é criado apenas ao instalar este acervo.

Instalação global torna as skills disponíveis; ela não elimina essa configuração por projeto. O tracker de um projeto não deve ser reutilizado automaticamente em outro.

## Dependências selecionadas

| Skill | Dependências/contexto |
| --- | --- |
| grill-with-docs | grilling + domain-modeling; o agente precisa conseguir invocar skills |
| to-spec | Setup do projeto, conversa já esclarecida e interfaces de teste confirmadas |
| to-tickets | Setup do projeto e aprovação da divisão em tickets |
| code-review | Setup do projeto, referência Git válida, diff e contexto da especificação; subagentes disponíveis |
| tdd | Interfaces públicas de teste combinadas; codebase-design e code-review disponíveis para as etapas relacionadas |

## Verificar o resultado no projeto

- Confirmar que o agente descobre todas as dez skills.
- Confirmar que o bloco `Agent skills` aponta para os documentos existentes e o tracker correto.
- Verificar a leitura do glossário/ADRs quando existirem; criá-los apenas quando houver termos ou decisões reais a registrar.
- Pedir um rascunho de especificação usando o contexto já acordado. Publicar issues continua exigindo autorização para o destino.
- Nas operações críticas, aplicar as regras pessoais do [modelo de projeto](../templates/AGENTS.project.md).

Este acervo está preparado para a configuração em cada projeto. Nenhum setup foi executado em projetos futuros nem foi escolhido um tracker universal para suas aplicações.
