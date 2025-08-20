const productServices = require('./product.services');

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
    try {
        const { nome, preco, descricao } = req.body;
        await productServices.createProduct(nome, preco, descricao);
        res.status(200).json({ message: `product created with success!`});
    } catch (error) {
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