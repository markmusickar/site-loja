(function () {
  "use strict";
  var L = window.LOJA || {};
  var P = Array.isArray(window.PRODUTOS) ? window.PRODUTOS : [];
  var $ = function (id) { return document.getElementById(id); };
  var DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function soNumeros(s) { return String(s || "").replace(/\D/g, ""); }
  function reais(n) { return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
  function link(texto, href, cls, externo) {
    var a = el("a", cls, texto);
    a.href = href;
    if (externo) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    return a;
  }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

  var zapNum = soNumeros(L.whatsapp);
  if (zapNum && zapNum.length <= 11) zapNum = "55" + zapNum;
  var telNum = soNumeros(L.telefone);
  var mapa = L.mapa ? L.mapa : L.endereco ? "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(L.endereco + ", " + (L.cidade || "") + " " + (L.uf || "")) : "";
  var insta = String(L.instagram || "").replace(/^@/, "").replace(/[^\w.]/g, "");

  // Cabeçalho e hero
  $("localTexto").textContent = (L.cidade || "") + (L.uf ? ", " + L.uf : "");
  if (L.slogan) { $("slogan").textContent = L.slogan; $("slogan").hidden = false; }
  if (zapNum) {
    var z = $("topoZap"); z.href = "https://wa.me/" + zapNum; z.hidden = false;
    z.target = "_blank"; z.rel = "noopener noreferrer";
    $("acoes").appendChild(link("Chamar no WhatsApp", "https://wa.me/" + zapNum, "botao botao-zap", true));
  }
  if (mapa) $("acoes").appendChild(link("Como chegar", mapa, "botao", true));
  if (telNum) $("acoes").appendChild(link("Ligar", "tel:+55" + telNum.replace(/^55/, ""), "botao"));
  if (L.curriculos) $("linkVagas").href = L.curriculos;

  // Ofertas e produtos
  var ofertas = P.filter(function (p) { return p && p.oferta; });
  var temPreco = P.some(function (p) { return p && p.preco != null; });

  function cartao(p, comSelo) {
    var c = el("article", "cartao");
    var f = el("div", "cartao-foto");
    if (p.foto) {
      var img = new Image();
      img.loading = "lazy"; img.alt = p.nome || ""; img.src = p.foto;
      img.addEventListener("error", function () {
        f.textContent = ""; f.appendChild(el("span", "sem-foto", (p.nome || "?").charAt(0).toUpperCase()));
      });
      f.appendChild(img);
    } else f.appendChild(el("span", "sem-foto", (p.nome || "?").charAt(0).toUpperCase()));
    c.appendChild(f);
    if (comSelo) c.appendChild(el("span", "selo", "Oferta"));
    var b = el("div", "cartao-corpo");
    b.appendChild(el("h3", "cartao-nome", p.nome || ""));
    if (p.categoria) b.appendChild(el("p", "cartao-cat", p.categoria));
    if (p.descricao) b.appendChild(el("p", "cartao-desc", p.descricao));
    if (p.preco != null && !isNaN(Number(p.preco))) {
      var pr = el("div", "preco");
      pr.appendChild(el("span", "preco-agora", reais(p.preco)));
      if (p.precoAntes != null && !isNaN(Number(p.precoAntes))) pr.appendChild(el("span", "preco-antes", reais(p.precoAntes)));
      if (p.unidade) pr.appendChild(el("span", "preco-un", p.unidade));
      b.appendChild(pr);
    }
    c.appendChild(b);
    return c;
  }

  var menu = [];
  if (Array.isArray(L.departamentos) && L.departamentos.length) {
    $("deptos").hidden = false;
    L.departamentos.forEach(function (n) {
      $("deptosGrade").appendChild(link(n, P.length ? "#produtos" : "#vagas", "depto"));
    });
  }
  if (ofertas.length) {
    $("ofertas").hidden = false; menu.push(["Ofertas", "#ofertas"]);
    if (temPreco) $("avisoPreco").hidden = false;
    ofertas.forEach(function (p) { $("gradeOfertas").appendChild(cartao(p, true)); });
  }
  if (P.length) {
    $("produtos").hidden = false; menu.push(["Produtos", "#produtos"]);
    var cats = [], cat = "";
    P.forEach(function (p) { if (p.categoria && cats.indexOf(p.categoria) < 0) cats.push(p.categoria); });
    var chips = $("chips");
    if (cats.length) {
      ["Todos"].concat(cats).forEach(function (nome, i) {
        var b = el("button", "chip", nome); b.type = "button";
        b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
        b.addEventListener("click", function () {
          cat = i === 0 ? "" : nome;
          Array.prototype.forEach.call(chips.children, function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
          desenhar();
        });
        chips.appendChild(b);
      });
    }
    $("busca").addEventListener("input", desenhar);
    desenhar();
  }
  function desenhar() {
    var q = norm($("busca").value.trim());
    var g = $("gradeProdutos"); g.textContent = "";
    var n = 0;
    P.forEach(function (p) {
      if (cat && p.categoria !== cat) return;
      if (q && norm(p.nome + " " + (p.categoria || "") + " " + (p.descricao || "")).indexOf(q) < 0) return;
      g.appendChild(cartao(p, false)); n++;
    });
    $("semResultado").hidden = n > 0;
  }

  // Onde estamos
  if (L.endereco || mapa || (L.horarios && L.horarios.length)) {
    $("onde").hidden = false; menu.push(["Onde estamos", "#onde"]);
    if (L.endereco) {
      $("endereco").textContent = L.endereco + ", " + (L.cidade || "") + (L.uf ? " - " + L.uf : "");
    }
    if (mapa) $("acoesOnde").appendChild(link("Abrir no mapa", mapa, "botao", true));
  }
  menu.push(["Trabalhe conosco", "#vagas"]);
  menu.forEach(function (m) { $("menu").appendChild(link(m[0], m[1])); });

  // Horários
  var hs = Array.isArray(L.horarios) ? L.horarios : [];
  function minutos(t) { var m = /^(\d{1,2}):(\d{2})$/.exec(t || ""); return m ? +m[1] * 60 + +m[2] : null; }
  function agoraSP() {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
    return { dia: dia, min: (+o.hour % 24) * 60 + +o.minute };
  }
  if (hs.length) {
    $("blocoHorarios").hidden = false;
    var dl = $("listaHorarios"), now = agoraSP();
    hs.forEach(function (h) {
      var dt = el("dt", (h.dias || []).indexOf(now.dia) >= 0 ? "hoje" : "", h.texto || "");
      dl.appendChild(dt); dl.appendChild(el("dd", "", (h.abre || "") + " às " + (h.fecha || "")));
    });
    atualizarAberto();
    setInterval(atualizarAberto, 60000);
  }
  function atualizarAberto() {
    var now = agoraSP(), aberto = null, proximo = "";
    hs.forEach(function (h) {
      var a = minutos(h.abre), f = minutos(h.fecha);
      if (a == null || f == null || (h.dias || []).indexOf(now.dia) < 0) return;
      if (now.min >= a && now.min < f) aberto = h;
    });
    var est = $("abertoEstado"), det = $("abertoDetalhe");
    if (aberto) {
      est.textContent = "Aberto agora"; est.className = "aberto-estado sim";
      det.textContent = "Fechamos às " + aberto.fecha + ".";
    } else {
      est.textContent = "Fechado agora"; est.className = "aberto-estado nao";
      for (var i = 0; i < 7 && !proximo; i++) {
        var d = (now.dia + i) % 7;
        hs.forEach(function (h) {
          if (proximo || (h.dias || []).indexOf(d) < 0) return;
          var a = minutos(h.abre);
          if (a == null || (i === 0 && a <= now.min)) return;
          proximo = (i === 0 ? "hoje" : i === 1 ? "amanhã" : DIAS[d].toLowerCase()) + " às " + h.abre;
        });
      }
      det.textContent = proximo ? "Abrimos " + proximo + "." : "";
    }
    $("aberto").hidden = false;
  }

  // Redes sociais
  if (insta) {
    var r = $("redes"); r.hidden = false;
    r.appendChild(document.createTextNode("Instagram: "));
    r.appendChild(link("@" + insta, "https://www.instagram.com/" + insta + "/", "", true));
  }

  // Dados para o Google (aparece só quando há endereço)
  if (L.endereco) {
    var ld = {
      "@context": "https://schema.org", "@type": "DepartmentStore", name: L.nome,
      url: "https://www.lojaosuper20cupira.com.br/",
      address: { "@type": "PostalAddress", streetAddress: L.endereco, addressLocality: L.cidade, addressRegion: L.uf, addressCountry: "BR" }
    };
    if (telNum) ld.telephone = "+55" + telNum.replace(/^55/, "");
    var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }
})();
