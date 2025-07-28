const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../public/index.html'), 'utf-8', (error, data) => {
        if (!error) {
            res.status(200).send(data);
        }
    })
});

app.post('/enviar-dados', (req, res) => {
    // const nome = req.body.nome;
    // const email = req.body.email;
    const {nome, email} = req.body;
    if (!nome || !email) {
        res.status(400).json({
            message: 'digite os campos obrigatórios'
        })
        return;
    }
    res.status(200).send(`
        <h1>Formulário recebido!</h1>
        <p>Obrigado, ${req.body.nome}. Recebemos seu email: ${req.body.email}</p>    
    `);
})

app.listen(PORT, () => {
    console.log(`Servidor executando em: http://localhost:${PORT}`);
});