// Mostra a explicação do tipo selecionado ('celular' ou 'pc') e esconde a outra. pagina de duvidas
function showFAQ(device) {
  const faqs = ["mobile-faq", "computer-faq"];

  faqs.forEach(id => {
    document.getElementById(id)?.classList.add("d-none");
  });

  document.getElementById(`${device}-faq`)?.classList.remove("d-none");
}

