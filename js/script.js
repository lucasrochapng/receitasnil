//! filtro de pesquisa -------------------------------------------------------------------------
var inputBuscar = document.getElementById('buscar');

inputBuscar.addEventListener('input', function() {
    var termoPesquisa = inputBuscar.value.toLowerCase();
    var cards = document.querySelectorAll('.cards .card');

    cards.forEach(function(card) {
        var h2Element = card.querySelector('h2');
        var nome = h2Element.textContent.toLowerCase();

        if (nome.includes(termoPesquisa)) {
            card.classList.remove('removed'); // Remove a classe de "removido"
        } else {
            card.classList.add('removed'); // Adiciona a classe de "removido"
        }
    });
});

//! ordenação dos cards --------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');
    const cards = Array.from(cardsContainer.children);
    let currentSorting = 'nome'; // Variável para controlar o tipo atual de ordenação
  
    function ordenarPorNome() {
      cards.sort((a, b) => {
        const titleA = a.querySelector('h2').textContent.toLowerCase();
        const titleB = b.querySelector('h2').textContent.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    
      atualizarCards();
    }
  
    function atualizarCards() {
      while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
      }
      
      cards.forEach(card => cardsContainer.appendChild(card));
    }
  
    function mostrarCardsOrdenados() {
      if (currentSorting === 'nome') {
        ordenarPorNome();
      } else if (currentSorting === 'rating') {
        ordenarPorRating();
      }
    }
  
    function limparSelecaoFiltros() {
      const filtros = document.querySelectorAll('.opcao-filtro');
      filtros.forEach(filtro => {
          filtro.classList.remove('filtro-selecionado');
      });
    }
  
    // Ícones
    const iconNome = document.createElement('i');
    iconNome.classList.add('bx', 'bx-sort-a-z');
  
    const iconTorta = document.createElement('i');
    iconTorta.classList.add('bx', 'bxs-pie-chart');

    const iconBolo = document.createElement('i');
    iconBolo.classList.add('bx', 'bxs-cake');

    const iconCarne = document.createElement('i');
    iconCarne.classList.add('fa-solid', 'fa-drumstick-bite');

    const iconConserva = document.createElement('i');
    iconConserva.classList.add('fa-solid', 'fa-jar');

    // const iconDoce = document.createElement('i');
    // iconDoce.classList.add('fa-solid', 'fa-ice-cream');

    const iconDoce = document.createElement('img');
    iconDoce.src = '../icons/doce2.png';

  
    // Criando a janela modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'none'; // Inicialmente, a janela modal estará oculta
  
  
    const opcaoNome = document.createElement('div');
    opcaoNome.classList.add('opcao-filtro');
    opcaoNome.appendChild(iconNome); // Adiciona o ícone ao lado da frase
    opcaoNome.innerHTML += 'todas receitas';
    opcaoNome.classList.add('filtro-selecionado');
    opcaoNome.addEventListener('click', () => {
        currentSorting = 'nome';
        mostrarCardsOrdenados();
        modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
        limparSelecaoFiltros();
        opcaoNome.classList.add('filtro-selecionado');
  
        // Restaura a classe do ícone do filtro ao selecionar uma opção na modal
        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });
  
    const opcaoTorta = document.createElement('div');
    opcaoTorta.classList.add('opcao-filtro');
    opcaoTorta.appendChild(iconTorta);
    opcaoTorta.innerHTML += 'tortas';
    opcaoTorta.addEventListener('click', () => {
        const tortaCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'torta';
        });
  
        modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
        limparSelecaoFiltros();
        opcaoTorta.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(tortaCards);

        // Restaura a classe do ícone do filtro ao selecionar uma opção na modal
        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoBolo = document.createElement('div');
    opcaoBolo.classList.add('opcao-filtro');
    opcaoBolo.appendChild(iconBolo);
    opcaoBolo.innerHTML += 'bolos';
    opcaoBolo.addEventListener('click', () => {
        const boloCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'bolo';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoBolo.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(boloCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoCarne = document.createElement('div');
    opcaoCarne.classList.add('opcao-filtro');
    opcaoCarne.appendChild(iconCarne);
    opcaoCarne.innerHTML += 'carnes';
    opcaoCarne.addEventListener('click', () => {
        const carneCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'carne';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoCarne.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(carneCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoDoce = document.createElement('div');
    opcaoDoce.classList.add('opcao-filtro');
    opcaoDoce.appendChild(iconDoce);
    opcaoDoce.innerHTML += 'doces';
    opcaoDoce.addEventListener('click', () => {
        const doceCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'doce';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoDoce.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(doceCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoPao = document.createElement('div');
    opcaoPao.classList.add('opcao-filtro');
    // opcaoDoce.appendChild(iconDoce);
    opcaoPao.innerHTML += 'pães';
    opcaoPao.addEventListener('click', () => {
        const paoCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'pão';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoPao.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(paoCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoSobremesa = document.createElement('div');
    opcaoSobremesa.classList.add('opcao-filtro');
    // opcaoDoce.appendChild(iconDoce);
    opcaoSobremesa.innerHTML += 'sobremesas';
    opcaoSobremesa.addEventListener('click', () => {
        const sobremesaCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'sobremesa';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoSobremesa.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(sobremesaCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoSalgado = document.createElement('div');
    opcaoSalgado.classList.add('opcao-filtro');
    // opcaoDoce.appendChild(iconDoce);
    opcaoSalgado.innerHTML += 'salgados';
    opcaoSalgado.addEventListener('click', () => {
        const salgadoCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'salgado';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoSalgado.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(salgadoCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoMassa = document.createElement('div');
    opcaoMassa.classList.add('opcao-filtro');
    // opcaoDoce.appendChild(iconDoce);
    opcaoMassa.innerHTML += 'massas';
    opcaoMassa.addEventListener('click', () => {
        const massaCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'massa';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoMassa.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(massaCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoMolho = document.createElement('div');
    opcaoMolho.classList.add('opcao-filtro');
    // opcaoDoce.appendChild(iconDoce);
    opcaoMolho.innerHTML += 'molhos';
    opcaoMolho.addEventListener('click', () => {
        const molhoCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'molho';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoMolho.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(molhoCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });

    const opcaoConserva = document.createElement('div');
    opcaoConserva.classList.add('opcao-filtro');
    opcaoConserva.appendChild(iconConserva);
    opcaoConserva.innerHTML += 'conservas';
    opcaoConserva.addEventListener('click', () => {
        const conservaCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'conserva';
        });

        modal.style.display = 'none';
        limparSelecaoFiltros();
        opcaoConserva.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(conservaCards);

        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = '';
    });
  
    modal.appendChild(opcaoNome);
    modal.appendChild(opcaoBolo);
    modal.appendChild(opcaoCarne);
    modal.appendChild(opcaoConserva);
    modal.appendChild(opcaoDoce);
    modal.appendChild(opcaoMassa);
    modal.appendChild(opcaoMolho);
    modal.appendChild(opcaoPao);
    modal.appendChild(opcaoSalgado);
    modal.appendChild(opcaoSobremesa);
    modal.appendChild(opcaoTorta);
  
    // Função para atualizar os cards exibidos com base no filtro aplicado
    function atualizarCardsFiltrados(filteredCards) {
      while (cardsContainer.firstChild) {
          cardsContainer.removeChild(cardsContainer.firstChild);
      }
    
      filteredCards.forEach(card => cardsContainer.appendChild(card));
    }
  
    // Adicionando a janela modal ao final do body
    document.body.appendChild(modal);
  
    // Selecionando a div escolher-filtro
    const escolherFiltro = document.querySelector('.escolher-filtro');
  
    // Evento de clique no ícone de filtro
    const filtroIcon = document.getElementById('setaFiltro');
    let modalVisivel = false; // Variável para controlar o estado da janela modal
  
    filtroIcon.addEventListener('click', () => {
      modalVisivel = !modalVisivel; // Alterna o estado da janela modal
      modal.style.display = modalVisivel ? 'block' : 'none'; // Exibe ou oculta a janela modal
      
      // Alterna a classe do ícone do filtro
      filtroIcon.classList.toggle('bxs-filter');
      filtroIcon.classList.toggle('bxs-up-arrow');
  
      if (!modalVisivel) {
        // Fecha a modal e restaura a classe do ícone quando se clica fora do filtro
        modal.style.display = 'none';
        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = 'transparent'; // Remove o background de sombra
      } else {
        // Adiciona o background de sombra ao abrir a modal
        escolherFiltro.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      }
    });
  
    // Evento para fechar a modal se clicar fora dela
    document.addEventListener('click', function(event) {
      if (event.target !== modal && !modal.contains(event.target) && event.target !== filtroIcon) {
        modal.style.display = 'none'; // Fecha a modal se o clique for fora dela
        modalVisivel = false; // Atualiza o estado da modal
        
        // Restaura a classe do ícone quando se clica fora da modal
        filtroIcon.classList.remove('bxs-up-arrow');
        filtroIcon.classList.add('bxs-filter');
        escolherFiltro.style.backgroundColor = 'transparent'; // Remove o background de sombra
      }
    });

    // Criar o ícone de fechar (X)
    const iconFechar = document.createElement('i');
    iconFechar.classList.add('bx', 'bx-x');
    modal.appendChild(iconFechar);

    // Fechar a Modal no X
    iconFechar.addEventListener('click', () => {
      modal.style.display = 'none';
      modalVisivel = false;
      filtroIcon.classList.remove('bxs-up-arrow');
      filtroIcon.classList.add('bxs-filter');
      escolherFiltro.style.backgroundColor = 'transparent';
    });

  
    // Inicialmente, ordenar os cards por ano
    mostrarCardsOrdenados();
  });


