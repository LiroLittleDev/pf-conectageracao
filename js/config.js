window.onload = () => {
    const preferencias = {
        modoSimples: localStorage.getItem('modoSimples') === 'true',
        contraste: localStorage.getItem('highContrast') === 'true',
        fontSize: localStorage.getItem('fontSize'),
        toolbar: localStorage.getItem('toolbar')
    };

    const paginas = ['hero-section', 'login-body', 'cadastro-body', 'tutorial-body', 'faq-body'];

    // ✔️ Aplica tamanho da fonte
    if (preferencias.fontSize) {
        document.body.style.fontSize = `${parseInt(preferencias.fontSize)}px`;
    }

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

