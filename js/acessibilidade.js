let fontSize = parseInt(getComputedStyle(document.body).fontSize);

function updatePreferences() {
  localStorage.setItem('fontSize', fontSize);
  localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

function increaseFont() {
  if (fontSize < 30) {
    fontSize += 2;
    document.body.style.fontSize = fontSize + "px";
    mostrarAviso("Fonte Aumentada!")
    updatePreferences();
  }
}

function decreaseFont() {
  if (fontSize > 12) {
    fontSize -= 2;
    document.body.style.fontSize = fontSize + "px";
    mostrarAviso("Fonte Diminuída!");
    updatePreferences();
  }
}

function toggleContrast() {
  const root = document.documentElement;

  if (document.body.classList.contains('modo-simples')) {
    // Se o modo simples estiver ativado, não permite ativar o contraste
    alert('O modo simples está ativado. Por favor, desative-o clicando no botão "Modo Simples" antes de ativar o contraste.');
    return;
  }

  if (document.body.classList.contains('high-contrast')) {
    // Se estiver no modo contraste, desativa o contraste
    document.body.classList.remove('high-contrast');
    mostrarAviso("Modo Contraste desativado!");
    localStorage.removeItem('highContrast');
    document.body.style.background = '';
    document.body.style.color = '';
    root.style.setProperty('--primary-color', '#f08a81'); // Cor primária original
  } else {
    // Ativa o contraste
    document.body.classList.add('high-contrast');
    mostrarAviso("Modo Contraste ativado!");
    document.body.style.background = '#535353';
    document.body.style.color = '#fff';
    root.style.setProperty('--primary-color', '#535353'); // Cor primária para contraste
    localStorage.setItem('highContrast', 'true');
  }

  updatePreferences();
}

function ativarModoSimples() {
  if (document.body.classList.contains('high-contrast')) {
    // Se o contraste estiver ativado, não permite ativar o modo simples
    alert('O modo contraste está ativado. Por favor, desative-o clicando no botão "Modo Contraste" antes de ativar o modo simples.');
    return;
  }

  if (document.body.classList.contains('modo-simples')) {
    document.body.classList.remove('modo-simples')
    mostrarAviso("Modo Simples desativado!");
    localStorage.removeItem('modoSimples');
  } else {
    document.body.classList.add('modo-simples');
    mostrarAviso("Modo Simples ativado!");
    localStorage.setItem('modoSimples', 'true');
  }
}

function removerEmojis(texto) {
  return texto.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F|\u200D)/g,
    ""
  );
}

function lerTexto(selector) {
  const element = document.querySelector(selector);
  if (element) {
    const textoOriginal = element.textContent || element.innerText;
    const textoLimpo = removerEmojis(textoOriginal);
    const speech = new SpeechSynthesisUtterance(textoLimpo);
    speech.lang = "pt-BR";
    speech.rate = 0.9;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      window.speechSynthesis.speak(speech);
    }
  } else {
    console.error(`Elemento não encontrado para o seletor: ${selector}`);
  }
}

function lerClasse(className) {
  const elements = document.getElementsByClassName(className);
  if (elements.length > 0) {
    Array.from(elements).forEach((element) => {
      const textoOriginal = element.textContent || element.innerText;
      const textoLimpo = removerEmojis(textoOriginal);
      const speech = new SpeechSynthesisUtterance(textoLimpo);
      speech.lang = "pt-BR";
      speech.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    });
  } else {
    console.error(`Nenhum elemento encontrado para a classe: ${className}`);
  }
}

function mostrarAviso(mensagem, cor = '#faac1c') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.style.backgroundColor = cor;
  toast.style.color = '#fff';
  toast.style.padding = '10px 15px';
  toast.style.marginBottom = '10px';
  toast.style.borderRadius = '5px';
  toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  toast.textContent = mensagem;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
    if (container.children.length === 0) {
      container.remove();
    }
  }, 2000);
}

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