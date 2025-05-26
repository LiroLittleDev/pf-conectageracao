window.onload = () => {
    // 🔥 Carrega preferências salvas do localStorage
    const preferencias = {
        modoSimples: localStorage.getItem('modoSimples') === 'true',
        contraste: localStorage.getItem('highContrast') === 'true',
        fontSize: parseInt(localStorage.getItem('fontSize')) || 16,
        toolbarAberta: localStorage.getItem('toolbarAberta') === 'true'
    };

    let fontSize = preferencias.fontSize;

    // 🔧 Aplica tamanho da fonte
    applyFontSize();

    // 🔧 Função para aplicar classes no body e nas páginas específicas
    function aplicarClasse(classeBody, classeExtra = '') {
        document.body.classList.add(classeBody);
        paginas.forEach(pagina => {
            document.querySelector(`.${pagina}`)?.classList.add(`${classeBody}${classeExtra}`);
        });
    }

    // 🔲 Ativa Modo Simples se estava salvo
    if (preferencias.modoSimples) {
        aplicarClasse('modo-simples', '-hero');
    }

    // 🔳 Ativa Modo Contraste se estava salvo
    if (preferencias.contraste) {
        aplicarClasse('high-contrast', '-hero');
    }

    // 🧰 Define estado da toolbar (aberta ou fechada)
    const toolbar = document.getElementById('toolbar');
    if (toolbar) {
        toolbar.style.display = preferencias.toolbarAberta ? 'flex' : 'none';
    }

    // 🔃 Atualiza estado dos botões da toolbar
    atualizarEstadoBotoes();
};
