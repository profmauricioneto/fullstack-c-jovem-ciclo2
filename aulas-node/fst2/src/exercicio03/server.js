require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// base de dados inicial da aplicação
const produtos = [
    {id: 1, nome: 'nintendo switch 2', preco: 4000, descricao: 'nintendo switch caro pra caramba!'},
    {id: 2, nome: 'Minecraft', preco: 300, descricao: 'jogo antigo mas ainda caro!'},
    {id: 3, nome: 'Caneta Azul', preco: 5, descricao: 'caneta azul, azul caneta!'},
    {id: 4, nome: 'Morango do Amor', preco: 25, descricao: 'Morango do amor gourmet!'},
];

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
    res.status(200).json(productFound);
})

app.listen(PORT, () => {
    console.log(`Server running in http://${HOST}:${PORT}`);
})