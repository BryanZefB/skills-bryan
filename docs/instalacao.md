# Instalação em diferentes agentes

Requisitos: Git, Node.js/npm para o CLI, Python 3.11+ para validar e obter as duas fontes locais. Os comandos usam `skills@1.7.1`, versão verificada na preparação do acervo. Consulte o [CLI oficial](https://github.com/vercel-labs/skills) antes de atualizar essa versão.

## Do GitHub: 10 skills distribuídas

Após o pull request ser incorporado à principal:

```bash
npx skills@1.7.1 add BryanZefB/skills-bryan --list
npx skills@1.7.1 add BryanZefB/skills-bryan --skill frontend-design vercel-react-best-practices -a codex claude-code cursor --copy
```

Execute a instalação na raiz do projeto. O primeiro comando só lista. O segundo instala as duas skills selecionadas nos agentes indicados; personalize os nomes conforme sua necessidade. Para instalação global, acrescente `--global`. Para selecionar todas as disponíveis, use `--skill '*'`. O CLI oferece confirmação; revise conflitos antes de aceitar substituições.

## Clone local: as 12 selecionadas

```bash
git clone https://github.com/BryanZefB/skills-bryan.git
cd skills-bryan
python scripts/fetch_external.py
python scripts/validate.py --require-external
npx skills@1.7.1 add . --list
```

O script baixa só `good-design` e `grill-me` nas revisões fixadas. Não executa seus scripts, não instala outras skills e recusa substituir pastas existentes com conteúdo diferente. Os arquivos permanecem ignorados pelo Git.

Para instalar esse clone em outro projeto, execute no diretório do projeto usando o caminho real do acervo:

```bash
npx skills@1.7.1 add /caminho/skills-bryan --skill '*' -a codex claude-code cursor --copy
```

No Windows, use o caminho entre aspas, por exemplo `"C:\repos\skills-bryan"`. A CLI descobre as pastas disponíveis; esta instalação inclui a skill `grill-with-docs`, mas sua dependência ausente continua ausente.

## Regras pessoais também precisam chegar ao projeto

Copie manualmente [AGENTS.project.md](../templates/AGENTS.project.md) para `AGENTS.md` no projeto **somente se não houver arquivo existente**. Quando já existir, apresente uma proposta de integração e peça autorização antes de editar instruções críticas.

Agentes que não leem `AGENTS.md` precisam de uma referência equivalente no mecanismo de regras deles. No Claude Code, pode-se referenciar `AGENTS.md` em `CLAUDE.md`. No Cursor, configure as regras do projeto pela interface ou mecanismo documentado da versão instalada. Não presuma que todos os agentes carregam os mesmos arquivos.

Se o projeto não tiver acesso a este acervo, copie os guias necessários para `docs/standards/` e ajuste os caminhos no modelo. Confirme que o agente leu as regras antes da primeira implementação.

## Atualizações controladas

Instalações com `--copy` são cópias, não atualizações automáticas. Uma atualização futura requer revisar as mudanças de origem, os metadados, as dependências e as licenças. Proponha uma branch e obtenha autorização antes de substituir skills instaladas. Não execute atualização global sem revisar o impacto.
