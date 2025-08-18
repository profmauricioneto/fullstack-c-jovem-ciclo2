const productService = require('./product.service');
const logger = require('../../shared/logger');

exports.createProductController = async (req, res) => {
    const correlationId = req.headers['x-correlation-id'] || `create-${Date.now()}`;
    try {
        const { nome, preco, descricao } = req.body;
        const userId = req.user?.id;

        if (!nome || preco === undefined || !userId) {
            return res.status(400).json({ error: 'Campos obrigatórios: nome, preco, usuário' });
        }
        if (typeof preco !== 'number' || preco <= 0) {
            return res.status(400).json({ error: 'Preço deve ser um número positivo' });
        }

        const product = await productService.createProduct({ nome, preco, descricao, userId });
        logger.info('Produto criado', { correlationId, productId: product.id, userId });

        res.status(201).json({
            message: 'Produto criado com sucesso',
            product
        });
    } catch (error) {
        logger.error('Erro ao criar produto', { correlationId, error: error.message });
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getAllProductsController = async (req, res) => {
    const correlationId = req.headers['x-correlation-id'] || `list-${Date.now()}`;
    try {
        const products = await productService.getAllProducts();
        logger.info('Produtos listados', { correlationId, count: products.length });
        res.json({ products, count: products.length });
    } catch (error) {
        logger.error('Erro ao listar produtos', { correlationId, error: error.message });
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getProductByIdController = async (req, res) => {
    const correlationId = req.headers['x-correlation-id'] || `get-${Date.now()}`;
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID deve ser um número válido' });
        }
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        logger.info('Produto encontrado', { correlationId, productId: id });
        res.json(product);
    } catch (error) {
        logger.error('Erro ao buscar produto', { correlationId, error: error.message });
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.updateProductController = async (req, res) => {
    const correlationId = req.headers['x-correlation-id'] || `update-${Date.now()}`;
    try {
        const { id } = req.params;
        const { nome, preco, descricao } = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID deve ser um número válido' });
        }
        if (preco !== undefined && (typeof preco !== 'number' || preco <= 0)) {
            return res.status(400).json({ error: 'Preço deve ser um número positivo' });
        }
        const updatedProduct = await productService.updateProduct(id, { nome, preco, descricao });
        logger.info('Produto atualizado', { correlationId, productId: id });
        res.json({
            message: 'Produto atualizado com sucesso',
            product: updatedProduct
        });
    } catch (error) {
        logger.error('Erro ao atualizar produto', { correlationId, error: error.message });
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.deleteProductController = async (req, res) => {
    const correlationId = req.headers['x-correlation-id'] || `delete-${Date.now()}`;
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID deve ser um número válido' });
        }
        const deleted = await productService.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        logger.info('Produto deletado', { correlationId, productId: id });
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        logger.error('Erro ao deletar produto', { correlationId, error: error.message });
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};