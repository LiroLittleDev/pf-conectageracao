function ativarModoSimples() {
  if (document.body.classList.contains('modo-simples')) {
    document.body.classList.remove('modo-simples');
    localStorage.removeItem('modoSimples');
  } else {
    document.body.classList.add('modo-simples');
    localStorage.setItem('modoSimples', 'true');
  }
}

let fontSize = parseInt(getComputedStyle(document.body).fontSize);

function updatePreferences() {
  localStorage.setItem('fontSize', fontSize);
  localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

function increaseFont() {
  if (fontSize < 30) {
    fontSize += 2;
    document.body.style.fontSize = fontSize + "px";
    updatePreferences();
  }
}

function decreaseFont() {
  if (fontSize > 12) {
    fontSize -= 2;
    document.body.style.fontSize = fontSize + "px";
    updatePreferences();
  }
}

function toggleContrast() {
  const root = document.documentElement;

  document.body.classList.toggle('high-contrast');
  if (document.body.classList.contains('high-contrast')) {
    document.body.style.background = '#000';
    document.body.style.color = '#fff';
    root.style.setProperty('--primary-color', '#ffcc00'); // Cor primária para contraste
  } else {
    document.body.style.background = '';
    document.body.style.color = '';
    root.style.setProperty('--primary-color', '#ff6f61'); // Cor primária original
  }
  updatePreferences();
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


window.onload = () => {
  // Reaplicando preferências já salvas
  const savedFontSize = localStorage.getItem('fontSize');
  const contrast = localStorage.getItem('highContrast') === 'true';
  const modoSimples = localStorage.getItem('modoSimples') === 'true';

  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    document.body.style.fontSize = fontSize + "px";
  }

  if (contrast) {
    document.body.classList.add('high-contrast');
    document.body.style.background = '#000';
    document.body.style.color = '#fff';
  }

  if (modoSimples) {
    document.body.classList.add('modo-simples');
  }
};