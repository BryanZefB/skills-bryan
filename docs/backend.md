# Backend: NestJS, Prisma e PostgreSQL

## Contratos e limites

- Controllers/handlers traduzem transporte; casos de uso conduzem a operação; domínio guarda regras. Veja [arquitetura](arquitetura.md).
- Defina entradas, saídas, erros, paginação e compatibilidade. Escolha REST, GraphQL ou mensagens conforme o problema.
- Valide tipos, limites, formatos e campos permitidos no servidor. Em Nest, configure validação conscientemente, incluindo tratamento de propriedades extras. Consulte [Validation](https://docs.nestjs.com/techniques/validation).
- Identifique o usuário por credenciais verificadas. Faça autorização por operação e recurso; nunca confie em papel, proprietário ou tenant recebido no payload.
- Padronize erros de domínio e transporte; respostas não expõem stack trace, SQL, credenciais ou detalhes internos.

## Persistência e concorrência

- Prisma/ORM é um adaptador. Retorne contratos próprios, com seleção explícita de campos.
- Use consultas parametrizadas; não concatene entradas em SQL bruto. Mantenha constraints, chaves estrangeiras e unicidade no banco para invariantes que ele deve garantir.
- Use transações curtas para operações que precisam ser atômicas. Considere concorrência e isolamento; validação seguida de gravação separada pode competir com outra requisição.
- Para dinheiro, defina representação decimal ou unidades inteiras e arredondamento; evite ponto flutuante sem decisão explícita.
- Meça queries relevantes com plano de execução, volume representativo e índices justificados. Limite resultados, evite N+1 e dimensione pool de conexões para o ambiente.
- Versione migrations. Revise SQL e impacto; prefira expandir, migrar e só depois remover. Reset e migrations destrutivas exigem autorização.
- Use comandos de migração apropriados ao ambiente. O [guia do Prisma](https://www.prisma.io/docs/orm/migrations/applying-a-migration) distingue geração em desenvolvimento e aplicação de migrations existentes em produção.

## Integrações e execução

Defina timeout, retry limitado, idempotência, assinatura de webhook e política de falha. Não segure uma transação de banco durante uma chamada externa longa. Para escrita e evento consistentes, avalie outbox quando necessário.

Em filas, considere entrega repetida e fora de ordem, controle de concorrência, reprocessamento e dead-letter queue. Não introduza filas sem necessidade real.

## Operação e Docker

Use logs estruturados com identificadores de correlação e sem dados sensíveis; defina métricas e alertas para falhas relevantes. Diferencie liveness de readiness conforme a infraestrutura.

Imagens Docker devem ter dependências fixadas, build reproduzível, processo sem privilégios desnecessários e segredos injetados em runtime. Não copie `.env`, credenciais ou arquivos locais para a imagem. Planeje shutdown e recuperação antes de publicar.

Teste regras pela interface pública e adaptadores com PostgreSQL isolado. Cubra rollback de transação, constraints e concorrência nos fluxos onde esses comportamentos importam.
