const logger = require('../../shared/logger/logger');
const productServices = require('./product.services');

exports.getAllProductsController = async (req, res) => {
    try {
        const products = await productServices.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. '});
    }
};

exports.getProductByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productServices.getProductById(id);
        (product) ? res.status(200).json(product) : res.status(404).json({ message: 'produto não encontrado'});
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. '});
    }
};

exports.createProductController = async (req, res) => {
    const correlationId = req.headers['x-correlation-id'];
    try {
        const {nome, preco, descricao} = req.body;
        const userId = req.user?.id;

        if (!nome || !preco || !descricao || !userId) {
            res.status(400).json({message:`campos obrigatorios`})
        }
        const product = await productServices.createProduct({nome, preco, descricao, userId});
        logger.info('Produto criado com sucess.', {
            correlationId, 
            productId: product.id,
            userId
        })
        res.status(201).json({ message: `produto criado com sucesso.`})
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. ', error: error});
    }
};

exports.deleteProductController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await productServices.deleteProduct(id);
        res.status(200).json({ message: 'produto excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. '});
    }
};

exports.updateProductController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, preco, descricao } = req.body;
        await productServices.updateProduct(id, {nome, preco, descricao});
        res.status(200).json({ message: 'produto atualizado com sucesso. '});
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. '});
    }
};