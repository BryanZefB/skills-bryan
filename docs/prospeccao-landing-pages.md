# Operação comercial — prospecção de landing pages locais

## Objetivo

Transformar a rotina de buscar empresas na Internet, criar demonstrações e apresentar o site em um funil mensurável. O CRM é **interno**: não colocar conversas privadas, telefones pessoais, propostas, chaves ou faturamento em repositório público. O starter em `templates/landing-studio-crm` guarda registros apenas no navegador; exporte backup e evolua para backend privado com autenticação antes de uso em equipe/dispositivos.

## Funil de oportunidades

| Etapa | O que significa | Próxima ação |
| --- | --- | --- |
| Pesquisar | Empresa identificada, dados não confirmados | Verificar site, público e sinais de demanda |
| Qualificado | Oportunidade real e contatos verificados | Priorizar e definir demonstração |
| Produção | Direção e página em desenvolvimento | Aplicar playbook e auditar |
| Pronto para contato | Demo auditada + link compartilhável | Fazer abordagem personalizada |
| Contatado | Mensagem enviada com data registrada | Agendar acompanhamento respeitoso |
| Respondeu | Recebeu retorno | Entender objeções e prioridade |
| Negociação | Proposta/escopo/preço acordados em discussão | Registrar valor e próximo passo |
| Fechado | Cliente aceitou comercialmente | Formalizar escopo, pagamento, hospedagem |
| Perdido | Sem interesse ou oportunidade encerrada | Registrar motivo, evitar insistência |

O projeto da página também tem estado próprio: `Não iniciado`, `Pesquisa`, `Direção`, `Implementação`, `Auditoria`, `Publicado`. **Etapa comercial ≠ progresso técnico**. URL da Vercel é prova de preview, não de entrega aprovada; manter campo `auditoria` independente.

## Ciclo semanal recomendado

1. **Descoberta:** identificar 5–10 negócios adequados na região; pesquisar presença digital e evitar duplicados. Não presumir ausência de site apenas porque não foi encontrado.
2. **Priorização:** pontuar necessidade, atividade digital, potencial comercial e disponibilidade de conteúdo; escolher no máximo 2–3 demos para não acumular trabalhos não apresentados.
3. **Brief:** registrar fontes públicas, serviços, região, identidade, Instagram, contato comercial público e dúvidas. Separar fatos das hipóteses.
4. **Direção:** usar prompt de modo DIREÇÃO com duas composições; escolher e documentar em DESIGN.md.
5. **Produção:** modo COMPLETO para concluir a demo. Marca/logo/fotos de terceiro para demonstração só com atenção a direitos e ao contexto; não sugerir vínculo oficial e não indexar previews sem permissão.
6. **Auditoria:** confirmar mobile, CTA, links, acessibilidade e conteúdo com evidência. Classificar status e corrigir antes de enviar.
7. **Abordagem:** escrever poucas linhas personalizadas, oferecer visualização opcional da demonstração e evitar tom de disparo em massa. Não afirmar parceria, autorização ou trabalho contratado.
8. **Acompanhamento:** registrar resposta e próximo passo. Não insistir após recusa. Negociação inclui escopo, revisões, domínio, hospedagem, propriedade de ativos e manutenção.
9. **Fechamento e transferência:** confirmação comercial, contrato ou aceite, pagamento, dados definitivos e entrega técnica. Não usar conta pessoal da Vercel como infraestrutura permanente do cliente sem acordo explícito.
10. **Aprendizado:** no fechamento da semana, medir leads qualificados, demos concluídas, contatos, respostas, propostas, fechamentos, receita e tempo gasto por demo; rever a estratégia.

## Modelo de abordagem (adaptar à empresa)

**Primeiro contato, se houver uma demo real:** "Oi, pessoal! Estava pesquisando [serviço] em [cidade] e conheci o trabalho de vocês. Preparei uma ideia de página para apresentar melhor os serviços pelo celular. Posso mandar uma prévia sem compromisso?"

**Com resposta positiva:** "Claro! Aqui está a demonstração: [link]. É uma proposta independente, ainda não é o site oficial. Se fizer sentido, posso adaptar às informações e à identidade de vocês."

**Acompanhamento único e respeitoso:** "Oi! Passando para saber se conseguiram olhar a prévia. Se não for prioridade agora, sem problema."

Não afirmar "vocês não têm site" sem verificar; não enviar links não solicitados se isso for indesejado. Evitar dados sensíveis e respeitar LGPD e preferências de contato.

## Padrão de dados por lead

- Identificador gerado localmente.
- Empresa, segmento, cidade, site e Instagram públicos, origem da pesquisa e data de verificação.
- Status do funil; fase técnica; auditoria (`Não iniciada`/`Parcial`/`Aprovada`).
- Repositório GitHub, URL de preview Vercel e data da última revisão.
- Contato comercial público, canal utilizado, último contato, próximo passo e data.
- Valor proposto, valor fechado e observações **sem dados sensíveis**.
- Histórico de etapas em uma evolução futura com backend (o starter registra o estado atual, não histórico de auditoria).

## KPIs e regras

Taxa de resposta = empresas que responderam / empresas contatadas. Taxa de fechamento = contratos fechados / propostas efetivamente apresentadas. Receita = soma dos valores fechados; não confundir orçamentos com receita. Registrar período de análise e número de casos para evitar conclusões precipitadas. Acompanhar tempo de construção e conversão antes de ampliar demos.

## Onde ficam as coisas

```text
skills-bryan/
├── docs/landing-page-playbook.md     # Regras de criação e auditoria
├── docs/prospeccao-landing-pages.md   # Fluxo operacional e comercial
├── templates/landing-pages/          # Prompts, BRIEF, DESIGN, AUDIT, LESSONS
└── templates/landing-studio-crm/      # Starter independente e estático do CRM
```

**Recomendação futura:** extraia o starter CRM para repositório privado próprio antes de adicionar Supabase/Auth e qualquer dado real compartilhado. Não usar GitHub público como banco de leads.
