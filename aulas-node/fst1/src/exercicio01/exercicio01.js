const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(
        `
            <h1>Olá, bem vindo a minha página!</h1>
            <p>Aplicação sendo executada diretamente do node</p>
        `
    );
});

app.get('/sobre', (req, res) => {
    res.send(`
        <h2>Meu supersite criado com nodejs</h2>
        `);
});

app.get('/usuarios/:nome', (req, res) => {
    const nome = req.params.nome;
    res.send(`
        <h1>Bem vindo Sr(a) ${nome}</h1>
        `)
})

app.listen(PORT, () => {
    console.log(`Servidor sendo executado em http://localhost:${3000}`);
});