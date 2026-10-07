# Verificação do acervo em 7 de outubro de 2026

> Relatório histórico da revisão anterior. As quatro entradas com ressalvas foram retiradas na [substituição por fontes oficiais](substituicoes.md). As contagens e limitações abaixo descrevem o estado auditado, não o catálogo atual.

Foi auditado um clone novo da `main`, no commit `d932c3dbb4b9844b871e1209b63826dbf2403534`. O inventário foi comparado diretamente com as árvores e blobs Git das fontes nas revisões de `sources.lock.json`, não apenas com os hashes do próprio manifesto.

## Resultado

- **17 skills estão publicadas com todos os 171 arquivos originais das pastas selecionadas**, além dos avisos de licença de empacotamento. Não houve alteração de conteúdo nem omissão de referências, scripts ou templates.
- **2 skills são externas:** `good-design` e `grill-me`. Seus 9 arquivos originais não estão versionados no GitHub, conforme a política de licenciamento documentada. A obtenção local foi executada e validada, completando as 19 pastas e 180 arquivos originais.
- A instalação direta do GitHub reconheceu 17 skills; o clone com as fontes externas reconheceu 19. Instalações isoladas para Codex, Cursor e Claude Code tiveram instruções, referências, templates e licenças conferidos por hash. O CLI omite `metadata.json` deliberadamente; o acervo preserva esse arquivo.
- As dependências selecionadas de Matt Pocock estão presentes. O setup do tracker e do domínio continua sendo necessário em cada projeto consumidor.

## Inventário individual

O número de arquivos abaixo corresponde ao conteúdo original da pasta upstream, sem contar licenças acrescentadas para empacotamento.

| Skill | Arquivos | Situação e pré-requisitos |
| --- | --- | --- |
| good-design | 6 | Conteúdo completo após obtenção local; não publicado no GitHub |
| grill-me | 3 | Conteúdo completo após obtenção local; usa entrevista interativa do agente |
| grill-with-docs | 2 | Completa; depende de grilling, domain-modeling e invocação de skills pelo host |
| frontend-design | 2 | Completa; instruções para criação de interface |
| vercel-react-best-practices | 76 | Completa; três links incorretos herdados do original, descritos abaixo |
| diagnosing-bugs | 3 | Completa; helper Bash testado com entradas sintéticas |
| code-review | 2 | Completa; exige referência Git, contexto de spec/tracker e subagentes |
| codebase-design | 4 | Completa; exploração paralela de alternativas depende de subagentes |
| domain-modeling | 4 | Completa; glossário e ADRs são criados quando necessários |
| tdd | 4 | Completa; interfaces de teste combinadas e ferramentas do projeto |
| to-spec | 2 | Completa; contexto esclarecido, tracker configurado e autorização para publicação |
| to-tickets | 2 | Completa; tracker configurado e divisão aprovada |
| grilling | 2 | Completa; entrevista por rodadas e subagentes para investigação de fatos, conforme o original |
| setup-matt-pocock-skills | 7 | Completa; execução interativa uma vez em cada projeto |
| security-best-practices | 13 | Completa; gatilhos de segurança explícitos e referências da stack aplicável |
| security-threat-model | 5 | Completa; exige escopo e evidência do sistema analisado |
| webapp-testing | 6 | Completa; Python, Playwright e browser. Helper tem limitação de encerramento no Windows |
| supabase-postgres-best-practices | 36 | Completa; regras aplicáveis ao PostgreSQL e ao contexto da tarefa |
| web-design-guidelines | 1 | Completa; consulta diretrizes externas pela rede |

## Problemas encontrados

### 1. Atributo de executável perdido no empacotamento

Na `main` auditada, `skills/webapp-testing/scripts/with_server.py` tinha modo Git `100644`, enquanto a fonte e o lock registram `100755`. Seu conteúdo e blob são idênticos. Executá-lo com `python` funciona, mas a execução direta em ambientes Unix perde o atributo necessário.

A correção proposta restaura exclusivamente o modo `100755`, preservando todos os bytes. O validador passa a conferir modos e blobs no índice Git. Um teste de regressão demonstra que o modo incorreto falha e o correto passa. A substituição posterior removeu essa skill e tornou a correção do atributo desnecessária; a proteção de modos e blobs foi mantida.

### 2. Três links relativos incorretos no original da Vercel

Em `skills/vercel-react-best-practices/AGENTS.md`, os links das linhas 116, 219 e 892 apontam para arquivos na mesma pasta, mas as regras estão em `rules/`:

- `./async-defer-await.md` → `rules/async-defer-await.md`.
- `./async-cheap-condition-before-await.md` → `rules/async-cheap-condition-before-await.md`.
- `./server-hoist-static-io.md` → `rules/server-hoist-static-io.md`.

Os três arquivos existem e estão intactos. O problema já está na revisão upstream selecionada. Os originais não foram editados para corrigir os links.

### 3. Encerramento incompleto do helper webapp-testing no Windows

O helper inicia o servidor com `shell=True` e encerra o processo da shell. No teste em Windows, o processo filho do servidor permaneceu escutando na porta após a mensagem de encerramento, tanto no caso de sucesso quanto no caso de falha do comando.

O teste de navegador propriamente dito passou: carregou a página, executou JavaScript, clicou no botão, verificou o resultado e capturou console. A propagação de erro também passou: o comando retornou 7 e o helper preservou esse código. A falha é a limpeza do processo filho, não ausência de conteúdo.

As fixtures de auditoria tinham expiração própria e todos os servidores encerraram-se ao final. Recomenda-se gerenciar a árvore de processos por um helper de compatibilidade separado ou iniciar/parar o servidor independentemente no Windows. O código original permaneceu intacto. Não foi testado o encerramento deste helper em Linux/macOS.

## Verificações realizadas e seus limites

- Conteúdo e inventário completos comparados com as fontes fixadas; licenças e metadados preservados.
- Frontmatter YAML de todas as 19 skills analisado; nomes e descrições atendem aos limites verificados do padrão Agent Skills.
- Scripts Python compilados em memória, sem erros de sintaxe; template Bash aprovado em checagem de sintaxe e captura de entradas sintéticas.
- CLI `skills@1.7.1`: instalação remota com 17 skills e instalação local com 19, nos diretórios usados pelos três agentes. Não houve instalação global na conta do usuário.
- Teste real de Chromium headless em fixture local, usando Playwright `1.63.0`, e testes do helper para sucesso, falha do comando e falha ao iniciar servidor.
- URL externa de web-design-guidelines acessível, com resposta HTTP 200 durante a auditoria.
- Lint e 12 testes do acervo original auditado aprovados. A correção do modo acrescenta um teste, totalizando 13.
- [CI da main auditada](https://github.com/BryanZefB/skills-bryan/actions/runs/37668799860) aprovado em Linux e Windows.

Instalação e integridade não comprovam que qualquer IA executará corretamente todas as instruções em qualquer projeto. Não foi realizada uma execução comportamental de cada uma das 19 skills em cada agente; workflows de entrevista, arquitetura, revisão, segurança e publicação precisam do contexto real e das capacidades do host. Os exemplos de Playwright contêm URLs, seletores e caminhos ilustrativos que devem ser ajustados ao projeto.

As fontes são snapshots fixados, não promessa de sincronização com a versão mais recente. O catálogo também registra a depreciação declarada de `openai/skills`; as duas skills autorizadas dessa fonte permanecem preservadas.
