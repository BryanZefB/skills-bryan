# Manter o acervo

Uso pessoal de Bryan. Mudanças devem ser propostas em branch e PR; siga [AGENTS.md](AGENTS.md).

## Atualizar uma fonte

1. Identificar necessidade e obter autorização antes de substituir conteúdo existente com impacto crítico.
2. Conferir diff upstream, licença, dependências, referências e compatibilidade com os agentes usados.
3. Selecionar um commit completo e copiar a pasta integral a partir de blobs Git, preservando bytes e arquivos auxiliares. Não executar scripts da fonte durante a importação.
4. Atualizar entradas, hashes SHA-256, modos e avisos de licença em `sources.lock.json`. A mudança conjunta de fonte e lock deve ser revisada; hashes locais não provam por si só que a fonte é legítima.
5. Conferir o catálogo e limitações. Não adicionar uma skill fora da seleção sem autorização de Bryan.
6. Executar validação e testes, apresentar o PR e aguardar revisão antes do merge.

## Comandos

```bash
python scripts/validate.py
python -m unittest discover -s tests -v
python -m pip install -r requirements-dev.txt
python -m ruff check scripts tests
```

Os scripts não sobrescrevem as skills originais para corrigir incompatibilidades. Documente limitações e proponha alternativas. Conteúdo sem licença explícita permanece fora do índice Git.

## Padrões de manutenção

- Use Python 3.11+ e biblioteca padrão; passe comandos externos como listas de argumentos.
- Aceite apenas fontes e caminhos selecionados no lock; recuse symlinks e travessia com `..`.
- Mantenha JSON e documentação própria em UTF-8, com links relativos válidos.
- Preserve todos os arquivos originais das skills, incluindo referências, exemplos e metadados. Nunca os reformate durante uma limpeza.
- Valide inventários, hashes, modos Git, dependências e escopo; teste falhas reais do validador.
- Evite versionar caches, resultados temporários e relatos de execução. Use o histórico de commits e PRs para registrar entregas anteriores.

Os [padrões de qualidade para aplicações](docs/qualidade.md) orientam os projetos consumidores. O CI deste acervo verifica empacotamento e os scripts próprios; não executa helpers de terceiros nem instala skills globalmente.
