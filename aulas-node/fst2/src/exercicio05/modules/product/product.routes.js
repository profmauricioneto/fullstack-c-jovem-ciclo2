const productControllers = require('./product.controllers');
const express = require('express');
const authenticateToken = require('../../shared/middlewares/auth');

const router = express.Router();

router.use('/products', authenticateToken);

router.post('/products', productControllers.createProductController);
router.get('/products', productControllers.getAllProductsController);
router.get('/products/:id', productControllers.getProductByIdController);
router.put('/products/:id', productControllers.updateProductController);
router.delete('/products/:id', productControllers.deleteProductController);

module.exports = router;