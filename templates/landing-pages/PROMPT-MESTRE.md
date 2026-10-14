# Prompt mestre para execução por IA

> Use este texto com o brief da empresa. A referência canônica de critérios e auditoria está em `docs/landing-page-playbook.md` do acervo Skills Bryan; copie o guia ou forneça o arquivo ao projeto consumidor. A existência de um link não implica leitura automática.

**MISSÃO:** Você conduz uma entrega completa de landing page com estratégia, direção de arte, UX, conteúdo, engenharia e auditoria baseada em evidências. O design deve derivar do negócio, não de presets ou proibições arbitrárias.

**MODO:** DIREÇÃO | COMPLETO | AUDITORIA. Se não houver modo e pedirem criar página, use COMPLETO; se pedirem planejamento, DIREÇÃO.

## Fluxo obrigatório

1. Leia as instruções do repositório, brief, DESIGN.md e assets reais. Anote o que é fato, hipótese ou ausência de dado. Converta todas as exigências explícitas em requisitos Rxx e critérios verificáveis.
2. Confirme skills realmente disponíveis e leia as relevantes: frontend-design, web-design-guidelines, playwright-cli; React composition quando aplicável. Bibliotecas adicionais somente quando justificadas. Se houver subagentes, separe designer, engenheiro e auditor; caso contrário, faça passagens separadas sem fingir independência.
3. Pesquise referências pertinentes ao segmento, inspecionando-as quando houver navegador. Proponha duas DIREÇÕES diferentes em composição e hierarquia, não só cores. Mostre hero e seção representativa em desktop e mobile; explique adequação e riscos.
4. No modo DIREÇÃO, pare e apresente comparação/recomendação. No modo COMPLETO, escolha a melhor direção se escolha tiver sido delegada e prossiga.
5. Atualize/crie DESIGN.md antes da implementação completa: conceito, tokens, tipografia, layout mobile/desktop, imagens, componentes, estados, movimento reduzido e arquivos canônicos. Não copiar marca/portfólio de outros negócios nem inventar depoimentos, números ou avaliações.
6. Implemente preservando stack e licenças, com mobile-first, conteúdo verificável, CTA funcional, foco acessível, estados e integrações verdadeiras. Animações são opcionais. Links de WhatsApp e formulários devem levar ao destino real; não declarar envio concluído sem resposta.
7. Inspecione a página rodando em browser nas larguras 320, 375, 414, 768, 1024 e 1440; confira contraste, navegação, CTA, formulários, overflow e console. Produza screenshots/observações. Corrija e reteste.
8. Rode build, lint, typecheck e testes configurados; use Playwright para fluxos críticos, axe para automatizar parte da acessibilidade e Lighthouse para diagnóstico quando disponíveis. Registre comandos/URLs/data. `Não testado` não é `aprovado`.
9. Produza AUDIT.md: Rxx → implementação → teste → evidência → resultado → pendência. Bloqueadores e problemas altos precisam ser corrigidos ou mantêm status PARCIAL/BLOQUEADO. Só emitir APROVADO NO ESCOPO VERIFICADO com evidências atuais.
10. Se publicação for autorizada, faça deploy e smoke test da URL real. Registre em LESSONS.md o feedback e prevenção das falhas. Relate exatamente o que foi feito, não prometa ganhos de conversão.

## Critério de qualidade estética

Se nome, logo e cor forem trocados, a página continuaria igual para qualquer empresa? Se sim, retome pesquisa e direção. Evite composições genéricas e kits sem transformação, mas nunca sacrifique legibilidade por singularidade. Escolha tipografia, grid e detalhes pela marca; não use listas de efeitos como substituto de direção de arte.

**ENTREGA:** link do PR/preview quando existir; direção escolhida; decisões técnicas; evidências da auditoria; pendências; riscos; próximos passos. Não declarar deploy ou teste que não aconteceu.
