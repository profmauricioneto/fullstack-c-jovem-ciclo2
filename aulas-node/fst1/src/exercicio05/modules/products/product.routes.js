const productControllers = require('./product.controllers');
const express = require('express');
const authMiddleware = require('../../shared/middlewares/auth');

const router = express.Router();

router.use('/products', authMiddleware);

router.get('/api/products', productControllers.getAllProductsController);
router.get('/api/products/:id', productControllers.getProductByIdController);
router.post('/api/products', productControllers.createProductController);
router.delete('/api/products/:id', productControllers.deleteProductController);
router.put('/api/products/:id', productControllers.updateProductController);

module.exports = router;