
function criarToolbarAcessibilidade() {
  const toolbar = document.createElement('div');
  toolbar.className = 'accessibility-toolbar';

  toolbar.innerHTML = `
    <!-- Versão desktop -->
    <div class="btn-group toolbar-desktop">
      <button class="btn btn-light m-1" onclick="ativarModoSimples()">Modo Simples</button>
      <button class="btn btn-light m-1" onclick="increaseFont()">+ Texto</button>
      <button class="btn btn-light m-1" onclick="decreaseFont()">- Texto</button>
      <button class="btn btn-light m-1" onclick="toggleContrast()">Contraste</button>
    </div>

    <!-- Versão mobile -->
    <div class="dropdown toolbar-mobile">
      <button class="accessibility-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        ⚙️
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><button class="dropdown-item" onclick="ativarModoSimples()">Modo Simples</button></li>
        <li><button class="dropdown-item" onclick="increaseFont()">+ Texto</button></li>
        <li><button class="dropdown-item" onclick="decreaseFont()">- Texto</button></li>
        <li><button class="dropdown-item" onclick="toggleContrast()">Contraste</button></li>
      </ul>
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





(function criarBotaoAjuda() {
  // Criar o botão
  const botao = document.createElement('button');
  botao.innerText = 'Ajuda';
  botao.style.position = 'fixed';
  botao.style.bottom = '20px';
  botao.style.right = '20px';
  botao.style.background = 'linear-gradient(135deg, #ff7f50 60%, #ffb347 100%)';
  botao.style.color = 'white';
  botao.style.border = 'none';
  botao.style.borderRadius = '50px';
  botao.style.padding = '15px 28px';
  botao.style.fontSize = '18px';
  botao.style.fontWeight = 'bold';
  botao.style.cursor = 'pointer';
  botao.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
  botao.style.zIndex = '1000';
  botao.style.transition = 'transform 0.2s, box-shadow 0.2s';

  botao.addEventListener('mouseenter', () => {
    botao.style.transform = 'scale(1.08)';
    botao.style.boxShadow = '0 10px 24px rgba(0,0,0,0.30)';
  });
  botao.addEventListener('mouseleave', () => {
    botao.style.transform = 'scale(1)';
    botao.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
  });

  // Criar o menu
  const menu = document.createElement('div');
  menu.style.position = 'fixed';
  menu.style.bottom = '80px';
  menu.style.right = '20px';
  menu.style.background = 'white';
  menu.style.border = '1px solid #ccc';
  menu.style.borderRadius = '14px';
  menu.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)';
  menu.style.zIndex = '999';
  menu.style.display = 'none';
  menu.style.minWidth = '210px';
  menu.style.opacity = '0';
  menu.style.transform = 'translateY(20px)';
  menu.style.transition = 'opacity 0.25s, transform 0.25s';

  const opcoes = [
    { label: 'Dúvidas Frequentes', action: () => window.location.href = 'duvidas.html' },
    { label: 'Fale Conosco', action: () => window.location.href = 'mailto:ConectandoGeracoes@gmail.com' }
  ];

  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.margin = '0';
  ul.style.padding = '10px 0';

  opcoes.forEach((opcao, idx) => {
    const li = document.createElement('li');
    li.innerText = opcao.label;
    li.style.padding = '12px 24px';
    li.style.cursor = 'pointer';
    li.style.borderBottom = idx < opcoes.length - 1 ? '1px solid #f2f2f2' : 'none';
    li.style.transition = 'background 0.18s, color 0.18s';

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
      esconderMenu();
    });

    ul.appendChild(li);
  });

  menu.appendChild(ul);
  document.body.appendChild(botao);
  document.body.appendChild(menu);

  // Mostrar/ocultar menu com animação
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

  // Ocultar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!botao.contains(e.target) && !menu.contains(e.target)) {
      esconderMenu();
    }
  });
})();
