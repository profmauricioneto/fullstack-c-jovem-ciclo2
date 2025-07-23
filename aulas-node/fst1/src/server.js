const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (error, data) => {
        if (!error) {
            res.status(200).send(data);
        } else {
            res.status(500).json({
                message: 'error ao enviar arquivo html'
            })
        }
    })
});

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World from NODEJS'
//     });
// })

app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});
