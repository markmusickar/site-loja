# Site do Lojão Super 20 Cupira

Site simples, sem banco de dados e sem custo. Endereço: https://www.lojaosuper20cupira.com.br

## Como mudar o que aparece
Tudo fica no arquivo **dados.js**. Abra com o Bloco de Notas.
- Dados da loja (endereço, telefone, WhatsApp, Instagram, horário): parte de cima do arquivo.
- Produtos: parte de baixo. Cada produto é um bloco `{ ... }` (há um exemplo no arquivo).
- `oferta: true` coloca o produto em "Ofertas da semana".
- Se deixar uma informação em branco (`""`), ela some do site. Nada aparece "vazio".

## Fotos
Coloque as fotos na pasta **fotos** (de preferência pequenas, até 300 KB, formato .jpg)
e escreva o nome no produto: `foto: "fotos/arroz.jpg"`.
Use só fotos que você mesmo tirou ou que o fornecedor autorizou.

## Publicar
Depois de mudar, envie para o GitHub (Git Gui: Commit, Push). Em 1 a 2 minutos o site atualiza.
