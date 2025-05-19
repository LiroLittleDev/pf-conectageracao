const dicas = [
  {
    id: "dica1",
    titulo: "Use o Modo Simples",
    texto: "Clique em 'Modo Simples' para deixar o site mais limpo, com menos distrações e mais fácil de navegar."
  },
  {
    id: "dica2",
    titulo: "Ajuste o Tamanho do Texto",
    texto: "Se as letras estiverem pequenas, clique em '+ Texto' para aumentar ou '- Texto' para diminuir o tamanho conforme sua preferência."
  },
  {
    id: "dica3",
    titulo: "Ative a Leitura em Voz Alta",
    texto: "Você pode ouvir os textos do site clicando no botão de som (🔊) ao lado dos títulos e parágrafos principais."
  },
  {
    id: "dica4",
    titulo: "Troque para o Tema Escuro",
    texto: "Prefere fundo escuro com letras claras? Clique em 'Tema Escuro' para reduzir o brilho da tela e melhorar o conforto visual."
  },
  {
    id: "dica5",
    titulo: "Acesse a Área de Login",
    texto: "Clique em 'Área de Login' na tela inicial para acessar sua conta com segurança e acompanhar seu progresso."
  },
  {
    id: "dica6",
    titulo: "Navegue com Calma",
    texto: "Explore as seções do site com tranquilidade. Tudo foi feito para ser fácil, acolhedor e adaptado às suas necessidades."
  }
];


function renderizarDicas() {
  const container = document.querySelector('#dicas-container');
  if (!container) return;

  dicas.forEach((dica, index) => {
    const delay = 0.2 * index;
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm border-0 h-100 animate-in" style="animation-delay: ${delay}s; border-radius: 12px; overflow: hidden; background-color:rgb(255, 143, 69); color: #fff;">
          <div class="card-body text-center" >
            <div class="mb-3">
              <span class="badge bg-primary rounded-pill p-3 fs-4" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">${index + 1}</span>
            </div>
            <h3 class="card-title" id="${dica.id}" style="font-size: 1.25rem; font-weight: bold; color: #fff;">
              ${dica.titulo}
              <button class="btn btn-sm btn-outline-secondary ms-2" onclick="lerTexto('#${dica.id}')" style="border-radius: 50%; padding: 0.5rem; font-size: 1rem; color: #333; background-color: #fff;">
                🔊
              </button>
            </h3>
            <p class="card-text" style="color:rgb(255, 255, 255); font-size: 1rem; line-height: 1.5;">${dica.texto}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// Chamar após o DOM carregar
window.addEventListener('DOMContentLoaded', renderizarDicas);