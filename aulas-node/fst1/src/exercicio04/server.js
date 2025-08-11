const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const productRoutes = require('./modules/products/product.routes');
const userRoutes = require('./modules/auth/user.routes');

app.use('/api', productRoutes);
app.use('/api/auth', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})
