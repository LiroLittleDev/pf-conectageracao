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
});
