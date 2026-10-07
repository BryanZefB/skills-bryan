# Frontend: React, TypeScript e Next.js

## Estrutura e comportamento

- Organize por funcionalidade. Componentes de UI, lógica de domínio e acesso a dados devem ter responsabilidades claras.
- Prefira TypeScript com modo estrito em projetos novos. Trate dados externos como não confiáveis e valide em runtime.
- Comece por HTML semântico e componentes pequenos com contratos explícitos. Extraia composição repetida quando melhorar manutenção, sem montar abstrações antecipadas.
- Mantenha estado mínimo. Derive valores calculáveis; escolha estado local, URL, cache de servidor ou estado compartilhado conforme quem precisa daquele dado. Veja [Thinking in React](https://react.dev/learn/thinking-in-react).
- Defina estados de carregamento, vazio, erro, sucesso e recuperação. Evite submits duplicados; exiba erro próximo ao campo e preserve entradas úteis.
- Formulários validam para orientar o usuário; validação e autorização no servidor continuam obrigatórias.

## Design e acessibilidade

Use `good-design` para jornada e objetivo do produto; `frontend-design` para execução visual. Defina tokens de cor, tipografia, espaçamento e componentes reutilizáveis proporcionais ao projeto.

Teste layouts estreitos e largos, navegação por teclado, foco visível, rótulos, ordem de leitura, contraste e mensagens de erro. Respeite preferência por movimento reduzido e evite depender só de cor. Use [WCAG 2.2](https://www.w3.org/TR/WCAG22/) como referência para critérios aplicáveis, sem declarar conformidade apenas por usar uma biblioteca.

## Next.js e segurança

Defina claramente o limite entre código de servidor e cliente. Só envie dados necessários ao navegador. Revalide identidade e permissão em operações de servidor, inclusive Server Actions; uma interface oculta não controla acesso. Não trate middleware como única barreira. Consulte o [guia de segurança de dados do Next.js](https://nextjs.org/docs/app/guides/data-security).

Separe caches públicos e privados. Um resultado personalizado não pode ser compartilhado com outro usuário por uma chave incompleta. Variáveis expostas no bundle são públicas; segredos permanecem no servidor.

## Desempenho e testes

Use `vercel-react-best-practices` onde houver evidência de impacto: chamadas independentes em paralelo, menos waterfalls, payloads limitados, imagens adequadas e divisão de bundles. Meça antes e depois; não memorize tudo automaticamente.

Teste comportamentos visíveis e fluxos essenciais pela interface pública. Inspecione console, rede e DOM; faça validação visual responsiva e acessibilidade. Performance e acessibilidade não são garantidas por um build que passa.
