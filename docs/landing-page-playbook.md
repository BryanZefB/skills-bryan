# Estúdio de landing pages — processo mestre

Versão 1.0 · 14/10/2026. Processo de trabalho proposto, não prova de que agentes independentes ou ferramentas foram executados.

## Objetivo e limites

Produzir landing pages específicas para cada empresa, com boa direção visual, conteúdo verdadeiro, execução funcional e auditoria verificável. Nenhum prompt garante beleza, vendas, originalidade absoluta ou ausência de falhas. A evolução entre projetos vem de feedback e evidências registrados, não de adicionar efeitos.

**Princípio central:** pedido → implementação → verificação real → evidência → resultado. O arquivo DESIGN.md documenta decisões, mas não testa o navegador.

## Três modos

- **DIREÇÃO:** pesquisar marca, registrar brief e apresentar duas propostas visuais distintas (hero + uma seção, desktop e mobile). Não construir a página inteira.
- **COMPLETO:** brief → pesquisa → duas direções → escolha documentada → implementação → auditoria → correções → entrega. Se a escolha visual for delegada, selecionar a mais adequada e explicar.
- **AUDITORIA:** avaliar um projeto existente; não fazer redesign amplo sem pedido explícito.

## Papéis e separação de responsabilidades

| Papel | Resultado |
| --- | --- |
| Líder de entrega | Escopo, prioridades e requisitos R01...Rn |
| Estratégia/conversão | Público, proposta de valor e ação principal |
| Direção de arte | Duas direções diferentes, fundamentadas na empresa |
| UX/UI | Hierarquia, comportamento mobile e acessibilidade |
| Redação | Conteúdo específico, origem de fatos e objeções |
| Engenharia | Código e integrações operacionais |
| Movimento | Animação apenas quando comunicar ou dar feedback |
| Auditor | Evidências de requisitos, testes e problemas restantes |

Delegar subagentes **apenas quando o ambiente suportar**. Se o mesmo agente executar revisão, identificar isso; não inventar independência. Definir propriedade de arquivos para evitar edições concorrentes.

## Etapa 0 — preparação

1. Ler o pedido, AGENTS.md/CLAUDE.md existente, README, DESIGN.md existente e documentação pertinente.
2. Conferir as skills **que realmente existem** no ambiente. No acervo Skills Bryan estão `frontend-design`, `web-design-guidelines`, `playwright-cli`, `vercel-composition-patterns`, `tdd` e `code-review` entre outras. Usar as relevantes; o acervo não carrega instruções automaticamente em outro projeto.
3. Se usar repositórios externos, verificar licença, compatibilidade, versão/commit e necessidade. Não instalar bibliotecas por catálogo.
4. Definir modo, dados conhecidos, dúvidas que bloqueiam produção e critérios de aceite. Em lacunas reversíveis de design, decidir e registrar hipótese; **nunca inventar dados da empresa**.

Fontes para consulta conforme o caso: [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), [Vercel agent skills](https://github.com/vercel-labs/agent-skills), [Stitch skills](https://github.com/google-labs-code/stitch-skills), [Playwright](https://github.com/microsoft/playwright), [axe-core](https://github.com/dequelabs/axe-core), [Lighthouse](https://github.com/GoogleChrome/lighthouse), [Superpowers](https://github.com/obra/superpowers), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Core Web Vitals](https://web.dev/articles/vitals). Essas fontes ajudam a projetar e testar; não são aprovação automática.

## Etapa 1 — brief e requisitos

Criar `BRIEF.md` com: negócio e cidade, público, serviço/oferta, principal CTA, diferencial confirmado, objeções, concorrentes e referências, logo/fotos/contatos autorizados, dados faltantes, riscos, integrações e destino de deploy. Transformar **cada exigência explícita** em requisito numerado `R01`, `R02` etc., com critério de aceite testável.

Separar **confirmado / hipótese / desconhecido**. Não inventar preços, prêmios, tempo de mercado, depoimentos, números, avaliações ou resultados. Fotografias sintéticas não representam projetos reais executados.

## Etapa 2 — duas direções realmente diferentes

Inspecionar de 3 a 5 referências pertinentes, quando houver acesso; registrar links e o que foi observado. Criar duas propostas que se diferenciem em hierarquia, composição, peso de imagem, ritmo, tipografia e tom — não só cor. Mostrar comparação do hero e uma seção em desktop/mobile com o mesmo conteúdo.

Escolher conforme o público e a marca, não conforme tendências. Critério editorial: se remover o logotipo, a página ainda comunica algo específico daquele negócio? Se bastar trocar nome e cor para servir a outra empresa, rever a composição.

## Etapa 3 — DESIGN.md

Documentar conceito, tokens semânticos, tipografia e origem/licença, grid, gutters, espaçamento, raios, bordas, sombras, tratamento de imagens, estados interativos, movimento e `prefers-reduced-motion`, comportamento de seções em desktop/mobile e padrão de CTAs. Referenciar o arquivo onde os tokens são implementados para evitar divergência.

Defaults para projetos de landing page: evitar visual genérico de templates, gradientes decorativos, emojis de interface, cards repetitivos e motion sem função. **Não converter preferências em leis universais:** centralização, uma única família tipográfica, cards ou simetria podem funcionar se forem escolhas conscientes; não impor React, shadcn, GSAP ou outras bibliotecas à toa. O design deve ser autoral **e compreensível**.

## Etapa 4 — engenharia

Respeitar stack e convenções existentes. Página simples pode ser estática; React + TypeScript é opção, não obrigação. Sem segredos no cliente. Construir primeiro jornada principal e CTAs. Links WhatsApp/telefone e formulário precisam funcionar no destino real; formulário só confirma sucesso após o serviço responder, não após validação local.

Usar HTML semântico, acessibilidade por teclado, foco visível, estados de carregamento/erro/sucesso, imagens/fontes otimizadas e metadados essenciais. Aplicar animações CSS simples antes de bibliotecas pesadas; permitir redução de movimento. Nunca esconder conteúdo atrás de animação. Preservar licenças de fontes/assets.

## Etapa 5 — inspeção visual real

Executar a página no navegador e inspecionar **screenshots reais** e comportamento nas larguras 320, 375, 414, 768, 1024 e 1440 CSS px (adicionar pontos críticos). Conferir menu, header sticky, hero, seções, CTA, formulários, quebras de texto, overflow, foco, ícones, imagens e contraste. Corrigir e capturar evidência posterior. Emulação não substitui aparelho físico; não mascarar problemas com `overflow-x:hidden` global.

## Etapa 6 — auditoria independente quando viável

Preencher `AUDIT.md` com Rxx, local da implementação, teste feito, evidência, resultado e pendência. Testes:
- Build, lint, typecheck e testes automatizados onde configurados; registrar comandos **executados**.
- Menu mobile, âncoras, links, CTA, formulário válido/inválido, falha de rede, destino externo e console.
- Teclado, ordem de foco, labels, imagens alternativas, reflow, zoom, contraste WCAG 2.2 AA (4,5:1 texto normal, 3:1 texto grande), movimento reduzido. axe auxilia, mas não certifica.
- Lighthouse no build publicado/produção, registrar data, URL, ambiente e métricas. Metas de campo quando mensuráveis: LCP ≤ 2,5 s; INP ≤ 200 ms; CLS ≤ 0,1 no P75. Laboratório não é dado de campo.
- Metadados, indexação quando relevante, preview social, canonical quando definido; não prometer ranking ou conversão.

Prioridades: **bloqueador** (jornada quebrada, falsidade comercial, dados perdidos); **alto** (CTA ausente no mobile, acessibilidade crítica, requisito obrigatório descumprido); médio/baixo (problemas localizados). Corrigir bloqueadores/altos e repetir testes impactados. Sem evidência, escrever **não verificado**.

**Veredito:** `APROVADO NO ESCOPO VERIFICADO` só se requisitos obrigatórios e testes pertinentes passaram e nenhum bloqueador/alto está aberto; caso contrário `PARCIAL` ou `BLOQUEADO`. Não declarar que "tudo funciona" com base em inspeção mental.

## Entrega e aprendizado

Entregar decisão visual, links de PR, preview/Vercel quando existente, evidências e pendências. Só publicar/deployar com autorização específica; depois do deploy, conferir URL e links críticos novamente. Registrar em `LESSONS.md` falhas reais, causa, correção e regra preventiva — sem promover gosto de um cliente a regra universal.

## Estrutura mínima em cada landing page

```text
BRIEF.md
DESIGN.md
AUDIT.md
LESSONS.md
docs/evidence/  # somente capturas sem informação privada
```

Templates estão em [templates/landing-pages](../templates/landing-pages/). O fluxo de prospecção e comercial está em [prospeccao-landing-pages.md](prospeccao-landing-pages.md).
