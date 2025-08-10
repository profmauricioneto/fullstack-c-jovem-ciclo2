const express = require('express');
const productController = require('./product.controller');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.use('/products', authenticateToken);

router.post('/products', productController.createProductController);
router.get('/products', productController.getAllProductsController);
router.get('/products/:id', productController.getProductByIdController);
router.put('/products/:id', productController.updateProductController);
router.delete('/products/:id', productController.deleteProductController);

module.exports = router;

