# Catálogo e quando usar

| Área | Skill | Quando usar | Disponibilidade |
| --- | --- | --- | --- |
| Configuração | [setup-matt-pocock-skills](../skills/setup-matt-pocock-skills/SKILL.md) | Definir tracker e layout do domínio de cada projeto antes das skills de engenharia | Distribuída; execução interativa por projeto |
| Planejamento | [grilling](../skills/grilling/SKILL.md) | Testar decisões e ideias em uma entrevista estruturada | Distribuída; dependência de grill-with-docs |
| Planejamento | [grill-with-docs](../skills/grill-with-docs/SKILL.md) | Entrevista com registro de decisões e vocabulário | Distribuída com grilling e domain-modeling |
| Planejamento | [to-spec](../skills/to-spec/SKILL.md) | Sintetizar uma conversa já esclarecida em especificação | Configurar tracker e rótulos antes de publicar |
| Planejamento | [to-tickets](../skills/to-tickets/SKILL.md) | Dividir uma especificação em entregas verticais e dependências | Aprovar a divisão e configurar o destino |
| Arquitetura | [domain-modeling](../skills/domain-modeling/SKILL.md) | Definir termos do domínio, glossário e ADRs | Distribuída |
| Arquitetura | [codebase-design](../skills/codebase-design/SKILL.md) | Projetar interfaces pequenas, módulos profundos e pontos de teste | Distribuída |
| Frontend | [frontend-design](../skills/frontend-design/SKILL.md) | Criar interfaces com direção visual consistente | Distribuída |
| Frontend | [vercel-composition-patterns](../skills/vercel-composition-patterns/SKILL.md) | Revisar composição, APIs de componentes e estado no React | Distribuída; seção de React 19 exige essa versão |
| Frontend | [web-design-guidelines](../skills/web-design-guidelines/SKILL.md) | Auditar interface, UX e acessibilidade | Distribuída; busca diretrizes atualizadas pela rede |
| Segurança | [security-best-practices](../skills/security-best-practices/SKILL.md) | Desenvolver/revisar segurança quando solicitado explicitamente | Distribuída; Python, JavaScript/TypeScript e Go |
| Segurança | [security-threat-model](../skills/security-threat-model/SKILL.md) | Mapear ameaças e controles de um projeto concreto quando solicitado | Distribuída; exige contexto do sistema |
| Banco de dados | [supabase-postgres-best-practices](../skills/supabase-postgres-best-practices/SKILL.md) | Projetar e revisar schemas, migrations, SQL, RLS, índices e desempenho | Distribuída; Postgres em diferentes ambientes |
| Qualidade | [playwright-cli](../skills/playwright-cli/SKILL.md) | Navegar, verificar interfaces e criar/executar testes Playwright | Distribuída; CLI Node.js e browser no projeto consumidor |
| Qualidade | [tdd](../skills/tdd/SKILL.md) | Implementar comportamentos em ciclos de teste vermelho e verde | Confirmar interfaces de teste antes |
| Qualidade | [diagnosing-bugs](../skills/diagnosing-bugs/SKILL.md) | Reproduzir e investigar bugs ou regressões com um sinal verificável | Distribuída; há helper Bash opcional |
| Qualidade | [code-review](../skills/code-review/SKILL.md) | Comparar uma mudança com padrões e especificação | Exige referência Git, contexto e suporte a subagentes |

## Configuração e limites

As 17 skills são distribuídas integralmente. Para trocar cópias de versões anteriores, consulte a [migração](instalacao.md#atualizações-e-migração).

- `grill-with-docs` chama literalmente `grilling` e `domain-modeling`; ambas estão incluídas. `grilling` é a opção de entrevista mantida pelo próprio Matt Pocock.
- `code-review`, `to-spec` e `to-tickets` precisam de configuração por projeto. `setup-matt-pocock-skills` e seus templates originais estão incluídos. Siga o [guia de Matt Pocock](matt-pocock.md) antes do primeiro uso. As dependências são verificadas pelo validador do acervo.
- `to-spec` sintetiza contexto existente; a entrevista deve acontecer antes. `to-tickets` pede aprovação da divisão antes de publicar. A publicação no tracker deve estar autorizada.
- `code-review` prevê revisão em subagentes. Se a ferramenta não permitir delegação, informe a limitação; uma revisão manual dos dois eixos é alternativa, sem alegar execução integral da skill.
- Os originais de Matt preservam `disable-model-invocation` e `agents/openai.yaml` quando presentes. O comportamento de descoberta e invocação varia por agente; invoque pelo nome se necessário.
- Os scripts de diagnóstico em `.sh` exigem Bash (por exemplo Git Bash ou WSL no Windows). Não são executados pela instalação ou pelo CI deste acervo.
- As skills de segurança têm gatilhos próprios: não transforme toda edição em uma auditoria. Nenhuma skill oferece garantia automática de segurança.
- O repositório `openai/skills` declara depreciação e aponta para `openai/plugins`. As duas sugestões autorizadas foram preservadas na revisão registrada; não houve substituição por outra fonte. Confira manutenção e compatibilidade antes de futuras atualizações.

## Combinações úteis

Página simples: `grilling` → `frontend-design` → `web-design-guidelines` + `playwright-cli`. Use `vercel-composition-patterns` para componentes React e o [guia de frontend](frontend.md) para desempenho e Next.js.

API ou sistema: entrevista → `domain-modeling` + `codebase-design` → `to-spec` → `to-tickets` quando necessário → `tdd` → `code-review`.

Bug: esclarecer o sintoma e os limites de acesso → `diagnosing-bugs` → teste de regressão na interface adequada → revisão.

## Possíveis complementos

Avalie uma skill específica para NestJS e outra para Docker/CI/CD quando o projeto exigir. Antes de adicionar, confira autoria, licença, dependências e sobreposição com o acervo; novas skills precisam de autorização de Bryan.
