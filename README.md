# Skills Bryan

17 skills de fontes oficiais para planejamento, arquitetura, frontend, segurança, PostgreSQL, testes e revisão. Stack de referência: React, TypeScript, Next.js, NestJS, Prisma, PostgreSQL e Docker.

## Instalação rápida

Requer Git e Node.js/npm. Execute na raiz do projeto em que deseja usar as skills. Os comandos funcionam no PowerShell, Bash e Zsh e mantêm a confirmação do instalador.

**Instalar todas para Codex, Claude Code e Cursor:**

```bash
npx skills@1.7.1 add BryanZefB/skills-bryan --skill "*" --agent codex claude-code cursor --copy
```

**Instalar globalmente para usar em vários projetos:**

```bash
npx skills@1.7.1 add BryanZefB/skills-bryan --skill "*" --agent codex claude-code cursor --copy --global
```

**Listar as disponíveis ou instalar apenas algumas:**

```bash
npx skills@1.7.1 add BryanZefB/skills-bryan --list
npx skills@1.7.1 add BryanZefB/skills-bryan --skill frontend-design playwright-cli --agent codex --copy
```

Troque os nomes depois de `--agent` pelos agentes que utiliza. Escolha instalação por projeto ou global para evitar cópias duplicadas. As opções de clone local, pré-requisitos do Playwright e migração estão no [guia de instalação](docs/instalacao.md).

## Depois de instalar

1. Consulte o [catálogo](docs/catalogo.md) para escolher a skill adequada.
2. Adapte o [modelo de instruções](templates/AGENTS.project.md) ao projeto, integrando-o às regras existentes.
3. Faça o [setup das skills de Matt Pocock](docs/matt-pocock.md) em cada projeto consumidor.
4. Siga o [fluxo de trabalho](docs/fluxo-de-trabalho.md): perguntas, definição, implementação e revisão.
5. Para interfaces, siga as [diretrizes de design e frontend](docs/frontend.md) e adapte o [modelo DESIGN.md](templates/DESIGN.md) à raiz do projeto, integrando decisões existentes.

O instalador copia as skills. Os guias, as regras pessoais e os runtimes de testes precisam ser configurados no projeto conforme o guia de instalação.

## Guias

| Assunto | Documentação |
| --- | --- |
| Skills e compatibilidade | [Catálogo](docs/catalogo.md) |
| Instalação e migração | [Instalação](docs/instalacao.md) |
| Configuração de Matt Pocock | [Setup por projeto](docs/matt-pocock.md) |
| Planejamento e autorização | [Fluxo de trabalho](docs/fluxo-de-trabalho.md) |
| Clean Architecture | [Arquitetura](docs/arquitetura.md) |
| Design, React e Next.js | [Frontend](docs/frontend.md) e [modelo DESIGN.md](templates/DESIGN.md) |
| NestJS, ORM e PostgreSQL | [Backend](docs/backend.md) |
| Segurança e dados | [Segurança](docs/seguranca.md) |
| TDD, revisão e branches | [Qualidade](docs/qualidade.md) |
| Atualizar e validar o acervo | [Contribuição](CONTRIBUTING.md) |

## Estrutura

```text
skills/             # Pastas originais completas, uma por skill
docs/               # Guias de uso e boas práticas
templates/          # Instruções de projeto, especificação, ADR e entrega
scripts/            # Validador de integridade
tests/              # Testes do validador
.github/            # CI, Dependabot e modelo de pull request
sources.lock.json   # Fontes, commits, hashes e dependências
```

Os 114 arquivos originais das skills são preservados byte a byte, com instruções em inglês e documentação própria em português. Autoria e licenças estão em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Para conferir um clone do acervo, com Python 3.11+:

```bash
python scripts/validate.py
```

Os comandos completos de lint e testes estão no [guia de manutenção](CONTRIBUTING.md).
