const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const routerProduct = require('./modules/product/product.routes');

app.use('/api', routerProduct);

app.listen(PORT,() => {
    console.log(`Server running in http://localhost:${PORT}`);
});