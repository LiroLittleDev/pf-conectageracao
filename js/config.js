window.onload = () => {
    const modoSimples = localStorage.getItem('modoSimples') === 'true';
    const contraste = localStorage.getItem('highContrast') === 'true';
    const fontSize = localStorage.getItem('fontSize');

    // Se existir, ajusta tamanho de fonte
    if (fontSize) {
        document.body.style.fontSize = `${parseInt(fontSize)}px`;
    }

    // Aplica Modo Simples
    if (modoSimples) {
        document.body.classList.add('modo-simples');

        document.querySelector('.hero-section')?.classList.add('modo-simples-hero');
        document.querySelector('.login-body')?.classList.add('modo-simples');
        document.querySelector('.cadastro-body')?.classList.add('modo-simples');
        document.querySelector('.tutorial-body')?.classList.add('modo-simples');
        document.querySelector('.faq-body')?.classList.add('modo-simples');
    }

    // Aplica Modo Contraste
    if (contraste) {
        document.body.classList.add('high-contrast');

        document.querySelector('.hero-section')?.classList.add('high-contrast-hero');
        document.querySelector('.login-body')?.classList.add('high-contrast');
        document.querySelector('.cadastro-body')?.classList.add('high-contrast');
        document.querySelector('.tutorial-body')?.classList.add('high-contrast');
        document.querySelector('.faq-body')?.classList.add('high-contrast');
    }
     atualizarEstadoBotoes();
};
