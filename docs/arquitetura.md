# Arquitetura para projetos web

Clean Architecture é a preferência para aplicações com regras de negócio. O objetivo é manter essas regras independentes de transporte, banco e frameworks. O tamanho da estrutura deve acompanhar a complexidade: uma landing page não precisa de um domínio artificial.

## Dependências

```text
presentation ──> application ──> domain
infrastructure ──> interfaces internas + domain
composition root conecta implementações concretas
```

- **Domain:** conceitos, invariantes e regras; sem imports de NestJS, Next.js, Prisma ou HTTP.
- **Application:** casos de uso e interfaces necessárias para persistência e integrações; coordena a operação e define seus limites de consistência.
- **Infrastructure:** implementações com Prisma/PostgreSQL, clientes externos, filas e telemetria.
- **Presentation:** controllers, handlers, DTOs e UI; valida e converte entradas/saídas, sem concentrar regras de negócio.

Organize por funcionalidade e crie camadas quando houver responsabilidade real. Exemplo para uma API:

```text
src/orders/domain/
src/orders/application/
src/orders/infrastructure/
src/orders/presentation/
```

Esse exemplo não é uma obrigação de criar quatro pastas vazias. O composition root do Nest registra as dependências; as interfaces internas não dependem das classes concretas do ORM.

## Decisões a confirmar

- Defina o contrato de cada operação, invariantes, autorização e falhas antes da implementação.
- Prefira um monólito modular inicialmente. Separe serviços quando isolamento, escala ou organização justificarem o custo.
- Escolha REST, GraphQL, filas e eventos por necessidade do projeto. Documente consistência, idempotência e recuperação quando houver processamento assíncrono.
- Não exponha modelos completos de banco na API. DTOs/serialização delimitam o que pode sair e quais campos podem entrar.
- Crie interfaces em pontos onde existe variação, substituição ou teste útil; evite um repositório genérico que replica o ORM sem benefício.
- Use `codebase-design` para reduzir a superfície de uso e concentrar mudanças. Clean Architecture é a direção das dependências, não uma contagem de classes.
- Use `domain-modeling` para vocabulário e ADRs, com o [modelo de decisão](../templates/adr.md) para documentação própria simples.

## Verificação

Revise imports entre camadas, invariantes e contratos. Teste casos de uso pela interface pública; implemente testes de integração para comprovar que adaptadores respeitam contratos reais. Quando a escala justificar, automatize regras de dependência no lint/CI do projeto.
