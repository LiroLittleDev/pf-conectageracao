/**
 * config.js
 * Arquivo dedicado preferências do usuário para a aplicação.
 */

window.onload = () => {
  // Reaplicando preferências já salvas
  const savedFontSize = localStorage.getItem('fontSize');
  const contrast = localStorage.getItem('highContrast') === 'true';

  /**
   * Indica se o modo simples está ativado, baseado no valor armazenado em localStorage.
   * Se o valor for 'true', o modo simples está ativado; caso contrário, não está.
   */
  const modoSimples = localStorage.getItem('modoSimples') === 'true';

  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    document.body.style.fontSize = fontSize + "px";
  }
 
  if (contrast) {
    document.body.classList.add('high-contrast');
    document.body.style.background = localStorage.getItem('rootBackground') || '#000';
    document.body.style.color = localStorage.getItem('rootColor') || '#fff';
    document.documentElement.style.setProperty('--primary-color', localStorage.getItem('rootPrimaryColor') || '#535353');
  }

  if (modoSimples) {
    document.body.classList.add('modo-simples');
  }
};