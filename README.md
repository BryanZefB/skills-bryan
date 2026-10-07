# Skills Bryan

Acervo pessoal para desenvolver páginas, APIs e sistemas web com IA. Stack de referência: React, TypeScript/JavaScript, Next.js, NestJS, Prisma/ORMs, PostgreSQL e Docker.

**17 skills distribuídas integralmente**, de fontes oficiais dos autores e fornecedores. As quatro entradas com ressalvas foram [substituídas](docs/substituicoes.md); entrevista e design aproveitam alternativas já presentes, sem duplicação. Os arquivos originais são preservados byte a byte, incluindo referências, scripts e metadados. As instruções das skills estão em inglês e a documentação própria em português.

## Comece aqui

1. Consulte o [catálogo](docs/catalogo.md) e suas limitações.
2. Siga a [instalação](docs/instalacao.md) para o agente desejado.
3. Leve o [modelo de instruções](templates/AGENTS.project.md) ao projeto e ajuste-o antes de implementar.
4. Use o [fluxo de trabalho](docs/fluxo-de-trabalho.md): perguntas, definição, implementação com TDD e revisão.
5. Antes de usar as skills do Matt, execute o [setup por projeto](docs/matt-pocock.md). `grilling` e as demais dependências estão incluídas.

Instalar skills não instala automaticamente os guias nem as regras pessoais em seus projetos. O modelo de instruções faz essa ligação. Skills orientam a IA; qualidade e segurança precisam de revisão e verificações no projeto real.

## Organização

```text
skills/<nome>/       # Originais instaláveis; sem duplicação por categoria
docs/               # Catálogo e guias por área
templates/          # Instruções de projeto, especificação, ADR e entrega
scripts/            # Validação de integridade, fontes e documentação
tests/              # Testes das proteções dos scripts
.github/            # CI, Dependabot e modelo de pull request
sources.lock.json   # Fontes, commits, hashes, licenças e dependências
THIRD_PARTY_NOTICES.md
```

As áreas são organizadas no catálogo, mantendo `skills/<nome>` simples para descoberta por diferentes ferramentas. Segurança, PostgreSQL e testes web agora têm skills especializadas, além dos guias próprios.

## Guias

| Área | Guia |
| --- | --- |
| Seleção das skills | [Catálogo e compatibilidade](docs/catalogo.md) |
| Uso em agentes | [Instalação](docs/instalacao.md) |
| Matt Pocock | [Configuração e dependências por projeto](docs/matt-pocock.md) |
| Requisitos e autonomia | [Fluxo de trabalho](docs/fluxo-de-trabalho.md) |
| Clean Architecture | [Arquitetura](docs/arquitetura.md) |
| React e Next.js | [Frontend](docs/frontend.md) |
| NestJS, ORM e PostgreSQL | [Backend](docs/backend.md) |
| Segurança e dados | [Segurança](docs/seguranca.md) |
| TDD, revisão e branches | [Qualidade](docs/qualidade.md) |
| Manutenção do acervo | [Contribuição](CONTRIBUTING.md) |
| Adições aprovadas e próximos temas | [Lacunas e status](docs/lacunas.md) |
| Alternativas oficiais e migração | [Substituições](docs/substituicoes.md) |
| Integridade e compatibilidade verificadas | [Auditoria de 7 de outubro de 2026](docs/verificacao-2026-10-07.md) |

## Disponibilidade e preservação

Todas as 17 skills e seus 114 arquivos originais estão incluídos no repositório, acompanhados dos avisos de licença necessários. O clone e a instalação pelo GitHub usam o mesmo conjunto; não há download complementar de skills. Veja os [avisos de terceiros](THIRD_PARTY_NOTICES.md).

`diagnosing-bugs` estava em dois links e foi importada uma única vez. `grill-with-docs` conta com `grilling` e `domain-modeling`. A configuração de tracker e layout de domínio é feita em cada projeto consumidor, com `setup-matt-pocock-skills`; não é uma configuração global compartilhada entre aplicações.

## Verificar

Requer Python 3.11+ e Git; Node.js é necessário apenas para o CLI de instalação.

```bash
python scripts/validate.py
python -m unittest discover -s tests -v
```

Lint dos scripts próprios (opcional para uso, obrigatório no CI):

```bash
python -m pip install -r requirements-dev.txt
python -m ruff check scripts tests
```

O CI verifica integridade, escopo, metadados e links locais da documentação própria em Linux e Windows. Não executa scripts de terceiros nem instala skills na conta do usuário. Não equivale a auditoria de segurança das aplicações futuras.
