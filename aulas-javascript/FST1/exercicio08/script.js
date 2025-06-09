let carrinho = [];

function adicionarProdutoAoCarrinho() {
    const qtdProduto = document.querySelector('#quantidade').value;
    const produto = document.querySelector('#nome-produto').value;
    const precoUnitario = document.querySelector('#preco').value;

    carrinho.push({
        nome: produto,
        quantidade: qtdProduto,
        preco: precoUnitario
    });

    const tabela = document.querySelector('#carrinho-corpo');
    tabela.innerHTML = '';


    carrinho.forEach(item => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco * item.quantidade}</td>
        `;
        tabela.appendChild(novaLinha);
    });

    // let total = 0;
    // for(let i = 0; i < carrinho.length; i++) {
    //     total = total + carrinho[i].preco * carrinho[i].quantidade;
    // }

    let total = carrinho.reduce((acc, item)=> acc + (item.preco * item.quantidade), 0);

    document.querySelector('#total').textContent = `R$ ${total.toFixed(2)}`;

    console.log(carrinho);
}

const btnEnviar = document.querySelector('#enviar-produto');

btnEnviar.addEventListener('click', adicionarProdutoAoCarrinho);