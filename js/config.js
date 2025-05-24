window.onload = () => {
    const preferencias = {
        modoSimples: localStorage.getItem('modoSimples') === 'true',
        contraste: localStorage.getItem('highContrast') === 'true',
        fontSize: parseInt(localStorage.getItem('fontSize')) || 16,
    };

    const paginas = ['login-body', 'cadastro-body', 'tutorial-body', 'faq-body'];

    let fontSize = preferencias.fontSize;

    // ✔️ Aplica tamanho da fonte
    applyFontSize();

    // ✔️ Função genérica para aplicar classes
    function aplicarClasse(classeBody, classeExtra = '') {
        document.body.classList.add(classeBody);
        paginas.forEach(pagina => {
            document.querySelector(`.${pagina}`)?.classList.add(`${classeBody}${classeExtra}`);
        });
    }

    // ✔️ Aplica Modo Simples
    if (preferencias.modoSimples) {
        aplicarClasse('modo-simples', '-hero');
    }

    // ✔️ Aplica Modo Contraste
    if (preferencias.contraste) {
        aplicarClasse('high-contrast', '-hero');
    }

    // ✔️ Estado da Toolbar
    const toolbar = document.getElementById('toolbar');
    if (toolbar) {
        toolbar.style.display = preferencias.toolbar === 'aberto' ? 'flex' : 'none';
    }

    atualizarEstadoBotoes();
};
