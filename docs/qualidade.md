# Qualidade, TDD e entrega

## Código e testes

Defina comandos reais no projeto para lint, formatação, typecheck, testes e build. Respeite o gerenciador de pacotes e o lockfile existentes. Prefira TypeScript estrito; justifique `any`, supressões e dependências novas.

Use `tdd` nas interfaces previamente combinadas: teste que falha pelo comportamento esperado, implementação mínima, teste que passa. A revisão/refatoração acontece depois do ciclo, conforme a skill original. Não escreva todos os testes e toda a implementação em blocos separados.

- **Regras de negócio:** casos relevantes e erros pela interface pública.
- **Integração:** contrato real com banco, transações, constraints e serviços isolados quando necessário.
- **E2E:** poucos fluxos centrais, como login e uma operação principal completa.
- **Segurança:** negação de acesso e tentativa de atravessar usuário/tenant nos recursos protegidos.
- **Visual:** responsividade, estados e teclado em mudanças de interface.

Não exija percentual de cobertura arbitrário. Priorize comportamentos de risco e regressões demonstradas. Fixtures devem ser sintéticas; jamais use dados de produção sem processo específico autorizado.

## Branches e revisão

Use `feat/<tema>`, `fix/<tema>` ou `docs/<tema>` a partir da branch de referência acordada. Commits pequenos com mensagem que explica a intenção; Conventional Commits é uma convenção útil quando o projeto adota.

Abra PR com problema, comportamento resultante, verificações e riscos materiais. Compare a mudança com os padrões e com os critérios de aceite. `code-review` exige ponto fixo, especificação/tracker e suporte a subagentes; consulte as [limitações](catalogo.md).

Solicite autorização para merge e ações críticas. Não force-push, apague branches ou resete conteúdo sem aprovação. Rebase ou merge deve respeitar o fluxo já adotado no projeto.

## CI das aplicações

O pipeline do projeto deve executar instalação pelo lockfile, lint/formatação, typecheck, testes relevantes e build. Adicione análise de dependências e segredos quando disponível; valide migrations e ambiente isolado para integração. Produção requer aprovação específica e estratégia de recuperação.

Configure permissões mínimas, evite executar código de PR não confiável com segredos e fixe ações por SHA. Consulte o [guia de uso seguro do GitHub Actions](https://docs.github.com/en/actions/reference/security/secure-use).

## CI deste acervo

`Validar acervo` executa a validação de hashes, seleção de skills, metadados e links locais, lint com Ruff fixado e testes dos scripts em Linux e Windows. Ruff só inspeciona código próprio; a validação Python também confere sua sintaxe. Dependabot abre propostas para atualizar actions; não faz merge.

Proteção da branch e status obrigatório são recomendações a configurar com autorização do proprietário. Um workflow versionado sozinho não impede merge; essas configurações não foram alteradas por esta entrega.
