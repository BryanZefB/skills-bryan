# Instalação em diferentes agentes

Requisitos: Git, Node.js/npm para o CLI, Python 3.11+ para validar o acervo. Os comandos usam `skills@1.7.1`, versão verificada na preparação do acervo. Consulte o [CLI oficial](https://github.com/vercel-labs/skills) antes de atualizar essa versão.

## Do GitHub: 17 skills distribuídas

Após o pull request ser incorporado à principal:

```bash
npx skills@1.7.1 add BryanZefB/skills-bryan --list
npx skills@1.7.1 add BryanZefB/skills-bryan --skill frontend-design vercel-composition-patterns -a codex claude-code cursor --copy
```

Execute a instalação na raiz do projeto. O primeiro comando só lista. O segundo instala as duas skills selecionadas nos agentes indicados; personalize os nomes conforme sua necessidade. Para instalação global, acrescente `--global`. Para selecionar todas as disponíveis, use `--skill '*'`. O CLI oferece confirmação; revise conflitos antes de aceitar substituições.

O CLI `skills@1.7.1` omite `metadata.json` nas cópias instaladas, por decisão do próprio instalador. Esse arquivo continua integral no acervo; instruções, referências, templates e licenças são preservados na instalação verificada. Codex e Cursor usam o diretório compartilhado `.agents/skills` nesta versão; Claude Code recebe `.claude/skills`.

## Clone local: as mesmas 17 skills

```bash
git clone https://github.com/BryanZefB/skills-bryan.git
cd skills-bryan
python scripts/validate.py
npx skills@1.7.1 add . --list
```

O clone já contém todas as skills, referências e licenças. A validação usa os hashes e revisões registrados no lock, sem obter fontes adicionais.

Para instalar esse clone em outro projeto, execute no diretório do projeto usando o caminho real do acervo:

```bash
npx skills@1.7.1 add /caminho/skills-bryan --skill '*' -a codex claude-code cursor --copy
```

No Windows, use o caminho entre aspas, por exemplo `"C:\repos\skills-bryan"`. A CLI descobre as pastas disponíveis, incluindo `grilling` e `setup-matt-pocock-skills`. Para instalar o conjunto de Matt e configurar cada projeto, siga o [guia específico](matt-pocock.md).

## Pré-requisitos das novas skills

`playwright-cli` exige Node.js 18+ conforme a fonte, o CLI e um browser compatível. Prefira uma versão LTS suportada de Node.js e a instalação local no projeto. A versão de CLI avaliada nesta migração foi `@playwright/cli@0.1.22`:

```bash
npm install --save-dev --save-exact @playwright/cli@0.1.22
npx playwright-cli --help
npx playwright-cli -s=meu-projeto open http://localhost:3000
npx playwright-cli -s=meu-projeto snapshot
npx playwright-cli -s=meu-projeto close
```

Instale dependências no projeto somente após revisar seu gerenciador e lockfile. Se o CLI indicar ausência de browser, siga `npx playwright-cli install-browser --help` para a instalação compatível. A pasta da skill não instala runtimes ou browsers. Inicie e encerre o servidor da aplicação pelo mecanismo do próprio projeto: esta alternativa controla o navegador e não inclui o helper Python removido.

No Windows, os comandos simples funcionam no PowerShell; os exemplos de loops e variáveis Bash das referências precisam de Git Bash/WSL ou adaptação para PowerShell. Use uma sessão nomeada e encerre apenas essa sessão; `close-all`/`kill-all` podem atingir outras tarefas. Recursos específicos de `allowed-tools` e invocação variam por agente.

`web-design-guidelines` consulta diretrizes pela rede durante cada revisão. Se não houver acesso, informe a limitação. As skills de segurança leem referências locais e precisam do contexto do sistema; não exigem configurar um serviço externo para serem descobertas.

## Regras pessoais também precisam chegar ao projeto

Copie manualmente [AGENTS.project.md](../templates/AGENTS.project.md) para `AGENTS.md` no projeto **somente se não houver arquivo existente**. Quando já existir, apresente uma proposta de integração e peça autorização antes de editar instruções críticas.

Agentes que não leem `AGENTS.md` precisam de uma referência equivalente no mecanismo de regras deles. No Claude Code, pode-se referenciar `AGENTS.md` em `CLAUDE.md`. No Cursor, configure as regras do projeto pela interface ou mecanismo documentado da versão instalada. Não presuma que todos os agentes carregam os mesmos arquivos.

Se o projeto não tiver acesso a este acervo, copie os guias necessários para `docs/standards/` e ajuste os caminhos no modelo. Confirme que o agente leu as regras antes da primeira implementação.

## Atualizações controladas

Para migrar cópias já instaladas, consulte a [tabela de substituições](substituicoes.md), liste as skills instaladas no projeto e remova as antigas pelo mecanismo do agente antes de instalar as substitutas. Alterar este acervo não remove cópias em outros projetos nem instalações globais.

Instalações com `--copy` são cópias, não atualizações automáticas. Uma atualização futura requer revisar as mudanças de origem, os metadados, as dependências e as licenças. Proponha uma branch e obtenha autorização antes de substituir skills instaladas. Não execute atualização global sem revisar o impacto.
