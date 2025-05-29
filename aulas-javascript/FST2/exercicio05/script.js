function adicionarAoCarrinho() {
    let item = prompt('Digite um item para adicionar ao carrinho!');
    if (item === '') {
        alert('campo vazio');
        return;
    }
    const carrinho = document.getElementById('carrinho');

    const novoItem = document.createElement('p'); // tag <p></p>
    novoItem.textContent = item;

    carrinho.appendChild(novoItem);
}

const btnCompras = document.getElementById('btn-adicionar');
// handle
btnCompras.addEventListener('click', adicionarAoCarrinho);