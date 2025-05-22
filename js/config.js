window.onload = () => {
    const modoSimples = localStorage.getItem('modoSimples') === 'true';
    const contraste = localStorage.getItem('highContrast') === 'true';
    const hero = document.querySelector('.hero-section');

    if (modoSimples) {
        document.body.classList.add('modo-simples');
        hero?.classList.add('modo-simples-hero');
    }

    if (contraste) {
        document.body.classList.add('high-contrast');
        hero?.classList.add('high-contrast-hero');
    }

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.body.style.fontSize = parseInt(savedFontSize) + "px";
    }
};
