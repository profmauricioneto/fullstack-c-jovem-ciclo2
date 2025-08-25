const productServices = require('./product.services');
const logger = require('../../shared/logger/logger');

exports.getAllProductsController = async (req, res) => {
    try {
        const products = await productServices.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: `Server Internal Error`});
    }
};

exports.getProductByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productServices.getProductById(id);
        (product) ? res.status(200).json(product) : res.status(404).json({ message: `product not found `});
    } catch (error) {
        res.status(500).json({ message: `Server Internal Error`});
    }
};

exports.createProductController = async (req, res) => {
    const correlationId = req.headers['x-correlation-id'];
    try {
        const { nome, preco, descricao } = req.body;
        logger.info('Criando um produto', {
            correlationId,
            userId: req.user.id,
            userName: req.user.name,
            userEmail: req.user.email,
        });

        if(!nome || !preco) {
            return res.status(400).json({
                error: 'Campos obrigatórios: nome e preco'
            });
        }

        if (typeof preco !== 'number' || preco <= 0) {
            logger.warn('Preço inválido', {correlationId, preco, userId: req.user.id });
            return res.status(400).json({
                error: 'Preço deve ser um numérico positivo.'
            });
        }

        const product = await productServices.createProduct({
            nome,
            preco,
            descricao,
            createBy: req.user.id,
        });

        res.status(201).json({
            message: 'Produto criado com sucesso.',
            product
        })

        logger.info('produto criado com sucesso.', {
            correlationId,
            productId: product.id,
            createdBy: req.user.id,
        });
    } catch (error) {
        logger.error('Error ao criar um produto.', {
            correlationId,
            userId: req.user?.id,
            error: error.message,
            stack: error.stack,
        });
        res.status(500).json({ message: `Server Internal Error`});
    }
};

exports.deleteProductController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await productServices.deleteProduct(id);
        res.status(200).json({ message: `product deleted with success!`});
    } catch (error) {
        res.status(500).json({ message: `Server Internal Error`});
    }
};

exports.updateProductController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, preco, descricao } = req.body;
        await productServices.updateProduct(id, nome, preco, descricao);
        res.status(200).json({ message: `product updated with success!`});
    } catch (error) {
        res.status(500).json({ message: `Server Internal Error`});
    }
};