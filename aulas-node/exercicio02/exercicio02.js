const express = require('express');
const app = express();
const PORT = 3000;

express.static('public');

app.listen(() => {
    console.log(`Servidor sendo executado em: http://localhost:${PORT}`);
});