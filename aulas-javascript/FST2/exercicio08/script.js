let produtos = []

function adicionarAoCarrinho() {
    const qtdProduto = document.querySelector('#quantidade').value;
    const nomeProduto = document.querySelector('#nome-produto').value;
    const precoUnitario = document.querySelector('#preco').value;

    // adicionei o produto no array
    produtos.push({
        nome: nomeProduto,
        quantidade: qtdProduto,
        preco: precoUnitario
    });


    // adicionando os produtos a tabela
    const tabela = document.querySelector('#corpo-tabela');
    tabela.innerHTML = '';
    produtos.forEach((item) => {
        let line = document.createElement('tr');
        line.innerHTML = `
            <td>${item.quantidade}</td>
            <td>${item.nome}</td>
            <td>${item.quantidade * item.preco}</td>
        `;
        tabela.appendChild(line)
    });

    // calculo do total 
    // let total = 0;
    // for(let i = 0; i < produtos.length; i++) {
    //     total = total + (produtos[i].quantidade * produtos[i].preco);
    // }

    let total = produtos.reduce((acc, atual) => {
        return acc + (atual.quantidade * atual.preco)
    }, 0);

    document.querySelector('#valor-total').innerHTML = `R$ ${total.toFixed(2)}`;
}

const btnSend = document.querySelector('#btn-send');
btnSend.addEventListener('click', adicionarAoCarrinho);