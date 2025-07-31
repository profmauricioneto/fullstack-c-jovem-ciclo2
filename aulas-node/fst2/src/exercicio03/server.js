require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

// base de dados inicial da aplicação
const produtos = [
    {id: 1, nome: 'nintendo switch 2', preco: 4000, descricao: 'nintendo switch caro pra caramba!'},
    {id: 2, nome: 'Minecraft', preco: 300, descricao: 'jogo antigo mas ainda caro!'},
    {id: 3, nome: 'Caneta Azul', preco: 5, descricao: 'caneta azul, azul caneta!'},
    {id: 4, nome: 'Morango do Amor', preco: 25, descricao: 'Morango do amor gourmet!'},
];
let idProduto = 5;

// middlewares
const logMiddleware = (req, res, next) => {
    console.log(`[${new Date()}]: ${req.method} - ${req.url}`);
    next();
}
app.use(express.json());
app.use(logMiddleware);

// ROTAS

// recuperar todos os produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// recuperar um produto pelo ID
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productFound = produtos.find((prod) => prod.id === id);
    if (!productFound) return res.status(404).json({ message: `O ID ${id} não tem produto associado!` });
    res.status(200).json({ message: 'produto encontrado!', product: productFound });
});

// inserir um produto novo
app.post('/produtos', (req, res) => {
    const { nome, preco, descricao } = req.body;
    if(!nome || !preco || !descricao ) return res.status(400).json({ message: 'campos obrigatórios incompletos'});

    const novoProduto = {id: idProduto++, nome, preco, descricao};
    produtos.push(novoProduto);
    res.status(200).json({ message: `produto cujo ID ${novoProduto.id} foi adicionado com sucesso`, product: novoProduto });
});

// deletar um produto baseado no ID
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex((prod) => prod.id === id);

    if (!produtoIndex && produtoIndex != 0) return res.status(404).json({ message: `produto cujo ID ${id} não existe na base de dados. `});
    produtos.splice(produtoIndex, 1);
    res.status(200).json({ message: `produto cujo ID ${id} foi removido com sucesso.`, product: produtos})
});

//  atualizar produto pelo id
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productFound = produtos.find((prod) => prod.id === id);
    if (!productFound) return res.status(404).json({ message: `produto cujo ID ${id} não foi encontrado na base de dados`});

    const { nome, preco, descricao } = req.body;
    productFound.nome = nome || productFound.nome;
    productFound.preco = preco || productFound.preco;
    productFound.descricao = descricao || productFound.descricao;
    res.status(200).json({ message: `produto cujo ID ${id} foi atualizado com sucesso`, product: produtos });
});

app.listen(PORT, () => {
    console.log(`Server running in http://${HOST}:${PORT}`);
})