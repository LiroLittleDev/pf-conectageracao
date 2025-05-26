window.onload = () => {
    // 🔥 Carrega preferências salvas do localStorage
    const preferencias = {
        modoSimples: localStorage.getItem('modoSimples') === 'true',      // ✔️ Verifica se o modo simples está ativo
        contraste: localStorage.getItem('highContrast') === 'true',        // ✔️ Verifica se o modo contraste está ativo
        fontSize: parseInt(localStorage.getItem('fontSize')) || 16,        // ✔️ Carrega tamanho da fonte ou usa 16 como padrão
    };

    // 🔥 Define o tamanho da fonte baseado nas preferências carregadas
    let fontSize = preferencias.fontSize;

    // 🔧 Aplica tamanho da fonte nos elementos definidos
    applyFontSize();

    // 🔥 Função genérica para aplicar uma classe no body e nas páginas específicas
    function aplicarClasse(classeBody, classeExtra = '') {
        document.body.classList.add(classeBody);
        paginas.forEach(pagina => {
            document.querySelector(`.${pagina}`)?.classList.add(`${classeBody}${classeExtra}`);
        });
    }

    // 🔲 Se o modo simples estava ativo, aplica as classes correspondentes
    if (preferencias.modoSimples) {
        aplicarClasse('modo-simples', '-hero');
    }

    // 🔳 Se o modo contraste estava ativo, aplica as classes correspondentes
    if (preferencias.contraste) {
        aplicarClasse('high-contrast', '-hero');
    }

    // 🧰 Estado da toolbar (ABERTO ou FECHADO)
    const toolbar = document.getElementById('toolbar');

    // ⚠️ Erro encontrado: você salva a toolbar como 'toolbarAberta' mas aqui tenta ler como 'toolbar'
    const toolbarAberta = localStorage.getItem('toolbarAberta') === 'true'; 

    if (toolbar) {
        toolbar.style.display = toolbarAberta ? 'flex' : 'none';
    }

    // 🔃 Atualiza estado visual dos botões da toolbar (se estão ativos ou não)
    atualizarEstadoBotoes();
};
