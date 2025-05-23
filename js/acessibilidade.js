
let fontSize = parseInt(localStorage.getItem('fontSize')) || 16;

function updatePreferences() {
  localStorage.setItem('fontSize', fontSize);
  localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}
// Ao carregar a página, aplica o tamanho salvo
window.onload = () => {
  applyFontSize();
};

// Função para aplicar o tamanho em todos os elementos
function applyFontSize() {
  document.querySelectorAll('p')
    .forEach(el => el.style.fontSize = fontSize + 'px');
}

// Aumentar fonte
function increaseFont() {
  if (fontSize < 28) {
    fontSize += 2;
    updatePreferences()
    applyFontSize();
    localStorage.setItem('fontSize', fontSize);
    mostrarAviso("Fonte Aumentada!");
  }
}

// Diminuir fonte
function decreaseFont() {
  if (fontSize > 12) {
    fontSize -= 2;
    updatePreferences()
    applyFontSize();
    localStorage.setItem('fontSize', fontSize);
    mostrarAviso("Fonte Diminuída!");
  }
}

function toggleContrast() {
  const root = document.documentElement;
  const hero = document.querySelector('.hero-section');

  if (document.body.classList.contains('modo-simples')) {
    alert('O modo simples está ativado. Por favor, desative-o clicando no botão "Modo Simples" antes de ativar o contraste.');
    return;
  }

  const isActive = document.body.classList.contains('high-contrast');

  if (isActive) {
    // Desativa o modo contraste
    document.body.classList.remove('high-contrast');
    hero?.classList.remove('high-contrast-hero');

    document.body.style.background = '';
    document.body.style.color = '';
    root.style.setProperty('--primary-color', '#f08a81');

    localStorage.removeItem('highContrast');
    mostrarAviso('Modo Contraste desativado!');
  } else {
    // Ativa o modo contraste
    document.body.classList.add('high-contrast');
    hero?.classList.add('high-contrast-hero');

    document.body.style.background = '#535353';
    document.body.style.color = '#fff';
    root.style.setProperty('--primary-color', '#535353');

    localStorage.setItem('highContrast', 'true');
    mostrarAviso('Modo Contraste ativado!');
  }
  atualizarEstadoBotoes();
}


function ativarModoSimples() {
  if (document.body.classList.contains('high-contrast')) {
    alert('O modo contraste está ativado. Por favor, desative-o clicando no botão "Modo Contraste" antes de ativar o modo simples.');
    return;
  }

    const hero = document.querySelector('.hero-section');

  // Verifica se o modo simples já está ativado
   if (document.body.classList.contains('modo-simples')) {
        document.body.classList.remove('modo-simples');
        hero?.classList.remove('modo-simples-hero');
        mostrarAviso("Modo Simples desativado!");
        localStorage.removeItem('modoSimples');
    } else {
        document.body.classList.add('modo-simples');
        hero?.classList.add('modo-simples-hero');
        mostrarAviso("Modo Simples ativado!");
        localStorage.setItem('modoSimples', 'true');
    }
    atualizarEstadoBotoes();

}

function resetarConfiguracoes() {
    // Remove classes do body
    document.body.classList.remove('high-contrast');
    document.body.classList.remove('modo-simples');

    // Remove classes específicas de seções, se tiver
    document.querySelector('.hero-section')?.classList.remove('high-contrast-hero', 'modo-simples-hero');

    // Resetar fonte
    fontSize = 16;
    applyFontSize();

    // Limpar localStorage
    localStorage.removeItem('highContrast');
    localStorage.removeItem('modoSimples');
    localStorage.removeItem('fontSize');

    // Resetar estilos inline
    document.body.style.background = '';
    document.body.style.color = '';
    document.documentElement.style.setProperty('--primary-color', '#f08a81');

    mostrarAviso('Configurações Redefinidas!');
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
