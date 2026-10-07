# Padrões do acervo

- Python 3.11+, biblioteca padrão, nomes claros e comandos externos em listas de argumentos; sem construir comandos de shell com entradas variáveis.
- Scripts de obtenção não sobrescrevem diretórios existentes, não executam conteúdo baixado e só aceitam as fontes selecionadas no lock.
- Caminhos do manifesto devem permanecer dentro do repositório; recusar symlinks e travessia com `..`.
- JSON em UTF-8; documentação própria em UTF-8, com links relativos válidos.
- Os arquivos de terceiros seguem os padrões dos autores e não são reformatados.
- Novas validações devem detectar falhas reais: alteração de hash, skill não selecionada, caminho inseguro ou fonte externa rastreada pelo Git.
- Os [padrões para aplicações](docs/qualidade.md) são orientações para cada projeto, não comandos fictícios de uma aplicação inexistente neste acervo.
