/*
  DADOS DA LOJA — é aqui que você muda o que aparece no site.
  Regras simples:
   - Escreva sempre entre aspas "assim".
   - Se deixar em branco (""), essa parte simplesmente não aparece na página.
   - Não apague as vírgulas no fim das linhas.
*/
window.LOJA = {
  nome: "Lojão Super 20",
  cidade: "Cupira",
  uf: "PE",

  // Uma frase curta embaixo do nome. Ex.: "Preço bom todo dia."
  slogan: "Moda masculina, feminina e infantil, cama, mesa e banho",

  // Os blocos grandes embaixo do topo. Mude, apague ou acrescente à vontade.
  departamentos: ["Moda masculina", "Moda feminina", "Moda infantil", "Cama, mesa e banho"],

  // Link do Google Maps da loja (botão "Como chegar")
  mapa: "https://maps.app.goo.gl/nnQArYCo2SRT8ZvV7",

  // Endereço completo, para o botão "Como chegar". Ex.: "Rua Tal, 123, Centro"
  endereco: "",

  // Telefone e WhatsApp, só números com DDD. Ex.: "81999999999"
  telefone: "",
  whatsapp: "",

  // Só o nome do perfil, sem @. Ex.: "lojaosuper20cupira"
  instagram: "",

  // Horário de funcionamento. "dias" usa 0=domingo, 1=segunda ... 6=sábado.
  // Exemplo (tire as barras do começo para ativar):
  //   { texto: "Segunda a sábado", dias: [1, 2, 3, 4, 5, 6], abre: "07:30", fecha: "20:00" },
  //   { texto: "Domingo",          dias: [0],                abre: "08:00", fecha: "12:00" },
  horarios: [
    { texto: "Segunda a sábado", dias: [1, 2, 3, 4, 5, 6], abre: "08:00", fecha: "18:00" }
  ],

  // Link da página de currículos
  curriculos: "https://curriculos.lojaosuper20cupira.com.br"
};

/*
  PRODUTOS — um bloco { ... } para cada produto. Exemplo (tire as barras para ativar):

  {
    nome: "Vestido floral",
    categoria: "Moda feminina",        // vira um botão de filtro
    foto: "fotos/vestido.jpg",       // coloque a foto na pasta "fotos"
    preco: 79.9,                   // use ponto, sem R$. Deixe fora se não quiser mostrar preço.
    precoAntes: 99.9,              // opcional: preço antigo, aparece riscado
    unidade: "cada",             // opcional: aparece pequeno ao lado do preço
    oferta: true,                  // true = aparece em "Ofertas da semana"
    descricao: ""                  // opcional
  },
*/
window.PRODUTOS = [
  {
    nome: "Kit relógio com pulseiras",
    categoria: "Relógios",
    foto: "fotos/relogio-pulseiras.jpg"
  },
  {
    nome: "Travessa de vidro com tampa",
    categoria: "Mesa e cozinha",
    foto: "fotos/travessa-vidro.jpg"
  }
];
