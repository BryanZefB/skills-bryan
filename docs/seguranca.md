# Segurança proporcional ao projeto

Antes de implementar, pergunte quais dados existem, quem pode fazer cada ação, quais integrações e ambientes serão usados e quais falhas têm maior impacto. Registre um modelo curto de ameaças: ativos, atores, fronteiras de confiança e cenários de abuso.

## Checklist mínimo

- **Autorização:** negar por padrão e verificar cada operação no servidor. Testar acesso anônimo, recurso de outro usuário, elevação de papel e isolamento entre tenants quando existir. Aplique a [referência OWASP de autorização](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).
- **Autenticação:** usar mecanismos mantidos e adequados ao projeto. Definir expiração, revogação e recuperação. Para JWT, verificar assinatura, algoritmo permitido, emissor e audiência esperados. Fluxos Nest exigem configuração real além do [exemplo de autenticação](https://docs.nestjs.com/security/authentication).
- **Sessões:** escolher estratégia antes de armazenar tokens. Cookies de sessão devem ter atributos apropriados; autenticação por cookie exige análise de CSRF. XSS precisa de prevenção independentemente do armazenamento.
- **Entradas:** validar e limitar tamanho; serializar saídas; parametrizar SQL; evitar renderizar HTML não confiável sem sanitização adequada.
- **Segredos:** nunca versionar, imprimir ou enviar ao cliente. Usar armazenamento próprio do ambiente, menor privilégio e rotação quando houver exposição. `.env.example` só contém nomes e valores fictícios.
- **Dependências:** lockfile, versões suportadas e análise de vulnerabilidades. Avaliar exploração e correção; não executar `audit fix --force` ou upgrade importante sem revisão e autorização.
- **HTTP:** TLS, CORS restrito conforme os clientes legítimos, limites de payload e taxa por risco. CORS não substitui autenticação. Aplicar headers/CSP compatíveis e testados. Veja [REST Security da OWASP](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html).
- **Uploads e URLs externas:** limitar tipo e tamanho, validar conteúdo, controlar acesso ao armazenamento e destino de requisições. Evitar execução de uploads e acesso a rede interna por URLs fornecidas pelo usuário.
- **Logs e erros:** mascarar tokens, senhas, cookies e dados pessoais; limitar acesso e retenção. Auditoria registra ações sensíveis sem gravar seus segredos.

## Quando houver dados sensíveis

Para dados pessoais, confirmar finalidade, necessidade, retenção, exclusão e responsabilidades aplicáveis antes da coleta. Não declarar conformidade com LGPD por preencher este checklist; os requisitos dependem do produto e precisam ser avaliados no contexto.

Para pagamentos, preferir um provedor que reduza a exposição a dados de cartão. Validar assinatura e repetição de webhooks; conciliar eventos sem confiar na confirmação do navegador.

Para múltiplas empresas, vincular o tenant à identidade autorizada; aplicar filtro/isolamento em consultas, caches, arquivos e jobs. Testar tentativa de acessar dados de outra empresa. Não assumir que um `tenantId` recebido é confiável.

## Mudanças e evidência

Mudanças em autenticação, autorização, chaves, dados, migrations destrutivas e produção exigem autorização específica. Preparar diff, impacto, recuperação e testes antes de pedir aprovação. Manter a operação em espera se ela não chegar.

Este repositório fornece orientação e controles de integridade do acervo. Auditoria de vulnerabilidades, teste de invasão e validação de requisitos precisam acontecer no projeto real.
