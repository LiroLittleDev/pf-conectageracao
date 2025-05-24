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

function carregarVideo(videoId) {
    const container = document.getElementById('video-container');

    // 🔥 Gera o iframe do vídeo
    const iframe = `
        <div class="video-player mb-4">
            <iframe width="100%" height="450" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                title="Tutorial Video" 
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        </div>
    `;

    // 🔥 Insere ou substitui o vídeo no container
    container.innerHTML = iframe;

    // 🔥 Scroll até o vídeo suavemente
    container.scrollIntoView({ behavior: 'smooth' });
}

