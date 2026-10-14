# Landing Studio CRM — starter estático

Protótipo funcional independente para controle pessoal de prospecção e demos de landing pages. É um **modelo reutilizável** dentro do acervo Skills Bryan, não parte do runtime das skills. Não há banco de dados remoto, autenticação, colaboração, integração automática com Vercel/GitHub, sincronização entre dispositivos ou deploy efetuado.

## Funcionalidades

- Cadastrar, editar, excluir, buscar e filtrar empresas/etapa do funil.
- Alterar etapa direto na tabela; acompanhar fase técnica e auditoria separadamente.
- Guardar URL pública de site/Instagram, repositório GitHub e demonstração Vercel.
- Registrar data de contato, próximo passo, propostas e valor efetivamente fechado.
- Ver quantidade de oportunidades, demos para contato, respostas e valor fechado.
- Exportar JSON para backup, restaurar JSON **substituindo** dados locais após confirmação, exportar CSV com proteção básica contra fórmulas.
- Abrir um **roteiro de 7 etapas por empresa** com checklist persistente: pesquisa, briefing, direção, desenvolvimento, auditoria, publicação, contato.
- Copiar prompts contextualizados pela empresa em cada etapa e modelos de abordagem/acompanhamento.
- Guardar fonte pesquisada, data da verificação e próxima ação (texto + data).
- UI adaptada para celular; não depende de bibliotecas JavaScript nem de infraestrutura externa (fontes opcionais vêm do Google Fonts).

**Importante:** os registros persistem em `localStorage` **somente neste navegador/origem**. Limpar dados do navegador, usar modo anônimo, trocar o domínio ou dispositivo pode levar à perda de registros. Baixe backups JSON regularmente. Contatos e valores comerciais reais não devem ser versionados no GitHub, especialmente quando o repo é público.

## Executar localmente

Requer Node.js 20+ (ou qualquer servidor HTTP estático). Na raiz do acervo:

```bash
cd templates/landing-studio-crm
npx --yes serve .
```

Alternativa sem baixar dependências:

```bash
cd templates/landing-studio-crm
python -m http.server 4173
```

Abra `http://localhost:4173` (ou a porta informada pelo servidor). Não abra `index.html` via `file://`: ES modules e clipboard podem não funcionar. Testes de lógica, Node.js 20+:

```bash
node --test test/core.test.mjs
```

## Hospedar na Vercel (somente após autorizar)

Recomendado: copiar **esta pasta** para um novo repositório dedicado, idealmente privado, e conectar à Vercel. Se escolher este monorepo como fonte, configure **Root Directory = `templates/landing-studio-crm`**, Framework Preset = Other, sem build e sem outputDirectory adicional. Não assuma que a publicação ocorreu por haver URL do repo.

Como o CRM é privado mas **não possui autenticação**, hospedar o frontend não transforma dados locais em dados compartilhados. O HTML é público se a URL for pública; os leads permanecem no browser usado. Para acesso privado real entre dispositivos, é preciso backend e autenticação antes de colocar informações sensíveis. Em preview/demos, índice por buscadores é desestimulado via robots, mas essa meta tag **não protege o acesso**.

## Evolução recomendada

1. Converter para app independente, com um repositório privado.
2. Criar banco de dados, login seguro, políticas por usuário/organização e backups. Supabase com RLS é uma opção; não usar chave service role no frontend.
3. Histórico imutável de interações, templates parametrizados e agendas de follow-up.
4. Sincronizar Vercel/GitHub somente via OAuth/credenciais no servidor, com escopos mínimos, autorização e tratamento de erros.
5. Testes E2E reais (Playwright), auditoria de acessibilidade e validação de deploy/backup em navegador físico e emulado.

**Fonte da operação:** [docs/prospeccao-landing-pages.md](../../docs/prospeccao-landing-pages.md). **Qualidade das demos:** [docs/landing-page-playbook.md](../../docs/landing-page-playbook.md). **Prompt mestre:** [templates/landing-pages/PROMPT-MESTRE.md](../landing-pages/PROMPT-MESTRE.md).

## Usar no dia a dia — exemplo

1. Clique em **Nova empresa** e cadastre nome, segmento e cidade. Preencha URL da fonte pública e data de verificação; anote o próximo passo.
2. Na linha da empresa, clique em **Roteiro**. Siga o passo 1, copie o prompt de pesquisa e passe ao seu agente de IA com acesso à web. Confira os resultados e as fontes antes de marcar a etapa.
3. Abra o passo 2 e produza o `BRIEF.md` com dados confirmados. Marque apenas depois de finalizar e revisar.
4. Passe à direção de arte com duas propostas de hero, depois desenvolva e audite. A auditoria precisa registrar testes reais; o checklist não substitui o relatório.
5. Após autorização para publicar a demonstração, configure a Vercel, confira CTA/URL e guarde o link no cadastro. Marque a etapa como concluída.
6. Copie a mensagem comercial; personalize, escolha o canal e envie **manualmente**, se apropriado. Atualize a etapa comercial e agende o retorno com a próxima ação.
7. Mantenha backup JSON (não coloque os arquivos exportados no GitHub público). A importação substitui os registros locais.

### Verificação automatizada de navegador

O workflow `.github/workflows/validate-landing-studio.yml` executa testes de lógica e um smoke test Chromium usando Playwright: cadastro, checklist, clipboard, filtro, backup e capturas nas larguras 320/375/414/768/1024/1440. O teste roda no GitHub Actions; capturas ficam no artefato de CI por prazo limitado. Resultados de CI não certificam acessibilidade/estética e não substituem revisão humana.
