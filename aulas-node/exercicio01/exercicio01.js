const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>Essa é a Página Inicial!</h1>
        <p>Bem-vindo a página inicial!</p>    
    `);
});

app.get('/sobre', (req, res) => {
    res.send(`
        <h1>Sobre</h1>
        <p>Essa é a página de sobre da minha aplicação.</p>    
    `)
});

app.get('/usuarios/:nome', (req, res) => {
    const nomeUsuario = req.params.nome;
    res.send(`
        <h1>Olá, ${nomeUsuario}</h1>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});