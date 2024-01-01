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
  
    const iconInteresse = document.createElement('i');
    iconInteresse.classList.add('bx', 'bxs-pie-chart');

    const iconBolo = document.createElement('i');
    iconBolo.classList.add('bx', 'bxs-cake');
  
    // Criando a janela modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'none'; // Inicialmente, a janela modal estará oculta
  
  
    const opcaoNome = document.createElement('div');
    opcaoNome.classList.add('opcao-filtro');
    opcaoNome.appendChild(iconNome); // Adiciona o ícone ao lado da frase
    opcaoNome.innerHTML += 'ordem alfabética';
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
  
    const opcaoInteresse = document.createElement('div');
    opcaoInteresse.classList.add('opcao-filtro');
    opcaoInteresse.appendChild(iconInteresse);
    opcaoInteresse.innerHTML += 'tortas';
    opcaoInteresse.addEventListener('click', () => {
        const interesseCards = cards.filter(card => {
            const statusText = card.querySelector('#statusReceita').textContent;
            return statusText === 'torta';
        });
  
        modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
        limparSelecaoFiltros();
        opcaoInteresse.classList.add('filtro-selecionado');
        atualizarCardsFiltrados(interesseCards);

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
    })
  
    modal.appendChild(opcaoNome);
    modal.appendChild(opcaoInteresse);
    modal.appendChild(opcaoBolo);
  
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
  
    // Inicialmente, ordenar os cards por ano
    mostrarCardsOrdenados();
  });

