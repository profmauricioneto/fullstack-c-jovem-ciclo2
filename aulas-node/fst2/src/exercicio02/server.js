const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/enviar-dados', (req, res) => {
    // const nome = req.body.nome;
    // const email = req.body.email;
    const {nome, email} = req.body;
    if (!nome || !email) {
        return res.status(400).json({
            message: 'Preencha os campos obrigatórios!'
        });
    }
    res.status(200).send(`
       <h1>Formulário recebido!</h1>
       <p>Obrigado, ${nome}. Recebemos seu email: ${email}</p> 
    `);
})

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});