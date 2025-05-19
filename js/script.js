    // Mostra a explicação do tipo selecionado ('celular' ou 'pc') e esconde a outra. pagina de duvidas
    function mostrarExplicacao(tipo) {
      document.getElementById('explicacao-celular').classList.add('d-none');
      document.getElementById('explicacao-pc').classList.add('d-none');
      if (tipo === 'celular') {
        document.getElementById('explicacao-celular').classList.remove('d-none');
      } else if (tipo === 'pc') {
        document.getElementById('explicacao-pc').classList.remove('d-none');
      }
    }

    