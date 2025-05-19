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

// Atualização: garantir que a hero-section funcione com contraste e modo simples

function toggleContrast() {
  const root = document.documentElement;

  if (document.body.classList.contains('modo-simples')) {
    alert('O modo simples está ativado. Por favor, desative-o clicando no botão "Modo Simples" antes de ativar o contraste.');
    return;
  }

  if (document.body.classList.contains('high-contrast')) {
    document.body.classList.remove('high-contrast');
    mostrarAviso("Modo Contraste desativado!");
    localStorage.removeItem('highContrast');
    document.body.style.background = '';
    document.body.style.color = '';
    root.style.setProperty('--primary-color', '#f08a81');
    // Remove classe de contraste da hero-section
    document.querySelector('.hero-section')?.classList.remove('high-contrast-hero');
  } else {
    document.body.classList.add('high-contrast');
    mostrarAviso("Modo Contraste ativado!");
    document.body.style.background = '#535353';
    document.body.style.color = '#fff';
    root.style.setProperty('--primary-color', '#535353');
    localStorage.setItem('highContrast', 'true');
    // Adiciona classe de contraste na hero-section
    document.querySelector('.hero-section')?.classList.add('high-contrast-hero');
  }
  updatePreferences();
}

function ativarModoSimples() {
  if (document.body.classList.contains('high-contrast')) {
    alert('O modo contraste está ativado. Por favor, desative-o clicando no botão "Modo Contraste" antes de ativar o modo simples.');
    return;
  }

  if (document.body.classList.contains('modo-simples')) {
    document.body.classList.remove('modo-simples');
    mostrarAviso("Modo Simples desativado!");
    localStorage.removeItem('modoSimples');
    // Remove classe de modo simples da hero-section
    document.querySelector('.hero-section')?.classList.remove('modo-simples-hero');
  } else {
    document.body.classList.add('modo-simples');
    mostrarAviso("Modo Simples ativado!");
    localStorage.setItem('modoSimples', 'true');
    // Adiciona classe de modo simples na hero-section
    document.querySelector('.hero-section')?.classList.add('modo-simples-hero');
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
