// 🔥 Inicializa o tamanho da fonte a partir do localStorage ou usa 16 padrão
let fontSize = parseInt(localStorage.getItem('fontSize')) || 16;

// 🔥 Atualiza as preferências no localStorage
function updatePreferences() {
  localStorage.setItem('fontSize', fontSize);
  localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
  localStorage.setItem('modoSimples', document.body.classList.contains('modo-simples'));
}

// 🔥 Aplica o tamanho da fonte nos elementos definidos
function applyFontSize() {
  const elementos = document.querySelectorAll('p, h2, h3, h4, h5, li');
  elementos.forEach(el => el.style.fontSize = fontSize + 'px');
}

// 🔺 Aumenta o tamanho da fonte até um limite
function increaseFont() {
  if (fontSize < 28) {
    fontSize += 2;
    updatePreferences();
    applyFontSize();
    mostrarAviso("Fonte Aumentada!");
  }
}

// 🔻 Diminui o tamanho da fonte até um limite
function decreaseFont() {
  if (fontSize > 12) {
    fontSize -= 2;
    updatePreferences();
    applyFontSize();
    mostrarAviso("Fonte Diminuída!");
  }
}

// 🔲 Ativa ou desativa o modo contraste
function toggleContrast() {
  const root = document.documentElement;

  // 🚫 Impede ativar contraste se modo simples estiver ativo
  if (document.body.classList.contains('modo-simples')) {
    alert('O modo simples está ativado. Por favor, desative-o antes de ativar o contraste.');
    return;
  }

  const isActive = document.body.classList.contains('high-contrast');
  const paginas = ['hero-section', 'login-body', 'cadastro-body', 'tutorial-body', 'duvidas-body'];

  if (isActive) {
    // 🔧 Desativa contraste
    document.body.classList.remove('high-contrast');
    paginas.forEach(pagina => {
      document.querySelector(`.${pagina}`)?.classList.remove('high-contrast', 'high-contrast-hero');
    });
    document.body.style.background = '';
    document.body.style.color = '';
    root.style.setProperty('--primary-color', '#f08a81');

    localStorage.removeItem('highContrast');
    mostrarAviso('Modo Contraste desativado!');
  } else {
    // 🔥 Ativa contraste
    document.body.classList.add('high-contrast');
    paginas.forEach(pagina => {
      document.querySelector(`.${pagina}`)?.classList.add('high-contrast', 'high-contrast-hero');
    });
    document.body.style.background = '#535353';
    document.body.style.color = '#fff';
    root.style.setProperty('--primary-color', '#535353');

    localStorage.setItem('highContrast', 'true');
    mostrarAviso('Modo Contraste ativado!');
  }

  atualizarEstadoBotoes();
}

// 🔳 Ativa ou desativa o modo simples
function ativarModoSimples() {
  if (document.body.classList.contains('high-contrast')) {
    alert('O modo contraste está ativado. Por favor, desative-o clicando no botão "Modo Contraste" antes de ativar o modo simples.');
    return;
  }

  const hero = document.querySelector('.hero-section');

  if (document.body.classList.contains('modo-simples')) {
    // 🔧 Desativa modo simples
    document.body.classList.remove('modo-simples');
    hero?.classList.remove('modo-simples-hero');
    mostrarAviso("Modo Simples desativado!");
    localStorage.removeItem('modoSimples');
  } else {
    // 🔥 Ativa modo simples
    document.body.classList.add('modo-simples');
    hero?.classList.add('modo-simples-hero');
    mostrarAviso("Modo Simples ativado!");
    localStorage.setItem('modoSimples', 'true');
  }

  atualizarEstadoBotoes();
}

// 🔄 Reseta todas as configurações de acessibilidade e preferências
function resetarConfiguracoes() {
  const paginas = ['hero-section', 'login-body', 'cadastro-body', 'tutorial-body', 'faq-body'];

  document.body.classList.remove('high-contrast', 'modo-simples');
  paginas.forEach(pagina => {
    document.querySelector(`.${pagina}`)?.classList.remove(
      'high-contrast', 'high-contrast-hero', 'modo-simples', 'modo-simples-hero'
    );
  });

  fontSize = 16;
  applyFontSize();
  document.body.style.fontSize = '';

  localStorage.removeItem('highContrast');
  localStorage.removeItem('modoSimples');
  localStorage.removeItem('fontSize');
  localStorage.removeItem('toolbar');

  document.body.style.background = '';
  document.body.style.color = '';
  document.documentElement.style.setProperty('--primary-color', '#f08a81');

  document.querySelectorAll('.btn.active').forEach(btn => btn.classList.remove('active'));

  mostrarAviso('Configurações Redefinidas!');
}

// 🗣️ Variáveis globais para o modo leitor
let modoLeituraAtivo = false;
let lendo = false;

// 🗣️ Ativa ou desativa o modo leitor (Ler-Clique)
function toggleModoLeitura() {
  modoLeituraAtivo = !modoLeituraAtivo;

  if (modoLeituraAtivo) {
    document.body.style.cursor = 'url("images/cursor-lc.png"), auto';

    document.addEventListener('click', leitorDeTexto);
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('mouseenter', leitorHoverBotao);
    });

    document.addEventListener('click', bloquearLinks, true);

    mostrarAviso('Ler-Clique ativado!');
  } else {
    document.body.style.cursor = 'auto';

    document.removeEventListener('click', leitorDeTexto);
    document.querySelectorAll('button').forEach(btn => {
      btn.removeEventListener('mouseenter', leitorHoverBotao);
    });

    document.removeEventListener('click', bloquearLinks, true);

    window.speechSynthesis.cancel();
    lendo = false;

    mostrarAviso('Ler-Clique desativado!');
  }

  atualizarEstadoBotoes();
}

// 🔗 Bloqueia navegação em links no modo leitor
function bloquearLinks(e) {
  if (e.target.closest('a')) {
    e.preventDefault();
  }
}

// 🗣️ Função para ler texto ao clicar
function leitorDeTexto(e) {
  const tag = e.target.tagName.toLowerCase();
  const tagsPermitidas = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'li', 'span', 'div', 'button', 'a'];

  if (!tagsPermitidas.includes(tag)) return;

  const texto = removerEmojis(e.target.innerText.trim());
  if (!texto) return;

  if (lendo) {
    window.speechSynthesis.cancel();
    lendo = false;
    return;
  }

  falarTexto(texto);
}

// 🗣️ Função para ler texto ao passar o mouse sobre botões
function leitorHoverBotao(e) {
  const texto = removerEmojis(e.target.innerText.trim());
  if (!texto) return;

  window.speechSynthesis.cancel();
  falarTexto(texto);
}

// 🔊 Função responsável por executar a leitura em voz alta
function falarTexto(texto) {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
  lendo = true;

  utterance.onend = () => {
    lendo = false;
  };
}

// ✂️ Remove emojis de textos
function removerEmojis(texto) {
  return texto.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u200D\uFE0F]|\p{Emoji_Presentation}|\p{Extended_Pictographic})+/gu,
    ''
  );
}

// 🔔 Cria e exibe um aviso na tela
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
