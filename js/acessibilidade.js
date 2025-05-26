let fontSize = parseInt(localStorage.getItem('fontSize')) || 16;

function updatePreferences() {
  localStorage.setItem('fontSize', fontSize);
  localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
  localStorage.setItem('modoSimples', document.body.classList.contains('modo-simples'));
}

window.onload = () => {
  applyFontSize();
};

function applyFontSize() {
  const elementos = document.querySelectorAll('p, h2');
  elementos.forEach(el => el.style.fontSize = fontSize + 'px');
}

// Aumentar fonte
function increaseFont() {
  if (fontSize < 28) {
    fontSize += 2;
    updatePreferences();
    applyFontSize();
    mostrarAviso("Fonte Aumentada!");
  }
}

// Diminuir fonte
function decreaseFont() {
  if (fontSize > 12) {
    fontSize -= 2;
    updatePreferences();
    applyFontSize();
    mostrarAviso("Fonte Diminuída!");
  }
}


function toggleContrast() {
    const root = document.documentElement;

    if (document.body.classList.contains('modo-simples')) {
        alert('O modo simples está ativado. Por favor, desative-o antes de ativar o contraste.');
        return;
    }

    const isActive = document.body.classList.contains('high-contrast');

    const paginas = ['hero-section', 'login-body', 'cadastro-body', 'tutorial-body', 'duvidas-body'];

    if (isActive) {
        // 🔥 DESATIVA CONTRASTE
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
        // 🔥 ATIVA CONTRASTE
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
    const paginas = ['hero-section', 'login-body', 'cadastro-body', 'tutorial-body', 'faq-body'];

    // 🔥 Remove classes globais
    document.body.classList.remove('high-contrast', 'modo-simples');

    // 🔥 Remove classes específicas de todas as páginas
    paginas.forEach(pagina => {
        document.querySelector(`.${pagina}`)?.classList.remove(
            'high-contrast', 'high-contrast-hero', 'modo-simples', 'modo-simples-hero'
        );
    });

    // 🔥 Resetar tamanho da fonte para o padrão
    fontSize = 16;
    applyFontSize();
    document.body.style.fontSize = ''; // Remove inline residual

    // 🔥 Limpa preferências do localStorage
    localStorage.removeItem('highContrast');
    localStorage.removeItem('modoSimples');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('toolbar');

    // 🔥 Reseta variáveis de CSS customizadas
    document.body.style.background = '';
    document.body.style.color = '';
    document.documentElement.style.setProperty('--primary-color', '#f08a81');

    // 🔥 Remove marcação de botões ativos
    document.querySelectorAll('.btn.active').forEach(btn => btn.classList.remove('active'));

    mostrarAviso('Configurações Redefinidas!');
}


let modoLeituraAtivo = false;
let lendo = false;

function toggleModoLeitura() {
  modoLeituraAtivo = !modoLeituraAtivo;

  if (modoLeituraAtivo) {
    document.body.style.cursor = 'url("../images/cursor-ler-clique.png"), pointer';

    document.addEventListener('click', leitorDeTexto);
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('mouseenter', leitorHoverBotao);
    });

    document.addEventListener('click', bloquearLinks, true); // 🔥 Aqui bloqueia links

    mostrarAviso('Ler-Clique ativado!');
  } else {
    document.body.style.cursor = 'auto';

    document.removeEventListener('click', leitorDeTexto);
    document.querySelectorAll('button').forEach(btn => {
      btn.removeEventListener('mouseenter', leitorHoverBotao);
    });

    document.removeEventListener('click', bloquearLinks, true); // 🔓 Desbloqueia os links

    window.speechSynthesis.cancel();
    lendo = false;

    mostrarAviso('Ler-Clique desativado!');
  }

  atualizarEstadoBotoes();
}

// 🔥 Função que bloqueia clique em links no modo leitura
function bloquearLinks(e) {
  if (e.target.closest('a')) {
    e.preventDefault();
  }
}

// 🔥 Leitor ao clicar nos textos
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

// 🔥 Leitor ao passar o mouse sobre botões
function leitorHoverBotao(e) {
  const texto = removerEmojis(e.target.innerText.trim());
  if (!texto) return;

  window.speechSynthesis.cancel();
  falarTexto(texto);
}

// 🔊 Função única para falar texto
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

function removerEmojis(texto) {
  return texto.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u200D\uFE0F]|\p{Emoji_Presentation}|\p{Extended_Pictographic})+/gu,
    ''
  );
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
