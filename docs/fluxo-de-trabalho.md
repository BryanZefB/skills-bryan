# Fluxo de trabalho e autonomia

## 1. Perguntar antes de implementar

Comece com perguntas curtas, em rodadas, sobre usuário, problema, escopo, critérios de aceite, stack existente, dados, integrações e entrega. Reaproveite respostas já dadas. Para páginas simples, uma rodada pode bastar; para sistemas, esclareça permissões, falhas, concorrência e operação antes de definir a solução.

Use `grill-me` para a entrevista. Registre decisões importantes com `domain-modeling`; mantenha glossário para termos do negócio e ADR apenas quando houver uma escolha difícil de reverter, com alternativas reais.

## 2. Definir a entrega

Apresente um plano curto com comportamento esperado, exclusões, arquitetura proporcional, interfaces de teste e riscos. Confirme as interfaces de teste exigidas por `tdd`. Gere uma especificação com `to-spec` após a entrevista, se necessário. Para trabalho maior, use `to-tickets` com entregas verticais e dependências.

Configure o tracker antes dessas skills. Redigir um documento local não equivale a autorização para publicar issues. Prefira o [modelo de especificação](../templates/spec.md) para uma definição simples sem tracker.

## 3. Implementar e verificar

Trabalhe em branch, em fatias completas: comportamento, persistência/API/interface quando aplicável e teste. Aplique os guias de [arquitetura](arquitetura.md), [frontend](frontend.md), [backend](backend.md) e [segurança](seguranca.md) apenas onde forem relevantes.

Use TDD para comportamento programável nas interfaces acordadas; uma edição puramente documental ou visual pode exigir validação visual e acessibilidade em vez de um teste artificial. A skill original de TDD separa revisão/refatoração do ciclo vermelho e verde; preserve essa distinção ao invocá-la.

## 4. Autorizar ações críticas

| Ação | Conduta |
| --- | --- |
| Inspeção, diagnóstico e rascunho | Após esclarecer a tarefa, prosseguir dentro do acesso autorizado |
| Criar código/arquivos na branch no escopo aprovado | Prosseguir e mostrar diff e verificações |
| Remover arquivos, substituir instruções ou atualizar dependências/configurações com impacto crítico | Mostrar proposta, impacto e recuperação; pedir autorização específica |
| Migração destrutiva, reset, exclusão de dados ou mudanças de autenticação/permissões | Preparar plano, backup verificado e alternativa segura; aguardar autorização |
| Deploy em produção, merge, force-push, mudanças em segredos, DNS ou configurações de segurança | Exigir autorização específica para ambiente e operação |
| Publicar issues, mensagens ou artefatos externos | Exigir autorização para o destino e a publicação |

Se houver dúvida sobre a criticidade, explique a mudança concreta e pause só a ação dependente. Silêncio não é aprovação. Continue preparação reversível e verificações independentes. Nunca coloque senha, token ou dados pessoais no pedido de autorização.

## 5. Revisar e entregar

Compare implementação com especificação e padrões. Mostre o que mudou, por quê, comandos executados, resultados e limitações. Use o [checklist de entrega](../templates/entrega.md). Não declare uma verificação como executada quando foi apenas proposta.
