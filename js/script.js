// Mostra a explicação do tipo selecionado ('celular' ou 'pc') e esconde a outra. pagina de duvidas
function showFAQ(device) {
  const faqs = ["mobile-faq", "computer-faq"];

  faqs.forEach(id => {
    document.getElementById(id)?.classList.add("d-none");
  });

  document.getElementById(`${device}-faq`)?.classList.remove("d-none");
}

// Função para retirar a leitura de emojis (se houver) em algum texto da pagina.
function removerEmojis(texto) {
  return texto.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F|\u200D)/g,
    ""
  );
}

