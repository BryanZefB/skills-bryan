# Catálogo e quando usar

| Área | Skill | Quando usar | Disponibilidade |
| --- | --- | --- | --- |
| Planejamento | [grill-me](https://github.com/kipperacademy/skillpper/tree/163871cc03be9941216cadf817180e7b00a6ed21/grill-me) | Entrevistar antes de implementar: escopo, stack, regras e critérios | Obtenção local da fonte |
| Planejamento | [grill-with-docs](../skills/grill-with-docs/SKILL.md) | Entrevista com registro de decisões e vocabulário | Dependência `grilling` ausente |
| Planejamento | [to-spec](../skills/to-spec/SKILL.md) | Sintetizar uma conversa já esclarecida em especificação | Configurar tracker e rótulos antes de publicar |
| Planejamento | [to-tickets](../skills/to-tickets/SKILL.md) | Dividir uma especificação em entregas verticais e dependências | Aprovar a divisão e configurar o destino |
| Arquitetura | [domain-modeling](../skills/domain-modeling/SKILL.md) | Definir termos do domínio, glossário e ADRs | Distribuída |
| Arquitetura | [codebase-design](../skills/codebase-design/SKILL.md) | Projetar interfaces pequenas, módulos profundos e pontos de teste | Distribuída |
| Design de produto | [good-design](https://github.com/kipperacademy/skillpper/tree/163871cc03be9941216cadf817180e7b00a6ed21/good-design) | Avaliar jornada, ativação, clareza, retenção e limites éticos | Obtenção local da fonte |
| Frontend | [frontend-design](../skills/frontend-design/SKILL.md) | Criar interfaces com direção visual consistente | Distribuída |
| Frontend | [vercel-react-best-practices](../skills/vercel-react-best-practices/SKILL.md) | Revisar desempenho de React e Next.js | Distribuída |
| Qualidade | [tdd](../skills/tdd/SKILL.md) | Implementar comportamentos em ciclos de teste vermelho e verde | Confirmar interfaces de teste antes |
| Qualidade | [diagnosing-bugs](../skills/diagnosing-bugs/SKILL.md) | Reproduzir e investigar bugs ou regressões com um sinal verificável | Distribuída; há helper Bash opcional |
| Qualidade | [code-review](../skills/code-review/SKILL.md) | Comparar uma mudança com padrões e especificação | Exige referência Git, contexto e suporte a subagentes |

## Limitações preservadas

- `grill-with-docs` chama literalmente `grilling` e `domain-modeling`. `grill-me` não é uma substituição automática para `grilling`. Enquanto a dependência não for autorizada, use `grill-me` e `domain-modeling` explicitamente em etapas distintas, sem afirmar que executou o wrapper original.
- `code-review`, `to-spec` e `to-tickets` referem-se ao setup de tracker do autor. Essa skill de setup não faz parte da seleção. Informe no projeto o tracker, como acessar a especificação, o destino, a convenção de rótulos e as permissões. Se o host ainda exigir o setup ausente, pare essa etapa; não instale a dependência silenciosamente. O exemplo de contexto está no [modelo de projeto](../templates/AGENTS.project.md).
- `to-spec` sintetiza contexto existente; a entrevista deve acontecer antes. `to-tickets` pede aprovação da divisão antes de publicar. A publicação no tracker deve estar autorizada.
- `code-review` prevê revisão em subagentes. Se a ferramenta não permitir delegação, informe a limitação; uma revisão manual dos dois eixos é alternativa, sem alegar execução integral da skill.
- Os originais de Matt preservam `disable-model-invocation` e `agents/openai.yaml` quando presentes. O comportamento de descoberta e invocação varia por agente; invoque pelo nome se necessário.
- Os scripts de diagnóstico em `.sh` exigem Bash (por exemplo Git Bash ou WSL no Windows). Não são executados pela instalação ou pelo CI deste acervo.
- Os guias de backend e segurança complementam a seleção como documentação, sem serem skills dedicadas ou garantia de segurança.

## Combinações úteis

Página simples: `grill-me` → `good-design` → `frontend-design` → revisão funcional e acessibilidade. Use `vercel-react-best-practices` quando houver React/Next.js.

API ou sistema: entrevista → `domain-modeling` + `codebase-design` → `to-spec` → `to-tickets` quando necessário → `tdd` → `code-review`.

Bug: esclarecer o sintoma e os limites de acesso → `diagnosing-bugs` → teste de regressão na interface adequada → revisão.
