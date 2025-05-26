// 🔥 Carrega e exibe um vídeo do YouTube na página
function carregarVideo(videoId) {
  const videoSection = document.getElementById('video-container'); // 🔗 Container onde o vídeo aparece
  const videoFrame = document.getElementById('video-frame');       // 🎥 Iframe que carrega o vídeo

  // 🔗 Define o link do vídeo dentro do iframe
  videoFrame.src = `https://www.youtube.com/embed/${videoId}`;

  // 🔥 Remove a classe que esconde o vídeo (assumindo que 'd-none' faz display: none;)
  videoSection.classList.remove('d-none');

  // 🔽 Faz scroll suave até o vídeo na página
  window.scrollTo({
    top: videoSection.offsetTop - 50, // 🔧 Ajuste de 50px antes do topo (pode mudar se quiser)
    behavior: 'smooth'
  });
}

// 🔥 Fecha o vídeo e para a reprodução
function fecharVideo() {
  const videoSection = document.getElementById('video-container'); // 🔗 Container do vídeo
  const videoFrame = document.getElementById('video-frame');       // 🎥 Iframe do vídeo

  // 🚫 Para o vídeo zerando o src
  videoFrame.src = '';

  // 🔥 Esconde novamente a seção do vídeo
  videoSection.classList.add('d-none');
}
