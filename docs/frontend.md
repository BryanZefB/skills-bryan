# Diretrizes de design e frontend

Toda decisão visual deve servir ao conteúdo, ao usuário e à marca. Busque identidade com legibilidade, consistência, acessibilidade e desempenho. Estas diretrizes orientam projetos React, TypeScript e Next.js; adapte-as ao contexto e à stack existente.

## Antes de implementar

Leia o briefing, as instruções do projeto, o `DESIGN.md` existente e o design system adotado. Confirme produto e problema, público, marca, conteúdo disponível, dispositivos principais, stack, referências e restrições que influenciam a entrega.

- Pergunte antes de codar quando faltar informação que mude a direção ou os critérios de aceite. Não repita perguntas já respondidas ou documentadas.
- Faça no máximo cinco perguntas por rodada, priorizadas por impacto; ofereça duas ou três opções concretas quando ajudar a decidir.
- Quando Bryan delegar uma escolha, decida, justifique brevemente e prossiga dentro do escopo autorizado. Registre hipóteses secundárias sem bloquear o trabalho.
- Use textos, imagens, dados e depoimentos reais. Não invente métricas ou endossos. Quando faltar conteúdo, combine como representá-lo e identifique exemplos como demonstrativos.
- Preserve a stack e as convenções do projeto. Para projetos React novos, considere TypeScript e Tailwind com tokens CSS quando adequados; a versão e as dependências devem ser decididas no contexto do projeto.

## Direção visual e DESIGN.md

Apresente uma direção curta antes de implementar. Registre-a no `DESIGN.md` da raiz do projeto usando o [modelo reutilizável](../templates/DESIGN.md), proporcional ao tamanho da tarefa. Integre documentos existentes; não os substitua sem revisar seu conteúdo e a autorização necessária.

| Decisão | O que registrar |
| --- | --- |
| Objetivo e identidade | Jornada prioritária, tom, referências e escolhas visuais justificadas pelo produto |
| Cor | Papéis de fundo, superfície, texto, ação, foco e estados; tokens e combinações de contraste verificadas |
| Tipografia | Família ou famílias, alternativas de carregamento, pesos, escala, altura de linha e suporte ao idioma |
| Layout | Hierarquia, largura de leitura, comportamento responsivo e escala de espaçamento |
| Componentes | Estados, formas, bordas, sombras, ícones e padrões de interação |
| Movimento | Propósito, duração, preferência de movimento reduzido e implementação necessária |

O documento registra decisões e aponta para os arquivos reais de tokens, componentes e estilos. Os valores implementados têm uma localização canônica no código; evite duplicá-los em tabelas que possam divergir. Antes do código existir, valores propostos podem constar no documento, claramente identificados. Atualize decisões e referências quando a implementação mudar.

## Identidade sem escolhas automáticas

Evite repetir hero centralizado, três cards, gradientes, caixas coloridas, efeitos de vidro ou animações de entrada sem relação com conteúdo e objetivo. Use-os quando houver uma justificativa concreta. Marca existente, compreensão da interface e necessidades do usuário orientam as escolhas.

- Inter, fontes de sistema ou uma única família tipográfica são opções válidas. Escolha por legibilidade, identidade, idioma, licença e custo de carregamento; não por uma proibição de nomes.
- Paleta reduzida, proporção 60/30/10 e escalas de 4 ou 8 px são pontos de partida. Cores semânticas, gráficos, alinhamento óptico e identidade podem exigir outras decisões.
- Defina uma escala coerente de raios, bordas e sombras. Centralização, simetria e grids regulares são válidos quando ajudam a leitura e a tarefa.
- Componentes como shadcn/ui, Radix, Headless UI ou Ark UI são opções. Adapte-os ao design system, sem exigir personalização profunda de componentes que já atendem ao projeto.
- Prefira um sistema consistente de ícones, com tamanho e peso adequados. Selecione imagens relevantes e com licença compatível; revise arte gerada antes de utilizá-la.
- Escreva textos específicos, com ações claras e voz de marca. Corte redundâncias sem impor uma porcentagem que remova informação útil.

## Skills e referências

Use `grilling` para esclarecer decisões, `frontend-design` para direção visual, `vercel-composition-patterns` para componentes React, `web-design-guidelines` para revisão de UI e `playwright-cli` para verificações de navegador. Use somente as relevantes para a tarefa. Se alguma estiver indisponível, aplique as diretrizes e informe o limite de verificação; não instale novas skills automaticamente.

Consulte referências apenas quando ajudarem a resolver uma decisão. Priorize a documentação da versão usada, o design system do produto, [React](https://react.dev/learn/thinking-in-react), [Next.js](https://nextjs.org/docs/app), [WCAG 2.2](https://www.w3.org/TR/WCAG22/) e as referências específicas abaixo. Exemplos de outros produtos servem como repertório, sem substituir os requisitos do projeto.

## Estrutura e comportamento

- Organize por funcionalidade. Componentes de UI, lógica de domínio e acesso a dados devem ter responsabilidades claras.
- Prefira TypeScript com modo estrito em projetos novos. Trate dados externos como não confiáveis e valide em runtime.
- Comece por HTML semântico e componentes pequenos com contratos explícitos. Extraia composição repetida quando melhorar manutenção, sem montar abstrações antecipadas.
- Mantenha estado mínimo. Derive valores calculáveis; escolha estado local, URL, cache de servidor ou estado compartilhado conforme quem precisa daquele dado. Veja [Thinking in React](https://react.dev/learn/thinking-in-react).
- Defina estados de carregamento, vazio, erro, sucesso e recuperação. Evite submits duplicados; exiba erro próximo ao campo e preserve entradas úteis.
- Formulários validam para orientar o usuário; validação e autorização no servidor continuam obrigatórias.

## Acessibilidade e responsividade

- Use HTML semântico, nomes acessíveis, rótulos e mensagens de erro associadas aos campos. Não dependa apenas de cor ou hover para comunicar informação.
- Verifique teclado, foco visível, ordem de leitura e retorno de foco ao fechar diálogos. Use ARIA quando necessário ao padrão implementado, sem substituir elementos nativos adequados.
- Para WCAG 2.2 AA, verifique contraste de pelo menos 4,5:1 para texto normal e 3:1 para texto grande segundo a definição do critério. Informações visuais necessárias para identificar controles, estados e gráficos precisam de 3:1 contra cores adjacentes, consideradas as exceções aplicáveis. APCA pode complementar a análise, mas não substitui esses critérios. Referências: [texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) e [contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- Teste mobile e desktop, larguras intermediárias, orientação quando relevante, conteúdo longo e tradução. Use 320, 375, 414 e 768 px como amostras iniciais; acrescente as larguras reais de uso do projeto.
- Verifique ampliação de texto a 200% e reflow a 320 CSS px de largura, inclusive o cenário de zoom de 400% sobre uma área de 1280 CSS px. Evite rolagem horizontal da página; tabelas e diagramas que exigem duas dimensões podem usar uma região própria acessível. Veja [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
- Respeite `prefers-reduced-motion` e preserve informação e feedback quando reduzir ou remover movimento. Não declare conformidade apenas porque uma biblioteca ou ferramenta automática passou.

## Movimento e recursos visuais

Toda animação deve servir a feedback, orientação, hierarquia ou narrativa. Prefira CSS para interações simples. Adicione Motion, GSAP ou recursos similares somente quando houver benefício que justifique dependências e manutenção; efeitos prontos precisam ser avaliados no contexto. Scroll suave ou efeitos dirigidos por scroll devem preservar navegação, controle e preferências do usuário.

Prefira `transform` e `opacity` quando apropriados; outras propriedades exigem avaliação e medição do impacto. Escolha easing, duração e molas pelo comportamento esperado, sem impor física de mola a toda interface. Consulte o [guia de animações eficientes](https://web.dev/articles/animations-guide).

## Next.js e segurança

Defina claramente o limite entre código de servidor e cliente. Só envie dados necessários ao navegador. Revalide identidade e permissão em operações de servidor, inclusive Server Actions; uma interface oculta não controla acesso. Não trate middleware como única barreira. Consulte o [guia de segurança de dados do Next.js](https://nextjs.org/docs/app/guides/data-security).

Separe caches públicos e privados. Um resultado personalizado não pode ser compartilhado com outro usuário por uma chave incompleta. Variáveis expostas no bundle são públicas; segredos permanecem no servidor.

## Desempenho e testes

Use `vercel-composition-patterns` para arquitetura de componentes e estado. Para desempenho, siga a documentação oficial de [React Profiler](https://react.dev/reference/react/Profiler) e o [guia de produção do Next.js](https://nextjs.org/docs/app/guides/production-checklist), conforme a versão do projeto. Priorize onde houver evidência de impacto: chamadas independentes em paralelo, menos waterfalls, payloads limitados, imagens adequadas e divisão de bundles. Meça antes e depois; não memorize tudo automaticamente.

Otimize imagens para seu contexto, dimensões e prioridade. Use fontes e pesos necessários, com fallback adequado; escolha `font-display` considerando legibilidade durante o carregamento e mudanças de layout, em vez de impor `swap` universalmente. Consulte [boas práticas de fontes](https://web.dev/articles/font-best-practices).

## Processo e critérios de entrega

1. Leia o contexto e esclareça as lacunas essenciais.
2. Apresente a direção e registre decisões no `DESIGN.md`, com referências aos tokens reais.
3. Implemente componentes e estados de carregamento, vazio, erro, sucesso, validação e indisponibilidade, conforme aplicáveis. Preserve entradas e ofereça recuperação de falhas.
4. Execute lint, typecheck, testes relevantes e build com os comandos reais do projeto. Use TDD para comportamento programável e testes de navegador para os fluxos essenciais.
5. Revise a interface em diferentes larguras, com teclado e conteúdo real; inspecione console, rede e DOM. Verifique identidade, hierarquia, legibilidade e consistência contra a direção documentada. Corrija padrões repetitivos sem função, sem refazer a interface apenas por semelhança com outros produtos.
6. Entregue decisões relevantes, testes executados e resultados, problemas conhecidos e itens não verificados. A prontidão para produção depende dos critérios acordados e das verificações realizadas; um build aprovado não comprova sozinho acessibilidade, desempenho ou segurança.
