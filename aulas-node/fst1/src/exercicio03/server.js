require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

// dados iniciais para teste
const produtos = [
    {id: 1, nome: 'fone de ouvido', preco: 100, descricao: 'fone de ouvido caro'},
    {id: 2, nome: 'mouse', preco: 150, descricao: 'mouse da razer'},
    {id: 3, nome: 'monitor led', preco: 800, descricao: 'monitor led 2k'},
    {id: 4, nome: 'teclado keychron', preco: 500, descricao: 'teclado keychron k2'},
];
let idProdutos = 5;

// middlewares
const logMiddleware = (req, res, next) => {
    console.log(`${new Date()} - ${req.method} - ${req.url}`);
    next();
}

app.use(express.json());
app.use(logMiddleware);

// ROTAS
// recuperar todos os produtos
app.get('/produtos', (req, res) => {
    res.json(produtos)
});

// recuperar um produto por id especifico
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const productFound = produtos.find((prod) => prod.id === id);
    if (!productFound) {
        return res.status(404).json({
            message: `product ${id} not found`
        })
    }
    res.status(200).json(productFound);
});


app.listen(PORT, () => {
    console.log(`Server running in: http://localhost:${PORT}`); 
});