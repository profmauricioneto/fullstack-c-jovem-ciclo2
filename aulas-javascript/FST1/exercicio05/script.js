function adicionarAoCarrinho() {
    let produto = prompt('Digite um Produto.');

    if(produto === '') {
        alert('Digite um produto valido!');
        return;
    }

    const carrinho = document.getElementById('carrinho');
    const pElement = document.createElement('p');
    pElement.textContent = produto;
    carrinho.appendChild(pElement);
}

const btnAdicionar = document.getElementById('btn-adicionar');

btnAdicionar.addEventListener('click', adicionarAoCarrinho);