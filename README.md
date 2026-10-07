# Skills Bryan

Acervo pessoal para desenvolver páginas, APIs e sistemas web com IA. Stack de referência: React, TypeScript/JavaScript, Next.js, NestJS, Prisma/ORMs, PostgreSQL e Docker.

**19 skills autorizadas:** as 12 originais, as seis sugestões aprovadas e `setup-matt-pocock-skills`, necessária à configuração das skills de engenharia. Os arquivos originais são preservados byte a byte, incluindo referências, scripts e metadados. As instruções principais estão em inglês; algumas referências originais da Kipper estão em português e não foram traduzidas. A documentação própria é objetiva e em português.

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
scripts/            # Validação e obtenção local das fontes externas
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

## Disponibilidade e preservação

17 skills são distribuídas aqui. `good-design` e `grill-me` ficam registradas no catálogo e no lock; seus arquivos são obtidos diretamente da fonte para uso local com `python scripts/fetch_external.py`. Não há licença explícita na revisão consultada da Kipper, portanto esses arquivos ficam ignorados pelo Git. Veja os [avisos de terceiros](THIRD_PARTY_NOTICES.md).

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
