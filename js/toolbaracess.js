function criarToolbarAcessibilidade() {
  const toolbar = document.createElement('div');
  toolbar.className = 'accessibility-toolbar';

  toolbar.innerHTML = `
<style>
  .toolbar-container {
    display: flex;
    align-items: center;
  }

  .botao-img {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .botao-img:hover {
    transform: scale(1.1);
  }

  .toolbar button {
    white-space: nowrap;
  }

  @media (min-width: 420.98px) {
    .toolbar-container {
      right: 10px;
      bottom: 10px;
      flex-wrap: wrap;
    }
  }
      @media (max-width: 767.98px) {
    .toolbar-container {
      bottom: 10px;
      right: 10px;
      flex-direction: column;
      align-items: flex-end;
      padding: 1px;
    }

    .toolbar {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
    }

     .botao-img {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s;
  

    .toolbar button {
      width: 60%;
    }
  }
</style>

<div class="toolbar-container">
  <!-- Botão com imagem -->
  <button class="botao-img" onclick="toggleToolbar()">
    <img src="images/icon-acessibilidade.png" alt="Acessibilidade" style="width: 60px; height: 50px;">
  </button>

  <!-- Toolbar botões -->
  <div id="toolbar" class="toolbar">
    <button id="btn-simples" class="btn btn-light" onclick="ativarModoSimples()">Modo Simples</button>
    <button class="btn btn-light" onclick="increaseFont()">+ Texto</button>
    <button class="btn btn-light" onclick="decreaseFont()">- Texto</button>
    <button id="btn-contraste" class="btn btn-light" onclick="toggleContrast()">Contraste</button>
  </div>
</div>

  `;

  document.body.insertBefore(toolbar, document.body.firstChild);

}
window.addEventListener('DOMContentLoaded', () => {
  criarToolbarAcessibilidade();

  const nav = document.getElementById('navbar');
  if (nav) {
    nav.insertAdjacentElement('afterend', document.querySelector('.accessibility-toolbar'));
  }
});

function atualizarEstadoBotoes() {
  const btnSimples = document.getElementById('btn-simples');
  const btnSimplesMobile = document.getElementById('btn-simples-mobile');
  const btnContraste = document.getElementById('btn-contraste');
  const btnContrasteMobile = document.getElementById('btn-contraste-mobile');

  // Estado do botão Modo Simples
  if (document.body.classList.contains('modo-simples')) {
    btnSimples?.classList.add('active');
    btnSimplesMobile?.classList.add('active');
  } else {
    btnSimples?.classList.remove('active');
    btnSimplesMobile?.classList.remove('active');
  }

  // Estado do botão Contraste
  if (document.body.classList.contains('high-contrast')) {
    btnContraste?.classList.add('active');
    btnContrasteMobile?.classList.add('active');
  } else {
    btnContraste?.classList.remove('active');
    btnContrasteMobile?.classList.remove('active');
  }
}


function toggleToolbar() {
    const toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    const isVisible = toolbar.style.display === 'flex';

    if (isVisible) {
        toolbar.style.display = 'none';
        localStorage.setItem('toolbar', 'fechado');
    } else {
        toolbar.style.display = 'flex';
        localStorage.setItem('toolbar', 'aberto');
    }
}



(function criarBotaoAjuda() {
  const botao = document.createElement('button');
  botao.innerText = 'Ajuda';
  botao.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ff7f50 60%, #ffb347 100%);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 15px 28px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    z-index: 1000;
    transition: transform 0.2s, box-shadow 0.2s;
  `;

  botao.addEventListener('mouseenter', () => {
    botao.style.transform = 'scale(1.08)';
    botao.style.boxShadow = '0 10px 24px rgba(0,0,0,0.30)';
  });
  botao.addEventListener('mouseleave', () => {
    botao.style.transform = 'scale(1)';
    botao.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
  });

  const menu = document.createElement('div');
  menu.style = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    color: #222;
    background: white;
    border: 1px solid #ccc;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    z-index: 999;
    font-size: 18px;
    display: none;
    min-width: 220px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.25s, transform 0.25s;
  `;

  const opcoes = [
    { label: 'Dúvidas Frequentes', action: () => window.location.href = 'duvidas.html' },
    { label: 'Fale Conosco', action: () => window.location.href = 'mailto:ConectandoGeracoes@gmail.com' },
    { label: 'Resetar Configurações', action: () => { resetarConfiguracoes(); esconderMenu(); } }
  ];

  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.margin = '0';
  ul.style.padding = '10px 0';

  opcoes.forEach((opcao, idx) => {
    const li = document.createElement('li');
    li.innerText = opcao.label;
    li.style = `
      padding: 12px 24px;
      cursor: pointer;
      ${idx < opcoes.length - 1 ? 'border-bottom: 1px solid #f2f2f2;' : ''}
      transition: background 0.18s, color 0.18s;
    `;

    li.addEventListener('mouseover', () => {
      li.style.background = '#ffecd2';
      li.style.color = '#ff7f50';
    });

    li.addEventListener('mouseout', () => {
      li.style.background = 'transparent';
      li.style.color = '#222';
    });

    li.addEventListener('click', () => {
      opcao.action();
    });

    ul.appendChild(li);
  });

  menu.appendChild(ul);
  document.body.appendChild(botao);
  document.body.appendChild(menu);

  function mostrarMenu() {
    menu.style.display = 'block';
    setTimeout(() => {
      menu.style.opacity = '1';
      menu.style.transform = 'translateY(0)';
    }, 10);
  }

  function esconderMenu() {
    menu.style.opacity = '0';
    menu.style.transform = 'translateY(20px)';
    setTimeout(() => {
      menu.style.display = 'none';
    }, 250);
  }

  botao.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.style.display === 'none' || menu.style.opacity === '0') {
      mostrarMenu();
    } else {
      esconderMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (!botao.contains(e.target) && !menu.contains(e.target)) {
      esconderMenu();
    }
  });
})();
