const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`<h1>Bem vindo ao meu site!!</h1>`)
});

app.get('/sobre', (req, res) => {
    res.send('<h2>Exercicio01 de Nodejs da turma FST2</h2>')
})

app.get('/usuarios/:nome', (req, res) => {
    const nome = req.params.nome;
    res.send(`<h1>Olá Sr(a)${nome.toUpperCase()}</h1>`);
})

app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});