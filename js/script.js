
function carregarVideo(videoId) {
  const videoSection = document.getElementById('video-container');
  const videoFrame = document.getElementById('video-frame');

  videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
  videoSection.classList.remove('d-none');
  window.scrollTo({ top: videoSection.offsetTop - 50, behavior: 'smooth' });
}

function fecharVideo() {
  const videoSection = document.getElementById('video-container');
  const videoFrame = document.getElementById('video-frame');

  videoFrame.src = ''; // 🔥 Para parar o vídeo
  videoSection.classList.add('d-none');
}

