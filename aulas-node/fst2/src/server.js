const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (error, data) => {
        if (!error) {
            res.status(200).send(data);
        } else {
            res.status(500).json({
                message: 'arquivo não pode ser enviado.'
            })
        }
    })
})

// app.get('/', (req, res) => {
//     // res.send(`<h1>Hello World from NodeJS</h1>`)
//     res.json({
//         message: 'Hello World from NodeJS',
//     })
// });

app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});